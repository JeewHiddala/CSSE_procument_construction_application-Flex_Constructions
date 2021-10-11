
import 'package:mongo_dart/mongo_dart.dart';

class Site {
  final ObjectId id;
  final int siteNo;
  final String location;
  final String address;
  final String contactNo;
  final ObjectId siteMgrId;

  Site(
      {required this.id, required this.siteNo, required this.location, required this.address, required this.contactNo, required this.siteMgrId, });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'siteNo': siteNo,
      'location': location,
      'address': address,
      'contactNo': contactNo,
      'siteMgrId': siteMgrId,
    };
  }

  Site.fromMap(Map<String, dynamic> map)
      : siteNo = map['siteNo'],
        id = map['_id'],
        location = map['location'],
        address = map['address'],
        contactNo = map['contactNo'],
        siteMgrId = map['siteMgrId'];
}