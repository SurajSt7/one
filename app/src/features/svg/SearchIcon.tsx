import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SearchIcon(props: any) {
  return (
    <Svg
      width={props.size || 25}
      height={props.size || 25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.333 10.208a6.875 6.875 0 1113.75 0 6.875 6.875 0 01-13.75 0zM10.208.417C4.8.417.416 4.8.416 10.208.416 15.616 4.8 20 10.208 20a9.746 9.746 0 005.47-1.67l5.704 5.704a1.875 1.875 0 102.652-2.651l-5.704-5.704a9.746 9.746 0 001.67-5.47C20 4.8 15.616.416 10.208.416z"
        fill="#999"
      />
    </Svg>
  );
}

export default SearchIcon;
