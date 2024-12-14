import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "@/config";
import { addUser, getUser } from "@/src/utils/firestore";
import {
  AuthCredentials,
  RegistrationCredentials,
  User,
} from "@/src/data/user";
import { AppDispatch } from "@/src/redux/store";
import { setUserInfo, clearUserInfo } from "@/src/redux/reducers/userSlice";
import { Alert } from "react-native";

export const registrationDB = async ({
  email,
  image,
  name,
  password,
}: RegistrationCredentials) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userData = await addUser(user.uid, {
      userId: user.uid,
      email: email,
      name: name,
      image: image,
      createdAt: Date.now(),
    });

    return userData;
  } catch (error: any) {
    Alert.alert("Помилка", error.message);
    throw error;
  }
};

export const loginDB = async ({ email, password }: AuthCredentials) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUser(user.uid);
    return userData;
  } catch (error: any) {
    Alert.alert("Помилка", error.message);
    throw error;
  }
};

//Update user data
export const updateUser = async (update: {
  displayName?: string;
  photoURL?: string;
}) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

//Get user data
export const authStateChanged = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid);
      if (userData) {
        dispatch(setUserInfo(userData));
      }
    } else {
      dispatch(clearUserInfo());
    }
  });
};

export const logoutDB = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
