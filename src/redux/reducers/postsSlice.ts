import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "@/src/data/post";

const postsReducer = createSlice({
  name: "posts",
  initialState: [] as PostType[],
  reducers: {
    addNewPost(state, action) {
      return [action.payload, ...state];
    },
    setPosts(state, action) {
      return [...action.payload];
    },
    updatePost(state, action) {
      const postIndex = state.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        return [
          ...state.slice(0, postIndex),
          action.payload,
          ...state.slice(postIndex + 1),
        ];
      }
    },
    resetData(state) {
      return [];
    },
  },
});

export const { setPosts, resetData, addNewPost, updatePost } =
  postsReducer.actions;

export default postsReducer.reducer;
