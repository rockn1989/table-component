import { ActionType } from "./action";
import { MAX_POSTS } from "../const";

const initialState = {
  postList: [],
  postsAtPage: [],
  filterId: 0,
  activePage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_POSTS:
      return {
        ...state,
        postList: [...action.payload],
      };

    case ActionType.GET_POSTS_AT_PAGE:
      const currentPageList = state.postList.slice(
        (state.activePage - 1) * MAX_POSTS,
        state.activePage * MAX_POSTS
      );

      return {
        ...state,
        postsAtPage: [...currentPageList],
      };

    case ActionType.FILTER_ID:
      if (!action.payload || action.payload === "") {
        const filterList = state.postList.slice(
          (state.activePage - 1) * MAX_POSTS,
          state.activePage * MAX_POSTS
        );

        return {
          ...state,
          postsAtPage: [...filterList],
        };
      }

      const filterPosts = state.postList
        .slice((state.activePage - 1) * MAX_POSTS, state.activePage * MAX_POSTS)
        .filter((post) => post.userId === action.payload);

      return {
        ...state,
        postsAtPage: [...filterPosts],
      };

    case ActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
