const Supplier = require('../models/supplier.model');       //import employee model
const mongoose = require("mongoose");

const createSupplier = async (req, res) => {       //create a supplier to db.
    if (req.body) {
        const supplier = new Supplier(req.body);
        supplier.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// const getAllSupplierDetails = async (req, res) => {       //get all supplier details.
//     let page = req.query.page; 
//     const options = {
//         page: page,
//         limit: 5
//       }
//     await Supplier.paginate({},options)         //pagination
//         .then(data => {
//             res.status(200).send({ data: data });
//         })
//         .catch(error => {
//             res.status(500).send({ error: error.message });
//         });
// }

const getAllSupplierDetails = async (req, res) => {     //get all supplier details.
    await Supplier.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedSupplierDetails = async (req, res) => {          //get selected supplier details.
    if (req.params && req.params.id) {
        await Supplier.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSearchedSupplierDetailsById = async (req, res) => {          //get selected search details. //search
    var supplierName = req.params.supplierName;
    await Supplier.findOne({supplierName: supplierName})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteSupplier = async (req, res) => {               // delete selected service.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the service
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No supplier with id: ${id}`);       //validating the service id.
        await Supplier.findByIdAndRemove(id);         // find service and remove service.
        res.json({message: "Service deleted successfully."});
    }
}

const updateSelectedSupplierDetails = async (req, res) => {       //update selected service
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the service.
        const supplier = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No supplier With That id');      // validating the service id
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplier,{new : true});      // find service and service editor
        res.json(updatedSupplier);
    }
}

module.exports = {
    createSupplier,
    getAllSupplierDetails,
    getSearchedSupplierDetailsById,
    getSelectedSupplierDetails,
    updateSelectedSupplierDetails,
    deleteSupplier
};