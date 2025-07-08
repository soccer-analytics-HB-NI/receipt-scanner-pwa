# Receipt Scanner PWA

A Progressive Web App for scanning and processing receipts using OCR and AI technology. Transform receipt photos into structured, organized data.

## Features

- **Progressive Web App** - Works on desktop and mobile, installable as native app
- **Camera Integration** - Take photos directly from mobile device
- **OCR Processing** - Client-side text extraction using Tesseract.js
- **AI Enhancement** - Optional OpenAI integration for improved accuracy
- **Smart Data Extraction** - Automatically identifies store, date, items, and totals
- **Category Classification** - Intelligent item categorization
- **Responsive Design** - Modern UI optimized for all devices
- **Offline Support** - Core functionality works without internet

## Live Demo

[https://receipt-scanner-pwa.vercel.app/](https://receipt-scanner-pwa.vercel.app/)


## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **OCR**: Tesseract.js
- **AI**: OpenAI GPT-3.5-turbo
- **Backend**: Vercel Serverless Functions
- **Deployment**: Vercel

## Quick Start

### Option 1: Use Live App
Visit the live demo URL and start scanning receipts immediately.

### Option 2: Local Development

```bash
git clone https://github.com/your-username/receipt-scanner-pwa.git
cd receipt-scanner-pwa
open index.html
```

For AI features, create `config.js` from `config.example.js` and add your OpenAI API key.

## Configuration

### API Key Setup (Optional)
The app works with basic OCR without an API key. For enhanced AI features:

1. Get OpenAI API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. For local development: Add to `config.js`
3. For production: Set `OPENAI_API_KEY` environment variable in Vercel

### Deployment

```bash
vercel --prod
vercel env add OPENAI_API_KEY
```

## Usage

1. Connect to Google Drive and select Goggle Sheet
2. Choose processing mode (AI Enhanced or Basic)
3. Capture receipt using camera or upload image
4. Review extracted data
5. Export or copy information

## Supported Formats

- Image types: JPG, PNG, GIF, WebP, BMP, TIFF
- File size: Up to 50MB
- Mobile photos from iPhone and Android devices

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create Pull Request
