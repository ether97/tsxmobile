import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { data } from "../data";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

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
}

const Card: React.FC<CardProps> = ({
  totalLength,
  index,
  info,
  activeIndex,
}) => {
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
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / maxVisibleItems, 1, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-20, 0, layout.height],
            {
              extrapolateRight: Extrapolate.CLAMP,
            }
          ),
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
      <Text style={{ fontSize: 20, position: "absolute", top: 10, left: 50 }}>
        {info.id}
      </Text>
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
