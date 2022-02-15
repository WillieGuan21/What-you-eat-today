export default {
  g_userName(state) {
    return state.user.name;
  },
  g_userId(state) {
    return state.auth.id;
  },
  g_userToken(state) {
    return state.auth.token;
  },
  g_getfoods(state) {
    return state.foods;
  },
};
