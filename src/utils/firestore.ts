import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User } from "@/src/data/user";
import { PostComment, PostType } from "@/src/data/post";
import { getImage } from "@/src/utils/imagePicker";

export const uploadImage = async (
  userId: string,
  file: Blob,
  fileName: string
) => {
  try {
    const imageRef = ref(
      storage,
      `images/${userId}/${new Date().getTime()}-${fileName}`
    );
    const result = await uploadBytes(imageRef, file);
    return imageRef;
  } catch (error: any) {
    console.error(
      "Error details:",
      " message: ",
      error.message,
      " code: ",
      error.code,
      " payload: ",
      error.payload
    );
    if (error.serverResponse) {
      console.error("Server Response:", error.serverResponse);
    }
  }
};

export const getImageUrl = async (imageRef: any): Promise<string> => {
  const url = await getDownloadURL(imageRef);
  return url;
};

export const addUser = async (userId: string, userData: User) => {
  try {
    const { imageBlob, fileName } = await getImage(userData.image);
    if (imageBlob) {
      const imageRef = await uploadImage(userId, imageBlob, fileName);
      const imageUrl = await getImageUrl(imageRef);

      const user = { ...userData, image: imageUrl } as User;
      await setDoc(doc(db, "users", userId), user, { merge: true });
      return user;
    } else {
      console.error("Error getting image blob data");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const addPost = async (userId: string, post: PostType) => {
  try {
    const { imageBlob, fileName } = await getImage(post.image);
    const imageRef = await uploadImage(userId, imageBlob, fileName);
    const imageUrl = await getImageUrl(imageRef);

    const newPost = { ...post, image: imageUrl } as PostType;
    await setDoc(doc(db, "posts", newPost.id), newPost, { merge: true });
    return newPost;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};
export const getPostById = async (postId: string): Promise<PostType | null> => {
  try {
    if (!postId) {
      console.error("Invalid user ID or post ID.");
      return null;
    }
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data() as PostType;
      return post;
    } else {
      throw new Error("No post found for the given ID.");
    }
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
};

export const getPostsForUser = async (userId: string) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return posts as PostType[];
  } catch (error) {
    console.error("Error getting posts for user:", error);
    return [];
  }
};

export const getPosts = async () => {
  try {
    const postsRef = collectionGroup(db, "posts");

    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return posts as PostType[];
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    return null;
  }
};

export const updateUserImage = async (userId: string, image: string) => {
  try {
    const { imageBlob, fileName } = await getImage(image);
    if (imageBlob) {
      const imageRef = await uploadImage(userId, imageBlob, fileName);
      const imageUrl = await getImageUrl(imageRef);

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { image: imageUrl });
    } else {
      console.error("Error getting image blob data");
    }
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

export const updateComments = async (postId: string, comment: PostComment) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
  } catch (error) {
    console.error("Error updating comments:", error);
  }
};

export const updateLikes = async (postId: string, userId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data() as PostType;
      const likesUsers = post.likesUsers || [];
      if (likesUsers.includes(userId)) {
        await updateDoc(postRef, {
          likes: post.likes - 1,
          likesUsers: likesUsers.filter((id) => id !== userId),
        });
      } else {
        await updateDoc(postRef, {
          likes: post.likes + 1,
          likesUsers: arrayUnion(userId),
        });
      }
    } else {
      throw new Error("No post found for the given ID.");
    }
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

export const getUserProfileImage = async (userId: string): Promise<string> => {
  try {
    const user = await getUser(userId);
    if (user) {
      return user.image;
    } else {
      console.error("User not found.");
      return "";
    }
  } catch (error) {
    console.error("Error getting user profile image:", error);
    return "";
  }
};
