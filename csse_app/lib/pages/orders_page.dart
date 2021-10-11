import 'package:badges/badges.dart';
import 'package:csse_app/components/supplier_card.dart';
import 'package:csse_app/database/database_order.dart';
import 'package:csse_app/models/order.dart';
import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/pages/add_order.dart';
import 'package:csse_app/pages/add_supplier_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';


class OrderPage extends StatefulWidget {
  const OrderPage({Key? key}) : super(key: key);

  @override
  _OrderPageState createState() => _OrderPageState();
}

class _OrderPageState extends State<OrderPage> {
  final _searchFormKey = GlobalKey<FormState>();
  @override
  void initState() {
    super.initState();
  }

  var search = " ";
  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  final searchController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: OrderDatabase.getDocuments(),
        builder: (context, AsyncSnapshot snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              color: Colors.white,
              child: const LinearProgressIndicator(
                backgroundColor: Colors.black,
              ),
            );
          } else {
            if (snapshot.hasError) {
              return Container(
                color: Colors.white,
                child: Center(
                  child: Text(
                    'Something went wrong, try again.',
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
              );
            } else {
              return Scaffold(
                backgroundColor: Colors.white,
                appBar: AppBar(
                  title: const Text('Flex Constructions'),
                ),
                body: ListView(
                  children: [
                      Row(
                      children: [
                        const Padding(
                          padding: EdgeInsets.only(left: 15.0, right: 130.0, top: 10.0),
                          child:
                          Text(
                            'Place New Order',
                            style: TextStyle(
                              fontSize: 20.0,
                            ),
                            textAlign: TextAlign.start,
                          ),
                        ),
                        Padding(
                        padding: const EdgeInsets.only( top: 10.0),
                        child:
                        ElevatedButton(
                          onPressed: () async {
                            //Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const AddOrderPage()));
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const AddOrderPage(),
                              ),
                            );
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 10.0, right: 10.0),
                            child: Text(
                              'Place',
                              style: TextStyle(fontSize: 20.0, color: Colors.white, fontWeight: FontWeight.w500),
                            ),
                          ),
                        ),
                        ),
                      ],
                      ),
                    const SizedBox(height: 20.0,),
                      Form(
                      key: _searchFormKey,
                      child: Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: ListView(
                        shrinkWrap: true,
                      children: [
                      Row(
                      children: [
                        const Padding(
                          padding: EdgeInsets.only(left: 15.0, right: 105.0, top: 10.0, bottom: 10.0),
                          child:
                          Text(
                            'Search Order',
                            style: TextStyle(
                              fontSize: 20.0,
                            ),
                            textAlign: TextAlign.start,
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.only(left: 20.0, top: 10.0),
                          height: 40,
                          width: 140,
                          child: TextFormField(
                            autofocus: false,
                            cursorHeight: 20.0,
                            cursorColor: Colors.black,
                            textAlignVertical: TextAlignVertical.center,
                            style: const TextStyle(
                              fontSize: 24,
                            ),
                            decoration: const InputDecoration(
                              fillColor: Colors.white,
                              filled: true,
                              hintText: "Ref No",
                              hintStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                              ),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.all(Radius.circular(8)),
                              ),
                              errorStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                              ),
                            ),
                            controller: searchController,
                            validator: (value){
                              if(value == null || value.isEmpty){
                                return 'Please enter Ref No';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                        Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children:[
                        Padding(
                          padding: const EdgeInsets.only( top: 10.0, left: 250.0),
                          child:
                          ElevatedButton(
                            onPressed: () async {
                              //Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
                            },
                            child: const Padding(
                              padding: EdgeInsets.only(left: 10.0, right: 10.0,),
                              child: Text(
                                'Find',
                                style: TextStyle(fontSize: 20.0, color: Colors.white, fontWeight: FontWeight.w500),
                              ),
                            ),
                          ),
                        ),
                        ],
                        ),
                    ],
                      ),
                      ),
                      ),
                    const SizedBox(height: 10.0,),
                    const Padding(
                      padding: EdgeInsets.only(left: 15.0),
                      child:
                      Text(
                        'Order History',
                        style: TextStyle(
                          fontSize: 20.0,
                        ),
                        textAlign: TextAlign.start,
                      ),
                    ),
                      const SizedBox(height: 10.0,),
                      Row(
                        children: [
                          Padding(
                          padding: const EdgeInsets.only(left: 10.0),
                          child:
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [Text(
                            'Order Ref.',
                              style: TextStyle(
                                fontSize: 18.0,
                              ),
                              textAlign: TextAlign.center,
                              ),]
                          ),
                          ),
                          Padding(
                          padding: const EdgeInsets.only(left: 32.0),
                          child:
                          Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                            children: const [Text(
                            'Approval',
                              style: TextStyle(
                                fontSize: 18.0,
                              ),
                              textAlign: TextAlign.center,
                            ),]
                          ),
                          ),
                          Padding(
                          padding: const EdgeInsets.only(left: 80.0),
                          child:
                          Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                            children: const [Text(
                            'Order Status',
                              style: TextStyle(
                                fontSize: 18.0,
                              ),
                              textAlign: TextAlign.center,
                            ),]
                          ),
                          ),
                          ],
                      ),
                    ListView.builder(
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        final Order order = Order.fromMap(snapshot.data[index]);
                        Color getApprovalColor(text){
                          if(text == "Declined"){
                            return Colors.red;
                          }else if(text == "Approved"){
                            return Colors.green;
                          }else if(text == "Partially Approved"){
                            return Colors.lightBlueAccent;
                          }else if(text == "Waiting For Approval"){
                            return Colors.yellow;
                          }else if(text == "Return To Originator"){
                            return Colors.black;
                          }else{
                            return Colors.grey;
                          }
                        }
                        Color getOrderColor(text){
                          if(text == "Declined"){
                            return Colors.red;
                          }else if(text == "Place Now"){
                            return Colors.lightBlueAccent;
                          }else if(text == "Delivered"){
                            return Colors.green;
                          } else{
                            return Colors.grey;
                          }
                        }
                        Color getColor(text){
                          if(text == "Return To Originator"){
                            return Colors.white;
                          } else{
                            return Colors.black;
                          }
                        }
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            children: [
                              Padding(
                              padding: const EdgeInsets.only(left: 10.0),
                              child:
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children:[
                                Text(
                                  order.orderRefNo,
                                style: const TextStyle(
                                  fontSize: 15.0,
                                ),
                                textAlign: TextAlign.center,
                              ),
                                ],
                              ),
                              ),
                              Flexible(
                              flex: 4,
                              fit: FlexFit.tight,
                              child: Padding(
                              padding: const EdgeInsets.only(left: 35.0),
                              child:
                                Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                mainAxisSize: MainAxisSize.max,
                                children:[
                                Badge(
                                  badgeContent: Text(
                                  order.approvalStatus,
                                  style:  TextStyle(
                                  fontSize: 15.0,
                                    color: getColor(order.approvalStatus),
                                  ),
                                  textAlign: TextAlign.center,
                                  ),
                                  toAnimate: false,
                                  padding: const EdgeInsets.all(10),
                                  shape: BadgeShape.square,
                                  alignment: AlignmentDirectional.centerStart,
                                  badgeColor: getApprovalColor(order.approvalStatus),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                ],
                                ),
                              ),
                              ),
                              Flexible(
                              flex: 4,
                                fit: FlexFit.tight,
                              child:
                              Padding(
                              padding: const EdgeInsets.only(left: 10.0),
                              child:
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                              children:[
                              Badge(
                                badgeContent: Text(
                                  order.orderStatus,
                                  style: const TextStyle(
                                    fontSize: 15.0,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                toAnimate: false,
                                padding: const EdgeInsets.all(10),
                                shape: BadgeShape.square,
                                alignment: AlignmentDirectional.centerStart,
                                badgeColor: getOrderColor(order.orderStatus),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              ],
                              ),
                              ),
                              ),
                            ],
                          ),
                        );
                      },
                      itemCount: snapshot.data.length,
                    ),
                  ],
                ),

                // floatingActionButton: FloatingActionButton(
                //   onPressed: () {
                //     Navigator.push(context,
                //         MaterialPageRoute(builder: (BuildContext context) {
                //           return AddSupplierPage();
                //         })).then((value) => setState(() {}));
                //   },
                //   child: const Icon(Icons.add),
                // ),
              );
            }
          }
        });
  }

}