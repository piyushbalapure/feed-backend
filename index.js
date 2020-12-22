require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const { ValidationError } = require('express-validation');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('common'));
app.use(compression());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.use(routes);
