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

//Object ids
let paymentTest = "";
let goodTest = "";
let logTest = "";
let deliveryTest = "";
let itemTest = "";
let orderTest = "";
let supplierTest = "";
let employeeTest = "";

//TestCases
//test case 01 - add details -8
//test case 01 - add payment
test('Backend Test Case 01 - Should insert a new payment', async () => {
    await request(app).post('/payment/create').send({
        payId: 498,
        date: "2021-09-24T00:00:00.000+00:00",
        price: 60000,
        description:"Visa or master card payments",
        invoiceId:"6162b2b2fff9f99515c181e3",
    }).expect(200).then((res) => {
        paymentTest = res.body.data["_id"];
    });
})

//test case 02 - add log
test('Backend Test Case 02 - Should insert a new log', async () => {
    await request(app).post('/log/create').send({
        descriptions:"change to approved",
        orderRef: "6162a7ab3078af8b2b3ac504"
    }).expect(200).then((res) => {
        logTest = res.body.data["_id"];
    });
})


// //test case 03 - add delivery
test('Backend Test Case 03 - Should insert a new delivery', async () => {
    await request(app).post('/delivery/create').send({
    deliveryId: "23435",
    deliveryDate: "2021-08-24T18:30:00.000+00:00" ,
    numOfItems: 5,
    totalPrice: 3500,
    weight: 280,
    supplier: "6162a7ab3078af8b2b3ac506",
    orderRef: "6162a7ab3078af8b2b3ac504",
    items: ["615a3b3c46370bf2ea8b51be"],
    }).expect(200).then((res) => {
        deliveryTest = res.body.data["_id"];
    });
})

// //test case 04 - add item
test('Backend Test Case 04 - Should insert a new item', async () => {
    await request(app).post('/item/create').send({
        quantity:2,
        individualTotprice:1400,
        itemId:"6162b16234f3ff3e957d29a6",
    }).expect(200).then((res) => {
        itemTest = res.body.data["_id"];
    });
})

// //test case 05 - add order
test('Backend Test Case 05 - Should insert a new order', async () => {
    await request(app).post('/order/create').send({
        orderRefNo:"003",
        description:"Namal Hardware",
        issueDate:"2021-05-11",
        companyName: "0775454151",
        deliveryAddress:"78,colombo 7",
        totalPrice:"158000",
        approvalStatus:"Declined",
        orderStatus:"Pending",
        site: "6162b739fff9f99515c181ff",
        supplier: "6162a7ab3078af8b2b3ac506",
        items: ["6162b5d246d3654b39c0a815"]
    }).expect(200).then((res) => {
        orderTest = res.body.data["_id"];
    });
})

// //test case 06 - add supplier
test('Backend Test Case 06 - Should insert a new supplier', async () => {
    await request(app).post('/supplier/create').send({
        supplierId:"CD-09-4572",
        supplierName:"Hasitha",
        address:"Biyagama",
        contactNo:"215546222",
    }).expect(200).then((res) => {
        supplierTest = res.body.data["_id"];
    });
})


// //test case 07 - add employee
test('Backend Test Case 07 - Should insert a new employee', async () => {
    await request(app).post('/employee/create').send({
        empId:"253",
        empName:"Isira Bandara",
        email:"isira@flex.com",
        address: "85/9,Mawathagama",
        salary:"450000",
        position: "Site Manager"
    }).expect(200).then((res) => {
        employeeTest = res.body.data["_id"];
    });
})

// //test case 08 - add log
test('Backend Test Case 08 - Should insert a new good', async () => {
    await request(app).post('/good/create').send({
        goodId:"54548",
        goodName:"Cement",
        description:"Polymer",
        itemPrice: "990"
    }).expect(200).then((res) => {
        goodTest = res.body.data["_id"];
    });
})


//test case 02 - Update details -8
// test('Backend Test Case 02 - Should update existing payment details ', async () => {
//     await request(app).patch(`/payment/update/${paymentTest}`).send({
//         payId: 49,
//         date: "2021-09-24T00:00:00.000+00:00",
//         price: 50000,
//         description:"Visa or master card payments",
//         invoiceId:"6162b2b2fff9f99515c181e3",
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })


