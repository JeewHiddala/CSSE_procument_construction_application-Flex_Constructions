const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const EmployeeSchema = new mongoose.Schema({       //make schema
  empId: { type: Number, required: true },
  empName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  salary: { type: Number, required: true },
  position: { type: String, required: true, trim: true }
});

EmployeeSchema.plugin(mongoosePaginate);
const Employee = mongoose.model('employees', EmployeeSchema);       //give name for collection
module.exports = Employee;