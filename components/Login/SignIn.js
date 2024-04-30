import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../data/http";

const SignIn = () => {
  const navigation = useNavigation();

  const login = [
    require("../../assets/SignIn_SignUp/G_Icon.jpg"),
    require("../../assets/SignIn_SignUp/F_Icon.jpg"),
    require("../../assets/SignIn_SignUp/L_Icon.jpg"),
    require("../../assets/SignIn_SignUp/I_Icon.jpg"),
    require("../../assets/SignIn_SignUp/N_Icon.jpg"),
  ];

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
    if (values.email && values.password) {
      registerUser(values);
      navigation.navigate("Holiday Resort");
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/Images/background.jpg")}
      style={styles.background}
      opacity={0.6}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            borderColor: "#2c95ff",
            borderWidth: 3,
            width: 100,
            height: 100,
          }}
        >
          <Image source={require("../../assets/SignIn_SignUp/openLock.gif")} />
        </View>
      </View>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                autoCompleteType="off"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                autoCompleteType="off"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>

        <View style={{ flexDirection: "row", padding: 20 }}>
          {login.map((image, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                width: "20%",
                height: "20%",
                alignItems: "center",
              }}
            >
              <Image source={image} style={styles.logo} />
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 280,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    color: "black",
    fontWeight : 'bold',
    placeholderTextColor : "black"
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
