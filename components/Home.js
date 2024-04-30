import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Image,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import Swiper from "react-native-swiper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient"; // Import LinearGradient from react-native-linear-gradient
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import DrawerPosition from "./DrawerPosition";

const Home = ({ navigation }) => {
  const swiperRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const images = [
    require("../assets/Images/picOne.png"),
    require("../assets/Images/picTwo.png"),
    require("../assets/Images/picThree.png"),
  ];


  const navigateToAboutUs = () => {
    navigation.navigate("About Us");
  };

  const SignIn = () => {
    navigation.navigate("Sign In");
  };

  const SignUp = () => {
    navigation.navigate("Sign Up");
  };

  const navigateToFiles = () => {
    navigation.navigate("Files", {
      id: "Files",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.scrollBy) {
        swiperRef.current.scrollBy(1, true);
      }

      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();

      return () => {
        animatedValue.setValue(0);
      };
    }, 2000); // Change 2000 to your desired auto play duration in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/Images/background.jpg")}
      style={styles.background}
      opacity={0.6}
    >
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Animated.Text style={[styles.light, { opacity: animatedValue }]}>
            Book you Holiday Resort with 20% discount !
          </Animated.Text>
        </View>
        <Swiper
          style={styles.swiper}
          ref={swiperRef}
          showsButtons={false}
          autoplay={false}
          loop={true}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={image} style={styles.image} />
            </View>
          ))}
        </Swiper>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={SignIn}>
            <Text style={styles.text}>Already have an account</Text>
          </Pressable>
          <View style={styles.button}>
            <Button title="Sign Up" onPress={SignUp} />
          </View>
        </View>

      

        {/*<DrawerPosition />*/}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  swiper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  gradient: {
    position: "absolute", // Position the gradient overlay
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  light: {
    color: "#ff0574",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Home;
