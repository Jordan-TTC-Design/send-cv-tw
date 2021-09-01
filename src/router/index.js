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
  {
    path: '/admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        // 申請紀錄
        path: 'work-application',
        component: () => import('../views/admin/WorkApplication.vue'),
      },
      {
        // 收藏夾
        path: 'work-collection',
        component: () => import('../views/admin/WorkCollection.vue'),
      },
      {
        // 收藏夾
        path: 'work-collection/:id',
        component: () => import('../views/admin/WorkCollectionFolder.vue'),
      },
      {
        // 瀏覽紀錄
        path: 'work-read-record',
        component: () => import('../views/admin/WorkReadRecord.vue'),
      },
      {
        // 文件-履歷
        path: 'document-cv',
        component: () => import('../views/admin/DocCV.vue'),
      },
      {
        // 文件-求職信
        path: 'document-cover-letter',
        component: () => import('../views/admin/DocCoverLetter.vue'),
      },
      {
        // 文件-履歷
        path: 'document-other',
        component: () => import('../views/admin/DocOther.vue'),
      },
      {
        // 設定
        path: 'setting',
        component: () => import('../views/admin/SettingPersonalInfo.vue'),
      },
      {
        // 設定
        path: 'setting-career',
        component: () => import('../views/admin/SettingCareer.vue'),
      },
      {
        // 設定
        path: 'setting-account',
        component: () => import('../views/admin/SettingAccount.vue'),
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
