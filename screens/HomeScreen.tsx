import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { colors } from "../utils";
import { Button } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ route, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("ReactQuiz")}>
        React Quiz
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
