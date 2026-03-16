const express = require('express');
const app = express();
const connection = require('./config/db');

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});
