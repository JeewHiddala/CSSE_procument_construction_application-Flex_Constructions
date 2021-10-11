const mongoose = require("mongoose");
const Item = require('../models/item.model');
const Good = require('../models/good.model');

const createItem = async (req, res) => {
    if (req.body) {
        const item = new Item(req.body);
        item.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllItemDetails = async (req, res) => {

    await Item.find({}).populate('itemId','goodId goodName itemPrice', Good)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedItemDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Item.findById(req.params.id).populate('itemId','goodId goodName itemPrice', Good)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getGoodsInItem = async (req, res) => {       //get all Ingredient details.
    
    var orderRefNo = req.params.orderRefNo;
    console.log(orderRefNo);

    await Item.find({ orderRefNo: orderRefNo })
    .populate('itemId','goodName', Good)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const updateSelectedItemDetails = async (req, res) => {       
    if (req.params && req.params.id){
        const {id} = req.params;        
        const item = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No item With That id');     
        const updatedItem = await Item.findByIdAndUpdate(id, item,{new : true});      
        res.json(updatedItem);
    }
}



const deleteItem = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
        await Item.findByIdAndRemove(id);
        res.json({ message: "Item deleted successfully." });
    }
}


module.exports = {
    createItem,
    getAllItemDetails,
    getGoodsInItem,
    updateSelectedItemDetails,
    deleteItem,
    getSelectedItemDetails

};