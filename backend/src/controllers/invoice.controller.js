const Invoice = require('../models/invoice.model');       //import employee model
const mongoose = require("mongoose");

const Order = require('../models/order.model');


const createInvoice = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const invoice = new Invoice(req.body);
        invoice.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllInvoicesDetails = async (req, res) => {       //get all employee details.
    await Invoice.find({})

    .populate('orderRef','orderRefNo',Order)

        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createInvoice,
    getAllInvoicesDetails
};