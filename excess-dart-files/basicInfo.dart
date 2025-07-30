// import 'package:flutter/material.dart';
// import 'package:lodgix/screens/otpScreen.dart';
// import 'package:lodgix/themes/theme.dart';
// import 'package:lodgix/widgets/image_picker_widget.dart';
// import 'package:image_picker/image_picker.dart';

// class Basicinfo extends StatefulWidget {
//   const Basicinfo({super.key});

//   @override
//   State<Basicinfo> createState() => _BasicinfoState();
// }

// class _BasicinfoState extends State<Basicinfo> {
//   List<XFile> _selectedIDDocuments = [];

//   void _onIDDocumentSelected(List<XFile> images) {
//     setState(() {
//       _selectedIDDocuments = images;
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Column(
//           children:[
//             Padding(
//               padding: const EdgeInsets.all(20.0),
//               child: Text(
//                 "Basic Information",
//                 style: TextStyle(
//                   fontSize: 24,
//                   fontWeight: FontWeight.bold,
//                 ),
//               ),
//             ),
//              Padding(
//             padding: const EdgeInsets.symmetric(horizontal: 20.0),
//             child: Container(
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//                 border: Border.all(color: Colors.grey[300]!, width: 1),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(0.1),
//                     spreadRadius: 1,
//                     blurRadius: 3,
//                     offset: Offset(0, 1),
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16.0,
//                   vertical: 4.0,
//                 ),
//                 child: Row(
//                   children: [
//                     Icon(
//                       Icons.person_outline,
//                       color: Colors.grey[600],
//                       size: 20,
//                     ),
//                     SizedBox(width: 12),
//                     Expanded(
//                       child: TextField(
//                         decoration: InputDecoration(
//                           hintText: "Full Name",
//                           hintStyle: TextStyle(
//                             color: Lodgix.darkBorderColor,
//                             fontSize: 16,
//                             fontWeight: FontWeight.w400,
//                           ),
//                           border: InputBorder.none,
//                         ),
//                         keyboardType: TextInputType.name,
//                         style: TextStyle(fontSize: 16, color: Colors.black87),
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//           ),
//           SizedBox(height: MediaQuery.of(context).size.height * 0.03),
//           Padding(
//             padding: const EdgeInsets.symmetric(horizontal: 20.0),
//             child: Container(
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//                 border: Border.all(color: Colors.grey[300]!, width: 1),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(0.1),
//                     spreadRadius: 1,
//                     blurRadius: 3,
//                     offset: Offset(0, 1),
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16.0,
//                   vertical: 4.0,
//                 ),
//                 child: Row(
//                   children: [
//                     Icon(
//                       Icons.phone_android_outlined,
//                       color: Colors.grey[600],
//                       size: 20,
//                     ),
//                     SizedBox(width: 12),
//                     Expanded(
//                       child: TextField(
//                         decoration: InputDecoration(
//                           hintText: "Enter Phone Number",
//                           hintStyle: TextStyle(
//                             color: Lodgix.darkBorderColor,
//                             fontSize: 16,
//                             fontWeight: FontWeight.w400,
//                           ),
//                           border: InputBorder.none,
//                         ),
//                         keyboardType: TextInputType.number,
//                         style: TextStyle(fontSize: 16, color: Colors.black87),
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//           ),
//           SizedBox(height: MediaQuery.of(context).size.height * 0.03),

//            Padding(
//             padding: const EdgeInsets.symmetric(horizontal: 20.0),
//             child: Container(
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//                 border: Border.all(color: Colors.grey[300]!, width: 1),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(0.1),
//                     spreadRadius: 1,
//                     blurRadius: 3,
//                     offset: Offset(0, 1),
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16.0,
//                   vertical: 4.0,
//                 ),
//                 child: Row(
//                   children: [
//                     Icon(
//                       Icons.lock,
//                       color: Colors.grey[600],
//                       size: 20,
//                     ),
//                     SizedBox(width: 12),
//                     Expanded(
//                       child: TextField(
//                         obscureText: true,
//                         decoration: InputDecoration(
//                           hintText: "Enter Password",
                          
//                           hintStyle: TextStyle(
//                             color: Lodgix.darkBorderColor,
//                             fontSize: 16,
//                             fontWeight: FontWeight.w400,
//                           ),
//                           border: InputBorder.none,
//                         ),
//                         style: TextStyle(fontSize: 16, color: Colors.black87),
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//           ),
//                     SizedBox(height: MediaQuery.of(context).size.height * 0.03),

//           Padding(
//             padding: const EdgeInsets.symmetric(horizontal: 20.0),
//             child: Container(
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//                 border: Border.all(color: Colors.grey[300]!, width: 1),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(0.1),
//                     spreadRadius: 1,
//                     blurRadius: 3,
//                     offset: Offset(0, 1),
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16.0,
//                   vertical: 4.0,
//                 ),
//                 child: Row(
//                   children: [
//                     Icon(
//                       Icons.lock,
//                       color: Colors.grey[600],
//                       size: 20,
//                     ),
//                     SizedBox(width: 12),
//                     Expanded(
//                       child: TextField(
//                         decoration: InputDecoration(
//                           hintText: "Confirm Password",
//                           hintStyle: TextStyle(
//                             color: Lodgix.darkBorderColor,
//                             fontSize: 16,
//                             fontWeight: FontWeight.w400,
//                           ),
//                           border: InputBorder.none,
//                         ),
//                         keyboardType: TextInputType.emailAddress,
//                         style: TextStyle(fontSize: 16, color: Colors.black87),
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//           ),
//                     SizedBox(height: MediaQuery.of(context).size.height * 0.03),

//           Padding(
//             padding: const EdgeInsets.symmetric(horizontal: 20.0),
//             child: Container(
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//                 border: Border.all(color: Colors.grey[300]!, width: 1),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(0.1),
//                     spreadRadius: 1,
//                     blurRadius: 3,
//                     offset: Offset(0, 1),
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16.0,
//                   vertical: 16.0,
//                 ),
//                 child: TextField(
//                   maxLines: 4,
//                   minLines: 3,
//                   decoration: InputDecoration(
//                     hintText: "Enter Address",
//                     hintStyle: TextStyle(
//                       color: Lodgix.darkBorderColor,
//                       fontSize: 16,
//                       fontWeight: FontWeight.w400,
//                     ),
//                     border: InputBorder.none,
//                   ),
//                   keyboardType: TextInputType.multiline,
//                   style: TextStyle(fontSize: 16, color: Colors.black87),
//                 ),
//               ),
//             ),
//           ),
//           SizedBox(height: MediaQuery.of(context).size.height * 0.03),

//             // ID Document Section
//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 20.0),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Text(
//                     "ID Document",
//                     style: TextStyle(
//                       fontSize: 16,
//                       fontWeight: FontWeight.w600,
//                       color: Colors.black87,
//                     ),
//                   ),
//                   SizedBox(height: 12),
//                   Container(
//                     width: double.infinity,
//                     padding: const EdgeInsets.all(16),
//                     decoration: BoxDecoration(
//                       color: Colors.white,
//                       borderRadius: BorderRadius.circular(12),
//                       border: Border.all(color: Colors.grey[300]!, width: 1),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.grey.withOpacity(0.1),
//                           spreadRadius: 1,
//                           blurRadius: 3,
//                           offset: Offset(0, 1),
//                         ),
//                       ],
//                     ),
//                     child: Column(
//                       children: [
//                         Row(
//                           children: [
//                             Icon(
//                               Icons.badge_outlined,
//                               color: Colors.grey[600],
//                               size: 20,
//                             ),
//                             SizedBox(width: 12),
//                             Text(
//                               "Upload ID Document (Required)",
//                               style: TextStyle(
//                                 color: Lodgix.darkBorderColor,
//                                 fontSize: 16,
//                                 fontWeight: FontWeight.w400,
//                               ),
//                             ),
//                           ],
//                         ),
//                         SizedBox(height: 16),
//                         ImagePickerWidget(
//                           onImagesSelected: _onIDDocumentSelected,
//                           allowMultiple: false,
//                           width: double.infinity,
//                           height: 150,
//                         ),
//                         if (_selectedIDDocuments.isNotEmpty) ...[
//                           SizedBox(height: 12),
//                           Text(
//                             "Document uploaded successfully",
//                             style: TextStyle(
//                               color: Colors.green[600],
//                               fontSize: 14,
//                               fontWeight: FontWeight.w500,
//                             ),
//                           ),
//                         ],
//                       ],
//                     ),
//                   ),
//                 ],
//               ),
//             ),

//             SizedBox(height: MediaQuery.of(context).size.height * 0.05),

//             // Continue Button
//             Padding(
//               padding: const EdgeInsets.all(20.0),
//               child: SizedBox(
//                 width: double.infinity,
//                 height: 50,
//                 child: ElevatedButton(
//                   onPressed: _selectedIDDocuments.isNotEmpty
//                       ? () {
//                           print("Form submitted with ${_selectedIDDocuments.length} documents");
// Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (context) => OTP(),
//                   ),
//                 );                        }
//                       : null,
//                   style: ElevatedButton.styleFrom(
//                     backgroundColor: Lodgix.lightButtonBackground,
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(12),
//                     ),
//                     disabledBackgroundColor: Colors.grey[300],
//                   ),
//                   child: Text(
//                     "Continue",
//                     style: TextStyle(
//                       fontSize: 16,
//                       fontWeight: FontWeight.w600,
//                       color: Colors.white,
//                     ),
//                   ),
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }