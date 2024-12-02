import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
    strokeColor?: string;
    fillColor?: string;
    size?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ strokeColor = "#212121", fillColor = "#212121", size = 14 }) => (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <Path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M7.5 0.5H6.5V6.5H0.5V7.5H6.5V13.5H7.5V7.5H13.5V6.5H7.5V0.5Z" 
            fill={fillColor} 
            fillOpacity="0.8"
            stroke={strokeColor}
        />
    </Svg>
);

export default PlusIcon;