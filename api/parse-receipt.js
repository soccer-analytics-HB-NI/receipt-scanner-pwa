// api/parse-receipt.js - Serverless function for Vercel
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }
  
    try {
      const prompt = `Parse this receipt text and extract structured data. Return ONLY valid JSON with this exact format:
  
  {
    "store": "store name",
    "date": "MM/DD/YYYY", 
    "total": "$XX.XX",
    "items": [
      {"name": "item name", "price": "$XX.XX", "category": "category"}
    ]
  }
  
  Categories should be: Groceries, Electronics, Clothing, Restaurant, Gas, Pharmacy, Home, Entertainment, or Other.
  
  Receipt text:
  ${text}`;
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        })
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
  
      const data = await response.json();
      const aiResponse = data.choices[0].message.content.trim();
      
      // Try to parse the JSON response
      const parsedData = JSON.parse(aiResponse);
      
      // Add metadata
      parsedData.aiParsed = true;
      parsedData.rawText = text;
      
      res.status(200).json(parsedData);
      
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ 
        error: 'Failed to parse receipt',
        details: error.message 
      });
    }
  }