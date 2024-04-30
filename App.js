import React from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./Store/redux/store";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import AboutScreen from "./components/AboutScreen";
import UploadDownload from "./components/UploadDownload";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import Icon from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import FingerprintScannerComponent from "./components/FingerprintScannerComponent"; // Corrected import statement

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ backgroundColor: "#1F1B33", flex: 1 }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: "#1F1B33" }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Drawer.Screen name="Holiday Resort" component={Home} />
      <Drawer.Screen name="About Us" component={AboutScreen} />
      <Drawer.Screen name="Files" component={UploadDownload} />
      <Drawer.Screen name="Sign In" component={SignIn} />
      <Drawer.Screen name="Sign Up" component={SignUp} />
      <Drawer.Screen name="Forget Password" component={ForgotPassword} />
      <Drawer.Screen name="Reset Password" component={ResetPassword} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.8,
  },
});
