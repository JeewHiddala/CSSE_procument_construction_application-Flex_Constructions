const Order = require('../models/order.model');       //import employee model
const mongoose = require("mongoose");
const Site = require('../models/site.model');
const Supplier = require('../models/supplier.model');
const Item = require('../models/item.model');
const Good = require('../models/good.model');


const createOrder = async (req, res) => {       //create a order to db.
    if (req.body) {
        const order = new Order(req.body);
        order.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllOrderDetails = async (req, res) => {       //get all order details.

    await Order.find({})
        .populate('site','location siteNo',Site)
        .populate('supplier','supplierName',Supplier)
        .populate('items','itemId individualTotprice quantity',Item)

        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getSelectedOrderDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Order.findById(req.params.id)
            .populate('site', 'location', Site)
            .populate('supplier', 'supplierName', Supplier)
            .populate('items', 'itemId quantity individualTotprice', Item)

            .populate({ path: 'items', populate: 'itemId' })
            .then(data => {
                res.status(200).send({ data: data });

            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getSearchedOrderDetails = async (req, res) => {          //get selected search details. //search
    var approvalStatus = req.query.approvalStatus;
    var dateFrom = req.query.dateFrom;
    var dateTo = req.query.dateTo;
    // console.log("Haj",approvalStatus);
    await Order.find({approvalStatus: {$in:approvalStatus}, issueDate:{"$gte": new Date(dateFrom),"$lt": new Date(dateTo)}})
        .populate('site','siteNo',Site)
        .populate('supplier','supplierName',Supplier)
        .populate('items','itemId',Item)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSearchedOrderDetailsWithoutDateRange = async (req, res) => {          //get selected search details. //search
    var approvalStatus = req.query.approvalStatus;
    // console.log("Haj",approvalStatus);
    await Order.find({approvalStatus: {$in:approvalStatus}})
        .populate('site','siteNo',Site)
        .populate('supplier','supplierName',Supplier)
        .populate('items','itemId',Item)
       
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const calculateCount = async (req, res) => {
    if (req.params && req.params.id) {
      const order = await Order.findById(req.params.id).populate('items', 'quantity')
      let NumPieces = 0;
      if (order.items.length > 0) {
        order.items.map((item) => {
            NumPieces += (item.quantity); 

        });
      }
      res.status(200).send({ NumPieces: NumPieces });
   }
  }



  const updateSelectedOrderDetails = async (req, res) => {       //update selected foodoreder
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the foodorder.
        const order = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No order With That id');      // validating the id
        const updatedorder = await Order.findByIdAndUpdate(id, order,{new : true});      // find room 
        res.json(updatedorder);
    }
}


module.exports = {
    createOrder,
    getAllOrderDetails,
    getSearchedOrderDetails,
    getSearchedOrderDetailsWithoutDateRange,
    getSelectedOrderDetails,
    calculateCount,
    updateSelectedOrderDetails
 
 

};