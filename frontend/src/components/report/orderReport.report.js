import React, { Component } from "react";
import axios from "axios";
import "../css/styles.css";
import moment from 'moment';
import reportImage from '../../images/flex.jpeg';
import jsPDF from "jspdf";
import "jspdf-autotable";

class OrdersReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {              //initialization
      orderRefNo:"",
      description:"",
      issueDate:"",
      companyName:"",
      deliveryAddress:"",
      totalPrice:"",
      approvalStatus:"",
      orderStatus:"",
      site:"",
      supplier:"",
      items:[]
    };
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.fetchOrdersDetails = this.fetchOrdersDetails.bind(this);              //bind fetch order details 
    this.fetchItemsDetails = this.fetchOrdersDetails.bind(this);              //bind fetch Item details 
    this.getApprovedStatusBadgeClasses = this.getApprovedStatusBadgeClasses.bind(this);              //bind approval status badge classes
    this.getOrderStatusBadgeClasses = this.getOrderStatusBadgeClasses.bind(this);              //bind order status badge classes 
    this.back = this.back.bind(this);                //handle checkbox values 
  }

  componentDidMount() {   //inbuild function
    this.fetchOrdersDetails();
    }

    back(e) {
        window.location = '/orders'
    }

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }

  fetchOrdersDetails() {                // fetch and retrive data
    const orderId = this.props.match.params.id;
    console.log("rrrr" + orderId);
    axios.get(`http://localhost:8300/order/${orderId}`)
    .then((response) => {
      this.setState({ orders: response.data.data });
      this.setState({ items: response.data.data.items })
      this.setState({ id: response.data.data._id })
      this.setState({ orderRefNo: response.data.data.orderRefNo });
      this.setState({ companyName: response.data.data.companyName });
      this.setState({ deliveryAddress: response.data.data.deliveryAddress });
      this.setState({ approvalStatus: response.data.data.approvalStatus });
      this.setState({ orderStatus: response.data.data.orderStatus });
      this.setState({ issueDate: response.data.data.issueDate });
      this.setState({ totalPrice: response.data.data.totalPrice });
      this.setState({ description: response.data.data.description });
      this.setState({ supplier: response.data.data.supplier.supplierName });
      this.setState({ site: response.data.data.site.location });
      console.log("stat",response.data.data.items);
    })

    axios.get(`http://localhost:8300/order/charge/${orderId}`)
    .then(response => {
        this.setState({ NumPieces: response.data.NumPieces })
        console.log("orderid: " + orderId);
    })
    .catch(error => {
        alert(error.message)
    })

  }

  getApprovedStatusBadgeClasses(x){
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

getOrderStatusBadgeClasses(x){
  if(x==="Delivered"){
      return "badge bg-success";
  }else if(x==="Declined"){
      return "badge bg-danger";
  }else if(x==="Place Now"){
      return "badge bg-info text-dark";
  }else if(x==="Placed"){
      return "badge bg-secondary";
  }
}

  exportSalaryReportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    var reportImg = new Image();
    reportImg.src = reportImage;

    const title = "Order Management Report";
    const headers = [["Area", "Values"]];
    const headers1 =[["Item Name", "Quantity", "Price"]];

    const data = [];
    this.state.items.map((item, index) => {
        let category1 = [
            item.itemId.goodName,
            item.quantity,
            item.individualTotprice
        ]
        data.push(category1)
    });

    let orderRefNo = this.state.orderRefNo;
    let supplier = this.state.supplier;
    let issueDate = this.state.issueDate;
    let companyName = this.state.companyName;
    let approvalStatus = this.state.approvalStatus;
    let orderStatus = this.state.orderStatus;
    let deliveryAddress = this.state.deliveryAddress;
    let site = this.state.site;
    let description = this.state.description;
    let NumPieces = this.state.NumPieces;
    let totalPrice = this.state.totalPrice;

    const data1 = [['Order Reference Number',orderRefNo],['Supplier',supplier],['Issued Date',moment(issueDate).format('YYYY-MM-DD')],['Approval Status',approvalStatus],['Order Status',orderStatus],['Company',companyName],['Delivery Address',deliveryAddress],['Site',site],['Description',description],['Number of Pieces',NumPieces],['Total Price',totalPrice]]

    let content = {
        startY: 122,
        head: headers,
        body: data1
    };

    doc.setFontSize(13);
    doc.addImage(reportImg, 'JPEG', 40, 13, 70, 70);
    doc.text("Flex Constructions", marginLeft+80, 25);

    doc.setFontSize(11);
    doc.text("No.2 Main Street, Colombo", marginLeft+80, 40);
    doc.text("info@flex.com", marginLeft+80, 55);
    doc.text("+94 255 255 111", marginLeft+80, 70);

    doc.line(40, 93, 558, 93);          //upper line
    doc.line(40, 780, 558, 780);          //bottom line

    doc.text(title, marginLeft, 110);
    doc.autoTable(content);

    let finalY = doc.previousAutoTable.finalY;

    let content1 = {
        startY: finalY+10,
        head: headers1,
        body: data
    };
    doc.autoTable(content1);
    doc.setFontSize(10);
    let marginTop = doc.previousAutoTable.finalY + 25;
    var today = new Date();
    var newdate = "Report Issued : " + today;
    doc.text(marginLeft, marginTop, newdate);
    doc.text("*** Disclaimer : This is an electronically generated report, hence does not require signature.", marginLeft, marginTop+20);
    doc.save("Order Management Report - Flex Constructions.pdf");
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
                    <a href="/orders" className="breadcrumb">
                      <b>Order Management</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Order Report Generation</b>
                  </li>
                </ol>
              </nav>
              <div className="container">
                  <div className="container" id="border1jh">
                    <div>
                      <h4>Order Details Report</h4>
                    </div><br/>
                  <div className="table-responsive">
                    <table className="table" border="2">
                      <thead className="table-secondary">
                        <tr>
                          <th scope="col">Area</th>
                          <th scope="col">Values</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                          <td>Order Reference No</td>
                          <td>{this.state.orderRefNo}</td>
                          </tr>
                          <tr>
                          <td>Supplier</td>
                          <td>{this.state.supplier}</td>
                          </tr>
                          <tr>
                          <td>Issue Date</td>
                          <td>{moment(this.state.issueDate).format('YYYY-MM-DD')}</td>
                          </tr>
                          <tr>
                          <td>Approval Status</td>
                          <td><div><span className={this.getApprovedStatusBadgeClasses(this.state.approvalStatus)}>{this.state.approvalStatus} </span></div></td>
                          </tr>
                          <tr>
                          <td>Order Status</td>
                          <td><div><span className={this.getOrderStatusBadgeClasses(this.state.orderStatus)}>{this.state.orderStatus} </span></div></td>
                          </tr>
                          <tr>
                          <td>Company Name</td>
                          <td>{this.state.companyName}</td>
                          </tr>
                          <tr>
                          <td>Delivery Address</td>
                          <td>{this.state.deliveryAddress}</td>
                          </tr>
                          <tr>
                          <td>Site</td>
                          <td>{this.state.site}</td>
                          </tr>
                          <tr>
                          <td>Site Manager's Note</td>
                          <td>{this.state.description}</td>
                          </tr>
                          <tr>
                          <td>No of Pieces</td>
                          <td>{this.state.NumPieces}</td>
                          </tr>
                          <tr>
                          <td>Total Price</td>
                          <td>{this.state.totalPrice  }</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                    <hr id="hrjh" /><br/>
                    <div><h4>Ordered Items Details</h4></div><br/>
                    <div className="table-responsive">
                    <table className="table" border="2">
                      <thead className="table-secondary">
                        <tr>
                          <th scope="col">Item Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.items.length > 0 &&
                          this.state.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.itemId.goodName}</td>
                              <td>{item.quantity}</td>
                              <td>{item.individualTotprice}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <br/>
                    <div>
                        <button type="button" className="btn btn-secondary" onClick={e => this.back(e)}>Back</button>
                        <button type="button" id="generateReportbtn" className="btn btn-dark" onClick={() => this.exportSalaryReportPDF()}>Generate Report</button>
                    </div>
                  </div>
                  </div>
                  <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrdersReportScreen;
