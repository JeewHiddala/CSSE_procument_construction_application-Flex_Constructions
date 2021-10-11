import 'package:mongo_dart/mongo_dart.dart';

class Supplier {
  final ObjectId id;
  final int supplierId;
  final String supplierName;
  final String address;
  final String contactNo;

  const Supplier({required this.id, required this.supplierId, required this.supplierName, required this.address, required this.contactNo});

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'supplierId': supplierId,
      'supplierName': supplierName,
      'address': address,
      'contactNo': contactNo,
    };
  }

  Supplier.fromMap(Map<String, dynamic> map)
      : supplierName = map['supplierName'],
        id = map['_id'],
        supplierId = map['supplierId'],
        address = map['address'],
        contactNo = map['contactNo'];
}