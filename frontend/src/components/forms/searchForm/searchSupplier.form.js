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

class SearchSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;      //apply states.
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.navigateEditSupplierPage = this.navigateEditSupplierPage.bind(this);        //navigate to edit page
    this.deleteSupplier = this.deleteSupplier.bind(this);         //delete supplier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

  componentDidMount() {
    const searchSupplierdetails = this.props.match.params.id;
    console.log("rrrr" + searchSupplierdetails);
    axios.get(`http://localhost:8300/supplier/search/${searchSupplierdetails}`)
      .then(response => {
        this.setState({ id: response.data.data._id })
        this.setState({ supplierId: response.data.data.supplierId })
        this.setState({ supplierName: response.data.data.supplierName })
        this.setState({ address: response.data.data.address })
        this.setState({ contactNo: response.data.data.contactNo })
        console.log("stat"+response.data.data)
      })
      .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry. There is no data according to this Supplier Name!',
            footer: '<a href="/suppliers"/>'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '/suppliers'
                }

            })
    })

  }

back(e) {                                                                  //back
    window.location = '/suppliers'
}

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  navigateEditSupplierPage(e, supplierId) {       //navigate to edit page
    window.location = `/editSuppliers/${supplierId}`
    }

    deleteSupplier(e , supplierId) {
        console.log("I am on Delete", supplierId)
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
                axios.delete(`http://localhost:8300/supplier/${supplierId}`)
                Swal.fire(
                    'Deleted!',
                    'Supplier has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/suppliers'
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
                    <a href="/suppliers" className="breadcrumb">
                      <b>Supplier Management</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Search Supplier</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="col">
                                        <br/>
                                        <h4 className="topic"><b>Searched Supplier Details</b></h4>
                                    </div>
                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="col">
                                            <label htmlFor="supplierId" className="form-label sub-topic">Supplier ID</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier ID"
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
                                                readOnly
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
                                                readOnly
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
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Supplier Contact Number"
                                                id="contactNo"
                                                name="contactNo"    //give state name
                                                pattern="+[0-9]{2}-[0-9]{9}"
                                                required
                                                value={this.state.contactNo}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateEditSupplierPage(e, this.state.id)}>Edit</button>
                                                    <button type="button" id="button" className="btn btn-danger" onClick={e => this.deleteSupplier(e, this.state.id)}>Delete</button>
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

export default SearchSupplier;
