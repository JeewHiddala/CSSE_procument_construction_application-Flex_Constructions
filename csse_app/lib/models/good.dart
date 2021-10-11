
import 'package:mongo_dart/mongo_dart.dart';

class Good {
  final ObjectId id;
  final int goodId;
  final int itemPrice;
  final String goodName;
  final String description;

  Good(
      {required this.id, required this.goodId, required this.itemPrice, required this.goodName, required this.description, });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'goodId': goodId,
      'itemPrice': itemPrice,
      'goodName': goodName,
      'description': description,
    };
  }

  Good.fromMap(Map<String, dynamic> map)
      : goodId = map['goodId'],
        id = map['_id'],
        itemPrice = map['itemPrice'],
        goodName = map['goodName'],
        description = map['description'];
}