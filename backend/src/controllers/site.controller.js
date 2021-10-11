const Site = require('../models/site.model');       //import employee model
const mongoose = require("mongoose");
const Employee = require('../models/employee.model');

const createSite = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const site = new Site(req.body);
        site.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllSitesDetails = async (req, res) => {       //get all employee details.
    await Site.find({})

    .populate('siteMgrId','empId empName email address salary position', Employee)

        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}



const getSelectedSiteDetails = async (req, res) => {
    if (req.params && req.params.id) {
        await Site.findById(req.params.id)
        .populate('siteMgrId','empId empName email address salary position', Employee)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const updateSelectedSiteDetails = async (req, res) => {       
    if (req.params && req.params.id){
        const {id} = req.params;        
        const site = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No site With That id');     
        const updatedSite = await Site.findByIdAndUpdate(id, site,{new : true});      
        res.json(updatedSite);
    }
}



const deleteSite = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No site with id: ${id}`);
        await Site.findByIdAndRemove(id);
        res.json({ message: "Site deleted successfully." });
    }
}



module.exports = {
    createSite,
    getAllSitesDetails,
    updateSelectedSiteDetails,
    deleteSite,
    getSelectedSiteDetails

};