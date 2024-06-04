const express = require('express');


const app = express();

app.get('/' ,(req,res)=>{
    res.send("this is for testing .. ")
})
const proute = require('./routes/products');
app.use('/categories', proute);


app.listen(9000 , (err)=>{
    if(err)console.log(err);
    console.log(".... Server is Working ....")
})