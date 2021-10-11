import 'package:csse_app/models/supplier.dart';
import 'package:flutter/material.dart';


class SupplierCard extends StatelessWidget {
  const SupplierCard({Key? key, required this.supplier, required this.onTapDelete, required this.onTapEdit}) : super(key: key);
  final Supplier supplier;
  final Function onTapEdit, onTapDelete;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 2.0,
      color: Colors.white,
      child: ListTile(
        leading: Text(
          '${supplier.supplierId}',
          style: Theme.of(context).textTheme.headline6,
        ),
        title: Text(supplier.supplierName),
        subtitle: Text(supplier.address),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            GestureDetector(
              child: const Icon(Icons.edit),
              onTap: () => onTapEdit(),
            ),
            GestureDetector(
              child: const Icon(Icons.delete),
              onTap: () => onTapDelete(),
            ),
          ],
        ),
      ),
    );
  }
}