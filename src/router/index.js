import { createRouter, createWebHistory } from "vue-router";
import AturanView from "@/views/AturanView.vue";
import HomeView from "@/views/HomeView.vue";
import KecanduanView from "@/views/KecanduanView.vue";
import GejalaView from "@/views/GejalaView.vue";
import auth from "@/stores/auth";
import PrediksiView from "@/views/PrediksiView.vue";

const routes = [
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
    path: "/prediksi",
    name: "prediksi",
    component: PrediksiView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = auth();
  const isAuthenticated = !!sessionStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
