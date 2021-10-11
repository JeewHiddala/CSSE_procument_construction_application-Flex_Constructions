const Payment = require('../models/payment.model');       //import Payment model
const mongoose = require("mongoose");


const createPayment = async (req, res) => {       //create a Payment to db.
    if (req.body) {
        const payment = new Payment(req.body);
        payment.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllPaymentsDetails = async (req, res) => {       //get all Payment details.
    await Payment.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


module.exports = {
    createPayment,
    getAllPaymentsDetails
    
};