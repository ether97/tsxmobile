import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated as NativeAnimated,
} from "react-native";
import React from "react";
import { data } from "../data";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { alphabet } from "../utils";
import { Button } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};

const CARD_HEIGHT = height * 0.6;
const CARD_WIDTH = width * 0.9;

const maxVisibleItems = 16;

interface CardProps {
  totalLength: number;
  index: number;
  info: (typeof data)[0];
  activeIndex: SharedValue<number>;
  direction: SharedValue<string>;
}

const Card: React.FC<CardProps> = ({
  totalLength,
  index,
  info,
  activeIndex,
  direction,
}) => {
  const shake = useSharedValue(0);
  const jump = useSharedValue(0);
  const stylez = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: totalLength - index,
      //   opacity: 0.1,
      shadowOpacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [0, 0, 1]
      ),
      // opacity: interpolate(
      //   activeIndex.value,
      //   [index - 1, index, index + 1],
      //   [1 - 1 / maxVisibleItems, 1, 1]
      // ),
      transform: [
        {
          translateY:
            direction.value === "vertical"
              ? interpolate(
                  activeIndex.value,
                  [index - 1, index, index + 1],
                  [-20, 0, layout.height],
                  {
                    extrapolateRight: Extrapolate.CLAMP,
                  }
                )
              : 0,
        },
        {
          translateX: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0, 0, 400]
          ),
        },
        {
          rotateZ: `${shake.value}deg`,
        },
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.96, 1, 1]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[styles.cardStyle, stylez, { backgroundColor: info.color }]}
    >
      <Text style={{ fontSize: 25, marginBottom: 30 }}>{info.question}</Text>
      <View style={{ gap: 20 }}>
        {info.answers.map((answer, index) => (
          <Pressable key={answer}>
            {/* <Text key={answer} style={{ fontSize: 20 }}>
            </Text> */}
            <Button
              labelStyle={{ fontSize: 20 }}
              // icon="camera"
              mode="contained"
              onPress={() => {
                if (answer === info.correct) {
                  direction.value = "horizontal";
                  activeIndex.value = withDelay(
                    150,
                    withTiming(activeIndex.value + 1, { duration: 300 })
                  );

                  jump.value = withSequence(
                    withTiming(-5, { duration: 50 }),
                    withRepeat(withTiming(10, { duration: 80 }), 6, true),
                    withTiming(0, { duration: 50 })
                  );
                  // Alert.alert("Correct answer!");
                } else {
                  // Alert.alert("Incorrect!");
                  direction.value = "horizontal";

                  activeIndex.value = withDelay(
                    150,
                    withTiming(activeIndex.value + 1, { duration: 300 })
                  );
                  shake.value = withSequence(
                    withTiming(-5, { duration: 50 }),
                    withRepeat(withTiming(1, { duration: 80 }), 6, true),
                    withTiming(0, { duration: 50 })
                  );
                }
              }}
            >
              {alphabet[index]}.&nbsp;{answer}
            </Button>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardStyle: {
    height: layout.height,
    width: layout.width,
    backgroundColor: "white",
    borderRadius: layout.borderRadius,
    // alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    shadowColor: "#111",
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
});
