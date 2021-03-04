import { ActionType } from "./action";
import { MAX_POSTS } from "../const";

const initialState = {
  postList: [],
  postsAtPage: [],
  filterList: [],
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

    case ActionType.FILTER_POST:
      const filterPosts = state.postList
        .slice((state.activePage - 1) * MAX_POSTS, state.activePage * MAX_POSTS)
        .filter((post) => post.userId === state.filterId);

      return {
        ...state,
        postsAtPage: [...filterPosts],
      };

    case ActionType.FILTER_ID:
      return {
        ...state,
        filterId: action.payload,
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
