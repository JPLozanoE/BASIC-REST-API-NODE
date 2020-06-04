const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

    // app.get('/api',(req,res)=>{
    //     console.log('GET request');
    //     res.send({nombre:'Pablo'});
    // });

    //Get a list of ninjas from the db
    router.get('/ninjas',(req,res,next)=>{
        // res.send({type:'GET'});
        // Ninja.find({}).
        // then(
        //     ninjas=>{
        //         res.send(ninjas);
        //     }
        // );
        Ninja.aggregate()
        .near({
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
          },
          maxDistance: 100000, // 300 KM
          spherical: true,
          distanceField: "distance"
        })
        .then(ninjas => {
          console.log(ninjas);
          if (ninjas) {
            if (ninjas.length === 0)
              return res.send({
                message:
                  "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
              });
            return res.send(ninjas);
          }
        })
        .catch(next);
    });

    //Add a new ninja to the db
    router.post('/ninjas',(req,res,next)=>{
        // Método create guarda en la BD
        Ninja.create(req.body).then(
            (ninja)=>{
                res.send(ninja);
            }).catch(next);
    });

    //Update a ninja in the db
    router.put('/ninjas/:id',(req,res,next)=>{
        Ninja.findByIdAndUpdate({_id:req.params.id},req.body,{ new: true, useFindAndModify: false })
        .then(()=>{
            Ninja.findOne({_id:req.params.id}).then(ninja=>{
            res.send(ninja);
            });
        });
    });

    //Delete a ninja from the db
    router.delete('/ninjas/:id',(req,res,next)=>{
        Ninja.findOneAndDelete({_id:req.params.id})
        .then(ninja=>{
            res.send(ninja);
        });
    });

module.exports = router;