import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const CustomDrawer = ({ isOpen, onClose, onOpen }) => {
  return (
    <View
      style={[styles.drawerContainer, isOpen ? styles.open : styles.closed]}
    >
      <View
        style={{
          borderColor: "#317fff",
          borderWidth: 3,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          borderBottomWidth : 0,
          flex :1,
          width :"100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={isOpen ? onClose : onOpen}>
          <Text style={{ color: "white" }}>
            {isOpen ? (
              <Icon name="chevrons-down" size={30} color="#317fff" />
            ) : (
              <Icon name="chevrons-up" size={30} color="#317fff" />
            )}
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white" }}>Drawer Content</Text>
      </View>
    </View>
  );
};

const DrawerPosition = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContainer: {
    position: "absolute",
    backgroundColor: "#c1c4d2",
    width: "100%",
    height: 200,
    zIndex: 1,
    elevation: 5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 5,
    // justifyContent: "center",
   
  },
  open: {
    top: -10,
  },
  closed: {
    top: 150, // Adjust as needed to hide the drawer off-screen
  },
});

export default DrawerPosition;
