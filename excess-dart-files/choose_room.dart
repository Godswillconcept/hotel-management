// import 'package:flutter/material.dart';
// import 'package:lodgix/screens/payment.dart';

// class ChooseRoom extends StatefulWidget {
//   const ChooseRoom({Key? key}) : super(key: key);

//   @override
//   State<ChooseRoom> createState() => _ChooseRoomState();
// }

// class _ChooseRoomState extends State<ChooseRoom> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         elevation: 0,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back, color: Colors.black),
//           onPressed: () => Navigator.pop(context),
//         ),
//         title: const Text(
//           'Choose Room',
//           style: TextStyle(
//             color: Colors.black,
//             fontSize: 20,
//             fontWeight: FontWeight.w600,
//           ),
//         ),
//         centerTitle: false,
//       ),
//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           children: [
//             _buildRoomCard(),
//             const SizedBox(height: 16),
//             _buildRoomCard(),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget _buildRoomCard() {
//     return Container(
//       margin: const EdgeInsets.only(bottom: 8),
//       decoration: BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.circular(12),
//         boxShadow: [
//           BoxShadow(
//             color: Colors.grey.withOpacity(0.1),
//             spreadRadius: 1,
//             blurRadius: 8,
//             offset: const Offset(0, 2),
//           ),
//         ],
//       ),
//       child: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           children: [
//             Row(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Expanded(
//                   flex: 3,
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       const Text(
//                         'Deluxe King Room',
//                         style: TextStyle(
//                           fontSize: 15,
//                           fontWeight: FontWeight.w600,
//                           color: Colors.black,
//                         ),
//                       ),
//                       const SizedBox(height: 4),
//                       Text(
//                         'Non-Refundable',
//                         style: TextStyle(fontSize: 12, color: Colors.grey[600]),
//                       ),
//                       const SizedBox(height: 12),
//                       const Text(
//                         '-Price for 1 Adult',
//                         style: TextStyle(fontSize: 13, color: Colors.black87),
//                       ),
//                       const Text(
//                         '-1 Extra-large double bed',
//                         style: TextStyle(fontSize: 13, color: Colors.black87),
//                       ),
//                       const Text(
//                         '-Room size: 14x14',
//                         style: TextStyle(fontSize: 13, color: Colors.black87),
//                       ),
//                       const SizedBox(height: 16),
//                       // Amenities
//                       Column(
//                         children: [
//                           _buildAmenityRow(
//                             Icons.restaurant,
//                             'Breakfast included in the price',
//                             Colors.green,
//                           ),
//                           const SizedBox(height: 8),
//                           _buildAmenityRow(
//                             Icons.bathtub_outlined,
//                             'Private Bathroom',
//                             Colors.teal,
//                           ),
//                           const SizedBox(height: 8),
//                           _buildAmenityRow(
//                             Icons.wifi,
//                             'Free WiFi',
//                             Colors.teal,
//                           ),
//                           const SizedBox(height: 8),
//                           _buildAmenityRow(
//                             Icons.ac_unit,
//                             'Air Conditioning',
//                             Colors.orange,
//                           ),
//                         ],
//                       ),
//                       const SizedBox(height: 16),
//                       // Price section
//                       Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           Text(
//                             'Price for 1 night (18 Mar - 19 Mar)',
//                             style: TextStyle(
//                               fontSize: 8,
//                               color: Colors.grey[600],
//                             ),
//                           ),
//                           const SizedBox(height: 4),
//                           const Row(
//                             children: [
//                               Text(
//                                 '₹ 3,493',
//                                 style: TextStyle(
//                                   fontSize: 18,
//                                   fontWeight: FontWeight.bold,
//                                   color: Colors.blue,
//                                 ),
//                               ),
//                             ],
//                           ),
//                           Text(
//                             '+ ₹ 594 taxes and fee',
//                             style: TextStyle(
//                               fontSize: 12,
//                               color: Colors.grey[600],
//                             ),
//                           ),
//                         ],
//                       ),
//                       const SizedBox(height: 16),
//                       // SELECT button
//                     ],
//                   ),
//                 ),
//                 Expanded(
//                   flex: 2,
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.end,
//                     mainAxisAlignment: MainAxisAlignment.start,
//                     children: [
//                       const SizedBox(height: 20),
//                       ClipRRect(
//                         borderRadius: BorderRadius.circular(8),
//                         child: Image.asset(
//                           'assets/images/2.png',
//                           height: 250,
//                           width: 140,
//                           fit: BoxFit.cover,
//                         ),
//                       ),
//                     ],
//                   ),
//                 ),
//               ],
//             ),
//             SizedBox(height: 16),
//             SizedBox(
//               width: double.infinity,
//               child: ElevatedButton(
//                 onPressed: () {
//                   Navigator.push(
//                     context,
//                     MaterialPageRoute(builder: (context) => const Payment()),
//                   );
//                 },
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: Colors.white,
//                   foregroundColor: Colors.blue,
//                   side: const BorderSide(color: Colors.blue, width: 1),
//                   padding: const EdgeInsets.symmetric(vertical: 12),
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(8),
//                   ),
//                   elevation: 0,
//                 ),
//                 child: const Text(
//                   'SELECT',
//                   style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget _buildAmenityRow(IconData icon, String text, Color color) {
//     return Row(
//       children: [
//         Icon(icon, size: 18, color: color),
//         const SizedBox(width: 8),
//         Text(
//           text,
//           style: TextStyle(
//             fontSize: 10,
//             color: color,
//             fontWeight: FontWeight.w500,
//           ),
//         ),
//       ],
//     );
//   }
// }
