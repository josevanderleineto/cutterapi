const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

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
