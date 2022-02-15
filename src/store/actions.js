export default {
  a_calladdFoods(context, status) {
    context.commit("m_addFoods", status);
  },
};
