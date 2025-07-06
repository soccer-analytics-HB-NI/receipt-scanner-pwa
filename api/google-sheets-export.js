export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { access_token, sheet_id, receipts, append_mode = true } = req.body;
  
    if (!access_token || !sheet_id || !receipts) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      // Find the maximum number of items across all receipts
      let maxItems = 0;
      receipts.forEach(receipt => {
        if (receipt.items && receipt.items.length > maxItems) {
          maxItems = receipt.items.length;
        }
      });
  
      // Create headers
      const headers = ['Store', 'Date', 'Total', 'Scanned At', 'AI Parsed'];
      for (let i = 1; i <= maxItems; i++) {
        headers.push(`Product ${i} Name`, `Product ${i} Price`, `Product ${i} Category`);
      }
  
      // Create data rows
      const rows = receipts.map(receipt => {
        const row = [
          receipt.store || '',
          receipt.date || '',
          receipt.total || '',
          receipt.scannedAt || '',
          receipt.aiParsed ? 'Yes' : 'No'
        ];
  
        // Add items
        for (let i = 0; i < maxItems; i++) {
          if (i < receipt.items.length) {
            const item = receipt.items[i];
            row.push(
              item.name || '',
              item.price || '',
              item.category || ''
            );
          } else {
            row.push('', '', ''); // Empty cells for missing items
          }
        }
  
        return row;
      });
  
      // Prepare the data to send
      const values = append_mode ? rows : [headers, ...rows];
  
      // Determine the range
      let range = 'Sheet1!A:ZZ';
      if (append_mode) {
        // Append to existing data
        range = 'Sheet1!A:ZZ';
      }
  
      // Send data to Google Sheets
      const sheetsResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: values
          }),
        }
      );
  
      const sheetsData = await sheetsResponse.json();
  
      if (!sheetsResponse.ok) {
        throw new Error(sheetsData.error?.message || 'Failed to export to sheet');
      }
  
      res.json({
        success: true,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${sheet_id}`,
        updatedRows: sheetsData.updates?.updatedRows || rows.length
      });
  
    } catch (error) {
      console.error('Export to sheets error:', error);
      res.status(500).json({ error: 'Failed to export to Google Sheets' });
    }
  }