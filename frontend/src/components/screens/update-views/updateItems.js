
import React, { Component } from 'react';
import '../../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';




const initialState = {

    goodId: '',
    goodName: '',
    itemId: '',
    items: [],
    itemPrice: 0,
    quantity: 0,
    individualTotprice: 0
}

class UpdateItemsDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            searchValue: '',

        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialState;



    }

    backtoitemdashboard(e) {
        window.location = '/items'
    }


    componentDidMount() {

        const { data } = this.props.location

        console.log("userid: " + data);

        axios.get(`http://localhost:8300/item/${data}`)
            .then(response => {
                this.setState({ items: response.data.data });
                this.setState({ itemId: response.data.itemId });
                this.setState({ goodId: response.data.data.itemId.goodId });
                this.setState({ goodName: response.data.data.itemId.goodName });
                this.setState({ itemPrice: response.data.data.itemId.itemPrice });
                this.setState({ quantity: response.data.data.quantity });
                this.setState({ individualTotprice: response.data.data.individualTotprice });

                console.log("abc" + response.data.data.individualTotprice);
                console.log("abc1", response.data.data.itemId.goodName);

            })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { data } = this.props.location

        console.log("userid: " + data);
        let item = {

            goodId: this.state.goodId,
            goodName: this.state.goodName,
            itemPrice: this.state.itemPrice,
            quantity: this.state.quantity,
            individualTotprice: this.state.itemPrice * this.state.quantity,
        };

        console.log('DATA TO SEND', item);


        Swal.fire({
            title: "Update the Item details!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.patch(`http://localhost:8300/item/update/${data}`, item)
                    .then(response => {
                        Swal.fire(
                            ' Update!',
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
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Items Management</b></a></li>
                                        {/* <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li> */}
                                    </ol>
                                </nav>
                                <div className="container-update" >


                                    <h6>Update Item Details</h6>
                                    <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "right" }}>

                                    </h5>


                                    <form onSubmit={this.onSubmit} onChange={this.onChange}>

                                        <h6>Price</h6>
                                        <h6>Rs.{this.state.itemPrice * this.state.quantity}</h6>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="goodId" className="form-label">Good Id</label>
                                                        <input type="goodId"
                                                            className="form-control"
                                                            id="goodId"
                                                            name="goodId"
                                                            placeholder="Enter good ID"
                                                            value={this.state.goodId}
                                                            onChange={this.onChange}
                                                            disabled

                                                        />


                                                    </div>


                                                    <div className="col" style={{ textAlign: "left" }}>
                                                        <label htmlFor="goodName" className="form-label">Good Name</label>
                                                        <input type="goodName"
                                                            className="form-control"
                                                            id="goodName"
                                                            name="goodName"
                                                            placeholder="Enter good name"
                                                            value={this.state.goodName}
                                                            onChange={this.onChange}
                                                            disabled

                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="itemPrice" className="form-label">Item Price</label>
                                                        <input type="itemPrice"
                                                            className="form-control"
                                                            id="itemPrice"
                                                            name="itemPrice"
                                                            placeholder="Enter item price"
                                                            value={this.state.itemPrice}
                                                            onChange={this.onChange}
                                                            disabled

                                                        />
                                                    </div>


                                                    <div className="col" style={{ textAlign: "left" }}>
                                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                                        <input type="quantity"
                                                            className="form-control"
                                                            id="quantity"
                                                            name="quantity"
                                                            placeholder="Enter quantity"
                                                            value={this.state.quantity}
                                                            onChange={this.onChange}
                                                            required

                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <br></br>
                                        <button type="button" className="btn btn-secondary" onClick={e => this.backtoitemdashboard(e)}> Back</button>
                                        <button type="submit" id="form-button1" className="btn btn-warning">Update</button>


                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >

        )
    }
}
export default UpdateItemsDetails;