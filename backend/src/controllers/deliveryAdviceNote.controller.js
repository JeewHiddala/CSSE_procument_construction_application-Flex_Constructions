
const deliveryAdviceNote = require('../models/deliveryAdviceNote.model');       //import employee model
const mongoose = require("mongoose");
const Order = require('../models/order.model');

const createdeliveryAdviceNote = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const deliveryAdNote = new deliveryAdviceNote(req.body);
        deliveryAdNote.save()

            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getAlldeliveryAdviceNotesDetails = async (req, res) => {       //get all employee details.
    await deliveryAdviceNote.find({})
    .populate('orderRef','orderRefNo',Order)

        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelecteddeliveryAdviceNoteDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await DeliveryAdviceNote.findById(req.params.id).populate('orders','')
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}



module.exports = {
  
    createdeliveryAdviceNote,
    getAlldeliveryAdviceNotesDetails,
    getSelecteddeliveryAdviceNoteDetails

};