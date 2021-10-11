
import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import '../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';


class logManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
       
            id: '',
            logs: [],
           

        }
        this.deleteLog = this.deleteLog.bind(this);
        this.viewLog = this.viewLog.bind(this);
        this.updateLog = this.updateLog.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getBadgeClasses = this.getBadgeClasses.bind(this);
        this.getOrderBadges = this.getOrderBadges.bind(this);
 
 
    }



    componentDidMount() {
        axios.get('http://localhost:8300/log')
            .then(response => {
                this.setState({ logs: response.data.data });  
                console.log("abc" + response.data.data);
            })


    }


    viewLog(e, logId) {
        this.props.history.push({
            pathname: `/viewlog/${logId}`,
            data: `${logId}`
        });
    }


    updateLog(e, logId) {
        this.props.history.push({
            pathname: `/updateLog/${logId}`,
            data: `${logId}`
        });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }


    deleteLog(e, logId) {
        console.log("Delete", logId)
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
                axios.delete(`http://localhost:8300/log/${logId}`)
                Swal.fire(
                    'Deleted!',
                    'Log detail Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
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


    getOrderBadges(x){
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
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Log Management</b></a></li>
                                        {/* <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li> */}
                                    </ol>
                                </nav>
                                <form onSubmit={this.onSubmit}  onChange={this.onChange}>
                                <Container fluid id="fluid">
                                <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    
                                                    <th>Order Ref No</th>
                                                    <th>OrderStatus</th>
                                                    <th>Approval Status</th>
                                                    
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.logs.length > 0 && this.state.logs.map((item, index) => (
                                                    <tr key={index}>
                                                       
                                                        <td>{item.orderRef.orderRefNo}</td>                                                        
                                                        <td><div><span className={this.getOrderBadges(item.orderRef.orderStatus)}>{item.orderRef.orderStatus} </span></div></td>  
                                                        <td><div><span className={this.getBadgeClasses(item.orderRef.approvalStatus)}>{item.orderRef.approvalStatus} </span></div></td>                     
                                                        <td><button type="button" id="btn-tab" className="btn btn-info" onClick={e => this.viewLog(e, item._id)}>View</button></td>
                                                 
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
export default logManagement;