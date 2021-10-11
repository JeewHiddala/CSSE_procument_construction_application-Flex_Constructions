const Good = require('../models/good.model');       //import Good model
const mongoose = require("mongoose");


const createGood = async (req, res) => {       //create a Good to db.
    if (req.body) {
        const good = new Good(req.body);
        good.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllGoodsDetails = async (req, res) => {       //get all Good details.
    await Good.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


    
const getSelectedGoodDetails = async (req, res) => {          //get selected Good details.
    if (req.params && req.params.id) {
        await Good.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSearchedGoodDetailsById = async (req, res) => {          //get selected search details. //search
    var goodName = req.params.supplierName;
    await Good.findOne({goodName: goodName})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteGood = async (req, res) => {               // delete selected good.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the good
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No good with id: ${id}`);       //validating the good id.
        await Good.findByIdAndRemove(id);         // find good and remove good.
        res.json({message: "Good deleted successfully."});
    }
}

const updateSelectedGoodDetails = async (req, res) => {       //update selected good
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the good.
        const good = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No good With That id');      // validating the good id
        const updatedGood = await Good.findByIdAndUpdate(id, good,{new : true});      // find good and good editor
        res.json(updatedGood);
    }
}

module.exports = {
    createGood,
    getAllGoodsDetails,
    getSelectedGoodDetails,
    getSearchedGoodDetailsById,
    deleteGood,
    updateSelectedGoodDetails  

};