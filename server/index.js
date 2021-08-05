const express = require('express');
const database = require('../db/index');
const app = express();
const port = 3000;

database.connect((error)=>{
  if(error) throw error
  else{
    console.log("database connected succefully")
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});