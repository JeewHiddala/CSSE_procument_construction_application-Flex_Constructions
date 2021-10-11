import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import moment from 'moment';

class deliveryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            deliveries: [],

        }
        this.deleteDelivery = this.deleteDelivery.bind(this);
        this.ViewDeliveryDetails = this.ViewDeliveryDetails.bind(this);
        this.navigateCreateDeliveryPage = this.navigateCreateDeliveryPage.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    componentDidMount() {
        axios.get('http://localhost:8300/delivery/')
            .then(response => {
                this.setState({ deliveries: response.data.data });
                console.log("abc", response.data.data.orderRef);
            })


    }
    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }


    ViewDeliveryDetails(e, deliveryId) {
        window.location = `/view-delivery/${deliveryId}`
    }


    navigateCreateDeliveryPage(e) {
        window.location = '/create-delivery'
    }


    deleteDelivery(e, deliveryId) {
        console.log("I am on Delete", deliveryId)
        Swal.fire({
            title: 'Are you sure you want to delete this delivery details?',
            text: "This item will be deleted immediently. You can't undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8300/delivery/${deliveryId}`)
                Swal.fire(
                    'Deleted!',
                    'delivery is successfully deleted.',
                    'success'
                )
            }
        })
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
                                <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Dashboard</b></a></li>
                                <li className="breadcrumb-item active" aria-current="page"><b>Delivery</b></li>
                            </ol>
                        </nav>
                        <div className=" align-self-stretch">
                            <div className="container" >
                                <div className="float-end">
                                    <button type="button" class="btn btn-success" onClick={e => this.navigateCreateDeliveryPage(e)}>Add New Delivery Details</button>
                                </div>
                                <div className="col-6">
                                    <h3 className="h3"><b>Delivery Details Management</b></h3>
                                </div>

                                <br />
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Order Number</th>
                                                <th>Received Date</th>
                                                <th>No of Items</th>
                                                <th>Total Price</th>
                                                <th>Weight(kg)</th>
                                                <th>Supplier Name</th>

                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.deliveries.length > 0 && this.state.deliveries.map((item, index) => (
                                                <tr key={index}>

                                                    <td>{item.orderRef.orderRefNo}</td>
                                                    <td>{moment(item.deliveryDate).format('L')}</td>
                                                    <td>{item.numOfItems}</td>
                                                    <td>{item.totalPrice}</td>
                                                    <td>{item.weight}</td>
                                                    <td>{item.supplier.supplierName}</td>

                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.ViewDeliveryDetails(e, item._id)}>View</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteDelivery(e, item._id)}>Delete</button></td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>

                                </div>
                                <br></br>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <br /><br /><br /><br />
            <br /><br /><br /><br />
        </div>
    )
}
}

export default deliveryManagement;

