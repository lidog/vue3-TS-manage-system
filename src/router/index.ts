import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePremissStore } from "../store/premiss";
import Home from "../views/home.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/warehouse/produceInfo",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "warehouse/produceInfo",
        meta: {
          title: "仓库管理-产品信息",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "produceInfo" */ "../views/warehouse/produceInfo.vue"
          ),
      },
      // {
      //   path: "warehouse/printLabel",
      //   meta: {
      //     title: "仓库管理-打印标签",
      //     premiss: "2",
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "printLabel" */ "../views/warehouse/printLabel.vue"
      //     ),
      // },
      {
        path: "warehouse/labelManagement",
        meta: {
          title: "仓库管理-打印标签",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "printLabel" */ "../views/warehouse/labelManagement.vue"
          ),
      },
      {
        path: "warehouse/add",
        meta: {
          title: "仓库管理-入库",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "add" */ "../views/warehouse/add.vue"
          ),
      },
      {
        path: "warehouse/minus",
        meta: {
          title: "仓库管理-出库",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "minus" */ "../views/warehouse/minus.vue"
          ),
      },
      {
        path: "warehouse/warehouseManage",
        meta: {
          title: "仓库管理-库存管理",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "warehouseManage" */ "../views/warehouse/warehouseManage.vue"
          ),
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "消息中心",
          premiss: "3",
        },
        component: () =>
          import(/* webpackChunkName: "tabs" */ "../views/tabs.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "没有权限",
    },
    component: () => import(/* webpackChunkName: "403" */ "../views/403.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  const premiss = usePremissStore();
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.premiss && !premiss.key.includes(to.meta.premiss)) {
    // 如果没有权限，则进入403
    next("/403");
  } else {
    next();
  }
});

export default router;
