const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsdocs = YAML.load('./api.yamljs')
const fileUpload = require('express-fileupload')
const app= express()       
app.use(fileUpload())  
app.use(express.json())
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsdocs))
   




app.get("/string",(req,res)=>{
  res.status(200) 
  // res.status(404) 
  res.send("this is a string")
});

app.get("/users",(req,res)=>{
  res.status(200)  
let obj = {id:19, name: "yash patel"}
res.send(obj)
});


let users = [
  {id:19, name: "yash patel"},
  {id:28, name: "yash tiwari"}
];
app.get("/user",(req,res)=>{
  res.status(200)  
  res.send(users)
});

app.get("/user/:id",(req,res)=>{
  const object = users.find((x)=>x.id===parseInt(req.params.id))
  res.status(200)  
  res.send(object)
});

app.post("/create",(req,res)=>{
  users = [req.body, ...users];
  res.send(users);
});

app.get("/userquery",(req,res)=>{
  const object = users.find((x)=>x.id===parseInt(req.params.id))
  res.status(200)  
  res.send(object)
});

app.post("/upload",(req,res)=>{
  console.log(req.header);
  const file = req.files.file
  let path =__dirname+"/upload/"+"file"+Date.now()+".jpg";
  file.mv(path,(err)=>{
    res.send("ok")
  })
});



app.listen(3000,()=>console.log("up & running"));

