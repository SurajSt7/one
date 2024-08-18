// import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  ViewStyle,
  StyleProp,
} from "react-native";

type ViewComponentProps = {
  padding?: boolean;
  children?: React.ReactNode;
  touchableFeedback?: boolean;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
};
const ViewComponent = (props: ViewComponentProps) => {
  const { padding = true, children, touchableFeedback = true, bgColor } = props;
  const colorScheme = useColorScheme();

  const renderBackground = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor
            ? bgColor
            : colorScheme === "dark"
            ? "#121212"
            : "#ffffff",
          paddingHorizontal: padding ? 16 : 0,
        }}
      >
        <StatusBar barStyle={"dark-content"} />
        {children}
      </View>
    );
  };
  return touchableFeedback ? (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {renderBackground()}
    </TouchableWithoutFeedback>
  ) : (
    renderBackground()
  );
};
export default ViewComponent;
