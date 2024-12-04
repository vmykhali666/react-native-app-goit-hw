import { AppIconProps } from "@/data/types";
import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const GridIcon: React.FC<AppIconProps> = ({
  strokeColor = "#BDBDBD",
  fillColor = "#BDBDBD",
  size = 24,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect width="24" height="24" fill={fillColor} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3H10V10H3V3Z"
      stroke={strokeColor}
      strokeOpacity="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 3H21V10H14V3Z"
      stroke={strokeColor}
      strokeOpacity="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 14H21V21H14V14Z"
      stroke={strokeColor}
      strokeOpacity="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 14H10V21H3V14Z"
      stroke={strokeColor}
      strokeOpacity="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GridIcon;
