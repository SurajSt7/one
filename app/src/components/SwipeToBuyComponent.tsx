import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import TextComponent from "./TextComponent";

const { height, width } = Dimensions.get("window");

const BUTTON_WIDTH = 350;
const BUTTON_HEIGHT = 80;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

type SwipeToBuyProps = {
  onToggle: (arg: boolean) => void;
};
const SwipeToBuyComponent = (props: SwipeToBuyProps) => {
  const { onToggle } = props;
  const [toggled, setToggled] = useState<boolean>(false);
  const [mid, setMid] = useState(false);
  const X = useSharedValue(0);
  function handleComplete(isToggled: boolean) {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  }
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.completed = toggled;
    },
    onActive: (e, context) => {
      let newValue: number;
      console.log("context inside onActive: ", context);
      if (context.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
        console.log("entered 1st if block: ", newValue);
      } else X.value = e.translationX;
      console.log(e);
      if (newValue! >= 0 && newValue! <= H_SWIPE_RANGE) {
        X.value = newValue!;
      }
      if (X.value >= H_SWIPE_RANGE / 16 && X.value <= H_SWIPE_RANGE / 8) {
        runOnJS(setMid)(true);
      }
      if (X.value >= H_SWIPE_RANGE) {
        X.value = H_SWIPE_RANGE;
      }
      if (X.value <= 0) {
        X.value = 0;
      }
    },

    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(setMid)(false);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
        runOnJS(setMid)(false);
      }
    },
  });

  const interpolateInput = [0, H_SWIPE_RANGE];

  const animatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          interpolateInput,
          [1, 1],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              interpolateInput,
              [0, BUTTON_WIDTH / 2],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,
        opacity: interpolate(
          X.value,
          interpolateInput,
          [0, 0.8],
          Extrapolate.CLAMP
        ),
        // backgroundColor: toggled ? "#34C759" : "#ECD996",
      };
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.colorWave, animatedStyles.colorWave]}
      ></Animated.View>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, animatedStyles.swipeable]}>
          <TextComponent text={toggled ? "✔" : ">"} color="#000" size={24} />
        </Animated.View>
      </PanGestureHandler>
      {!mid ? (
        <Animated.Text style={[styles.swipeText]}>
          {toggled ? "Confirmed !" : "Swipe to Buy"}
        </Animated.Text>
      ) : null}
      {mid ? (
        <Animated.Text style={[styles.swipeText]}>
          {mid ? "Release" : ""}
        </Animated.Text>
      ) : null}
    </View>
  );
};
export default SwipeToBuyComponent;

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    padding: BUTTON_PADDING,
    borderRadius: BUTTON_HEIGHT,
    justifyContent: "center",
    backgroundColor: "#ECD996",
    alignItems: "center",
    display: "flex",
  },
  swipeable: {
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    position: "absolute",
    left: BUTTON_PADDING,
    borderRadius: SWIPEABLE_DIMENSIONS,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  swipeText: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    zIndex: 1,
  },
  colorWave: {
    position: "absolute",
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
    backgroundColor: "grey",
    opacity: 0.8,
  },
});
