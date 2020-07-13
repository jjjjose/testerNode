const routes = [
  {
    path: "/",
    component: () => import("layouts/Base.vue"),
    children: [
      { path: "", redirect: "/test" },
      {
        path: "test",
        component: () => import("pages/Test.vue")
      },
      {
        path: "scan",
        component: () => import("pages/Scan.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
