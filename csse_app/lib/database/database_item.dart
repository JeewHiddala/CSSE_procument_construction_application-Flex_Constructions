import 'package:csse_app/models/item.dart';
import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/utils/constants.dart';
import 'package:mongo_dart/mongo_dart.dart';
import '../utils/constants.dart';

class ItemDatabase {
  static var db, ItemCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    ItemCollection = db.collection(ITEM_COLLECTION);
  }

  static Future<List<Map<String, dynamic>>> getDocuments() async {
    try {
      final items = await ItemCollection.find().toList();
      //print(items);
      return items;
    } catch (e) {
      print(e);
      return Future.error(e);
    }
  }

  static insert(Item item) async {
    await ItemCollection.insertAll([item.toMap()]);
  }

  static update(Item item) async {
    var s = await ItemCollection.findOne({"_id": item.id});
    s["quantity"] = item.quantity;
    s["individualTotprice"] = item.individualTotprice;
    s["itemId"] = item.itemId;
    await ItemCollection.save(s);
  }

  static delete(Item item) async {
    await ItemCollection.remove(where.id(item.id));
  }
}