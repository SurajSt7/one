import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import TextComponent from "./TextComponent";
import React, { ForwardedRef, forwardRef, useState } from "react";
import SpaceComponent from "./SpaceComponent";
import Eye from "../features/svg/Eye";
import EyeCrossed from "../features/svg/EyeCrossed";

const { height } = Dimensions.get("window");

type InputComponentProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  placeholder?: string;
  keyboardType?: "default" | "decimal-pad" | "number-pad" | "email-address";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  maxLength?: number;
  inputStyle?: StyleProp<TextStyle>;
  isSecure?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  ref?: string;
  bgColor?: string;
  color?: string;
  allowBorderWidth?: boolean;
};

const InputComponent = forwardRef(
  (props: InputComponentProps, ref: ForwardedRef<TextInput>) => {
    const {
      value,
      onChange,
      errorMessage,
      placeholder,
      keyboardType,
      leftIcon,
      rightIcon,
      maxLength,
      inputStyle,
      isSecure,
      editable,
      bgColor,
      autoFocus,
      color,
      allowBorderWidth = true,
    } = props;
    const colorScheme = useColorScheme();
    const [showPassword, setShowPassword] = useState(isSecure);

    return (
      <>
        <View
          style={[
            styles.inputViewStyles,
            {
              borderColor: colorScheme === "dark" ? "#fff" : "#121212",
              backgroundColor: bgColor ? bgColor : "transparent",
              borderWidth: allowBorderWidth ? 1.1 : 0,
            },

            inputStyle,
          ]}
        >
          {leftIcon ?? null}
          <TextInput
            onChangeText={onChange}
            autoFocus={autoFocus}
            editable={editable}
            ref={ref}
            maxLength={maxLength}
            keyboardType={keyboardType ?? "default"}
            secureTextEntry={showPassword}
            placeholderTextColor={colorScheme === "light" ? "#121212" : "#fff"}
            cursorColor={"#ECD996"}
            style={[
              {
                flex: 1,
                height: height * 0.038,
                color: color
                  ? color
                  : colorScheme === "dark"
                  ? "#fff"
                  : "#000000",
              },
              inputStyle,
            ]}
            placeholder={placeholder ?? ""}
          />
          {rightIcon ?? null}
          {isSecure ? (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye color={"#676767"} size={18} />
              ) : (
                <EyeCrossed color={"#676767"} size={18} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        {errorMessage && value ? (
          <>
            <TextComponent text={errorMessage} color="#cf6679" />
            <SpaceComponent height={10} />
          </>
        ) : (
          <View style={{ height: 16 }} />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  inputViewStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 8,
    gap: 8,
    marginBottom: 4,
  },
});
export default InputComponent;
