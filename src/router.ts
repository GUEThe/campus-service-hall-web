import Vue from "vue"
import Router, { Route } from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

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
      meta: "首页",
      component: () => import("./views/index/index.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: "登录",
      component: () => import("./views/login/index.vue")
    },   {
      path: "/register",
      name: "register",
      meta: "注册",
      component: () => import("./views/register/index.vue")
    },
  ]
})

// 简单权限控制
const whiteList: string[] = ["login", "signup"]
const isLogin: boolean = false
router.beforeEach((to: Route, form: Route, next: Function) => {
  // 不在白名单内，没有登陆
  // if (whiteList.indexOf(to.name as string) === -1 && !isLogin) {
  //   next("/login")
  // }
  next()
})

export default router
