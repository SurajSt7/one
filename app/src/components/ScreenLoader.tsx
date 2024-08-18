import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import TextComponent from "./TextComponent";

const { height, width } = Dimensions.get("screen");
type ScreenLoaderProps = {
  visible?: boolean;
  message?: string;
};
const ScreenLoader = (props: ScreenLoaderProps) => {
  const { message, visible } = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ECD996" />
      {message && <TextComponent text={message} styles={styles.message} />}
    </View>
  );
};
export default ScreenLoader;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#ffffff",
  },
});
