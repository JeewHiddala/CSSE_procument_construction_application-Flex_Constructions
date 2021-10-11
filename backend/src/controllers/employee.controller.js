const Employee = require('../models/employee.model');       //import employee model
const mongoose = require("mongoose");

const createEmployee = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const employee = new Employee(req.body);
        employee.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllEmployeesDetails = async (req, res) => {       //get all employee details.
    await Employee.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedEmployeeDetails = async (req, res) => {          //get selected Good details.
    if (req.params && req.params.id) {
        await Employee.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSearchedEmployeeDetailsById = async (req, res) => {          //get selected search details. //search
    var empId = req.params.empId;
    await Employee.findOne({empId: empId})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteEmployee = async (req, res) => {               // delete selected good.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the good
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);       //validating the good id.
        await Employee.findByIdAndRemove(id);         // find good and remove good.
        res.json({message: "Good deleted successfully."});
    }
}

const updateSelectedEmployeeDetails = async (req, res) => {       //update selected good
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the good.
        const employee = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No employee With That id');      // validating the good id
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employee,{new : true});      // find good and good editor
        res.json(updatedEmployee);
    }
}

module.exports = {
    createEmployee,
    getAllEmployeesDetails,
    getSelectedEmployeeDetails,
    getSearchedEmployeeDetailsById,
    updateSelectedEmployeeDetails,
    deleteEmployee
};