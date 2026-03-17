require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moviesRouter = require('./routes/moviesRouter');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const cors = require('cors');

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use('/movies', moviesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});
