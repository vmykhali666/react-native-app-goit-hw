
import { combineReducers } from "redux";
import userReducer from "@/src/redux/reducers/userSlice";
import postsReducer from "@/src/redux/reducers/postsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
