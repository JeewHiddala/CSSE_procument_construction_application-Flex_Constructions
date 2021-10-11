import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class viewDeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderRefNo: '',
            deliveryDate: '',
            numOfItems: '',
            totalPrice: '',
            weight: '',
            supplierName: '',
            id: ''
        }
        this.backtoDeliveryManagement = this.backtoDeliveryManagement.bind(this);
    }



    componentDidMount() {
        const data = this.props.match.params.id;
        console.log("rrrr" + data);
        axios.get(`http://localhost:8300/delivery/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data.data)

                this.setState({ orderRefNo: response.data.data.orderRef.orderRefNo });
                this.setState({ deliveryDate: response.data.data.deliveryDate });
                this.setState({ numOfItems: response.data.data.numOfItems });
                this.setState({ totalPrice: response.data.data.totalPrice });
                this.setState({ weight: response.data.data.weight });
                this.setState({ supplierName: response.data.data.supplier.supplierName });
            })

    }
    backtoDeliveryManagement(e) {
        window.location = '/delivery-dashboard'
    }

    render() {
        return (
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
                                    <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Delivery</b></a></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>View Delivery </b></li>
                                </ol>
                            </nav>


                            <div className="col-8 align-self-stretch">
                                <div className="container"></div>
                                <h3>Delivery Details</h3>
                                <form  onSubmit={this.onSubmit} >

                                    <div className="container">
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <label htmlFor="foodNumber" className="form-label">Order Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="foodNumber"
                                                    name="foodNumber"
                                                    value={this.state.orderRefNo}
                                                    disabled
                                                    onChange={this.onChange}
                                                />
                                            </div>

                                            <div className="col-6" style={{ textAlign: "left" }}>
                                                <label htmlFor="deliveryDate" className="form-label">Received Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="deliveryDate"
                                                    name="deliveryDate"
                                                    value={moment(this.state.deliveryDate).format('L')}
                                                    disabled
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-6" style={{ textAlign: "left" }}>
                                                <label htmlFor="numOfItems" className="form-label">No of Items</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="numOfItems"
                                                    name="numOfItems"
                                                    value={this.state.numOfItems}
                                                    disabled
                                                    onChange={this.onChange}
                                                />
                                            </div>

                                            <div className="col-6" style={{ textAlign: "left" }}>
                                                <label htmlFor="totalPrice" className="form-label">Total Price</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="totalPrice"
                                                    name="totalPrice"
                                                    value={this.state.totalPrice}
                                                    disabled
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3" style={{ textAlign: "left" }}>
                                            <label htmlFor="weight" className="form-label">Weight(Kg)</label>
                                            <textarea
                                                className="form-control"
                                                id="weight"
                                                name="weight"
                                                value={this.state.weight}
                                                disabled
                                                onChange={this.onChange}
                                            >
                                            </textarea>

                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-6" style={{ textAlign: "left" }}>
                                                <label htmlFor="createDate" className="form-label"> Supplier Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="createDate"
                                                    name="createDate"
                                                    value={this.state.supplierName}
                                                    disabled
                                                    onChange={this.onChange}

                                                />
                                            </div>

                                        </div>

                                        <br></br>
                                        <div className="mb-3">
                                            <button type="button" className="btn btn-secondary" onClick={e => this.backtoDeliveryManagement(e)}>Back</button>
                                        </div>
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

export default viewDeliveryDetails;