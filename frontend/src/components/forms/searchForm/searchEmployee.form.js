import React, { Component } from "react";
import axios from "axios";
import "../../css/styles.css";
import Swal from "sweetalert2";
// import moment from 'moment';

const initialState = {      //initiate states
    empId: 0,
    empName: '',
    email: '',
    address: '',
    salary: 0,
    position: ''
}

class SearchEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;      //apply states.
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.navigateEditEmployeePage = this.navigateEditEmployeePage.bind(this);        //navigate to edit page
    this.deleteEmployee = this.deleteEmployee.bind(this);         //delete supplier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

  componentDidMount() {
    const searchEmployeedetails = this.props.match.params.id;
    console.log("rrrr" + searchEmployeedetails);
    axios.get(`http://localhost:8300/employee/search/${searchEmployeedetails}`)
      .then(response => {
        this.setState({ id: response.data.data._id })
        this.setState({ empId: response.data.data.empId })
        this.setState({ empName: response.data.data.empName })
        this.setState({ email: response.data.data.email })
        this.setState({ address: response.data.data.address })
        this.setState({ salary: response.data.data.salary })
        this.setState({ position: response.data.data.position })
        console.log("stat"+response.data.data)
      })
      .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry. There is no data according to this Employee Identity Number!',
            footer: '<a href="/employees"/>'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '/employees'
                }

            })
    })

  }

back(e) {            //back
    window.location = '/employees'
}

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  navigateEditEmployeePage(e, goodId) {       //navigate to edit page
    window.location = `/editEmployees/${goodId}`
    }

    deleteEmployee(e , employeeId) {
        console.log("I am on Delete", employeeId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8300/employee/${employeeId}`)
                Swal.fire(
                    'Deleted!',
                    'Employee has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/employees'
                    }
                })
            }
        })
    }

  render() {
    //use to return things when call createSubject component.
    return (
      <div className="container-fluid">
        <div className="row align-items-start align-items-stretch">
          <div className="col-2" id="partition">
            <h1 className="display-4" id="web-title">
              Flex
            </h1>
            <h6 className="text-center" id="web-title1">
              &ensp;Constructions.....
            </h6>
            <br />
            <ul className="list-group" id="dash-list">
              <li className="list-group-item border-0" id="dash-item">
                <a href="/categoryDashboard-GM" className="dash-item">
                  Dashboard
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/orders" className="dash-item">
                  Order
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/delivery-dashboard" className="dash-item">
                  Delivery
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/" className="dash-item">
                  Approval
                </a>
              </li>
            </ul>
          </div>
          <div className="col-9" id="partition1">
            <div className="row" id="header">
              <div className="col align-self-stretch">
                <button
                  className="btn btn-primary position-absolute top-0 end-0"
                  id="signout"
                  type="submit"
                >
                  Sign Out
                </button>
                <br />
                <br />
              </div>
              <br />
              <br />
            </div>

            <div className="container align-self-stretch" id="content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item" id="">
                    <a href="/categoryDashboard-GM" className="breadcrumb">
                      <b>Dashboard</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item" id="">
                    <a href="/employees" className="breadcrumb">
                      <b>Employee Management</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Search Employee</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="col">
                                        <br/>
                                        <h4 className="topic"><b>Searched Employee Details</b></h4>
                                    </div>
                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                    <div className="col">
                                            <label htmlFor="empId" className="form-label sub-topic">Employee Identity Number</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Employee Identity Number"
                                                id="empId"
                                                name="empId"    //give state name
                                                pattern="[0-9]{6}"
                                                value={this.state.empId}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="empName" className="form-label sub-topic">Employee Name</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Employee Name"
                                                id="empName"
                                                name="empName"    //give state name
                                                required
                                                value={this.state.empName}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="description" className="form-label sub-topic">Email</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter email"
                                                id="email"
                                                name="email"    //give state name
                                                pattern=".+@flex\.com"
                                                value={this.state.email}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="itemPrice" className="form-label sub-topic">Address</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter employee address"
                                                id="address"
                                                name="address"    //give state name
                                                required
                                                value={this.state.address}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="row">
                                        <div className="col">
                                            <label htmlFor="salary" className="form-label sub-topic">Salary</label>
                                            <input
                                                readOnly
                                                type="number"
                                                className="form-control"
                                                placeholder = "Enter employee salary"
                                                id="salary"
                                                name="salary"    //give state name
                                                step="0.01"
                                                required
                                                value={this.state.salary}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="position" className="form-label sub-topic">Position</label>
                                            <select className="form-select" aria-label="Default select example"
                                                        onChange={this.onChange}
                                                        value={this.state.position}
                                                        name="position"
                                                        readOnly
                                                    >
                                                        <option selected>Open this select position</option>
                                                        <option value="General Manager">General Manager</option>
                                                        <option value="Line Manager">Line Manager</option>
                                                        <option value="Site Manager">Site Manager</option>
                                                        <option value="Supervicer">Supervicer</option>
                                                        <option value="Goods Receiver">Goods Receiver</option>
                                                    </select>
                                        </div>
                                        </div>
                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateEditEmployeePage(e, this.state.id)}>Edit</button>
                                                    <button type="button" id="button" className="btn btn-danger" onClick={e => this.deleteEmployee(e, this.state.id)}>Delete</button>
                                                </div>
                                            </div>
                                    </form>
                                </div>
                                </div>
                            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchEmployee;