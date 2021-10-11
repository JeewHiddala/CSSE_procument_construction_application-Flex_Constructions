
import React, { Component } from 'react';
import '../../css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';
import Select from 'react-select';


const initialState = {

    siteNo: '',
    location: '',
    address: '',
    siteMgrId: '',
    sites: [],
    empName: '',
    contactNo: 0,
    selectedEmployee: '',
    options1: [],
    employees: []
}

class CreateSite extends Component {

    constructor(props) {
        super(props);
        this.state = {

            id: '',
            searchValue: '',

        }
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialState;

    }

    componentDidMount() {

        const { data } = this.props.location

        console.log("userid: " + data);

        axios.get(`http://localhost:8300/site/${data}`)
            .then(response => {
                this.setState({ sites: response.data.data });
                this.setState({ siteMgrId: response.data.data });
                this.setState({ siteNo: response.data.data.siteNo });
                this.setState({ location: response.data.data.location });
                this.setState({ address: response.data.data.address });
                this.setState({ contactNo: response.data.data.contactNo });
                this.setState({ empId: response.data.data.siteMgrId.empId });
                this.setState({ empName: response.data.data.siteMgrId.empName });

                console.log("abc" + response.data.data.siteNo);
                console.log("abc1", response.data.data.siteMgrId.empName);

            })


        axios.get('http://localhost:8300/employee/')
            .then(response => {
                this.setState({ employees: response.data.data }, () => {
                    let data = [];
                    this.state.employees.map((item, index) => {
                        let employees = {
                            value: item._id,
                            label: item.empName
                        }
                        data.push(employees)
                        console.log("a" + employees);
                    });
                    this.setState({ options1: data });
                })
            })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleEmployeeChange = selectedEmployee => {
        this.setState({ selectedEmployee });
        console.log('Option selected:', selectedEmployee);

    }
    onSubmit(e) {
        e.preventDefault();
        const { data } = this.props.location

        console.log("userid: " + data);
        let site = {

            siteNo: this.state.siteNo,
            location: this.state.location,
            address: this.state.address,
            contactNo: this.state.contactNo,
            siteMgrId: this.state.selectedEmployee.value,

        };

        console.log('DATA TO SEND', site);


        Swal.fire({
            title: "Create the site !",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Create!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8300/site/create', site)
                    .then(response => {
                        Swal.fire(
                            ' Created Successfully!',
                            'success'
                        )

                        window.location = '/sites'
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        })

    }

    backtoSitesdashboard(e) {
        window.location = '/sites'
    }


    render() {
        const { data } = this.props.location;

        const { selectedEmployee } = this.state.selectedEmployee;
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
                                        <li className="breadcrumb-item" id=""><a href="/" className="breadcrumb"><b>Site Management</b></a></li>
                                        {/* <li className="breadcrumb-item active" aria-current="page"><b>Approvals</b></li> */}
                                    </ol>
                                </nav>
                                <div className="container-update" >


                                    <h6>Create Site</h6>
                                    <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "right" }}>

                                    </h5>

                                    <form onSubmit={this.onSubmit} onChange={this.onChange}>


                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="empName" className="form-label">Employee Name</label>
                                                <Select
                                                    placeholder="Select Employee"
                                                    name={this.state.empName}
                                                    value={selectedEmployee}
                                                    options={this.state.options1}
                                                    onChange={this.handleEmployeeChange}
                                                    className="basic-single"

                                                />
                                            </div>
                                        </div>


                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="siteNo" className="form-label">Site No</label>
                                                        <input type="siteNo"
                                                            className="form-control"
                                                            id="siteNo"
                                                            name="siteNo"
                                                            placeholder="Enter site No"
                                                            value={this.state.siteNo}
                                                            onChange={this.onChange}
                                                            required

                                                        />


                                                    </div>


                                                    <div className="col" style={{ textAlign: "left" }}>
                                                        <label htmlFor="location" className="form-label">Location</label>
                                                        <input type="location"
                                                            className="form-control"
                                                            id="location"
                                                            name="location"
                                                            placeholder="Enter location"
                                                            value={this.state.location}
                                                            onChange={this.onChange}
                                                            required

                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="address" className="form-label">Address</label>
                                                        <input type="address"
                                                            className="form-control"
                                                            id="address"
                                                            name="address"
                                                            placeholder="Enter address"
                                                            value={this.state.address}
                                                            onChange={this.onChange}
                                                            required

                                                        />
                                                    </div>


                                                    <div className="col" style={{ textAlign: "left" }}>
                                                        <label htmlFor="contactNo" className="form-label">Contact No</label>
                                                        <input type="contactNo"
                                                            className="form-control"
                                                            id="contactNo"
                                                            name="contactNo"
                                                            placeholder="Enter contactNo"
                                                            value={this.state.contactNo}
                                                            onChange={this.onChange}
                                                            required

                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>



                                        <br></br>
                                        <button type="button" className="btn btn-secondary" onClick={e => this.backtoSitesdashboard(e)}> Back</button>
                                        <button type="submit" id="form-button1" className="btn btn-success">Create</button>


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
export default CreateSite;