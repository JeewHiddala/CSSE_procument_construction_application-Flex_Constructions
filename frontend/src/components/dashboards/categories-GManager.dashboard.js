import React, { Component } from "react";
import axios from "axios";
import "../css/styles.css";
import Swal from "sweetalert2";
import EmployeeImg from "../../images/employees.png";
import GoodImg from "../../images/goods.png";
import SupplierImg from "../../images/suppliers.png";
import SiteImg from "../../images/site.png";
import ItemImg from "../../images/item.png";
import DeliveryImg from "../../images/delivery.png";
import LogImg from "../../images/log.png";


class CategoriesDashboardGManager extends Component {
  constructor(props) {
    super(props);
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
                <a href="/" className="dash-item">
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
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="/" className="breadcrumb">
                      <b>Dashboard</b>
                    </a>
                  </li>
                </ol>
              </nav>

              <div className=" align-self-stretch">
                <div className="container" >
                    <div className="row">
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={EmployeeImg} class="card-img-top" alt="employees"></img>
                            <div className="card-body">
                                <h5 className="card-title">Employee Management</h5>
                                <p className="card-text">Employee Management is used to get records about all recruited employees in the Company.</p>
                                <a href="/employees" class="btn btn-primary">Go Employee Management</a>
                            </div>
                        </div>
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={GoodImg} class="card-img-top" alt="goods"></img>
                            <div className="card-body">
                                <h5 className="card-title">Goods Management</h5>
                                <p className="card-text">Good Management is the function for keeping track of the details regarding the goods that are purchased by the company.</p>
                                <a href="/goods" class="btn btn-primary">Go Goods Management</a>
                            </div>
                        </div>
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={SupplierImg} class="card-img-top" alt="supplier"></img>
                            <div className="card-body">
                                <h5 className="card-title">Supplier Management</h5>
                                <p className="card-text">Supplier Management is for maintaining the details of the suppliers contacted by the company for ordering goods.</p>
                                <a href="/suppliers" class="btn btn-primary">Go Supplier Management</a>
                            </div>
                        </div>
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={SiteImg} class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Site Management</h5>
                                <p className="card-text">Site Management is used to get the records of the site details to know where the construction is going</p>
                                <a href="/sites" class="btn btn-primary">Go Site Management</a>
                            </div>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={ItemImg} class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Item Management</h5>
                                <p className="card-text">Item management is a planned process and identification, planning purchasing, controlling and distributing items with the purpose of ensuring the availability of sufficient quantities, appropriate quality and reasonable cost of construction materials for project's need.</p>
                                <a href="/items" class="btn btn-primary">Go Item Management</a>
                            </div>
                        </div>
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={LogImg} class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Log Management</h5>
                                <p className="card-text">Logs are used to track the projects and view the constructions details and progress</p>
                                <a href="/log" class="btn btn-primary">Go Log Management</a>
                            </div>
                        </div>
                        <div className="card col-3" style={{width:  18+'rem'}}>
                            <img src={DeliveryImg} class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Delivery Management</h5>
                                <p className="card-text">Delivery management is the function of applying processes to ensure goods are effectively and efficiently transferred from one location to the next.</p>
                                <a href="/delivery-dashboard" class="btn btn-primary">Go Delivery Management</a>
                            </div>
                        </div>
                    </div>             
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CategoriesDashboardGManager;
