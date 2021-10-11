import React, { Component, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';
import Select from 'react-select';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";


const initialState = { //initiate states
    orderNumber: '',
    noOfItems: '',
    receivedDate: '',
    weight: '',
    price: '',
    suppliername: '',
    items: [],
    orders: [],
    suppliers: [],
    quantity: '',
    selectedItem: '',
    selectedOrderNo: '',
    selectedSupplier: '',
    id: '',
    options1: [],
    options2: [],
    options3: [],
    qtyItems: [],

}


class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this); //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);//bind onSubmit function.
        this.itemOnChange = this.itemOnChange.bind(this); //bind itemOnChange function.
        this.orderNoOnChange = this.orderNoOnChange.bind(this); //bind handleChange function.
        this.supplierOnChange = this.supplierOnChange.bind(this); //bind handleChange function.
        this.backtoDeliveryManagement = this.backtoDeliveryManagement.bind(this);


    }
    componentDidMount() {
        axios.get('http://localhost:8300/good/')
            .then(response => {
                this.setState({ items: response.data.data }, () => {
                    let data = [];
                    this.setState({ options1: data });
                    this.state.items.map((item, index) => {
                        let items = {
                            value: item._id,
                            label: item.goodName
                        }
                        data.push(items)
                        console.log("a", items);
                    });
                    this.setState({ options1: data });
                    return;

                })

            })


        axios.get('http://localhost:8300/supplier/')
            .then(response => {
                this.setState({ suppliers: response.data.data }, () => {
                    let data = [];
                    this.setState({ options3: data });
                    this.state.suppliers.map((item, index) => {
                        let suppliers = {
                            value: item._id,
                            label: item.supplierName
                        }
                        data.push(suppliers)
                        console.log("abc", suppliers);
                    });
                    this.setState({ options3: data });
                    return;
                })

            })

        axios.get('http://localhost:8300/order/')
            .then(response => {
                this.setState({ orders: response.data.data }, () => {
                    let data = [];
                    this.setState({ options2: data });
                    this.state.orders.map((item, index) => {
                        let orders = {
                            value: item._id,
                            label: item.orderRefNo
                        }
                        data.push(orders)
                        console.log("order no", orders);
                    });
                    this.setState({ options2: data });
                    return;

                })

            })

    }


    itemOnChange = selectedItem => {
        this.setState({ selectedItem });
        console.log('Option1 selected:', selectedItem);
    };


    orderNoOnChange = selectedOrderNo => {
        this.setState({ selectedOrderNo });
        console.log('Option2 selected2:', selectedOrderNo);
    };

    supplierOnChange = selectedSupplier => {
        this.setState({ selectedSupplier });
        console.log('Option selected3:', selectedSupplier);
    };



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    backtoDeliveryManagement(e) {
        window.location = '/delivery-dashboard'
    }

    onSubmit(e) {
        e.preventDefault(); //avoid browser refresh
        let deliveryId = Math.floor(Math.random() * 1000000);
        let selectedOrderItems = [];
        this.state.qtyItems.map((item, index) => {
            selectedOrderItems.push(item.value);
        });

        let delivery = {
            deliveryId: deliveryId.toString(),
            orderRef: this.state.selectedOrderNo.value,
            deliveryDate: this.state.receivedDate,
            numOfItems: this.state.noOfItems,
            totalPrice: this.state.price,
            weight: this.state.weight,
            supplier: this.state.selectedSupplier.value,
            items: selectedOrderItems
        }


        console.log('DATA TO SEND', delivery);
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.post('http://localhost:8300/delivery/create', delivery)
                    .then(response => {
                        console.log("a", this.state.orderNumber);
                        Swal.fire('Delivery details are Saved!', '', 'success')
                    })

                    .catch(error => {
                        console.log(error.message);
                    })

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    onItemMinusQuantityChange = (evt) => {
        let qty = parseInt(this.state.quantity) > 0 ? parseInt(this.state.quantity) - 1 : this.state.quantity;
        this.setState({
            quantity: qty
        });
    };

    onItemQuantityChange = (evt) => {
        let regex = '/^(\d*)?(\.\d{1,2})?$/';
        if (/^(\d*)?(\.\d{1,2})?$/.test(evt.target.value.toString())) {
            this.setState({ quantity: evt.target.value });
        }


    };

    onItemPlusQuantityChange = (evt) => {
        let qty = parseInt(this.state.quantity) >= 0 ? parseInt(this.state.quantity) + 1 : this.state.quantity;
        this.setState({
            quantity: qty
        });
    };

    onQtyAddButtonChange = (evt) => {
        let qtyObjects = this.state.qtyItems;
        let selectedItemName = this.state.options1.filter(i => { return i.value === this.state.selectedItem.value })[0];
        selectedItemName = selectedItemName !== undefined ? selectedItemName.label : '';
        let checkItemExists = qtyObjects.filter(i => { return i.value === this.state.selectedItem.value })[0];
        let itemQty = checkItemExists !== undefined ? parseInt(checkItemExists.qty) + parseInt(this.state.quantity) : parseInt(this.state.quantity);
        let queuedItems = checkItemExists !== undefined ? qtyObjects.filter(i => { return !(i.value === this.state.selectedItem.value) }) : qtyObjects;
        let item = { name: selectedItemName, value: this.state.selectedItem.value, qty: itemQty };
        queuedItems.push(item);

        //Change of No of Items in delivery report
        let itemCount = 0;
        queuedItems.map((item, index) => {
            itemCount = itemCount + parseInt(item.qty);
        });

        // Item Total Price
        let totalPrice = 0;
        queuedItems.map((item, index) => {
            let unit = this.state.items.filter(i => { return i._id === item.value })[0];
            let unitPrice = unit !== undefined ? unit.itemPrice : 0;
            let unitQty = item.qty;
            totalPrice = totalPrice + (unitPrice * unitQty);
        });

        this.setState({
            qtyItems: queuedItems,
            noOfItems: itemCount,
            price: totalPrice,
            quantity: ''
        });
    };

    onQtyItemsDelete = (value) => {
        let queuedItems = this.state.qtyItems;
        queuedItems = queuedItems.filter(i => { return !(i.value === value) });
        //Change of No of Items in delivery report
        let itemCount = 0;
        queuedItems.map((item, index) => {
            itemCount = itemCount + parseInt(item.qty);
        });

        // Item Total Price
        let totalPrice = 0;
        queuedItems.map((item, index) => {
            let unit = this.state.items.filter(i => { return i._id === item.value })[0];
            let unitPrice = unit !== undefined ? unit.itemPrice : 0;
            let unitQty = item.qty;
            totalPrice = totalPrice + (unitPrice * unitQty);
        });
        this.setState({
            qtyItems: queuedItems,
            noOfItems: itemCount,
            price: totalPrice
        });
    };


    render() {
        const { selectedItem } = this.state.selectedItem;
        const { selectedOrderNo } = this.state.selectedOrderNo;
        console.log("bid: ", selectedOrderNo);

        const { selectedSupplier } = this.state.selectedSupplier;
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
                                    <li className="breadcrumb-item" id=""><a href="/delivery-dashboard" className="breadcrumb"><b>Delivery</b></a></li>
                                    <li className="breadcrumb-item active" aria-current="page"><b>Add new Delivery Details</b></li>
                                </ol>
                            </nav>
                            <div className="row justify-content-center">
                                <div className="container-dash"><br />
                                    <h3><b>    Dashboard/Delivery Report</b></h3>
                                    <div className="row justify-content-evenly">
                                        <div className="col-8 align-self-stretch">
                                            <div className="container-delivery">

                                                <h4>Delivery Report</h4><br></br>
                                                <form onSubmit={this.onSubmit} >

                                                    <div className="container">
                                                        <div className="row mb-3">
                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="selectedOrderNo" className="form-label">Order Number</label>

                                                                <Select
                                                                    placeholder="Order Number"
                                                                    className="basic-single"
                                                                    name="selectedOrderNo"
                                                                    required
                                                                    options={this.state.options2}
                                                                    value={this.state.selectedOrderNo}
                                                                    onChange={this.orderNoOnChange}
                                                                />
                                                            </div>

                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="receivedDate" className="form-label">Received Date</label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    id="receivedDate"
                                                                    name="receivedDate"
                                                                    required
                                                                    value={this.state.receivedDate}
                                                                    onChange={this.onChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="noOfItems" className="form-label">No of Items</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter No Of Items"
                                                                    id="noOfItems"
                                                                    name="noOfItems"
                                                                    required
                                                                    value={this.state.noOfItems}
                                                                    onChange={this.onChange}
                                                                    disabled
                                                                />
                                                            </div>

                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="price" className="form-label">Total Price</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Enter Total Price"
                                                                    id="price"
                                                                    name="price"
                                                                    required
                                                                    value={this.state.price}
                                                                    onChange={this.onChange}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="weight" className="form-label">Weight(Kg)</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="weight"
                                                                    name="weight"
                                                                    placeholder="Enter Weight (Kg)"
                                                                    required
                                                                    value={this.state.weight}
                                                                    onChange={this.onChange}

                                                                />


                                                            </div>

                                                            <div className="col-5" style={{ textAlign: "left" }}>
                                                                <label htmlFor="selectedSupplier" className="form-label"> Supplier Name</label>
                                                                <Select
                                                                    placeholder="Supplier name"
                                                                    className="basic-single"
                                                                    name="selectedSupplier"
                                                                    required
                                                                    options={this.state.options3}
                                                                    value={selectedSupplier}
                                                                    onChange={this.supplierOnChange}
                                                                />
                                                            </div>



                                                        </div>


                                                        <br />
                                                        <hr id="hrjh" />
                                                        <div className="row" id="border2jh">
                                                            <div className="col-md-3" id="rowpadjh">
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-3">
                                                                <button type="button" className="btn btn-secondary" onClick={e => this.backtoDeliveryManagement(e)}>Back</button>


                                                            </div>
                                                            <div className="col-3">
                                                                <button type="submit" id="button" className="btn btn-success">Save</button>


                                                            </div>

                                                        </div>

                                                    </div>
                                                    <br>
                                                    </br>

                                                </form>

                                            </div>

                                        </div>
                                        <div className="col-4 align-self-stretch">
                                            <div className="container-delivery2">

                                                <h4><p>Item List</p></h4><br></br>
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            Items</div>
                                                        <div className="col-sm-9">
                                                            <Select
                                                                placeholder="Item"
                                                                className="basic-single"
                                                                name="selectedItem"
                                                                options={this.state.options1}
                                                                value={selectedItem}
                                                                onChange={this.itemOnChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-sm-3">Quantity</div>
                                                        <div className="col-sm-8">
                                                            <div className="row">
                                                                <div className="col-sm-2" style={{ marginRight: '12px' }}>
                                                                    <button id="btnMinusQty" type="button" onClick={this.onItemMinusQuantityChange} className="btn btn-sm">
                                                                        <FaMinus />
                                                                    </button> </div>
                                                                <input type="text" style={{ height: '30px' }} className="col-sm-4" value={this.state.quantity} onChange={this.onItemQuantityChange} />
                                                                <div className="col-sm-2" style={{ marginLeft: '-6px' }}><button id="btnPlusQty" type="button" onClick={this.onItemPlusQuantityChange} className="btn btn-sm">
                                                                    <FaPlus />
                                                                </button></div>
                                                                <div className="col-sm-1" style={{ marginLeft: '20px' }}><button type="button" id="button1"
                                                                    className="btn btn-secondary" onClick={this.onQtyAddButtonChange}
                                                                    disabled={(this.state.quantity === '')}>+</button></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <hr />
                                                <div className="table-responsive">
                                                    <table className="table">

                                                        <tbody>
                                                            {this.state.qtyItems.length > 0 && this.state.qtyItems.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="col-sm-6">{item.name}</td>
                                                                    <td className="col-sm-4">{item.qty}</td>
                                                                    <td className="col-sm-2"><button type="button" className="btn btn-light" onClick={e => this.onQtyItemsDelete(item.value)}><FaMinus /></button></td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Delivery;