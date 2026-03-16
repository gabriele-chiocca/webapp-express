function errorHandler(err, req, res, next) {
  console.err(err);

  res.status(500).json({
    message: 'Errore del server',
  });
}

module.exports = errorHandler;
