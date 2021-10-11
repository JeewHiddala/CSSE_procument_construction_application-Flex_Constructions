import 'package:csse_app/database/database_good.dart';
import 'package:csse_app/database/database_order.dart';
import 'package:csse_app/database/database_supplier.dart';
import 'package:csse_app/models/item.dart';
import 'package:csse_app/models/order.dart';
import 'package:csse_app/pages/add_order_next.dart';
import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_number_picker/flutter_number_picker.dart';
import 'package:mongo_dart/mongo_dart.dart' as M;

class AddOrderPage extends StatefulWidget {
  const AddOrderPage({Key? key}) : super(key: key);

  @override
  _AddOrderPageState createState() => _AddOrderPageState();
}

class _AddOrderPageState extends State<AddOrderPage> {
  TextEditingController refNoController = TextEditingController();
  TextEditingController supplierNameController = TextEditingController();
  TextEditingController issuedDateController = TextEditingController();
  TextEditingController totalPriceController = TextEditingController();



  @override
  void dispose() {
    super.dispose();
    refNoController.dispose();
    supplierNameController.dispose();
    issuedDateController.dispose();
    totalPriceController.dispose();
  }

  Map prices = {};
  Map goodNames = {};
  //final suppliers = SupplierDatabase.getSuppliers();
  int _price=0;
  int _selectedPrice=0;
  int _selectedQuantity=1;
  Object? _selectedSupplier;
  M.ObjectId? _selectedGood;
  List<Item> itemList = [];
  late DateTime _selectedDate;
  resetPicker(){
    setState((){
      _selectedQuantity = 1;
    });
  }

  final dateFormat = DateFormat("yyyy-MM-dd");

