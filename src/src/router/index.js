import { createWebHistory, createRouter } from "vue-router";

import About from "../views/About.vue";
import Activity from "../views/Activity.vue";
import BookingResponse from "../views/BookingResponse.vue";
import CancelConfirm from "../views/CancelConfirm.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Slot from "../views/Slot.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/activity/:id",
    name: "Activity",
    component: Activity,
  },
  {
    path: "/bookingResponse",
    name: "BookingResponse",
    component: BookingResponse,
  },
  {
    path: "/cancelConfirm/:id",
    name: "CancelConfirm",
    component: CancelConfirm,
  },
  {
    path: "/slot/:id",
    name: "Slot",
    component: Slot,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

// note that base goes in as arg to createWebHistory - if serving from subdir
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
