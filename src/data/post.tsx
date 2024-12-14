export type PostComment = {
  id: string;
  ownerId: string;
  createdAt: number; // timestamp
  text: string;
};

export type PostType = {
  id: string;
  ownerId: string;
  image: string;
  title: string;
  comments: PostComment[];
  likes: number;
  likesUsers: string[];
  location: string;
  coordinates: Coordinates;
  createdAt: number; // timestamp
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};
