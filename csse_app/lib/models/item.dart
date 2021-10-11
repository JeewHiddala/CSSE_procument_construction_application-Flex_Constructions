
import 'package:mongo_dart/mongo_dart.dart';

class Item {
  final ObjectId id;
  final int quantity;
  final int individualTotprice;
  final ObjectId itemId;

  Item(
      {required this.id, required this.quantity, required this.individualTotprice, required this.itemId, });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'quantity': quantity,
      'individualTotprice': individualTotprice,
      'itemId': itemId,
    };
  }

  Item.fromMap(Map<String, dynamic> map)
      : quantity = map['quantity'],
        id = map['_id'],
        individualTotprice = map['individualTotprice'],
        itemId = map['itemId'];
}