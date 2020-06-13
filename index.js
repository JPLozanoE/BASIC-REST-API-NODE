const myApp = require('./myApp');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGOLAB_URI;
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// set up express app

const app = express();

app.use(express.static('./public'));
// const MongoClient = require('mongodb').MongoClient;
const uri = url;
mongoose.connect(uri,{useCreateIndex: true,useUnifiedTopology: true,useNewUrlParser: true});

// mongoose.Promise = global.Promise;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(express.json());
//Initialize routes
app.use('/api',require('./routes/api'));

// Error handling middleware
app.use((err,req,res,next)=>{
    // console.log(err);
    res.status(422).send({error:err.message});
});
    // app.get('/api',(req,res)=>{
    //     console.log('GET request');
    //     res.send({nombre:'Pablo'});
    // });

app.listen(process.env.PORT || 5000,()=>{
    console.log('Now listening for requests');
});



// bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
//   bGround.log('Node is listening on port '+ port + '...')
// });