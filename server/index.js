const express = require('express');
const bodyParser =require('body-parser');
const path=require('path');
const db = require('../db/index');
const cloudinary = require ("cloudinary")
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'..','build')))


db.connect((error)=>{
  if(error) throw error
  else{
    console.log("database connected succefully")
  }
})

app.get('/images', (req, res) => {
  db.query('select * from mytable',(err,data)=>{
    if(err) throw err
    res.send(data)
  })
  
});


app.post('/uploading',(req,res)=>{
  //send a post req to "https://api.cloudinary.com/v1_1/majdi10/image/upload" and the send back the data to the front end req.body
  console.log(req.body.Name)
  console.log(req.body.urlImage)
  db.query('insert into mytable (Name, urlImage)  values (?,?) ;',[req.body.Name, req.body.urlImage],(err,data)=>{
    if(err)throw err;
    res.send({message: 'posted'})
  })
})




// var body = [req.body.splach];
// var id = req.body.public_id;
//   cloudinary.uploader.upload(body, function(result){
//   res.send(result)
// },{public_id:id})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});