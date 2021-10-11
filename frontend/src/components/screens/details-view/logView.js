
import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../../css/styles.css';
import axios from 'axios';
import moment from 'moment';



const initialState = {


    logs: [],
    approvalStatus: '',
    items: '',
    NumPieces: '',
}

class ViewLogDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

        this.state = initialState;


    }



    componentDidMount() {

        const { data } = this.props.location

        console.log("userid: " + data);

        axios.get(`http://localhost:8300/log/${data}`)
            .then(response => {
                this.setState({ logs: response.data.data });
                this.setState({ orderRef: response.data.data });
                this.setState({ orderRef: response.data.data.orderRef.supplier });
                this.setState({ items: response.data.data.orderRef.items });
                this.setState({ descriptions: response.data.data.descriptions });
                this.setState({ orderRefNo: response.data.data.orderRef.orderRefNo });
                this.setState({ companyName: response.data.data.orderRef.companyName });
                this.setState({ deliveryAddress: response.data.data.orderRef.deliveryAddress });
                this.setState({ issueDate: response.data.data.orderRef.issueDate });
                this.setState({ totalPrice: response.data.data.orderRef.totalPrice });
                this.setState({ description: response.data.data.orderRef.description });
                this.setState({ supplierName: response.data.data.orderRef.supplier.supplierName });
                this.setState({ address: response.data.data.orderRef.supplier.address });
                this.setState({ contactNo: response.data.data.orderRef.supplier.contactNo });
                this.setState({ approvalStatus: response.data.data.orderRef.approvalStatus });
                this.setState({ location: response.data.data.orderRef.site.location });
                this.setState({ siteNo: response.data.data.orderRef.site.siteNo });
                this.setState({ siteContactNo: response.data.data.orderRef.site.contactNo });
                this.setState({ itemId: response.data.data.items });


                console.log("abc" + response.data.data.orderRef.orderRefNo);
                console.log("abc1", response.data.data.orderRef.items);
                console.log("abc1", response.data.data.orderRef.supplier.supplierName);
                console.log("abc" + response.data.data.items);

            })

    }

    backtoLog(e) {
        window.location = '/log'
    }


    render() {

        return (

            <div>
                <div className="container-fluid">
                    <div className="row align-items-start align-items-stretch" >
                        <div className="col-2" id="partition">
                            <h1 className="display-4" id="web-title">Flex</h1><h6 className="text-center" id="web-title1">&ensp;Constructions.....</h6><br />
                            <ul className="list-group" id="dash-list">
                                <li className="list-group-item border-0" id="dash-item"><a href="/" className="dash-item">Dashboard</a></li>
                                <li className="list-group-item border-0" id="dash-item"><a href="/" className="dash-item">Order</a></li>
                                <li className="list-group-item border-0" id="dash-item"><a href="/" className="dash-item">Delivery</a></li>
                                <li className="list-group-item border-0" id="dash-item"><a href="/" className="dash-item">Approval</a></li>
                            </ul>

                        </div>
                        <div className="col-9" id="partition1">
                            <div className="row" id="header">
                                <div className="col align-self-stretch">
                                    <button className="btn btn-primary position-absolute top-0 end-0" id="signout" type="submit">Sign Out</button><br /><br />
                                </div><br /><br />
                            </div>


                            <div className="container align-self-stretch" id="content">

                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>View Log Details</b></a></li>
                                        {/* <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li> */}
                                    </ol>
                                </nav>


                                <form  >
                                    <Container fluid id="fluid">
                                        <Row>
                                            <Col>

                                                <div className="container-dash">
                                                    <h5>Status : {this.state.approvalStatus}</h5>
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <h6 class="card-title">View Order-{this.state.orderRefNo}</h6>
                                                            <div className="table-responsive" >
                                                                <table className="table" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >

                                                                    <tbody >
                                                                        <td>Ref No </td>
                                                                        <td>:</td>
                                                                        <td>{this.state.orderRefNo}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Supplier</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.supplierName}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Issue Date</td>
                                                                        <td>:</td>
                                                                        <td>{moment(this.state.issueDate).locale('en').format('YYYY-MM-DD')}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Company Name</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.companyName}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Delivery Address</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.deliveryAddress}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Site</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.location}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Site Managers Note</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.description}</td>
                                                                    </tbody>
                                                              

                                                                    <tbody >
                                                                        <td>Total Price</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.totalPrice}</td>
                                                                    </tbody>

                                                                </table>
                                                            </div>

                                                        </div>



                                                        <label htmlFor="reason" className="form-label">Reason</label>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="This order contains all required items which fits to the budget"
                                                            id="descriptions"
                                                            name="descriptions"
                                                            value={this.state.descriptions}

                                                        >
                                                        </textarea>

                                                    </div>
                                                </div>
                                            </Col>
                                            <Col>

                                                <div className="container-dash1">
                                                    <div class="card" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                                                        <div class="card-body">
                                                            <h6 class="card-title">Item</h6>
                                                            <div className="table-responsive" >
                                                                <table className="table" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >
                                                                    <thead className="table-light" >
                                                                        <tr>
                                                                            <th>Item Name</th>
                                                                            <th>Quantity</th>
                                                                            <th>Price</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >
                                                                        {this.state.items.length > 0 && this.state.items.map((item, index) => (

                                                                            <tr key={index}>

                                                                                <td>{item.itemId}</td>
                                                                                <td>{item.quantity}</td>
                                                                                <td>{item.individualTotprice}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container-dash1">
                                                    <div class="card" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                                                        <div class="card-body">
                                                            <h6 class="card-title">Supplier</h6>
                                                            <div className="table-responsive" >
                                                                <table className="table" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >
                                                                    <thead className="table-light" >
                                                                        <tr>
                                                                            <th>Supplier Name</th>
                                                                            <th>Address</th>
                                                                            <th>Contact No</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >
                                                                        <td>{this.state.supplierName}</td>
                                                                        <td>{this.state.address}</td>
                                                                        <td>{this.state.contactNo}</td>
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container-dash1">
                                                    <div class="card" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                                                        <div class="card-body">
                                                            <h6 class="card-title">Site</h6>
                                                            <div className="table-responsive" >
                                                                <table className="table" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >
                                                                    <thead className="table-light" >
                                                                        <tr>
                                                                            <th>Site No</th>
                                                                            <th>Location</th>
                                                                            <th>contactNo</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} >

                                                                        <td>{this.state.siteNo}</td>
                                                                        <td>{this.state.location}</td>
                                                                        <td>{this.state.siteContactNo}</td>
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </Col>

                                            <hr />
                                            <div className="col mb-3">
                                                <button type="button" id="button" className="btn btn-secondary  float-end" onClick={e => this.backtoLog(e)}>Back</button>

                                            </div>

                                        </Row>

                                    </Container>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div >

        )
    }
}
export default ViewLogDetails;