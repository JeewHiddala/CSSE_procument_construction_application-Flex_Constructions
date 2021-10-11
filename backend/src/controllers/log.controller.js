const Log = require('../models/log.model');       //import Log model
const mongoose = require("mongoose");


const createLog = async (req, res) => {       //create a Log to db.
    if (req.body) {
        const log = new Log(req.body);
        log.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getSelectedLogDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Log.findById(req.params.id)
        .populate('orderRef', 'orderRef description issueDate companyName deliveryAddress totalPrice approvalStatus orderStatus')
        .populate({ path: 'orderRef', populate: 'site supplier items' })
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getAllLogsDetails = async (req, res) => {       //get all Log details.
    await Log.find({})
        .populate('orderRef', 'orderRef description issueDate companyName deliveryAddress totalPrice approvalStatus orderStatus')
        .populate({ path: 'orderRef', populate: 'site supplier items' })
         //.populate({ path: 'items', populate: 'itemId' })
        // .populate({ path: 'orderRef', populate: 'items' })
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const updateSelectedLogDetails = async (req, res) => {       
    if (req.params && req.params.id){
        const {id} = req.params;        
        const log = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No item With That id');     
        const updatedLog = await Log.findByIdAndUpdate(id, log,{new : true});      
        res.json(updatedLog);
    }
}



const deleteLog = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No log with id: ${id}`);
        await Log.findByIdAndRemove(id);
        res.json({ message: "Logdetails deleted successfully." });
    }
}


module.exports = {
    createLog,
    getAllLogsDetails,
    updateSelectedLogDetails,
    getSelectedLogDetails,
    deleteLog



};