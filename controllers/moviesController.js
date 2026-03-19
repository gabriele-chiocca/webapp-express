const connection = require('../config/db');

function index(req, res) {
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
}

function show(req, res) {
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

      const movie = movieresults[0];

      movie.reviews = reviewresults;

      res.json(movie);
    });
  });
}

function storeReview(req, res) {
  const movieId = req.params.id;
  const { name, vote, text } = req.body;

  const sql = `
  INSERT INTO reviews(movie_id, name, vote, text)
  VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [movieId, name, vote, text], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Errore inserimento recensione ',
      });
    }
    res.json(results);
  });
}
module.exports = {
  index,
  show,
};
