const express = require('express')
const bodyParser = require('body-parser')
const {mongoose} = require('./db.js')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())



var fakutreContoller = require('./controllers/faktureController.js');

app.use('/faktura', fakutreContoller);




app.listen(3000, () => console.log('Server started succesfuly'));


