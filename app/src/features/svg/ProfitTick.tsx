import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ProfitTick(props: any) {
  return (
    <Svg
      width={props.size || 13}
      height={props.size || 12}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M6.5 0l6.495 11.25H.005L6.5 0z" fill="#34C759" />
    </Svg>
  );
}

export default ProfitTick;
