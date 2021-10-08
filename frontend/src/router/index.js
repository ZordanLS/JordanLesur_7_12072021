import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/Signup.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/Profile.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("../components/Post.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/Login", "/Signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("groupomaniatoken");

  if (authRequired && !loggedIn) {
    return next("/Login");
  }

  next();
});

export default router;
