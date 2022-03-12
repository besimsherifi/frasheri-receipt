const mongoose = require('mongoose');

var FaktureSchema = new mongoose.Schema({
    addres: {type: String},
    serialNr: {type: String},
    date: {type: String},
    invoiceType: {type: String},
    products: [{
        nr:{type: String},
        description:{type: String},
        msrUnit:{type: String},
        quantity:{type: Number},
        price:{type: Number},
        ddv:{type: Number},
        priceWithoutDDV:{type: Number},
        priceWithDDV:{type: Number},
    }],
    total: {type: Number},
    totalDDV: {type: Number},
    payment: {type: Number}
})


var Fakture = mongoose.model('Fakture', FaktureSchema);



module.exports = { Fakture }