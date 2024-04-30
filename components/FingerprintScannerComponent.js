import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const FingerprintScannerComponent = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const fallBackToDefaultAuth = async () => {
    console.log("fall back password authentication");
  };

  const alertComponent = async (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const twoButtonAlert = () => {
    Alert.alert("Welcome to app", "subscribe Now", [
      {
        text: "Back",
        onPress: () => console.log("Cancle Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => console.log("Ok Pressed"),
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    //check support
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    //fall back default Auth method (password)
    if (!isBiometricAvailable) {
      return alertComponent(
        "Please enter password",
        "Biometric Auth not supported",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    //check biometric available
    let supportedBiometrics;
    if (isBiometricAvailable) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      //biometric save locally

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        return alertComponent(
          "Biometric record not found",
          "Please Login with password",
          "OK",
          () => fallBackToDefaultAuth()
        );
      }

      //authenticate with biometric
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });

      // log thn user
      if (biometricAuth) {
        twoButtonAlert();
      }

      console.log({ isBiometricAvailable });
      console.log({ supportedBiometrics });
      console.log({ savedBiometrics });
      console.log({ biometricAuth });
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>
          {isBiometricSupported
            ? "Your Device is compatible with Biometrics"
            : "Face or Fingerprint Scanner is available on this device"}
        </Text>
        <TouchableHighlight style={{ height: 60, marinTop: 200 }}>
          <Button
            title="Login with Biometrics"
            color={"black"}
            onPress={handleBiometricAuth}
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default FingerprintScannerComponent;
