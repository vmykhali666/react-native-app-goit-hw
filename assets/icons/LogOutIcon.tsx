import React from "react";
import Svg, { Path } from "react-native-svg";

interface LogOutIconProps {
  strokeColor?: string;
  size?: number;
}

const LogOutIcon: React.FC<LogOutIconProps> = ({
  strokeColor = "#BDBDBD",
  size = 24,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 16L21 12L17 8"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 12H9"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LogOutIcon;