test('Backend Test Case 09 - Should update existing log details ', async () => {
    await request(app).patch(`/log/update/${logTest}`).send({
        descriptions:"change to approved",
        orderRef: "6159dac4ce25f7ccbfd45158"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



// test('Backend Test Case 02 - Should update existing delivery details ', async () => {
//     await request(app).patch(`/delivery/update/${deliveryTest}`).send({
//         deliveryId:73686,
//         deliveryDate:"2021-10-20T00:00:00.000+00:00",
//         numOfItems:5,
//         totalPrice:3500,
//         weight:10,
//         supplier:"6162a7ab3078af8b2b3ac506",
//         orderRef:"6162a7ab3078af8b2b3ac504"
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })



test('Backend Test Case 10 - Should update existing item details ', async () => {
    await request(app).patch(`/item/update/${itemTest}`).send({
        quantity:5,
        individualTotprice:3500,
        itemId:"6162b16234f3ff3e957d29a6"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 11 - Should update existing order details ', async () => {
    await request(app).patch(`/order/update/${orderTest}`).send({
        orderRefNo:"001",
        description:"Namal Hardware",
        issueDate:"2021-06-11T00:00:00.000+00:00",
        companyName: "AKG Holdings",
        deliveryAddress:"78,colombo 7",
        totalPrice:158000,
        approvalStatus:"Approved",
        orderStatus:"Delivered",
        site:"6162b739fff9f99515c181ff",
        supplier:"6162a7ab3078af8b2b3ac506",
        items:["615a3b3c46370bf2ea8b51be"]
        
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})



test('Backend Test Case 12 - Should update existing supplier details ', async () => {
    await request(app).patch(`/supplier/update/${supplierTest}`).send({
        supplierId:"002",
        supplierName:"Amal",
        address:"Colombo 7",
        contactNo:"0775454151"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


test('Backend Test Case 13 - Should update existing employee details ', async () => {
    await request(app).patch(`/employee/update/${employeeTest}`).send({
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


test('Backend Test Case 14 - Should update existing good details ', async () => {
    await request(app).patch(`/good/update/${goodTest}`).send({
        goodId:4,
        goodName:"Bricks",
        description:"4 instruments",
        itemPrice:4000
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

// //test case 03 - get specific details -8
// test('Backend Test Case 03 - Should get specific payment details' , async () => {
//     await request(app).get(`/payment/${paymentTest}`).send({
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

test('Backend Test Case 15 - Should get specific log details' , async () => {
    await request(app).get(`/log/${logTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 16 - Should get specific delivery details' , async () => {
    await request(app).get(`/delivery/${deliveryTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 17 - Should get specific item details' , async () => {
    await request(app).get(`/item/${itemTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 18 - Should get specific order details' , async () => {
    await request(app).get(`/order/${orderTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 19 - Should get specific supplier details' , async () => {
    await request(app).get(`/supplier/${supplierTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 20 - Should get specific employee details' , async () => {
    await request(app).get(`/employee/${employeeTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 21 - Should get specific good details' , async () => {
    await request(app).get(`/good/${goodTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 04 - get all  details -8
test('Backend Test Case 22 - Should get all payment details', async () => {
    await request(app).get('/payment/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 23 - Should get all log details ', async () => {
    await request(app).get('/log/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 24 - Should get all delivery details ', async () => {
    await request(app).get('/delivery/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 25 - Should get all item details ', async () => {
    await request(app).get('/item/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 26 - Should get all order details ', async () => {
    await request(app).get('/order/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 27 - Should get all supplier details ', async () => {
    await request(app).get('/supplier/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 28 - Should get all employee details ', async () => {
    await request(app).get('/employee/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 29 - Should get all good details ', async () => {
    await request(app).get('/good/').send({  
    }).expect(200).then((res) => {
        id = res.body;
        console.log(id);
    });
})

// //test case 05 - delete  details -8
// test('Backend Test Case 05 - Should delete existing payment details ', async () => {
//     await request(app).delete(`/payment/${paymentTest}`).send({
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })


test('Backend Test Case 30 - Should delete existing log details ', async () => {
    await request(app).delete(`/log/${logTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 31 - Should delete existing delivery details ', async () => {
    await request(app).delete(`/delivery/${deliveryTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 32 - Should delete existing item details ', async () => {
    await request(app).delete(`/item/${itemTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

// test('Backend Test Case 05 - Should delete existing order details ', async () => {
//     await request(app).delete(`/order/${orderTest}`).send({
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

test('Backend Test Case 33 - Should delete existing supplier details ', async () => {
    await request(app).delete(`/supplier/${supplierTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 34 - Should delete existing employee details ', async () => {
    await request(app).delete(`/employee/${employeeTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

test('Backend Test Case 35 - Should delete existing good details ', async () => {
    await request(app).delete(`/good/${goodTest}`).send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})












