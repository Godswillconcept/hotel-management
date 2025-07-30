// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:provider/provider.dart';
// import 'providers/theme_provider.dart';
// import 'widgets/splash_screen.dart';
// import 'themes/theme.dart';

// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   SystemChrome.setPreferredOrientations([
//     DeviceOrientation.portraitUp,
//     DeviceOrientation.portraitDown,
//   ]);

//   runApp(
//     // Wrap the entire app with ChangeNotifierProvider
//     ChangeNotifierProvider(
//       create: (context) => ThemeProvider(),
//       child: MyApp(),
//     ),
//   );
// }

// class MyApp extends StatelessWidget {
//   const MyApp({super.key});

//   @override
//   Widget build(BuildContext context) {
//     // Now you can safely access ThemeProvider here
//     return Consumer<ThemeProvider>(
//       builder: (context, themeProvider, child) {
//         return MaterialApp(
//           title: 'Lodgix',
//           theme: Lodgix.lightTheme,
//           darkTheme: Lodgix.darkTheme,
//           themeMode: themeProvider.themeMode,
//           home: const SplashScreen(),
//           debugShowCheckedModeBanner: false,
//         );
//       },
//     );
//   }
// }
