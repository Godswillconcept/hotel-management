// import 'package:flutter/material.dart';
// import 'package:lodgix/screens/hotel_details.dart';

// class Dashboard extends StatefulWidget {
//   const Dashboard({Key? key}) : super(key: key);

//   @override
//   _DashboardState createState() => _DashboardState();
// }

// class _DashboardState extends State<Dashboard> {
//   List<Map<String, dynamic>> hotels = [
//     {
//       'name': 'Raddison Blue',
//       'location': 'Thana',
//       'price': 3493,
//       'rating': 4.5,
//       'image': 'assets/hotel.png',
//     },
//     {
//       'name': 'Golden Hotel',
//       'location': 'Khulna',
//       'price': 1456,
//       'rating': 4.8,
//       'image': 'assets/hotel.png',
//     },
//     {
//       'name': 'Star Hotel',
//       'location': 'Dhaka',
//       'price': 2567,
//       'rating': 4.3,
//       'image': 'assets/hotel.png',
//     },
//     {
//       'name': 'Platinum Hotel',
//       'location': 'Gazipur',
//       'price': 3678,
//       'rating': 4.5,
//       'image': 'assets/hotel.png',
//     },
//     {
//       'name': 'Silver Hotel',
//       'location': 'Narayanganj',
//       'price': 4890,
//       'rating': 4.2,
//       'image': 'assets/hotel.png',
//     },
//     {
//       'name': 'Diamond Hotel',
//       'location': 'Sylhet',
//       'price': 6789,
//       'rating': 4.7,
//       'image': 'assets/hotel.png',
//     },
//   ];

//   List<Map<String, dynamic>> cities = [
//     {"image": "assets/lagos.png", "name": "Thana"},
//     {"image": "assets/lagos.png", "name": "Dalka"},
//     {"image": "assets/lagos.png", "name": "Gazipur"},
//     {"image": "assets/lagos.png", "name": "Narayanganj"},
//     {"image": "assets/lagos.png", "name": "Sylet"},
//     {"image": "assets/lagos.png", "name": "Thana West"},
//   ];
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Padding(
//           padding: const EdgeInsets.all(16.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               SizedBox(height: 24),
//               Row(
//                 children: [
//                   Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Text(
//                         'Current Location',
//                         style: TextStyle(
//                           fontSize: 16,
//                           fontWeight: FontWeight.bold,
//                         ),
//                       ),
//                       Row(
//                         children: [
//                           SizedBox(width: 7),
//                           Icon(Icons.location_on, color: Colors.black),
//                           SizedBox(width: 5),
//                           Text(
//                             '123 Main St, Springfield',
//                             style: TextStyle(fontSize: 14, color: Colors.black),
//                           ),
//                         ],
//                       ),
//                       Text(
//                         '   👨‍🔧  Bessie Cooper',
//                         style: TextStyle(fontSize: 14, color: Colors.black),
//                       ),
//                     ],
//                   ),
//                   Spacer(),
//                   Row(
//                     children: [
//                       Container(
//                         height: 40,
//                         width: 40,
//                         decoration: BoxDecoration(
//                           shape: BoxShape.circle,
//                           color: Colors.white,
//                         ),
//                         child: Center(
//                           child: IconButton(
//                             icon: Icon(
//                               Icons.notifications,
//                               size: 24,
//                               color: Colors.black,
//                             ),
//                             onPressed: () {},
//                           ),
//                         ),
//                       ),
//                       SizedBox(width: 7),
//                       Container(
//                         height: 40,
//                         width: 40,
//                         decoration: BoxDecoration(
//                           shape: BoxShape.circle,
//                           color: Colors.white,
//                         ),
//                         child: Center(
//                           child: IconButton(
//                             icon: Icon(
//                               Icons.bookmark,
//                               size: 24,
//                               color: Colors.black,
//                             ),
//                             onPressed: () {},
//                           ),
//                         ),
//                       ),
//                     ],
//                   ),
//                 ],
//               ),
//               SizedBox(height: 20),
//               //  Search bar
//               Container(
//                 decoration: BoxDecoration(
//                   borderRadius: BorderRadius.circular(81),
//                   color: Colors.white,
//                 ),
//                 height: 60,
//                 width: double.maxFinite,
//                 child: Align(
//                   alignment: Alignment.center,
//                   child: Padding(
//                     padding: const EdgeInsets.symmetric(horizontal: 12),
//                     child: TextField(
//                       decoration: InputDecoration(
//                         border: InputBorder.none,
//                         hintText: 'Search hotels, location etc',
//                         suffixIcon: Icon(Icons.search, color: Colors.black),
//                         contentPadding: EdgeInsets.symmetric(
//                           vertical: 16,
//                           horizontal: 20,
//                         ),
//                       ),
//                     ),
//                   ),
//                 ),
//               ),
//               SizedBox(height: 10),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Text(
//                     'Hotels Near you',
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 16,
//                       fontWeight: FontWeight.bold,
//                     ),
//                   ),
//                   TextButton(
//                     onPressed: () {},
//                     child: Text(
//                       'View All',
//                       style: TextStyle(
//                         color: Colors.grey,
//                         fontSize: 14,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//               SizedBox(height: 10),
//               SizedBox(
//                 height: 235,
//                 child: ListView.builder(
//                   scrollDirection: Axis.horizontal,
//                   itemCount: hotels.length,
//                   itemBuilder: (context, index) {
//                     final hotel = hotels[index];
//                     return GestureDetector(
//                       onTap: () {
//                         Navigator.push(
//                           context,
//                           MaterialPageRoute(
//                             builder: (context) => HotelDetails(
//                               hotelName: hotel['name'],
//                               location: hotel['location'],
//                               price: hotel['price'],
//                               rating: hotel['rating'],
//                               image: hotel['image'],
//                             ),
//                           ),
//                         );
//                       },
//                       child: Container(
//                         margin: EdgeInsets.only(right: 16),
//                         width: 220,
//                         decoration: BoxDecoration(
//                           borderRadius: BorderRadius.circular(10),
//                           color: Colors.white,
//                         ),
//                         child: Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Padding(
//                               padding: const EdgeInsets.all(13.0),
//                               child: Container(
//                                 height: 128,
//                                 width: double.maxFinite,
//                                 decoration: BoxDecoration(
//                                   image: DecorationImage(
//                                     image: AssetImage(hotel['image']),
//                                     fit: BoxFit.cover,
//                                   ),
//                                   borderRadius: BorderRadius.circular(10),
//                                 ),
//                               ),
//                             ),
//                             Padding(
//                               padding: const EdgeInsets.only(
//                                 left: 13.0,
//                                 right: 13.0,
//                               ),
//                               child: Column(
//                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                 children: [
//                                   Text(
//                                     hotel['name'],
//                                     style: TextStyle(
//                                       fontSize: 16,
//                                       fontWeight: FontWeight.bold,
//                                     ),
//                                   ),
//                                   Text(
//                                     hotel['location'],
//                                     style: TextStyle(
//                                       fontSize: 12,
//                                       fontWeight: FontWeight.bold,
//                                     ),
//                                   ),
//                                   Row(
//                                     children: [
//                                       Text(
//                                         '₹ ${hotel['price']}/night',
//                                         style: TextStyle(fontSize: 14),
//                                       ),
//                                       Spacer(),
//                                       Icon(
//                                         Icons.star,
//                                         color: Colors.yellow,
//                                         size: 16,
//                                       ),
//                                       SizedBox(width: 5),
//                                       Container(
//                                         height: 23,
//                                         width: 43,
//                                         decoration: BoxDecoration(
//                                           color: Colors.orange,
//                                           borderRadius: BorderRadius.circular(
//                                             10,
//                                           ),
//                                         ),
//                                         child: Center(
//                                           child: Text(
//                                             '${hotel['rating']}/5',
//                                             style: TextStyle(fontSize: 14),
//                                           ),
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                 ],
//                               ),
//                             ),
//                           ],
//                         ),
//                       ),
//                     );
//                   },
//                 ),
//               ),
//               SizedBox(height: 10),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Text(
//                     'Explore by city',
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 16,
//                       fontWeight: FontWeight.bold,
//                     ),
//                   ),
//                   TextButton(
//                     onPressed: () {},
//                     child: Text(
//                       'View All',
//                       style: TextStyle(
//                         color: Colors.grey,
//                         fontSize: 14,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//               SizedBox(
//                 height: 120,
//                 child: ListView.builder(
//                   scrollDirection: Axis.horizontal,
//                   itemCount: cities.length,
//                   itemBuilder: (context, index) {
//                     final city = cities[index];
//                     return Column(
//                       children: [
//                         Container(
//                           height: 100,
//                           width: 100,
//                           decoration: BoxDecoration(
//                             shape: BoxShape.circle,
//                             image: DecorationImage(
//                               image: AssetImage(city['image']),
//                             ),
//                           ),
//                         ),
//                         Text(
//                           city['name'],
//                           style: TextStyle(
//                             fontSize: 14,
//                             color: Colors.black,
//                             fontWeight: FontWeight.bold,
//                           ),
//                         ),
//                       ],
//                     );
//                   },
//                 ),
//               ),
//               SizedBox(height: 10),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Text(
//                     'Highest Rated Hotels',
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 16,
//                       fontWeight: FontWeight.bold,
//                     ),
//                   ),
//                   TextButton(
//                     onPressed: () {},
//                     child: Text(
//                       'View All',
//                       style: TextStyle(
//                         color: Colors.grey,
//                         fontSize: 14,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//               SizedBox(height: 10),
//               SizedBox(
//                 height: 235,
//                 child: ListView.builder(
//                   scrollDirection: Axis.horizontal,
//                   itemCount: hotels.length,
//                   itemBuilder: (context, index) {
//                     final hotel = hotels[index];
//                     return Container(
//                       margin: EdgeInsets.only(right: 16),
//                       width: 220,
//                       decoration: BoxDecoration(
//                         borderRadius: BorderRadius.circular(10),
//                         color: Colors.white,
//                       ),
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           Padding(
//                             padding: const EdgeInsets.all(13.0),
//                             child: Container(
//                               height: 128,
//                               width: double.maxFinite,
//                               decoration: BoxDecoration(
//                                 image: DecorationImage(
//                                   image: AssetImage(hotel['image']),
//                                   fit: BoxFit.cover,
//                                 ),
//                                 borderRadius: BorderRadius.circular(10),
//                               ),
//                             ),
//                           ),
//                           Padding(
//                             padding: const EdgeInsets.only(
//                               left: 13.0,
//                               right: 13.0,
//                             ),
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Text(
//                                   hotel['name'],
//                                   style: TextStyle(
//                                     fontSize: 16,
//                                     fontWeight: FontWeight.bold,
//                                   ),
//                                 ),
//                                 Text(
//                                   hotel['location'],
//                                   style: TextStyle(
//                                     fontSize: 12,
//                                     fontWeight: FontWeight.bold,
//                                   ),
//                                 ),
//                                 Row(
//                                   children: [
//                                     Text(
//                                       '₹ ${hotel['price']}',
//                                       style: TextStyle(fontSize: 16),
//                                     ),
//                                     Spacer(),
//                                     Icon(
//                                       Icons.star,
//                                       color: Colors.yellow,
//                                       size: 16,
//                                     ),
//                                     SizedBox(width: 5),
//                                     Container(
//                                       height: 23,
//                                       width: 43,
//                                       decoration: BoxDecoration(
//                                         color: Colors.orange,
//                                         borderRadius: BorderRadius.circular(10),
//                                       ),
//                                       child: Center(
//                                         child: Text(
//                                           '${hotel['rating']}/5',
//                                           style: TextStyle(fontSize: 14),
//                                         ),
//                                       ),
//                                     ),
//                                   ],
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ],
//                       ),
//                     );
//                   },
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
