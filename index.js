const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const distPath = path.join(__dirname, 'dist');

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Handle SPA routing, send index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});