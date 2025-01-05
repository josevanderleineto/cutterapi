const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Corrigido aqui

// Habilitar CORS
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>How to Use the API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
        code {
          background-color: #eee;
          padding: 2px 4px;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <h1>How to Use the API</h1>
      <p>To use this API, you can make a GET request to the following endpoint:</p>
      <ul>
          <li><a href="https://notacao-de-autor-api.vercel.app/api/data">/api/data</a></li>
      </ul>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

app.get('/api/data', (req, res) => {
  const filePath = path.join(__dirname, 'cutter.csv');
  const csvData = fs.readFileSync(filePath, 'utf8');
  const lines = csvData.split('\n').filter(Boolean);
  const data = lines.map((line) => {
    const [texto, codigo] = line.split(',');
    return { texto, codigo };
  });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});