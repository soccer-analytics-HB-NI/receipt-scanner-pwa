export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { access_token } = req.body;
  
    if (!access_token) {
      return res.status(400).json({ error: 'Access token required' });
    }
  
    try {
      // Get list of spreadsheets from Google Drive
      const driveResponse = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=mimeType="application/vnd.google-apps.spreadsheet"&pageSize=50&fields=files(id,name,modifiedTime)',
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      );
  
      const driveData = await driveResponse.json();
  
      if (!driveResponse.ok) {
        throw new Error(driveData.error?.message || 'Failed to fetch sheets');
      }
  
      // Format the response
      const sheets = driveData.files.map(file => ({
        id: file.id,
        name: file.name,
        modifiedTime: file.modifiedTime
      }));
  
      res.json({ sheets });
  
    } catch (error) {
      console.error('List sheets error:', error);
      res.status(500).json({ error: 'Failed to fetch Google Sheets' });
    }
  }