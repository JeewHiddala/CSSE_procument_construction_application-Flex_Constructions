import React, { Component } from "react";
import axios from "axios";
import "../css/styles.css";
import Swal from "sweetalert2";

class GoodsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {              //initialization
      goods: [],
      goodId:''
    };
    this.onChange = this.onChange.bind(this); //bind onChange function.
    this.navigateCreateGoodPage = this.navigateCreateGoodPage.bind(this);
    this.navigateSearchGoodPage = this.navigateSearchGoodPage.bind(this);
    this.navigateEditGoodPage = this.navigateEditGoodPage.bind(this);        //navigate to edit page
    this.deleteGood = this.deleteGood.bind(this);         //delete supplier
    this.back = this.back.bind(this);                //handle checkbox values 
  }

  componentDidMount() {   //inbuild function
    this.fetchGoodsDetails();
    }

    back(e) {
        window.location = '/goods'
    }

  onChange(e) {
    //update states
    this.setState({ [e.target.name]: e.target.value });
  }
  
  navigateEditGoodPage(e, goodId) {       //navigate to edit page
    window.location = `/editGoods/${goodId}`
}

navigateCreateGoodPage(e) {
    window.location = '/createGoods'
}

navigateSearchGoodPage(e) {      //search
    e.preventDefault();   
    console.log("abcd", this.state.goodName);
    let goodName = this.state.goodName;        
    window.location = `/searchGoods/${goodName}`
}

deleteGood(e , goodId) {
    console.log("I am on Delete", goodId)
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
            axios.delete(`http://localhost:8300/good/${goodId}`)
            Swal.fire(
                'Deleted!',
                'Good has been deleted.',
                'success'
            )
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '/goods'
                }
            })
        }
    })
}

fetchGoodsDetails() {                // fetch and retrive data
    axios.get("http://localhost:8300/good/").then((response) => {
      this.setState({ goods: response.data.data });
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
                    <b>Goods Management</b>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                                <div className="container" >
                                    <div className="float-end" id="mgl">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateGoodPage(e)}>Add New Good</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchGoodPage}>
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter Goods Name" 
                                             aria-label="Search"
                                             name="goodName"
                                             value={this.state.goodName}      //bind state value
                                             onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="topic"><b>Goods DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Good ID</th>
                                                    <th scope="col">Good Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Item Price</th>                                        
                                                    <th scope="col"></th>                                                    
                                                    <th scope="col"></th>  
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.goods.length > 0 && this.state.goods.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.goodId}</td>
                                                    <td>{item.goodName}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.itemPrice}</td>
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateEditGoodPage(e, item._id)}>Edit</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteGood(e, item._id)}>Delete</button></td>
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

export default GoodsScreen;
