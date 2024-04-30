import axios from "axios";

const BACKEND_URL =
  "https://react-native-resort-app-default-rtdb.firebaseio.com";

export const registerUser = (userData) => {
  axios.post(BACKEND_URL + "/user.json", userData);
};

export const getData = () => {
    axios.get(BACKEND_URL + "/user.json");
} 
