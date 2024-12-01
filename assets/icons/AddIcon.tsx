import React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const AddIcon = ({ color = "white", ...props }: SvgProps & { color?: string }) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Circle cx={12.5} cy={12.5} r={12} stroke={color} />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default AddIcon;
