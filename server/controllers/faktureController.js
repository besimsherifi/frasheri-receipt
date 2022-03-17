const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;



var { Fakture } = require('../models/faktureModel');

router.get('/', (req, res) => {
    Fakture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Data :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Fakture.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/', (req,res) => {
    var faktur = new Fakture({
        counter: req.body.counter,
        addres: req.body.addres,
        serialNr: req.body.serialNr,
        date: req.body.date,
        invoiceType: req.body.invoiceType,
        products: req.body. products,
        total: req.body.total,
        totalDDV: req.body.totalDDV,
        payment: req.body.payment
    });
    faktur.save((err, doc) => {
        if(!err){res.send(doc);}
        else { console.log('Error in Data Save :' + JSON.stringify(err, undefined, 2)); }

    })

})


module.exports = router;

 