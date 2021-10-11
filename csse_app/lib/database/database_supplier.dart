import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/utils/constants.dart';
import 'package:mongo_dart/mongo_dart.dart';
import '../utils/constants.dart';

class SupplierDatabase {
  static var db, SupplierCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    SupplierCollection = db.collection(SUPPLIER_COLLECTION);
  }

  static Future<List<Map<String, dynamic>>> getDocuments() async {
    try {
      final suppliers = await SupplierCollection.find().toList();
      //print(suppliers);
      return suppliers;
    } catch (e) {
      print(e);
      return Future.error(e);
    }
  }

  static insert(Supplier supplier) async {
    await SupplierCollection.insertAll([supplier.toMap()]);
  }

  static update(Supplier supplier) async {
    var s = await SupplierCollection.findOne({"_id": supplier.id});
    s["supplierId"] = supplier.supplierId;
    s["supplierName"] = supplier.supplierName;
    s["address"] = supplier.address;
    s["contactNo"] = supplier.contactNo;
    await SupplierCollection.save(s);
  }

  static delete(Supplier supplier) async {
    await SupplierCollection.remove(where.id(supplier.id));
  }
}