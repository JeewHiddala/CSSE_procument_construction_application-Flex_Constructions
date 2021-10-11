
import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import '../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';


class itemsManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
           
            id: '',
            items: [],
 

        }
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onChange = this.onChange.bind(this);
      


    }


    componentDidMount() {
        axios.get('http://localhost:8300/item/')
            .then(response => {
                this.setState({ items: response.data.data });
               
                console.log("abc" + response.data.data);

            })


    }


    updateItem(e, itemId) {
        this.props.history.push({
            pathname: `/updateItem/${itemId}`,
            data: `${itemId}`
        });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }


    deleteItem(e, itemId) {
        console.log("Delete", itemId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8300/item/${itemId}`)
                Swal.fire(
                    'Deleted!',
                    'Item Removed.',
                    'success'
                )
            }
            window.location.reload(false);
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
                                    
                                    </ol>
                                </nav>
                                
                                <form onSubmit={this.onSubmit}  onChange={this.onChange}>

                                <Container fluid id="fluid">

                                    
                                <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>GoodID</th>
                                                    <th>Good Name</th>
                                                    <th>item Price</th>
                                                    <th>quantity</th>
                                                    <th>Total Price</th>
                                                    
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.items.length > 0 && this.state.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.itemId.goodId}</td>
                                                        <td>{item.itemId.goodName}</td>
                                                        <td>{item.itemId.itemPrice}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.individualTotprice}</td>
                                                        
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateItem(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteItem(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
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
export default itemsManagement;