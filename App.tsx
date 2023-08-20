import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ReactQuizScreen from "./screens/ReactQuizScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./utils";
import HomeScreen from "./screens/HomeScreen";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  <View style={{ flex: 1, backgroundColor: "red" }}>Hi</View>;
  // <NavigationContainer>
  //   <Stack.Navigator initialRouteName="Home">
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //     <Stack.Screen name="ReactQuiz" component={ReactQuizScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>;
};

export default App;

const styles = StyleSheet.create({});
