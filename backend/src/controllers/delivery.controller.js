const mongoose = require("mongoose");
const Delivery = require('../models/delivery.model');
const Order = require('../models/order.model');
const deliveryAdviceNote =require('../models/deliveryAdviceNote.model');
const Suppiler =require('../models/supplier.model');
const Items =require('../models/item.model');


const createDelivery = async (req, res) => {
    if (req.body) {
        const delivery = new Delivery(req.body);
        delivery.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllDeliveryDetails = async (req, res) => {
    await Delivery.find({})
        .populate('orderRef', 'orderRefNo', Order)
        .populate('deliveryAdviceNoteId', 'deliveryAdviceNoteId', deliveryAdviceNote)
        .populate('supplier', 'supplierName', Suppiler)
        .populate('items', 'itemId', Items)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSelectedDeliveryDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Delivery.findById(req.params.id)
            .populate('orderRef', 'orderRefNo', Order)
            .populate('deliveryAdviceNoteId', 'deliveryAdviceNoteId',deliveryAdviceNote )

            .populate('supplier', 'supplierName', Suppiler)
            .populate('items', 'itemId', Items)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteDelivery = async (req, res) => {               // delete selected Delivery.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the Delivery
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Delivery with id: ${id}`);       //validating the ServiceList id.
        await Delivery.findByIdAndRemove(id);         // remove selected Delivery details
        res.json({message: "Delivery deleted successfully."}); // success message
    }
}


module.exports = {
    createDelivery,
    getAllDeliveryDetails,
    getSelectedDeliveryDetails,
    deleteDelivery


};