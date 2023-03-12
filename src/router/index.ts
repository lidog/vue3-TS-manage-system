import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePremissStore } from "../store/premiss";
import Home from "../views/home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/warehouse/produceInfo",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    // children: [
    //     {
    //         path: '/dashboard',
    //         name: 'dashboard',
    //         meta: {
    //             title: '系统首页',
    //             premiss: '1',
    //         },
    //         component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
    //     },
    //     {
    //         path: '/table',
    //         name: 'basetable',
    //         meta: {
    //             title: '表格',
    //             premiss: '2',
    //         },
    //         component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
    //     },
    //     {
    //         path: '/charts',
    //         name: 'basecharts',
    //         meta: {
    //             title: '图表',
    //             premiss: '11',
    //         },
    //         component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
    //     },
    //     {
    //         path: '/form',
    //         name: 'baseform',
    //         meta: {
    //             title: '表单',
    //             premiss: '5',
    //         },
    //         component: () => import(/* webpackChunkName: "form" */ '../views/form.vue'),
    //     },
    //     {
    //         path: '/tabs',
    //         name: 'tabs',
    //         meta: {
    //             title: 'tab标签',
    //             premiss: '3',
    //         },
    //         component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
    //     },
    //     {
    //         path: '/donate',
    //         name: 'donate',
    //         meta: {
    //             title: '鼓励作者',
    //             premiss: '14',
    //         },
    //         component: () => import(/* webpackChunkName: "donate" */ '../views/donate.vue'),
    //     },
    //     {
    //         path: '/premission',
    //         name: 'premission',
    //         meta: {
    //             title: '权限管理',
    //             premiss: '13',
    //         },
    //         component: () => import(/* webpackChunkName: "premission" */ '../views/premission.vue'),
    //     },
    //     {
    //         path: '/upload',
    //         name: 'upload',
    //         meta: {
    //             title: '上传插件',
    //             premiss: '6',
    //         },
    //         component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
    //     },
    //     {
    //         path: '/icon',
    //         name: 'icon',
    //         meta: {
    //             title: '自定义图标',
    //             premiss: '10',
    //         },
    //         component: () => import(/* webpackChunkName: "icon" */ '../views/icon.vue'),
    //     },
    //     {
    //         path: '/user',
    //         name: 'user',
    //         meta: {
    //             title: '个人中心',
    //         },
    //         component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
    //     },
    //     {
    //         path: '/editor',
    //         name: 'editor',
    //         meta: {
    //             title: '富文本编辑器',
    //             premiss: '8',
    //         },
    //         component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue'),
    //     },
    //     {
    //         path: '/markdown',
    //         name: 'markdown',
    //         meta: {
    //             title: 'markdown编辑器',
    //             premiss: '9',
    //         },
    //         component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
    //     },
    //     {
    //         path: '/export',
    //         name: 'export',
    //         meta: {
    //             title: '导出Excel',
    //             premiss: '2',
    //         },
    //         component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
    //     },
    //     {
    //         path: '/import',
    //         name: 'import',
    //         meta: {
    //             title: '导入Excel',
    //             premiss: '2',
    //         },
    //         component: () => import(/* webpackChunkName: "import" */ '../views/import.vue'),
    //     },
    // ],
    children: [
      {
        path: "warehouse/produceInfo",
        meta: {
          title: "仓库管理-产品信息",
          premiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "warehouseProduceInfo" */ "../views/warehouse/produceInfo.vue"
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
            /* webpackChunkName: "warehouseAdd" */ "../views/warehouse/add.vue"
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
            /* webpackChunkName: "warehouseMinus" */ "../views/warehouse/minus.vue"
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
