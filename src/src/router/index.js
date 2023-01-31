import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Cookies from "../views/Cookies.vue";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login.vue";
import Modal from "../views/Modal.vue";
import Activity from "../views/Activity.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/cookies",
    name: "Cookies",
    component: Cookies,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/activity/:id",
    name: "Activity",
    component: Activity,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

// note that base goes in as arg to createWebHistory - if serving from subdir
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//https://stackoverflow.com/questions/45091380/vue-router-keep-query-parameter-and-use-same-view-for-children
function hasQueryParams(route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({ ...to, query: from.query });
  } else {
    next();
  }
});

export default router;
