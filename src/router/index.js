import Vue from "vue";
import VueRouter from "vue-router";
import PhotoView from "../views/PhotoView.vue";
import InfoView from "../views/InfoView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: PhotoView,
  },
  {
    path: "/",
    name: "homeAfter",
    component: PhotoView,
  },
  {
    path: "/photo/:id",
    name: "photo",
    component: PhotoView,
    meta: {
      reload: true,
    },
  },
  {
    path: "/album/:album",
    name: "album",
    component: PhotoView,
  },
  {
    path: "/album/:album",
    name: "albumAfter",
    component: PhotoView,
  },
  {
    path: "/info",
    name: "info",
    component: InfoView,
  }
];

const router = new VueRouter({
  base: process.env.VUE_APP_BASE_PATH,
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
