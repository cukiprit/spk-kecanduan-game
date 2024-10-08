import { createRouter, createWebHistory } from "vue-router";
import AturanView from "@/views/AturanView.vue";
import HomeView from "@/views/HomeView.vue";
import KecanduanView from "@/views/KecanduanView.vue";
import GejalaView from "@/views/GejalaView.vue";
import auth from "@/stores/auth";
import PrediksiView from "@/views/PrediksiView.vue";
import ResultView from "@/views/ResultView.vue";

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
    path: "/hasil",
    name: "hasil",
    component: ResultView,
    props: true,
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
  authStore.loadToken();
  const isAuthenticated = !!authStore.token;

  if (to.name !== "login" && !isAuthenticated) {
    if (to.name === "home" || to.name === "register") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
