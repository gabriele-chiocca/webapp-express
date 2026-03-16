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

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM movies WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Errore nel recupero del film',
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: 'Film non trovato',
      });
    }

    res.json(results[0]);
  });
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});
