# Receipt Scanner PWA

A Progressive Web App for scanning and processing receipts using OCR and AI technology. Transform receipt photos into structured, organized data and export directly to Google Sheets.

## Features

- **Progressive Web App** - Works on desktop and mobile, installable as native app
- **Camera Integration** - Take photos directly from mobile device with iPhone HEIC support
- **OCR Processing** - Client-side text extraction using Tesseract.js
- **AI Enhancement** - Optional OpenAI integration for improved accuracy and categorization
- **Smart Data Extraction** - Automatically identifies store, date, items, and totals
- **Category Classification** - Intelligent item categorization (Groceries, Electronics, etc.)
- **Google Sheets Integration** - Direct export to Google Sheets with OAuth authentication
- **Collection Management** - Scan multiple receipts and batch export
- **Multiple Export Formats** - Export as CSV or directly to Google Sheets
- **Responsive Design** - Modern UI optimized for all devices

## Live Demo

[https://receipt-scanner-pwa.vercel.app/](https://receipt-scanner-pwa.vercel.app/)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **OCR**: Tesseract.js
- **AI**: OpenAI GPT-3.5-turbo
- **Image Processing**: HEIC2Any for iPhone photo conversion
- **Backend**: Vercel Serverless Functions
- **APIs**: Google Sheets API with OAuth 2.0
- **Deployment**: Vercel

## Google Sheets Integration

The app includes comprehensive Google Sheets integration:

- **OAuth Authentication** - Secure Google account connection
- **Sheet Selection** - Choose from your existing Google Sheets
- **Batch Export** - Export multiple receipts at once
- **Preferred Sheet** - Save default sheet for quick exports
- **Auto-formatting** - Receipts organized in structured columns


## Quick Start

### Option 1: Use Live App
Visit the live demo URL and start scanning receipts immediately.

### Option 2: Local Development

```bash
git clone https://github.com/your-username/receipt-scanner-pwa.git
cd receipt-scanner-pwa
open index.html
```

For AI and Google Sheets features, create `config.js` from `config.example.js` and add your API keys.

## Configuration

### API Keys Setup

1. **OpenAI API** (Optional - for AI enhancement):
   - Get key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Add to `config.js` or set `OPENAI_API_KEY` environment variable

2. **Google Sheets API** (Optional - for sheets integration):
   - Create project in Google Cloud Console
   - Enable Google Sheets API and Google Drive API
   - Create OAuth 2.0 credentials
   - Set environment variables in Vercel

### Deployment

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GOOGLE_REDIRECT_URI
```

## Usage

### Basic Workflow
1. **Setup** (Optional) - Connect to Google Sheets for easy exporting
2. **Choose processing mode** - Toggle between AI Enhanced or Basic
3. **Capture receipts** - Use camera or upload images (supports iPhone HEIC)
4. **Review results** - Check extracted data for accuracy
5. **Add to collection** - Build a collection of multiple receipts
6. **Export data** - Download CSV or export directly to Google Sheets

### Receipt Collection Features
- **Batch Processing** - Scan multiple receipts in one session
- **Collection Management** - View, edit, and remove receipts from collection
- **Multiple Export Options** - CSV download or Google Sheets export
- **Smart Organization** - Receipts organized with timestamps and metadata

## Supported Formats

- **Images**: JPG, PNG, GIF, WebP, BMP, TIFF
- **iPhone Photos**: HEIC/HEIF with automatic conversion
- **Mobile Photos**: iPhone and Android camera captures
- **File Size**: Up to 25MB

## Export Formats

### CSV Export
- Store, Date, Total, Scanned At, AI Parsed status
- Individual item details (Name, Price, Category)
- Supports unlimited items per receipt

### Google Sheets Export
- Structured columns with receipt metadata
- Item details organized in separate columns
- Direct integration with your Google account
- Batch export of multiple receipts
