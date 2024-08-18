import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function OneLogo(props: any) {
  return (
    <Svg
      width={props.size || 99}
      height={props.size || 146}
      viewBox="0 0 99 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.986 0H42.59v99.453h14.395V0zM.713 145.254v-45.8h97.49v45.8H.713zm11.775-11.777v-22.246h73.936v22.246H12.487zM36.702 19.302V2.29L2.68 21.592v16.684l34.023-18.975zm0 10.794v17.012L2.68 66.083V49.398l34.023-19.302z"
        fill="url(#paint0_linear_1_344)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_344"
          x1={32.4049}
          y1={72.6269}
          x2={66.4831}
          y2={75.6681}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ECD996" />
          <Stop offset={0.475} stopColor="#fff" />
          <Stop offset={1} stopColor="#ECD996" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default OneLogo;
