import { createRouter, createWebHashHistory } from "vue-router";
// import store from "../store";
import Home from "../views/home/index.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "home page",
      keepAlive: true,
      name: "Home",
    },
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
