export const ActionType = {
  GET_ALL_POSTS: "get_all_post",
  FILTER_POST: "filter_post",
  FILTER_ID: "filter_text",
  SET_CURRENT_PAGE: "set_current_page",
  GET_POSTS_AT_PAGE: "get_posts_at_page",
};

export const ActionCreator = {
  getAllPosts: (posts) => ({
    type: ActionType.GET_ALL_POSTS,
    payload: posts,
  }),
  getPostsAtPage: () => ({
    type: ActionType.GET_POSTS_AT_PAGE,
  }),
  filterPost: (posts) => ({
    type: ActionType.FILTER_POST,
    payload: posts,
  }),
  filterId: (id) => ({
    type: ActionType.FILTER_ID,
    payload: id,
  }),
  setCurrentPage: (page) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: page,
  }),
};
