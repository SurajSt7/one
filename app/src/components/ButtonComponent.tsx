import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
} from "react-native";
import TextComponent from "./TextComponent";

type ButtonProps = {
  onPress: () => void;
  title: string;
  buttonStyles?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;
};

const { height } = Dimensions.get("window");

const ButtonComponent = (props: ButtonProps) => {
  const { onPress, title, buttonStyles, loading, disabled, bgColor } = props;
  const colorScheme = useColorScheme();

  const renderButton = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size={"small"}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      );
    } else {
      return (
        <TextComponent
          text={title}
          size={16}
          fontWeight="500"
          color={colorScheme === "dark" ? "white" : "black"}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        style.buttonView,
        {
          backgroundColor: bgColor ? bgColor : disabled ? "#D9D9D9" : "#ECD996",
        },
        buttonStyles,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {renderButton()}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonView: {
    width: "99.9%",
    height: height * 0.065,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});
export default ButtonComponent;