  @override
  Widget build(BuildContext context) {
    // var supplier = null;
    // if(ModalRoute.of(context)!.settings.arguments != null){
    //   supplier = ModalRoute.of(context)!.settings.arguments as Order;
    // }
    print(itemList);
    var widgetText = 'Purchase Order';


    // if (supplier != null) {
    //   supplierNameController.text = supplier.supplierName;
    //   supplierIdController.text = supplier.supplierId.toString();
    //   addressController.text = supplier.address;
    //   contactNoController.text = supplier.contactNo;
    //   widgetText = 'Update Supplier';
    // }
    return Scaffold(
      appBar: AppBar(
        title: Text(
            widgetText,
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
            child:
              ListView(
              shrinkWrap: true,
              children: [
                const Padding(
                  padding: EdgeInsets.only(left: 10.0, top: 10.0),
                  child:
                  Text(
                    'Ref No',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(left: 10.0, top: 10.0),
                  child: TextFormField(
                    autofocus: false,
                    cursorHeight: 20.0,
                    cursorColor: Colors.black,
                    textAlignVertical: TextAlignVertical.center,
                    style: const TextStyle(
                      fontSize: 15,
                    ),
                    decoration: const InputDecoration(
                      isDense: true,
                      contentPadding: EdgeInsets.fromLTRB(20, 20, 10, 0),
                      fillColor: Colors.white,
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                      ),
                      errorStyle: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    ),
                    controller: refNoController,
                    validator: (value){
                      if(value == null || value.isEmpty){
                        return 'Please enter Ref No';
                      }
                      return null;
                    },
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 10.0, top: 10.0),
                  child:
                  Text(
                    'Supplier Name',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10.0, top: 10.0, bottom: 10.0),
                  child:
                  FutureBuilder<List>(
                    future: SupplierDatabase.getDocuments(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return DropdownButtonFormField(
                          value: _selectedSupplier,
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
                              hintText: "Supplier Name",
                              fillColor: Colors.white),
                          items: snapshot.data!.map((document) {
                            return DropdownMenuItem(
                              child: Text(document['supplierName']),
                              value: document['_id'],
                            );
                          }).toList(),
                          onChanged: (newValue) {
                            setState(() {
                              _selectedSupplier = newValue;
                            });
                          },
                        );
                      }
                      return const Center(child: CircularProgressIndicator());
                    },
                  ),
                ),
                Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child:
                      Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [Text(
                            'Items',
                            style: TextStyle(
                              fontSize: 18.0,
                            ),
                            textAlign: TextAlign.center,
                          ),]
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 100.0),
                      child:
                      Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [Text(
                            'Price (Rs)',
                            style: TextStyle(
                              fontSize: 18.0,
                            ),
                            textAlign: TextAlign.center,
                          ),]
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 40.0),
                      child:
                      Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [Text(
                            'Quantity',
                            style: TextStyle(
                              fontSize: 18.0,
                            ),
                            textAlign: TextAlign.center,
                          ),]
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Flexible(
                    flex: 1,
                    fit: FlexFit.tight,
                    child:
                      Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child:
                      FutureBuilder<List>(
                            future: GoodDatabase.getDocuments(),
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                return DropdownButtonFormField(
                                  value: _selectedGood,
                                  decoration: InputDecoration(
                                      isDense: true,
                                      contentPadding: const EdgeInsets.fromLTRB(15, 15, 10, 0),
                                      border: const OutlineInputBorder(
                                        borderRadius: BorderRadius.all(
                                          Radius.circular(8.0),
                                        ),
                                      ),
                                      filled: true,
                                      hintStyle: TextStyle(color: Colors.grey[800], fontSize: 13.0),
                                      hintText: "Select item",
                                      fillColor: Colors.white),
                                  items: snapshot.data!.map((document) {
                                    prices.putIfAbsent(document['_id'], () => document['itemPrice']);
                                    goodNames.putIfAbsent(document['_id'], () => document['goodName']);
                                    //print(prices);
                                    return DropdownMenuItem(
                                      child: Text(document['goodName']),
                                      value: document['_id'],
                                    );
                                  }).toList(),
                                  onChanged: (newValue) {
                                    print(newValue as M.ObjectId);
                                    setState(() {
                                      _selectedGood = newValue;
                                     _price = prices[newValue] as int;
                                     _selectedPrice = _price*_selectedQuantity;
                                    });
                                    resetPicker();
                                  },
                                );
                              }
                              return const Center(child: CircularProgressIndicator());
                            },
                      ),
                    ),
                    ),
                    Flexible(
                    flex: 1,
                    fit: FlexFit.tight,
                    child:
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0),
                      child:
                      Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children:  [
                            // TextFormField(
                            //   autofocus: false,
                            //   initialValue: '$_selectedPrice',
                            //   cursorHeight: 20.0,
                            //   cursorColor: Colors.black,
                            //   textAlignVertical: TextAlignVertical.center,
                            //   style: const TextStyle(
                            //     fontSize: 15,
                            //   ),
                            //   decoration: const InputDecoration(
                            //     isDense: true,
                            //     contentPadding: EdgeInsets.fromLTRB(20, 20, 10, 0),
                            //     fillColor: Colors.white,
                            //     filled: true,
                            //     border: OutlineInputBorder(
                            //       borderRadius: BorderRadius.all(Radius.circular(8)),
                            //     ),
                            //     errorStyle: TextStyle(
                            //       color: Colors.white,
                            //       fontSize: 15,
                            //     ),
                            //   ),
                            // ),
                            Text(
                            '$_selectedPrice',
                            style: const TextStyle(
                              fontSize: 18.0,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          ]
                      ),
                    ),
                    ),
                    Flexible(
                    flex: 1,
                    fit: FlexFit.tight,
                    child:
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child:
                      Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomNumberPicker(
                              initialValue: _selectedQuantity,
                              maxValue: 100,
                              minValue: 1,
                              step: 1,
                              valueTextStyle: const TextStyle(fontSize: 15.0),
                              enable: true,
                              customAddButton: const Icon(Icons.add),
                              customMinusButton: const Icon(Icons.remove),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                              ),
                              onValue: (value) {
                                //_selectedQuantity

                                setState(() {
                                  _selectedQuantity = value as int;
                                  _selectedPrice = _price*_selectedQuantity;
                                });
                                print(value.toString());
                              },
                            )
                          ]
                      ),
                    ),
                    ),
                  ],
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children:[
                    Padding(
                      padding: const EdgeInsets.only( top: 10.0, left: 50.0, bottom: 10.0),
                      child:
                      ElevatedButton(
                        onPressed: () async {
                          final i = Item(
                            id: M.ObjectId(),
                            quantity: _selectedQuantity,
                            individualTotprice: _selectedPrice,
                            itemId: _selectedGood as M.ObjectId,
                          );
                          var exist = false;
                          for (var element in itemList) {
                            if(element.itemId == _selectedGood){
                              exist = true;
                            }
                          }

                          if(exist){
                            itemList.removeWhere((item)=>item.itemId == _selectedGood);
                          }
                          itemList.add(i);

                          resetPicker();
                          setState(() {});
                          var totPrice = 0;
                          for (var element in itemList) {
                              totPrice += element.individualTotprice;
                          }
                          totalPriceController.text = totPrice.toString();
                          //itemList.putIfAbsent(_selectedGood, () => i);
                          //print(i.individualTotprice);
                        },
                        child: const Padding(
                          padding: EdgeInsets.only(left: 10.0, right: 10.0,),
                          child:
                           Icon(Icons.add, color: Colors.white,),
                        ),
                      ),
                    ),
                  ],
                ),
                ListView.builder(
                  shrinkWrap: true,
                  // Let the ListView know how many items it needs to build.
                  itemCount: itemList.length,
                  // Convert each item into a widget based on the type of item it is.
                  itemBuilder: (context, index) {
                    final item = itemList[index];
                    var goodName = goodNames[item.itemId];
                    return Padding(
                        padding: const EdgeInsets.only(top: 10.0),
                    child:
                      Row(
                      children: [
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child:
                          Padding(
                            padding: const EdgeInsets.only(left: 15.0),
                            child:
                            Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children:  [
                                  Text(
                                    goodName as String,
                                    style: const TextStyle(
                                      fontSize: 18.0,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ]
                            ),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child:
                          Padding(
                            padding: const EdgeInsets.only(left: 10.0),
                            child:
                            Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    '${item.quantity}' ,
                                    style: const TextStyle(
                                      fontSize: 18.0,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ]
                            ),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child:
                          Padding(
                            padding: const EdgeInsets.only(left: 10.0),
                            child:
                            Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children:  [
                                  Ink(
                                    decoration: const ShapeDecoration(
                                      color: Colors.red,
                                      shape: CircleBorder(),
                                    ),
                                    child: IconButton(
                                      icon: const Icon(Icons.remove),
                                      color: Colors.white,
                                      onPressed: () {
                                        itemList.removeWhere((element)=>element.itemId == item.itemId);

                                        setState(() {});
                                        var totPrice = 0;
                                        for (var element in itemList) {
                                          totPrice += element.individualTotprice;
                                        }
                                        totalPriceController.text = totPrice.toString();
                                      },
                                    ),
                                  ),
                                ]
                            ),
                          ),
                        ),
                      ],
                      ),
                    );
                  },
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 10.0, top: 10.0),
                  child:
                  Text(
                    'Total',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(left: 10.0, top: 10.0),
                  child: TextFormField(
                    enabled: false,
                    autofocus: false,
                    cursorHeight: 20.0,
                    cursorColor: Colors.black,
                    textAlignVertical: TextAlignVertical.center,
                    style: const TextStyle(
                      fontSize: 15,
                    ),
                    decoration: const InputDecoration(
                      isDense: true,
                      contentPadding: EdgeInsets.fromLTRB(20, 20, 10, 0),
                      fillColor: Colors.white70,
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)),
                      ),
                      errorStyle: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    ),
                    controller: totalPriceController,

                  ),
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 10.0, top: 10.0),
                  child:
                  Text(
                    'Date',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                  DateTimeField(                    //date form
                    format: dateFormat,
                    validator: (value){
                      if(value == null){
                        return 'Please enter Date';
                      }
                      return null;
                    },

                    style: const TextStyle(
                      fontSize: 16,
                    ),
                    // dropdownColor: Colors.black,
                    decoration: InputDecoration(
                      fillColor: Colors.white,
                      filled: true,
                      suffixIcon: const Icon(Icons.calendar_today),
                      isDense: true,
                      hintText: "yyyy-MM-dd",
                      hintStyle: const TextStyle(
                          color: Colors.grey
                      ),
                      errorStyle: const TextStyle(
                        color: Colors.redAccent,
                        fontWeight: FontWeight.bold,
                      ),
                      // focusedBorder: OutlineInputBorder(
                      //     borderRadius: BorderRadius.circular(6.0),
                      //     borderSide: const BorderSide(
                      //       color: Colors.cyan,
                      //       width: 2,
                      //     )
                      // ),
                      enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(6.0),
                          borderSide: const BorderSide(
                            color: Colors.grey,
                          )
                      ),
                      // errorBorder: OutlineInputBorder(
                      //     borderRadius: BorderRadius.circular(8.0),
                      //     borderSide: const BorderSide(
                      //       color: Colors.redAccent,
                      //       width: 2,
                      //     )
                      // ),
                      // focusedErrorBorder: OutlineInputBorder(
                      //   borderRadius: BorderRadius.circular(6.0),
                      //   borderSide: const BorderSide(
                      //     color: Colors.redAccent,
                      //     width: 2,
                      //   ),
                      // ),
                    ),
                    onShowPicker: (context, currentValue) {
                      if(currentValue != null){
                        var format1 = "${currentValue.day}-${currentValue.month}-${currentValue.year}";
                        // print(format1);
                      }
                      return showDatePicker(
                          context: context,
                          firstDate: DateTime(1900),
                          initialDate: currentValue ?? DateTime.now(),
                          lastDate: DateTime(2100));
                    },
                    onChanged: (currentValue) {
                      if(currentValue != null) {
                        setState(() =>
                        issuedDateController.text =
                        "${currentValue.year}-${currentValue
                            .month}-${currentValue.day}");
                        setState(() =>
                        _selectedDate = currentValue);

                        print(currentValue);
                      }
                    },
                  ),
                Container(
                  margin: const EdgeInsets.symmetric(vertical: 20.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      ElevatedButton(
                        onPressed: (){
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PlaceOrderPage(refNo: refNoController.text, items: itemList, supplier: _selectedSupplier as M.ObjectId, issueDate: _selectedDate, total: totalPriceController.text, ),
                              ));
                        },
                        child: const Padding(
                          padding: EdgeInsets.only(top: 10.0, bottom: 10.0),
                          child: Text(
                            'Next',
                            style: TextStyle(fontSize: 20.0, color: Colors.white, fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            ),
        ],
      ),
    );
  }

  // insertOrder() async {
  //   final supplier = Order(
  //     id: M.ObjectId(),
  //     totalPrice: int.parse(totalController.text),
  //     supplier: supplierNameController.text,
  //     orderRefNo: refNoController.text,
  //     description: descriptionController.text,
  //   );
  //   await MongoDatabase.insert(supplier);
  //   Navigator.pop(context);
  // }

  // updateUser(Order supplier) async {
  //   print('updating: ${supplierNameController.text}');
  //   final s = Order(
  //     id: supplier.id,
  //     supplierId: int.parse(supplierIdController.text),
  //     supplierName: supplierNameController.text,
  //     address: addressController.text,
  //     contactNo: contactNoController.text,
  //   );
  //   await MongoDatabase.update(s);
  //   Navigator.pop(context);
  // }
}