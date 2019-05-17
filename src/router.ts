import Vue from "vue";
import Router, { Route } from "vue-router";
import { UserModule } from "@/store/modules/user";

import { DeptModule } from "@/store/modules/dept";

Vue.use(Router);

const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./views/index/index.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register/index.vue")
    },
    {
      path: "/serviceList",
      name: "serviceList",
      component: () => import("./views/serviceList/index.vue")
    },
    {
      path: "/serviceDetail",
      name: "serviceDetail",
      component: () => import("./views/serviceDetail/index.vue")
    },
    {
      path: "/question",
      name: "question",
      component: () => import("./views/question/index.vue")
    },
    {
      path: "/userCenter",
      name: "userCenter",
      component: () => import("./views/userCenter/index.vue")
    },
    {
      path: "/phoneList",
      name: "phoneList",
      component: () => import("./views/phoneList/index.vue")
    }
  ]
});

// 简单权限控制
const whiteList: string[] = ["login", "signup"];
const isLogin: boolean = false;
router.beforeEach((to: Route, form: Route, next: Function) => {
  // 不在白名单内，没有登陆
  // if (whiteList.indexOf(to.name as string) === -1 && !isLogin) {
  //   next("/login")
  // }
  UserModule.GetUserInfo();
  DeptModule.GetDeptList();
  next();
});

export default router;
