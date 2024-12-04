export type RegistrationFormData = {
  image: string;
  login: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type CreatePostFormData = {
  title: string;
  imageLocation: string;
  image: string;
};

export interface AppIconProps {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}
