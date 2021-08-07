const express = require('express');
const bodyParser =require('body-parser');
const path=require('path');
const db = require('../db/index');
const cloudinary = require ("cloudinary")
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


app.post("https://api.cloudinary.com/v1_1/majdi10/image/upload", function(res,req){

  var body = [req.body.splach];
  var id = req.body.public_id;
  db.query("insert into splach (column1) values (?) ;",cloudinary.uploader.upload(body,function(result){
    res.send(result)

  },{ public_id : id })) 
})

// var body = [req.body.splach];
// var id = req.body.public_id;
// db.query("insert into splach (column1) values (?) ;",  cloudinary.uploader.upload(body, function(result){
//   res.send(result)
// },{public_id:id})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});