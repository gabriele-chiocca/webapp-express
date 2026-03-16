require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moviesRouter = require('./routes/moviesRouter');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.static('public'));
app.use(express.json());

app.use('/movies', moviesRouter);

app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});
