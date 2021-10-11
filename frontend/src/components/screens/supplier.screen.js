import React, { Component } from "react";
import axios from "axios";
import "../css/styles.css";
import Swal from "sweetalert2";

class SuppliersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {              //initialization
      suppliers: [],
      supplierId:'',
      isClicked: false
    };
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.navigateCreateSupplierPage = this.navigateCreateSupplierPage.bind(this);
    this.navigateSearchSupplierPage = this.navigateSearchSupplierPage.bind(this);
    this.navigateEditSupplierPage = this.navigateEditSupplierPage.bind(this);        //navigate to edit page
    this.deleteSupplier = this.deleteSupplier.bind(this);         //delete supplier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

  componentDidMount() {   //inbuild function
    this.fetchSuppliersDetails();
    }

    back(e) {
        window.location = '/orders'
    }

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  navigateEditSupplierPage(e, supplierId) {       //navigate to edit page
    window.location = `/editSuppliers/${supplierId}`
}

navigateCreateSupplierPage(e) {
    window.location = '/createSuppliers'
}

navigateSearchSupplierPage(e) {      //search
    e.preventDefault();   
    console.log("abcd", this.state.supplierName);
    let supplierName = this.state.supplierName;        
    window.location = `/searchSuppliers/${supplierName}`
}

deleteSupplier(e , supplierId) {
    console.log("I am on Delete", supplierId)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it permanently!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8300/supplier/${supplierId}`)
            Swal.fire(
                'Deleted!',
                'Supplier has been deleted.',
                'success'
            )
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '/suppliers'
                }
            })
        }
    })
}

fetchSuppliersDetails() {                // fetch and retrive data
    axios.get("http://localhost:8300/supplier/").then((response) => {
      this.setState({ suppliers: response.data.data });
      // this.setState({ services: response.data.data.docs });          //pagination
      // this.setState({ totalPages: response.data.data.totalPages });          //pagination
    });
  }

  render() {
    //use to return things when call createSubject component.
    return (
      <div className="container-fluid">
        <div className="row align-items-start align-items-stretch">
          <div className="col-2" id="partition">
            <h1 className="display-4" id="web-title">
              Flex
            </h1>
            <h6 className="text-center" id="web-title1">
              &ensp;Constructions.....
            </h6>
            <br />
            <ul className="list-group" id="dash-list">
              <li className="list-group-item border-0" id="dash-item">
                <a href="/categoryDashboard-GM" className="dash-item">
                  Dashboard
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/orders" className="dash-item">
                  Order
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/delivery-dashboard" className="dash-item">
                  Delivery
                </a>
              </li>
              <li className="list-group-item border-0" id="dash-item">
                <a href="/" className="dash-item">
                  Approval
                </a>
              </li>
            </ul>
          </div>
          <div className="col-9" id="partition1">
            <div className="row" id="header">
              <div className="col align-self-stretch">
                <button
                  className="btn btn-primary position-absolute top-0 end-0"
                  id="signout"
                  type="submit"
                >
                  Sign Out
                </button>
                <br />
                <br />
              </div>
              <br />
              <br />
            </div>

            <div className="container align-self-stretch" id="content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item" id="">
                    <a href="/categoryDashboard-GM" className="breadcrumb">
                      <b>Dashboard</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <b>Supplier Management</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="float-end" id="mgl">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateSupplierPage(e)}>Add New Supplier</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchSupplierPage}>
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter Supplier Name" 
                                             aria-label="Search"
                                             name="supplierName"
                                             value={this.state.supplierName}      //bind state value
                                             onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="topic"><b>Supplier DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Supplier ID</th>
                                                    <th scope="col">Supplier Name</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Contact No</th>                                        
                                                    <th scope="col"></th>                                                    
                                                    <th scope="col"></th>  
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.suppliers.length > 0 && this.state.suppliers.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.supplierId}</td>
                                                    <td>{item.supplierName}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateEditSupplierPage(e, item._id)}>Edit</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteSupplier(e, item._id)}>Delete</button></td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    /> */}
                                </div>
                            </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SuppliersScreen;
