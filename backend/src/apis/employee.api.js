const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

module.exports = function () {
    router.post('/create', employeeController.createEmployee);        // create employees.
    router.get('/', employeeController.getAllEmployeesDetails);       //get all employees.
    router.get('/search/:empId', employeeController.getSearchedEmployeeDetailsById);  // get search employees details using employees id.
    router.patch('/update/:id', employeeController.updateSelectedEmployeeDetails); //update selected employees details.
    router.get('/:id', employeeController.getSelectedEmployeeDetails);       //get selected employees details.
    router.delete('/:id', employeeController.deleteEmployee);         //delete selected employees details.
    return router;
}