const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');   

//import APIs
const paymentAPI = require('./src/apis/payment.api');
const logAPI = require('./src/apis/log.api');
const deliveryAPI = require('./src/apis/delivery.api');
const itemAPI = require('./src/apis/item.api');
const orderAPI = require('./src/apis/order.api');
const supplierAPI = require('./src/apis/supplier.api');
const employeeAPI = require('./src/apis/employee.api');
const siteAPI = require('./src/apis/site.api');
const deliveryAdviceNoteAPI = require('./src/apis/deliveryAdviceNote.api');
const invoiceAPI = require('./src/apis/invoice.api');
const goodAPI = require('./src/apis/good.api');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//port no for run backend server
const PORT = process.env.PORT || 8066;
const MONGODB_URI = process.env.MONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI, {
//   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
//   useFindAndModify: false
}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

//open connection
mongoose.connection.once('open', () => {
  console.log('Database Synced');
});

//root route
app.route('/').get((req, res) => {
  res.send('SLIIT CSSE PROJECT API BY SE2021 BATCH');
});

//register router - CHANGEABLE


app.use('/payment', paymentAPI());
app.use('/log', logAPI());
app.use('/delivery', deliveryAPI());
app.use('/item', itemAPI());
app.use('/order', orderAPI());      //IT19007502
app.use('/supplier', supplierAPI());      //IT19007502
app.use('/employee', employeeAPI());      //IT19007502
app.use('/site', siteAPI());      //IT19007502
app.use('/deliveryAdviceNote', deliveryAdviceNoteAPI());      //IT19007502
app.use('/invoice', invoiceAPI());      //IT19007502
app.use('/good', goodAPI());
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});