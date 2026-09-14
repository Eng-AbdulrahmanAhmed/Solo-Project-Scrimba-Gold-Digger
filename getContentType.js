import path from 'path';

export function getContentType(filePathOrExt) {
    // 1. Automatically grab the extension (e.g., "index.html" -> ".html")
    // 2. Safe check: make sure it is a string, then lowercase it
    const ext = String(path.extname(filePathOrExt) || filePathOrExt).toLowerCase();
    
    console.log("Extension being checked:", ext);

    const types = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",  // Added common website favicon
        ".html": "text/html"     // Explicitly mapping HTML
    };

    const result = types[ext] || "text/html";
    
    console.log(`********************** ${result} for ${ext} **********************`);
    return result;
}
