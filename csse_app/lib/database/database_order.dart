import 'package:csse_app/models/order.dart';
//import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/utils/constants.dart';
import 'package:mongo_dart/mongo_dart.dart';
import '../utils/constants.dart';

class OrderDatabase {
  static var db, OrderCollection;

  static connect() async {
    db =  await Db.create(MONGO_CONN_URL);
    await db.open();
    OrderCollection = db.collection(ORDER_COLLECTION);
    // print(OrderCollection);
  }

  static Future<List<Map<String, dynamic>>> getDocuments() async {
    try {
      final orders = await OrderCollection.find().toList();
      //print(orders);
      return orders;
    } catch (e) {
      print(e);
      return Future.error(e);
    }
  }

  static insert(Order order) async {
    await OrderCollection.insertAll([order.toMap()]);
  }

  static update(Order order) async {
    var o = await OrderCollection.findOne({"_id": order.id});
    o["orderRefNo"] = order.orderRefNo;
    o["description"] = order.description;
    o["issueDate"] = order.issueDate;
    o["companyName"] = order.companyName;
    o["deliveryAddress"] = order.deliveryAddress;
    o["totalPrice"] = order.totalPrice;
    o["approvalStatus"] = order.approvalStatus;
    o["orderStatus"] = order.orderStatus;
    o["supplier"] = order.supplier;
    await OrderCollection.save(o);
  }

  static delete(Order order) async {
    await OrderCollection.remove(where.id(order.id));
  }
}