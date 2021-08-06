const express = require('express');
const bodyParser =require('body-parser');
const path=require('path');
const db = require('../db/index');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'..','client','build')))


db.connect((error)=>{
  if(error) throw error
  else{
    console.log("database connected succefully")
  }
})

app.get('/images', (req, res) => {
  db.query('select * from splach',(err,data)=>{
    if(err) throw err
    res.send(data)
  })
  
});


app.post('upload', (res,req)=>{
  db.query("insert into splach (column1) values (?) ;", [req.body.splach], (err,result)=>{
    if(err) throw err;
    res.send({message:success})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});