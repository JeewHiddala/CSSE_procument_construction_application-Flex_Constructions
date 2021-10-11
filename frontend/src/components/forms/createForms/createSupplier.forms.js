import React, { Component } from "react";
import axios from "axios";
import "../../css/styles.css";
import Swal from "sweetalert2";
// import moment from 'moment';

const initialState = {      //initiate states
    supplierId: '',
    supplierName: '',
    address: '',
    contactNo: ''
}

class CreateSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;      //apply states.
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.lier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

back(e) {                                                                  //back
    window.location = '/suppliers'
}

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {      //submit details
    e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
    let supplier = {
        supplierId: this.state.supplierId,
        supplierName: this.state.supplierName,
        address: this.state.address,
        contactNo: this.state.contactNo
    }
    console.log('DATA TO SEND', supplier);    
    axios.post('http://localhost:8300/supplier/create', supplier)
        .then(response => {
            // alert('Service Data successfully inserted')
            this.setState({ 
                supplierId: '',
                supplierName: '',
                address: '',
                contactNo: ''
             })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Supplier details has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
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
                    <a href="/suppliers" className="breadcrumb">
                      <b>Supplier Management</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Create Supplier</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="col-4">
                                        <br/>
                                        <h4 className="topic"><b>Add new Supplier</b></h4>
                                    </div>
                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="col">
                                            <label htmlFor="supplierId" className="form-label sub-topic">Supplier Identity Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier Identity Number"
                                                id="supplierId"
                                                name="supplierId"    //give state name
                                                pattern="[A-Z]{2}-[0-9]{2}-[0-9]{4}"
                                                required
                                                value={this.state.supplierId}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="supplierName" className="form-label sub-topic">Supplier Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier Name"
                                                id="supplierName"
                                                name="supplierName"    //give state name
                                                required
                                                value={this.state.supplierName}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="address" className="form-label sub-topic">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier Address"
                                                id="address"
                                                name="address"    //give state name
                                                required
                                                value={this.state.address}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="contactNo" className="form-label sub-topic">Contact Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier Contact Number"
                                                id="contactNo"
                                                name="contactNo"    //give state name
                                                pattern="+[0-9]{11}"
                                                required
                                                value={this.state.contactNo}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {/* <button type="button" id="button" className="btn btn-info" > Clear</button> */}
                                                </div>
                                                <div className="col mb-3">
                                                    <button type="submit" id="button" className="btn btn-success float-end">Submit</button>
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

export default CreateSupplier;