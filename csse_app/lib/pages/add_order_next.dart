import 'package:csse_app/database/database_item.dart';
import 'package:csse_app/database/database_order.dart';
import 'package:csse_app/database/database_site.dart';
import 'package:csse_app/models/order.dart';
import 'package:flutter/material.dart';
import 'package:mongo_dart/mongo_dart.dart' as M;

import 'orders_page.dart';

class PlaceOrderPage extends StatefulWidget {
  const PlaceOrderPage({ Key? key, required this.refNo, required this.supplier, required this.items, required this.total, required this.issueDate}) : super(key: key);
  final String refNo;
  final M.ObjectId supplier;
  final List items;
  final String total;
  final DateTime issueDate;

  @override
  _PlaceOrderPageState createState() => _PlaceOrderPageState();
}

class _PlaceOrderPageState extends State<PlaceOrderPage> {
  final _placeOrderFormKey = GlobalKey<FormState>();
  var companyName = " ";
  var deliveryAddress = " ";
  var site = " ";
  var description = " ";

  @override
  void dispose() {
    companyNameController.dispose();
    deliveryAddressController.dispose();
    siteController.dispose();
    descriptionController.dispose();
    approvalStatusController.dispose();
    orderStatusController.dispose();
    super.dispose();
  }

  TextEditingController companyNameController = TextEditingController();
  TextEditingController deliveryAddressController = TextEditingController();
  TextEditingController siteController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  TextEditingController approvalStatusController = TextEditingController();
  TextEditingController orderStatusController = TextEditingController();

  var widgetText = 'Purchase Order';

  Object? _selectedSite;
  List itemIdArray = [];
  insertOrder() async{
    for (var element in widget.items) {
      itemIdArray.add(element.id);
      await ItemDatabase.insert(element);
      print(element.id);
    }

    final order = Order(
      id: M.ObjectId(),
      totalPrice: int.parse(widget.total),
      deliveryAddress: deliveryAddressController.text,
      approvalStatus: 'Pending',
      orderStatus: 'Waiting For Approval',
      companyName: companyNameController.text,
      description: descriptionController.text,
      items: itemIdArray,
      orderRefNo: widget.refNo,
      supplier: widget.supplier,
      site: _selectedSite as M.ObjectId,
      issueDate: widget.issueDate,
    );
    await OrderDatabase.insert(order);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      backgroundColor: Colors.greenAccent,
      content: Text('Order successfully inserted.',
        style: TextStyle(
            fontSize: 18.0,
            color: Colors.white
        ),
      ),
    ),
    );
    Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => const OrderPage(),
        ));
  }
  // updateUser() async{
  //   await FirebaseAuth.instance.currentUser!.updatePassword(password);
  //   await DatabaseUser.updateUser(docId: docId, firstName: firstName, lastName: lastName, password: password, email: email,);
  //   ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
  //     backgroundColor: Colors.blueGrey,
  //     content: Text(
  //       'Updated successfully.',
  //       style: TextStyle(
  //           fontSize: 20.0
  //       ),
  //     ),
  //   ));
  // }

  @override
  Widget build(BuildContext context) {
    //print(widget.issuedDate);
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widgetText,
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        child: Form(
        key: _placeOrderFormKey,
        child: ListView(
          children: [
            const Padding(
              padding: EdgeInsets.only(left: 10.0, top: 30.0),
              child:
              Text(
                'Company Name',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 10.0, top: 10.0),
              height: 40,
              child: TextFormField(
                autofocus: false,
                cursorHeight: 20.0,
                cursorColor: Colors.black,
                textAlignVertical: TextAlignVertical.center,
                style: const TextStyle(
                  fontSize: 18,
                ),
                decoration: const InputDecoration(
                  fillColor: Colors.white,
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                  errorStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 15,
                  ),
                ),
                controller: companyNameController,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Please enter company name';
                  }
                  return null;
                },
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(left: 10.0, top: 10.0),
              child:
              Text(
                'Delivery Address',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 10.0, top: 10.0),
              height: 80,
              child: TextFormField(
                autofocus: false,
                cursorHeight: 20.0,
                cursorColor: Colors.black,
                textAlignVertical: TextAlignVertical.center,
                style: const TextStyle(
                  fontSize: 18,
                ),
                decoration: const InputDecoration(
                  fillColor: Colors.white,
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                  errorStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 15,
                  ),
                ),
                controller: deliveryAddressController,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Please enter delivery address';
                  }
                  return null;
                },
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(left: 10.0, top: 10.0),
              child:
              Text(
                'Site',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 10.0, top: 10.0, bottom: 10.0),
              child:
              FutureBuilder<List>(
                future: SiteDatabase.getDocuments(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return DropdownButtonFormField(
                      value: _selectedSite,
                      decoration: InputDecoration(
                          isDense: true,
                          contentPadding: const EdgeInsets.fromLTRB(15, 15, 10, 0),
                          border: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                          filled: true,
                          hintStyle: TextStyle(color: Colors.grey[800]),
                          hintText: "Site Name",
                          fillColor: Colors.white),
                      items: snapshot.data!.map((document) {
                        return DropdownMenuItem(
                          child: Text(document['location']),
                          value: document['_id'],
                        );
                      }).toList(),
                      onChanged: (newValue) {
                        setState(() {
                          _selectedSite = newValue;
                        });
                      },
                    );
                  }
                  return const Center(child: CircularProgressIndicator());
                },
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(left: 10.0, top: 10.0),
              child:
              Text(
                'Description',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 10.0, top: 10.0),
              height: 80,
              child: TextFormField(
                autofocus: false,
                cursorHeight: 20.0,
                cursorColor: Colors.black,
                textAlignVertical: TextAlignVertical.center,
                style: const TextStyle(
                  fontSize: 18,
                ),
                decoration: const InputDecoration(
                  fillColor: Colors.white,
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                  errorStyle: TextStyle(
                    color: Colors.black,
                    fontSize: 15,
                  ),
                ),
                controller: descriptionController,
              ),
            ),
            const SizedBox(height: 15,),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.only(left: 10.0, top: 20.0),
                  child:
                ElevatedButton(
                  onPressed: (){
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Previous',
                    style: TextStyle(
                        fontSize: 18.0,
                      color: Colors.white,
                    ),
                  ),
                ),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 100.0, top: 20.0),
                  child:
                ElevatedButton(
                  style:  ElevatedButton.styleFrom(
                    primary: Colors.green,
                  ),
                  onPressed: (){
                      insertOrder();
                  },
                  child: const Text(
                    'Save',
                    style: TextStyle(
                        fontSize: 18.0,
                      color: Colors.white,
                    ),
                  ),
                ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10.0, top: 20.0),
                  child:
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Colors.grey,
                    ),
                    onPressed: (){
                      _placeOrderFormKey.currentState!.reset();
                    },
                    child: const Text(
                      'Clear',
                      style: TextStyle(
                        fontSize: 18.0,
                        color: Colors.white,
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
      );
  }
}
