import 'package:csse_app/database/database_supplier.dart';
import 'package:csse_app/models/supplier.dart';
import 'package:flutter/material.dart';
import 'package:mongo_dart/mongo_dart.dart' as M;

class AddSupplierPage extends StatefulWidget {
  const AddSupplierPage({Key? key}) : super(key: key);

  @override
  _AddSupplierPageState createState() => _AddSupplierPageState();
}

class _AddSupplierPageState extends State<AddSupplierPage> {
  TextEditingController supplierIdController = TextEditingController();
  TextEditingController supplierNameController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController contactNoController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    supplierIdController.dispose();
    supplierNameController.dispose();
    addressController.dispose();
    contactNoController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var supplier = null;
    if(ModalRoute.of(context)!.settings.arguments != null){
      supplier = ModalRoute.of(context)!.settings.arguments as Supplier;
    }

    var widgetText = 'Add Supplier';
    if (supplier != null) {
      supplierNameController.text = supplier.supplierName;
      supplierIdController.text = supplier.supplierId.toString();
      addressController.text = supplier.address;
      contactNoController.text = supplier.contactNo;
      widgetText = 'Update Supplier';
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(widgetText),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    keyboardType: TextInputType.number,
                    controller: supplierIdController,
                    decoration: const InputDecoration(labelText: 'Supplier ID'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: supplierNameController,
                    decoration: const InputDecoration(labelText: 'Supplier Name'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: addressController,
                    decoration: const InputDecoration(labelText: 'Address'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: contactNoController,
                    decoration: const InputDecoration(labelText: 'Contact No'),
                  ),
                ),
              ],
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16.0, 0.0, 16.0, 4.0),
              child: ElevatedButton(
                child: Text(widgetText),
                onPressed: () {
                  if (supplier != null) {
                    updateUser(supplier);
                  } else {
                    insertUser();
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  insertUser() async {
    final supplier = Supplier(
      id: M.ObjectId(),
      supplierId: int.parse(supplierIdController.text),
      supplierName: supplierNameController.text,
      address: addressController.text,
      contactNo: contactNoController.text,
    );
    await SupplierDatabase.insert(supplier);
    Navigator.pop(context);
  }

  updateUser(Supplier supplier) async {
    print('updating: ${supplierNameController.text}');
    final s = Supplier(
      id: supplier.id,
      supplierId: int.parse(supplierIdController.text),
      supplierName: supplierNameController.text,
      address: addressController.text,
      contactNo: contactNoController.text,
    );
    await SupplierDatabase.update(s);
    Navigator.pop(context);
  }
}