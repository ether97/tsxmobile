import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { data } from "./data";
import Card from "./components/Card";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const duration = 300;
const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};
const maxVisibleItems = 6;

const colors = {
  primary: "#133337",
  light: "#fff",
  dark: "#111",
};

export default function App() {
  const activeIndex = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (activeIndex.value === 0) {
        return;
      }
      activeIndex.value = withTiming(activeIndex.value - 1, { duration });
      console.log("fling up");
    });
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (activeIndex.value === data.length) {
        return;
      }
      activeIndex.value = withTiming(activeIndex.value + 1, { duration });

      console.log("fling down");
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" hidden />
      <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
        <View style={[styles.dataContainer]} pointerEvents="box-none">
          {data.map((item, index) => (
            <Card
              info={item}
              key={item.id}
              index={index}
              activeIndex={activeIndex}
              totalLength={data.length - 1}
            />
          ))}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
    height,
    width,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,

    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "red",
  },
});

