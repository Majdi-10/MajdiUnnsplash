const express = require('express');
const database = require('./database');
const app = express();
const port = 1337;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});