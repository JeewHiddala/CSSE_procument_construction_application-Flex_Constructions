import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';    //make routes


import Delivery from './components/screens/delivery_Recordings';
import viewDeliveryDetails from './components/screens/viewDeliveryDetails';
import deliveryManagement from './components/screens/deliveryManagement';
import Orders from './components/screens/order.screens';         //IT19007502
import OrderReport from './components/report/orderReport.report';         //IT19007502
import Suppliers from './components/screens/supplier.screen';         //IT19007502
import CreateSuppliers from './components/forms/createForms/createSupplier.forms';         //IT19007502
import EditSuppliers from './components/forms/editForms/editSupplier.forms';         //IT19007502
import SearchSuppliers from './components/forms/searchForm/searchSupplier.form';         //IT19007502
import Goods from './components/screens/good.screen';         //IT19007502
import CreateGoods from './components/forms/createForms/createGood.form';         //IT19007502
import EditGoods from './components/forms/editForms/editGood.form';         //IT19007502
import SearchGoods from './components/forms/searchForm/searchGood.form';         //IT19007502
import Employees from './components/screens/employee.screen';         //IT19007502
import CreateEmployees from './components/forms/createForms/createEmployee.form';         //IT19007502
import EditEmployees from './components/forms/editForms/editEmployee.form';         //IT19007502
import SearchEmployees from './components/forms/searchForm/searchEmployee.form';         //IT19007502
import categoryDashoboardGenManager from './components/dashboards/categories-GManager.dashboard';         //IT19007502
import Footer from './components/footer';
import itemsManagement from './components/screens/itemsManagement';
import siteManagement from './components/screens/siteManagement';
import UpdateItemsDetails from './components/screens/update-views/updateItems';
import UpdateSiteDetails from './components/screens/update-views/updateSite';
import logManagement from './components/screens/logManagement';
import ViewLogDetails from './components/screens/details-view/logView';
import viewOrder from './components/screens/viewSelectedOrder';
import CreateSite from './components/screens/createform/create-site';



function App(){
    return(
        <div>
            <Router>
            <section>
                    <Switch>


                        
                        
                        <Route path="/create-delivery" component={Delivery} />
                        <Route path="/view-delivery/:id" component={viewDeliveryDetails} />
                        <Route path="/delivery-dashboard" component={deliveryManagement} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/orderReport/:id" component={OrderReport} />
                        <Route path="/suppliers" component={Suppliers} />
                        <Route path="/createSuppliers" component={CreateSuppliers} />
                        <Route path="/editSuppliers/:id" component={EditSuppliers} />
                        <Route path="/searchSuppliers/:id" component={SearchSuppliers} />
                        <Route path="/goods" component={Goods} />
                        <Route path="/createGoods" component={CreateGoods} />
                        <Route path="/editGoods/:id" component={EditGoods} />
                        <Route path="/searchGoods/:id" component={SearchGoods} />
                        <Route path="/employees" component={Employees} />
                        <Route path="/createEmployees" component={CreateEmployees} />
                        <Route path="/editEmployees/:id" component={EditEmployees} />
                        <Route path="/searchEmployees/:id" component={SearchEmployees} />
                        <Route exact path="/categoryDashboard-GM" component={categoryDashoboardGenManager} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/categoryDashboard-GM"/>
                        )}/>
                        <Route path="/order/:id" component={viewOrder} />
                        <Route path="/items" component={itemsManagement} />
                        <Route path="/sites" component={siteManagement} />
                        <Route path="/createSite" component={CreateSite} />
                        <Route path="/log" component={logManagement} />
                        <Route path="/updateItem/:id" component={UpdateItemsDetails} />
                        <Route path="/updateSite/:id" component={UpdateSiteDetails} />
                        <Route path="/viewlog/:id" component={ViewLogDetails} />
                    </Switch>
                </section>
                <Footer/>

            </Router>
        </div>
    );
}

export default App;