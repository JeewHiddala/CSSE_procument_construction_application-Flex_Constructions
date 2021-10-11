import 'package:csse_app/models/site.dart';
import 'package:csse_app/utils/constants.dart';
import 'package:mongo_dart/mongo_dart.dart';
import '../utils/constants.dart';

class SiteDatabase {
  static var db, SiteCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    SiteCollection = db.collection(SITE_COLLECTION);
  }

  static Future<List<Map<String, dynamic>>> getDocuments() async {
    try {
      final sites = await SiteCollection.find().toList();
      //print(sites);
      return sites;
    } catch (e) {
      print(e);
      return Future.error(e);
    }
  }

  static insert(Site site) async {
    await SiteCollection.insertAll([site.toMap()]);
  }

  static update(Site site) async {
    var s = await SiteCollection.findOne({"_id": site.id});
    s["siteNo"] = site.siteNo;
    s["location"] = site.location;
    s["address"] = site.address;
    s["contactNo"] = site.contactNo;
    s["siteMgrId"] = site.siteMgrId;
    await SiteCollection.save(s);
  }

  static delete(Site site) async {
    await SiteCollection.remove(where.id(site.id));
  }
}