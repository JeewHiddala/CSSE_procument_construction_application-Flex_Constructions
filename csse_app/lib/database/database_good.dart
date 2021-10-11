import 'package:csse_app/models/good.dart';
import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/utils/constants.dart';
import 'package:mongo_dart/mongo_dart.dart';
import '../utils/constants.dart';

class GoodDatabase {
  static var db, GoodCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    GoodCollection = db.collection(GOOD_COLLECTION);
  }

  static Future<List<Map<String, dynamic>>> getDocuments() async {
    try {
      final goods = await GoodCollection.find().toList();
      //print(goods);
      return goods;
    } catch (e) {
      print(e);
      return Future.error(e);
    }
  }

  static insert(Good good) async {
    await GoodCollection.insertAll([good.toMap()]);
  }

  static update(Good good) async {
    var g = await GoodCollection.findOne({"_id": good.id});
    g["itemPrice"] = good.itemPrice;
    g["goodName"] = good.goodName;
    g["description"] = good.description;
    await GoodCollection.save(g);
  }

  static delete(Good good) async {
    await GoodCollection.remove(where.id(good.id));
  }
}