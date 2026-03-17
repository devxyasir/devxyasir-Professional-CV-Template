# Muhammad Yasir – CV App

A React-based CV editor that downloads a **true vector PDF** (no canvas, no blur) using `@react-pdf/renderer`.

## Setup (one time)

You need **Node.js 16+** installed. Download from https://nodejs.org if you don't have it.

```bash
# 1. Unzip the project and enter the folder
cd yasir-cv

# 2. Install dependencies (~1 min)
npm install

# 3. Start the app
npm start
```

The app opens at **http://localhost:3000** in your browser.

## How to use

- **Edit CV** — click the hamburger button (top-right) to open the editor panel
- **Upload photo** — click "Choose file" in the toolbar
- **Download PDF** — click "Download PDF (A4 · Vector)" — downloads a clean, sharp PDF instantly

## Why the PDF is sharp

- Uses `@react-pdf/renderer` — generates PDF as pure vector (not a screenshot)
- Fonts (Lato + Merriweather) are embedded as TTF files in the PDF
- Text is searchable and renders crisp at any zoom level
- No html2canvas, no image compression, no quality loss

## Fonts

The `/public/fonts/` folder contains the TTF files used in the PDF:
- `Lato-Regular.ttf`, `Lato-Bold.ttf`, `Lato-Black.ttf`
- `Merriweather-Regular.ttf`, `Merriweather-Bold.ttf`

These are loaded locally by the dev server — no internet required for PDF generation.
