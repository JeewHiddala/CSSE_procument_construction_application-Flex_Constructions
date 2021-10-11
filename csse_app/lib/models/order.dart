
import 'package:csse_app/models/supplier.dart';
import 'package:mongo_dart/mongo_dart.dart';

class Order {
  final ObjectId id;
  final String orderRefNo;
  final String description;
  final DateTime issueDate;
  final String companyName;
  final String deliveryAddress;
  final int totalPrice;
  final String approvalStatus;
  final String orderStatus;
  final ObjectId site;
  final ObjectId supplier;
  final List items;

  Order(
      {required this.id, required this.orderRefNo, required this.description, required this.issueDate, required this.companyName, required this.deliveryAddress, required this.totalPrice, required this.approvalStatus, required this.orderStatus, required this.supplier, required this.site, required this.items, });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'orderRefNo': orderRefNo,
      'description': description,
      'issueDate': issueDate,
      'companyName': companyName,
      'deliveryAddress': deliveryAddress,
      'totalPrice': totalPrice,
      'approvalStatus': approvalStatus,
      'orderStatus': orderStatus,
      'site': site,
      'supplier': supplier,
      'items': items,
    };
  }

  Order.fromMap(Map<String, dynamic> map)
      : orderRefNo = map['orderRefNo'],
        id = map['_id'],
        description = map['description'],
        issueDate = map['issueDate'],
        companyName = map['companyName'],
        deliveryAddress = map['deliveryAddress'],
        totalPrice = map['totalPrice'],
        approvalStatus = map['approvalStatus'],
        orderStatus = map['orderStatus'],
        site = map['site'],
        supplier = map['supplier'],
        items = ['items'].toList();
}