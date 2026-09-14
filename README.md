# GoldDigger 🪙

GoldDigger is a Node.js web application built as part of the Scrimba Node.js Solo Project curriculum. It serves static assets and provides an interactive interface to simulate investing in gold with live price tracking.

## 🚀 Features

- **Custom HTTP Static File Server**: Built using Node.js native `http`, `fs/promises`, and `path` modules.
- **Dynamic Content Type Detection**: Resolves content types for HTML, CSS, JavaScript, images, and other static assets dynamically.
- **Custom 404 Error Handling**: Automatically renders a custom 404 page for missing static routes.
- **Real-Time Live Gold Price Tracking**: Automatically polls live XAU/USD gold prices every 3 seconds with visual connection indicators (🟢 Live / 🔴 Error).
- **Troy Ounce Investment Calculator**: Dynamically calculates and displays exact gold troy ounces (`ozt`) based on real-time market prices and user input.
- **Interactive Purchase Modal**: Uses accessible HTML `<dialog>` element to display an itemized investment summary.
- **Investment API & Data Logging**: Connects client investment actions (`POST /api/invest`) to backend Node.js endpoints for server-side processing.

## 🛠️ Project Structure

```
.
├── public/
│   ├── 404.html          # Custom 404 Error Page
│   ├── favicon.ico       # Website Favicon
│   ├── gold.png          # Asset image
│   ├── index.css         # Main stylesheet
│   ├── index.html        # Main landing page & UI
│   ├── index.js          # Client-side JavaScript logic
│   └── temp.html         # Temporary layout file
├── getContentType.js     # Utility to map file extensions to MIME types
├── sendResponse.js       # Utility to write HTTP responses
├── server.js             # Node.js HTTP server entry point
├── package.json          # Project metadata & npm scripts
└── README.md             # Project documentation
```

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eng-AbdulrahmanAhmed/Solo-Project-Scrimba-Gold-Digger.git
   cd Solo-Project-Scrimba-Gold-Digger
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Or run the production server:
   ```bash
   npm start
   ```

4. **Open in browser**:
   Navigate to `http://localhost:8000` in your web browser.

## 📜 License

This project is licensed under the [ISC License](package.json).
