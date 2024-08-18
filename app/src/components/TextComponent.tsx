import React from "react";
import { View, Text, StyleProp, TextStyle, useColorScheme } from "react-native";

type TextComponentProps = {
  text: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
  fontWeight?: "400" | "500" | "600" | "700" | "bold" | "normal";
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  lineHeight?: number;
};

const TextComponent = (props: TextComponentProps) => {
  const { text, size, styles, fontWeight, color, textAlign, lineHeight } =
    props;
  const colorScheme = useColorScheme();
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          fontSize: size ?? 14,
          fontWeight: fontWeight ?? 500,
          // color: colorScheme === "dark" ? "white" : color ?? "#000000",
          color: color ? color : colorScheme === "dark" ? "white" : "#000000",
          textAlign: textAlign ?? "auto",
          lineHeight: lineHeight,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};
export default TextComponent;
