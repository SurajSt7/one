import { StyleProp, View, ViewStyle } from "react-native";

type SpaceProps = {
  height?: number;
  styles?: StyleProp<ViewStyle>;
};

const SpaceComponent = (props: SpaceProps) => {
  const { height, styles } = props;
  return (
    <View
      style={[
        {
          height: height ? height : 20,
        },
        styles,
      ]}
    />
  );
};
export default SpaceComponent;
