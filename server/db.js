const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/frasheri', (res) => {
    if(!res){
        console.log('Connected to DB');
    }else{
        console.log('Error in DB connection : ' + JSON.stringify(res, undefined, 2));
    }
})