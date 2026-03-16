const express = require('express');
const app = express();
const connection = require('./config/db');

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.get('/movies', (req, res) => {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Errore nel recupero dei film',
      });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});
