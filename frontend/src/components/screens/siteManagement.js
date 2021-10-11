
import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import '../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';


class siteManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
           
            id: '',
            sites: [],
            searchValue: '',
            siteNo: '',

        }
        this.deleteSite = this.deleteSite.bind(this);      
        this.updateSite = this.updateSite.bind(this);
        this.onChange = this.onChange.bind(this);
    

    }



    componentDidMount() {
        axios.get('http://localhost:8300/site/')
            .then(response => {
                this.setState({ sites: response.data.data });
               
                console.log("abc" + response.data.data);

            })


    }


    updateSite(e, siteId) {
        this.props.history.push({
            pathname: `/updateSite/${siteId}`,
            data: `${siteId}`
        });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    createSite() {
        window.location = `/createSite`
    }


    deleteSite(e, siteId) {
        console.log("Delete", siteId)
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
                axios.delete(`http://localhost:8300/site/${siteId}`)
                Swal.fire(
                    'Deleted!',
                    'Site Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }

    searchHandler = (event) => {

        let searchResults = this.state.sites;
        searchResults = searchResults.filter(result => {
            return result.location.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;

        });

        this.setState({
            sites: searchResults,
            searchValue: event.target.value.toLowerCase()

        }, () => console.log('state', this.state))


    };

  


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

                            <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={() => this.createSite()}>Create Site</button>
                                    </div>
                                
                            <div className="float-end">
                                        <form className="d-flex" >
                                        <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Enter location"
                                                aria-label="Search"
                                                name="location"
                                                value={this.state.searchValue}
                                                onChange={this.searchHandler}
                                            />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>

                                    </div>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Site Management</b></a></li>
                                        {/* <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li> */}
                                    </ol>
                                </nav>
                                <form onSubmit={this.onSubmit}  onChange={this.onChange}>
                                <Container fluid id="fluid">
                                <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Site No</th>
                                                    <th>Location</th>
                                                    <th>Address</th>
                                                    <th>Contact No</th>
                                                    <th>Site Managers Name</th>

                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.sites.length > 0 && this.state.sites.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.siteNo}</td>
                                                        <td>{item.location}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.contactNo}</td>
                                                        <td>{item.siteMgrId.empName}</td>
                                                        
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateSite(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteSite(e, item._id)}>Delete</button></td>
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
export default siteManagement;