
import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';
import moment from 'moment';

const initialState = {

    orderRefNo: '',

    companyName: '',
    issueDate: '',
    deliveryAddress: '',
    totalPrice: 0,
    items: [],
    supplier: '',
    site: '',
    orders: null,
    description: '',
    descriptions: '',
    NumPieces: '',
    approvalStatus: 'Approved'
}

class viewOrder extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {

        const data  = this.props.match.params.id
        console.log("ABCDE: " , this.props.match.params.id);
        console.log("userid: " ,data);
        axios.get(`http://localhost:8300/order/${data}`)
            .then(response => {
                this.setState({ orders: response.data.data });
                this.setState({ items: response.data.data.items })
                this.setState({ orderRefNo: response.data.data.orderRefNo });
                this.setState({ companyName: response.data.data.companyName });
                this.setState({ deliveryAddress: response.data.data.deliveryAddress });
                this.setState({ issueDate: response.data.data.issueDate });
                this.setState({ totalPrice: response.data.data.totalPrice });
                this.setState({ description: response.data.data.description });
                this.setState({ supplier: response.data.data.supplier.supplierName });
                this.setState({ site: response.data.data.site.location });

                console.log("supplier" + response.data.data.supplier.supplierName);
                console.log("site" + response.data.data.site.location);
                console.log("abc" + response.data.data.orderRefNo);
                console.log("abc1", response.data.data.items);
            })

        axios.get(`http://localhost:8300/order/charge/${data}`)
            .then(response => {
                this.setState({ NumPieces: response.data.NumPieces })
                console.log("orderid: " + data);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    backtoviewOrder(e) {
        window.location = '/orders'
    }

    onSubmit(e) {
        e.preventDefault();
        const data  = this.props.match.params.id

        console.log("useridA: " , this.props.match.params.id);
        let log = {

            orderRef: data,
            descriptions: this.state.descriptions,

        };

        let order = {

            approvalStatus: this.state.approvalStatus
        }


        console.log('DATA TO SEND', log);
        console.log('DATA TO SEND', order);

        //console.log('hrll' + data);
        Swal.fire({
            title: "Save the order details!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post('http://localhost:8300/log/create', log)
                axios.patch(`http://localhost:8300/order/update/${data}`, order)
                    .then(response => {
                        Swal.fire(
                            ' Saving!',
                            'success'
                        )
                        window.location = '/orders'
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        })
    }

    handleStatusChange(event) {
        this.setState({ approvalStatus: event.target.value })
    }

    render() {
        //console.log("order", this.state.orders);

        let { approvalStatus } = this.state
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
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Dashboard</b></a></li>
                                        <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li>
                                    </ol>
                                </nav>
                                <form onSubmit={this.onSubmit} onChange={this.onChange}>
                                    <Container fluid id="fluid">
                                        <Row>
                                            <Col>

                                                <div className="container-dash">

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
                                                                        <td>{this.state.supplier}</td>
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
                                                                        <td>{this.state.site}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Site Managers Note</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.description}</td>
                                                                    </tbody>

                                                                    <tbody >
                                                                        <td>Num Pieces</td>
                                                                        <td>:</td>
                                                                        <td>{this.state.NumPieces}</td>
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
                                                            onChange={this.onChange}
                                                        >
                                                        </textarea>

                                                    </div>
                                                </div>
                                            </Col>
                                            <Col>

                                                <div className="container-dash1">
                                                    <div class="card" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                                                        <div class="card-body">
                                                            <h6 class="card-title">Items</h6>
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


                                                                                <td>{item.itemId.goodName}</td>
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
                                                <div className="container-dash2">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <h6 class="card-title">Status</h6>
                                                            <fieldset onChange={this.handleStatusChange}>
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Approved" checked={approvalStatus === 'Approved'} />
                                                                            <label className="form-check-label" for="exampleRadios1">
                                                                                Approved
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Partially Approved" checked={approvalStatus === 'Partially Approved'} />
                                                                            <label className="form-check-label" for="exampleRadios2">
                                                                                Partially Approved
                                                                            </label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="form-check ">
                                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Declined" checked={approvalStatus === 'Declined'} />
                                                                            <label className="form-check-label" for="exampleRadios3">
                                                                                Declined
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col">
                                                                        <div className="form-check ">
                                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="Referred" checked={approvalStatus === 'Referred'} />
                                                                            <label className="form-check-label" for="exampleRadios4">
                                                                                Referred
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-check ">
                                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="Return To Originator" checked={approvalStatus === 'Return To Originator'} />
                                                                    <label className="form-check-label" for="exampleRadios3">
                                                                        Return to Originator
                                                                    </label>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    </div>

                                                </div>

                                            </Col>

                                            <hr />
                                            <div className="col mb-3">
                                                <button type="button" id="button" className="btn btn-secondary  float-end" onClick={e => this.backtoviewOrder(e)}>Clear</button>
                                                <button type="submit" id="button" className="btn btn-info float-end">Save</button>
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


export default viewOrder;