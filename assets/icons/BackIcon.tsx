import { AppIconProps } from "@/src/data/types";
import React from "react";
import Svg, { Path } from "react-native-svg";

const BackIcon: React.FC<AppIconProps> = ({
  strokeColor = "#BDBDBD",
  fillColor = "#BDBDBD",
  size = 24,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 18L4 12L10 6"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIcon;
