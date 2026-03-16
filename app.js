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
  const moviesql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsql = 'SELECT * FROM reviews WHERE movie_id = ?';

  connection.query(moviesql, [id], (err, movieresults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Errore nel recupero del film',
      });
    }

    if (movieresults.length === 0) {
      return res.status(400).json({
        message: 'Film non trovato',
      });
    }

    connection.query(reviewsql, [id], (err, reviewresults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Errore nel recupero delle recensioni',
        });
      }

      if (reviewresults.length === 0) {
        return res.status(400).json({
          message: 'Recensione non trovata',
        });
      }

      const movie = movieresults[0];

      movie.reviews = reviewresults;

      res.json(movie);
    });
  });
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});
