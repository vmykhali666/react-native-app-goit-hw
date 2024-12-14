import { Coordinates, PostType } from "./post";

export interface AppIconProps {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}

export type MapParamList = {
  map: {
    coordinates: Coordinates;
    otherParam?: string;
  };
};

export type CommentsParamList = {
  comments: {
    post: PostType;
    otherParam?: string;
  };
};