import { AppIconProps } from "@/data/types";
import React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const AddIcon: React.FC<AppIconProps> = ({
  strokeColor = "#BDBDBD",
  fillColor = "#BDBDBD",
  size = 24,
  ...props
}: SvgProps & { strokeColor?: string; fillColor?: string; size?: number }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - 1}
      fill={fillColor}
      stroke={strokeColor}
    />
    <Path
      fill={strokeColor}
      fillRule="evenodd"
      d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default AddIcon;
