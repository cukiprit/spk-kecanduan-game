import { createRouter, createWebHistory } from "vue-router";
import AturanView from "@/views/AturanView.vue";
import HomeView from "@/views/HomeView.vue";
import KecanduanView from "@/views/KecanduanView.vue";
import GejalaView from "@/views/GejalaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/kecanduan",
      name: "kecanduan",
      component: KecanduanView,
    },
    {
      path: "/gejala",
      name: "gejala",
      component: GejalaView,
    },
    {
      path: "/aturan",
      name: "aturan",
      component: AturanView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
