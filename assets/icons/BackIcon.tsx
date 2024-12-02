import React from "react";
import Svg, { Path } from "react-native-svg";

interface BackIconProps {
  strokeColor?: string;
  strokeOpacity?: number;
  size?: number;
}

const BackIcon: React.FC<BackIconProps> = ({
  strokeColor = "#212121",
  strokeOpacity = 0.8,
  size = 24,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4"
      stroke={strokeColor}
      strokeOpacity={strokeOpacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 18L4 12L10 6"
      stroke={strokeColor}
      strokeOpacity={strokeOpacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIcon;
