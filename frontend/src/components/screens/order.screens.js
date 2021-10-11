import React, { Component } from "react";
import axios from "axios";
import "../css/styles.css";
import moment from 'moment';

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {              //initialization
      approvalStatus: [],
      dateFrom: "",
      dateTo: "",
      orders: [],
      isClicked: false
    };
    this.onChange = this.onChange.bind(this); //bind onChange function.
    // this.onSubmit = this.onSubmit.bind(this); //bind onSubmit function.
    this.navigateSearchOrderPage = this.navigateSearchOrderPage.bind(this);
    this.fetchOrdersDetails = this.fetchOrdersDetails.bind(this);
    this.navigateViewOrderPage = this.navigateViewOrderPage.bind(this);
    this.navigateOrderReportPage = this.navigateOrderReportPage.bind(this);
    this.getBadgeClasses = this.getBadgeClasses.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);                //handle checkbox values 
    this.refresh = this.refresh.bind(this);                //handle checkbox values 
  }

  componentDidMount() {   //inbuild function
    this.fetchOrdersDetails();
    }

    getBadgeClasses(x){
        if(x==="Approved"){
            return "badge bg-success";
        } else if(x==="Waiting For Approval"){
            return "badge bg-warning text-dark";
        }else if(x==="Declined"){
            return "badge bg-danger";
        }else if(x==="Partially Approved"){
            return "badge bg-info text-dark";
        }else if(x==="Referred"){
            return "badge bg-secondary";
        }else if(x==="Return To Originator"){
            return "badge bg-dark";
        }
    }

    checkDateIgnore = () => {
        this.setState(prevState => ({
            isClicked: !prevState.isClicked,
        }));
      }

    refresh(e) {
        window.location = '/orders'
    }

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
     if(target.checked){
       this.state.approvalStatus.push(value);   
     }else{
        var i = this.state.approvalStatus.findIndex((element)=>element === value);
        this.state.approvalStatus.splice(i, 1);
     }
     console.log("sss", this.state.approvalStatus);
    }

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }

  navigateViewOrderPage(e, orderId) {
    window.location = `/order/${orderId}`
    }

    navigateOrderReportPage(e, orderId) {
      window.location = `/orderReport/${orderId}`
      }
  

  fetchOrdersDetails() {                // fetch and retrive data
    axios.get("http://localhost:8300/order/").then((response) => {
      this.setState({ orders: response.data.data });
      // this.setState({ services: response.data.data.docs });          //pagination
      // this.setState({ totalPages: response.data.data.totalPages });          //pagination
    });
  }

    navigateSearchOrderPage(e) {      //search
      e.preventDefault();
      console.log("approvalStatus", this.state.approvalStatus);
      console.log("dateFrom", this.state.dateFrom);
      console.log("dateTo", this.state.dateTo);
    //   window.location = `/searchService/${dateFrom&dateTo&approvalState}`
    if(this.state.isClicked){
        axios.get("http://localhost:8300/order/searchWithoutDateRange/", {
            params: {
                approvalStatus: this.state.approvalStatus
            }
        }
        ).then((response) => {
          this.setState({ orders: response.data.data });
          // this.setState({ services: response.data.data.docs });          //pagination
          // this.setState({ totalPages: response.data.data.totalPages });          //pagination
        });
    }
    else{
        axios.get("http://localhost:8300/order/search/", {
            params: {
                approvalStatus: this.state.approvalStatus,
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo,
            }
        }
        ).then((response) => {
          this.setState({ orders: response.data.data });
          // this.setState({ services: response.data.data.docs });          //pagination
          // this.setState({ totalPages: response.data.data.totalPages });          //pagination
        }); 
    }
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
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Order Management</b>
                  </li>
                </ol>
              </nav>

              <div className="container">
                <form onSubmit={this.navigateSearchOrderPage}>
                  <div className="container" id="border1jh">
                    <h6>Search Orders For Approvals</h6>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="wing" className="form-label">
                          Status
                        </label>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Approved" id="flexCheckDefault" onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault"> Approved </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Referred" id="flexCheckDefault"  onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault"> Referred </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Declined" id="flexCheckDefault"  onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault"> Declined </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Return To Originator" id="flexCheckDefault"  onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault"> Return To Originator </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Waiting For Approval" id="flexCheckDefault"  onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">Waiting For Approval </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="Partially Approved" id="flexCheckDefault"  onChange={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">Partially Approved </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="wing" className="form-label">
                          Date From
                        </label>
                      </div>
                      <div className="col-md-3">
                        {this.state.isClicked?(
                            <input
                            disabled
                            type="date"
                            className="form-control"
                            id="dateFrom"
                            name="dateFrom"
                            value={this.state.dateFrom}      //bind state value
                            onChange={this.onChange}    //don't call function. only give a reference.
                            />
                        ):(
                            <input
                            type="date"
                            className="form-control"
                            id="dateFrom"
                            name="dateFrom"
                            value={this.state.dateFrom}      //bind state value
                            onChange={this.onChange}    //don't call function. only give a reference.
                          />
                        )}
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="wing" className="form-label">
                          Date To
                        </label>
                      </div>
                      <div className="col-md-3">
                      {this.state.isClicked?(
                        <input
                          disabled
                          type="date"
                          className="form-control"
                          id="dateTo"
                          name="dateTo"
                          value={this.state.dateTo}      //bind state value
                          onChange={this.onChange}    //don't call function. only give a reference.
                        />
                        ):(
                            <input
                            type="date"
                            className="form-control"
                            id="dateTo"
                            name="dateTo"
                            value={this.state.dateTo}      //bind state value
                            onChange={this.onChange}    //don't call function. only give a reference.
                          />
                        )}
                      </div>
                      <div className="col">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" checked={this.state.isClicked} onChange={this.checkDateIgnore} id="flexCheckDefault"/>
                          <label className="form-check-label" htmlFor="flexCheckDefault">Ignore Date</label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <hr id="hrjh" />
                    <div className="row" id="border2jh">
                      <div className="col-md-3" id="rowpadjh">
                        <button type="submit" className="btn btn-primary" id="btnjs">Search</button>
                      </div>
                      <div className="col-md-1" id="rowpadjh">
                        <button type="button" className="btn btn-secondary" id="btn2js" onClick={e => this.refresh(e)}>Refresh</button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="table-responsive">
                    <table className="table" border="2">
                      <thead className="table-secondary">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Order Ref No</th>
                          <th scope="col">Status</th>
                          <th scope="col">Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orders.length > 0 &&
                          this.state.orders.map((item, index) => (
                            <tr key={index}>
                              <td>{moment(item.issueDate).format('YYYY-MM-DD')}</td>
                              <td>{item.orderRefNo}</td>
                              <td><div><span className={this.getBadgeClasses(item.approvalStatus)}>{item.approvalStatus} </span></div></td>
                              <td>
                                <button type="button" className="btn btn-info" id="btn1jh" onClick={e => this.navigateViewOrderPage(e, item._id)}>View </button>
                                <button type="button" className="btn btn-dark" id="btn1jh" onClick={e => this.navigateOrderReportPage(e, item._id)}>Report</button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrdersScreen;
