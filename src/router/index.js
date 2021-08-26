import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // ---------- 前台路由 ----------
  {
    path: '/',
    component: () => import('../views/front/Front.vue'),
    children: [
      {
        // 首頁
        path: '',
        component: () => import('../views/Home.vue'),
      },
      {
        // 優質公司
        path: 'company-recommend',
        component: () => import('../views/front/CompanyRecommend.vue'),
      },
      {
        // 全部產品頁面
        path: 'products-list',
        component: () => import('../views/front/ProductsList.vue'),
      },
      {
        // 收藏頁面
        path: 'collection',
        component: () => import('../views/front/Collection.vue'),
      },
      {
        // 收藏夾
        path: 'collection-folder/:id',
        component: () => import('../views/front/CollectionFolder.vue'),
      },
      {
        // 獨立產品頁面
        path: 'products-list/product/:id',
        component: () => import('../views/front/Product.vue'),
      },
      {
        // 獨立企業頁面
        path: 'products-list/company/:id',
        component: () => import('../views/front/Company.vue'),
      },
      {
        // 搜尋相關職位
        path: 'search/',
        component: () => import('../views/front/SearchPage.vue'),
      },
    ],
  },
  // ---------- 其他路由 ----------
  {
    // 404
    path: '/:pathMatch(.*)*',
    component: () => import('../views/other/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
