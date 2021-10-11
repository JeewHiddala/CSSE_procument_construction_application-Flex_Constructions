import 'package:csse_app/components/supplier_card.dart';
import 'package:csse_app/database/database_supplier.dart';
import 'package:csse_app/models/supplier.dart';
import 'package:csse_app/pages/add_supplier_page.dart';
import 'package:flutter/material.dart';


class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: SupplierDatabase.getDocuments(),
        builder: (context, AsyncSnapshot snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              color: Colors.white,
              child: const LinearProgressIndicator(
                backgroundColor: Colors.black,
              ),
            );
          } else {
            if (snapshot.hasError) {
              return Container(
                color: Colors.white,
                child: Center(
                  child: Text(
                    'Something went wrong, try again.',
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
              );
            } else {
              return Scaffold(
                appBar: AppBar(
                  title: const Text('Flex Constructions'),
                ),
                body: ListView.builder(
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: SupplierCard(
                        supplier: Supplier.fromMap(snapshot.data[index]),
                        onTapDelete: () async {
                          _deleteUser(Supplier.fromMap(snapshot.data[index]));
                        },
                        onTapEdit: () async {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (BuildContext context) {
                                return AddSupplierPage();
                              },
                              settings: RouteSettings(
                                arguments: Supplier.fromMap(snapshot.data[index]),
                              ),
                            ),
                          ).then((value) => setState(() {}));
                        },
                      ),
                    );
                  },
                  itemCount: snapshot.data.length,
                ),
                floatingActionButton: FloatingActionButton(
                  onPressed: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (BuildContext context) {
                          return AddSupplierPage();
                        })).then((value) => setState(() {}));
                  },
                  child: const Icon(Icons.add),
                ),
              );
            }
          }
        });
  }

  _deleteUser(Supplier supplier) async {
    await SupplierDatabase.delete(supplier);
    setState(() {});
  }
}