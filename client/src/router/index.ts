import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("@/views/play.vue"),
    },
    {
      path: "/recommend",
      name: "recommend",
      component: () => import("../views/recommend.vue"),
    },
  ],
});

export default router;
