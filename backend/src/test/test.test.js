const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs
const paymentAPI = require('../apis/payment.api');
const logAPI = require('../apis/log.api');
const deliveryAPI = require('../apis/delivery.api');
const itemAPI = require('../apis/item.api');
const orderAPI = require('../apis/order.api');
const supplierAPI = require('../apis/supplier.api');
const employeeAPI = require('../apis/employee.api');
const siteAPI = require('../apis/site.api');
const deliveryAdviceNoteAPI = require('../apis/deliveryAdviceNote.api');
const invoiceAPI = require('../apis/invoice.api');
const goodAPI = require('../apis/good.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

//port no for run backend server
const PORT = process.env.TESTPORT || 8080;
const MONGODB_URI = process.env.TESTMONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI || '&w=majority', {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
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
    res.send('SLIIT SPM Project Test');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

//register router - CHANGEABLE.

app.use('/payment', paymentAPI());
app.use('/log', logAPI());
app.use('/delivery', deliveryAPI());
app.use('/item', itemAPI());
app.use('/order', orderAPI());      
app.use('/supplier', supplierAPI());     
app.use('/employee', employeeAPI());      
app.use('/site', siteAPI());     
app.use('/deliveryAdviceNote', deliveryAdviceNoteAPI());      
app.use('/invoice', invoiceAPI());      
app.use('/good', goodAPI());


//TestCases
//test case 01 - add payment
test('Backend Test Case 01 - Should insert a new payment', async () => {
    await request(app).post('/payment/create').send({
        payId: 498,
        date: "2021-09-24T00:00:00.000+00:00",
        price: 60000,
        description:"Visa or master card payments",
        invoiceId:"6158b524f5581d8e74c2c736",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - add log
test('Backend Test Case 02 - Should insert a new log', async () => {
    await request(app).post('/log/create').send({
        descriptions:"change to approved",
        orderRef: "6159dac4ce25f7ccbfd45158"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//test case 02 - add log
test('Backend Test Case 01 - Should insert a new delivery', async () => {
    await request(app).post('/delivery/create').send({
    deliveryId: "23435",
    deliveryDate: "2021-08-24T18:30:00.000+00:00" ,
    numOfItems: 5,
    totalPrice: 3500,
    weight: 280,
    supplier: "615aab713a408e6c619b6d53",
    orderRef: "6159dab8ce25f7ccbfd45156",
    items: ["615a3b3c46370bf2ea8b51be"],
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - add log
test('Backend Test Case 01 - Should insert a new item', async () => {
    await request(app).post('/item/create').send({
        quantity:2,
        individualTotprice:1400,
        itemId:"615a3b3c46370bf2ea8b51be0",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - add log
test('Backend Test Case 01 - Should insert a new item', async () => {
    await request(app).post('/order/create').send({
        orderRefNo:"003",
        description:"Namal Hardware",
        issueDate:"2021-05-11",
        companyName: "0775454151",
        deliveryAddress:"78,colombo 7",
        totalPrice:"158000",
        approvalStatus:"Declined",
        orderStatus:"Pending",
        site: "6158a15b61eddafb1da8c6e6",
        supplier: "61583c3ab7cf1ef72d638de5",
        items: "6158b0f2bee91146251189d4"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - add log
test('Backend Test Case 01 - Should insert a new item', async () => {
    await request(app).post('/supplier/create').send({
        supplierId:"CD-09-4572",
        supplierName:"Hasitha",
        address:"Biyagama",
        contactNo:"215546222",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//test case 02 - add log
test('Backend Test Case 01 - Should insert a new item', async () => {
    await request(app).post('/employee/create').send({
        empId:"253",
        empName:"Isira Bandara",
        email:"isira@flex.com",
        address: "85/9,Mawathagama",
        salary:"450000",
        position: "Site Manager"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - add log
test('Backend Test Case 01 - Should insert a new item', async () => {
    await request(app).post('/good/create').send({
        goodId:"54548",
        goodName:"Cement",
        description:"Polymer",
        itemPrice: "990"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//test case 02 - Update details
test('Backend Test Case 02 - Should update existing payment details ', async () => {
    await request(app).patch('/payment/update/6158b6a81b9b8448562b1144').send({
        payId: 498,
        date: "2021-09-24T00:00:00.000+00:00",
        price: 60000,
        description:"Visa or master card payments",
        invoiceId:"6158b524f5581d8e74c2c736",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


test('Backend Test Case 02 - Should update existing log details ', async () => {
    await request(app).patch('/log/update/615acb4982ce97706829b580').send({
        descriptions:"change to approved",
        orderRef: "6159dac4ce25f7ccbfd45158"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 02 - Should update existing delivery details ', async () => {
    await request(app).patch('/delivery/update/615b2c2ac5dab5e91e427045').send({
        deliveryId:73686,
        deliveryDate:"2021-10-20T00:00:00.000+00:00",
        numOfItems:5,
        totalPrice:3500,
        weight:7,
        supplier:"615ab95e3a408e6c619b6d5f",
        orderRef:"6159dc34d6f0055d45cf9c05"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 02 - Should update existing item details ', async () => {
    await request(app).patch('/item/update/615a2aac3cadc97f1eb07e62').send({
        quantity:5,
        individualTotprice:3500,
        itemId:"615a3b3c46370bf2ea8b51be"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 02 - Should update existing order details ', async () => {
    await request(app).patch('/order/update/6159da59ce25f7ccbfd45154').send({
        orderRefNo:"001",
        description:"Namal Hardware",
        issueDate:"2021-06-11T00:00:00.000+00:00",
        companyName: "AKG Holdings",
        deliveryAddress:"78,colombo 7",
        totalPrice:158000,
        approvalStatus:"Approved",
        orderStatus:"Delivered",
        site:"6158a15b61eddafb1da8c6e6",
        supplier:"615ab95e3a408e6c619b6d5f",
        items:["6158b0f2bee91146251189d4"]
        
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 02 - Should update existing supplier details ', async () => {
    await request(app).patch('/supplier/update/615aab713a408e6c619b6d53').send({
        supplierId:"002",
        supplierName:"Amal",
        address:"Colombo 7",
        contactNo:"0775454151"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


test('Backend Test Case 02 - Should update existing employee details ', async () => {
    await request(app).patch('/employee/update/61589e657a434a8a7bb0b46e').send({
        empId:251,
        empName:"Isira Bandara",
        email:"isira@flex.com",
        address:"85/9,Mawathagama",
        salary:450000,
        position:"Site Manager"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


test('Backend Test Case 02 - Should update existing good details ', async () => {
    await request(app).patch('/good/update/6158b00f482c92df01a942ee').send({
        goodId:4,
        goodName:"Cement",
        description:"4 instruments",
        itemPrice:4000
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



//test case 03 - delete  details
test('Backend Test Case 03 - Should delete existing room details ', async () => {
    await request(app).delete('/payment/6158b6a81b9b8448562b1144').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


test('Backend Test Case 03 - Should delete existing log details ', async () => {
    await request(app).delete('/log/615acb7e82ce97706829b58e').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing delivery details ', async () => {
    await request(app).delete('/delivery/615b2c2ac5dab5e91e427045').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing item details ', async () => {
    await request(app).delete('/item/615a2aac3cadc97f1eb07e62').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing order details ', async () => {
    await request(app).delete('/order/6159da59ce25f7ccbfd45154').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing supplier details ', async () => {
    await request(app).delete('/supplier/615ab95e3a408e6c619b6d5f').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing employee details ', async () => {
    await request(app).delete('/employee/61589e657a434a8a7bb0b46e').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 03 - Should delete existing good details ', async () => {
    await request(app).delete('/good/6158b00f482c92df01a942ee').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//test case 04 - get specific room details
test('Backend Test Case 04 - Should get specific payment details' , async () => {
    await request(app).get('/payment/6158b6a81b9b8448562b1144').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific log details' , async () => {
    await request(app).get('/log/615acb4982ce97706829b580').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific delivery details' , async () => {
    await request(app).get('/delivery/615b2c2ac5dab5e91e427045').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific item details' , async () => {
    await request(app).get('/item/615a2aac3cadc97f1eb07e62').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific order details' , async () => {
    await request(app).get('/order/6159da59ce25f7ccbfd45154').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific supplier details' , async () => {
    await request(app).get('/supplier/615ab95e3a408e6c619b6d5f').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific employee details' , async () => {
    await request(app).get('/employee/61589e657a434a8a7bb0b46e').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 04 - Should get specific good details' , async () => {
    await request(app).get('/good/6158b00f482c92df01a942ee').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})





//test case 14 - get all booking details
test('Backend Test Case 14 - Should get all payment details', async () => {
    await request(app).get('/payment/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all log details ', async () => {
    await request(app).get('/log/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all delivery details ', async () => {
    await request(app).get('/delivery/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all item details ', async () => {
    await request(app).get('/item/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all order details ', async () => {
    await request(app).get('/order/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all supplier details ', async () => {
    await request(app).get('/supplier/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all employee details ', async () => {
    await request(app).get('/employee/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 14 - Should get all good details ', async () => {
    await request(app).get('/good/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})










