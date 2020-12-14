const express = require('express');
const Ninja = require('../models/ninja');

const router = express.Router();
//we can mount our routes on this routes handler

//get a list of nijas from the db
//no need to mention /api/ninjas
router.get('/ninjas',function(req,res,next){
    /*Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    });*/
    /*Ninja.geoNear({
        type: 'Point',
        coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]
    },{
        maxDistance: 100000,//in metres
        spherical: true
    }).then(function(ninjas){
        res.send(ninjas);
    });*/
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng),parseFloat(req.query.lat)],
        maxDistance: 1.3,
        spherical: true,
        distanceField:'dist.calculated'
    }).then(function(ninjas){
        res.send(ninjas);
    });
});
//add a new ninja to the db
router.post('/ninjas',function(req,res,next){
    //var ninja = new Ninja(req.body);
    //ninja.save();
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});
//update a ninja already in db
router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});
//delete a nija from the db
router.delete('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});

module.exports = router;