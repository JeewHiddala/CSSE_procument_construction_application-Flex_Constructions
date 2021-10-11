import React, { Component } from "react";
import axios from "axios";
import "../../css/styles.css";
import Swal from "sweetalert2";
// import moment from 'moment';

const initialState = {      //initiate states
    goodId: 0,
    goodName: '',
    description: '',
    itemPrice: 0
}

class CreateGood extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;      //apply states.
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.lier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

back(e) {                                                                  //back
    window.location = '/goods'
}

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {      //submit details
    e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
    let good = {
        goodId: this.state.goodId,
        goodName: this.state.goodName,
        description: this.state.description,
        itemPrice: this.state.itemPrice
    }
    console.log('DATA TO SEND', good);    
    axios.post('http://localhost:8300/good/create', good)
        .then(response => {
            console.log("res",good)
            // alert('Service Data successfully inserted')
            this.setState({ 
                goodId: '',
                goodName: '',
                description: '',
                itemPrice: ''
             })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Good details has been saved',
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
                    <a href="/goods" className="breadcrumb">
                      <b>Goods Management</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Create Goods</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="col-4">
                                        <br/>
                                        <h4 className="topic"><b>Add new Good</b></h4>
                                    </div>
                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="col">
                                            <label htmlFor="goodId" className="form-label sub-topic">Good Identity Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Good Identity Number"
                                                id="goodId"
                                                name="goodId"    //give state name
                                                pattern="[0-9]{5}"
                                                required
                                                value={this.state.goodId}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="goodName" className="form-label sub-topic">Good Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Good Name"
                                                id="goodName"
                                                name="goodName"    //give state name
                                                required
                                                value={this.state.goodName}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="description" className="form-label sub-topic">Description</label>
                                            <textarea
                                                className="form-control"
                                                placeholder = "Enter Good Description"
                                                id="description"
                                                name="description"    //give state name
                                                maxLength="100"
                                                value={this.state.description}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div><br/>
                                        <div className="col">
                                            <label htmlFor="itemPrice" className="form-label sub-topic">Item Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Good Item Price"
                                                id="itemPrice"
                                                name="itemPrice"    //give state name
                                                step="0.01"
                                                required
                                                value={this.state.itemPrice}      //bind state value
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

export default CreateGood;