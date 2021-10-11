import 'package:csse_app/database/database_supplier.dart';
import 'package:csse_app/pages/home.dart';
import 'package:csse_app/pages/orders_page.dart';
import 'package:flutter/material.dart';

import 'database/database_good.dart';
import 'database/database_item.dart';
import 'database/database_order.dart';
import 'database/database_site.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await OrderDatabase.connect();
  await SupplierDatabase.connect();
  await GoodDatabase.connect();
  await ItemDatabase.connect();
  await SiteDatabase.connect();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flex Constructions',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.cyan,
      ),
      home: const OrderPage(),
      // ),
    );
  }
}

// class MyApp extends StatelessWidget {
//
//   // This widget is the root of your application.
//   @override
//   Widget build(BuildContext context) {
//     return FutureBuilder(
//       builder: (context, snapshot){
//         if(snapshot.hasError){
//           print('Error occured');
//         }
//         if(snapshot.connectionState == ConnectionState.waiting){
//           return const Center(child: CircularProgressIndicator(),);
//         }
//         return MaterialApp(
//           title: 'Flex Constructions',
//           debugShowCheckedModeBanner: false,
//           theme: ThemeData(
//             primarySwatch: Colors.cyan,
//           ),
//           home: const HomePage(),
//         );
//       },
//     );
//   }
// }
