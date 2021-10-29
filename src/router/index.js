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
      {
        // 申請職位頁面
        path: 'apply-job/:id',
        component: () => import('../views/front/ApplyJob.vue'),
      },
      {
        // 寫郵件SendCV
        path: 'other-apply/mail',
        component: () => import('../views/front/OtherApplyMail.vue'),
      },
      {
        // 拍照求職
        path: 'other-apply/shot',
        component: () => import('../views/front/OtherApplyShot.vue'),
      },
    ],
  },
  // ---------- 後台路由 ----------
  {
    path: '/admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        // 總覽
        path: 'work-over-view',
        component: () => import('../views/admin/WorkOverView.vue'),
      },
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
        path: 'work-company-read',
        component: () => import('../views/admin/WorkCompanyRecord.vue'),
      },
      {
        // 瀏覽紀錄
        path: 'work-read-record',
        component: () => import('../views/admin/WorkReadRecord.vue'),
      },
      {
        // 審核紀錄
        path: 'work-other-application',
        component: () => import('../views/admin/WorkOtherApplication.vue'),
      },
      {
        // 文件-履歷
        path: 'document-cv',
        component: () => import('../views/admin/DocCV.vue'),
      },
      {
        // 文件-履歷
        path: 'document-cv/cv/:id',
        component: () => import('../views/admin/CvPage.vue'),
      },
      {
        // 文件-履歷
        path: 'document-cv/cv/new',
        component: () => import('../views/admin/NewCV.vue'),
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
        // 文件-履歷
        path: 'chatroom',
        component: () => import('../views/admin/ChatRoom.vue'),
      },
      {
        // 設定-個人資料
        path: 'setting',
        component: () => import('../views/admin/SettingPersonalInfo.vue'),
      },
      {
        // 設定-求職意向
        path: 'setting-career',
        component: () => import('../views/admin/SettingCareer.vue'),
      },
      {
        // 設定-文字模板
        path: 'setting-message-template',
        component: () => import('../views/admin/SettingMessageTemplate.vue'),
      },
      {
        // 設定-帳號設定
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
  // ---------- 其他路由 ----------
  {
    // 企業後台
    path: '/company-admin',
    component: () => import('../views/company/CompanyAdmin.vue'),
    children: [
      {
        // 企業中心
        path: 'company-over-view',
        component: () => import('../views/company/CompanyCenter.vue'),
      },
      {
        // 企業資料
        path: 'company-info',
        component: () => import('../views/company/CompanyInfo.vue'),
      },
      {
        // 公司頁面
        path: 'company-page-view',
        component: () => import('../views/company/CompanyPageView.vue'),
      },
      {
        // 刊登中職位
        path: 'job-list',
        component: () => import('../views/company/JobList.vue'),
      },
      {
        // 新增職位
        path: 'new-job',
        component: () => import('../views/company/NewJobPage.vue'),
      },
      {
        // 編輯職位
        path: 'preview-job/:key',
        component: () => import('../views/company/PreviewJobPage.vue'),
      },
      {
        // 編輯職位
        path: 'edit-job/:key',
        component: () => import('../views/company/EditJobPage.vue'),
      },
      {
        // 拍照申請
        path: 'shot-job-list',
        component: () => import('../views/company/ShotJobList.vue'),
      },
      {
        // 編輯職位
        path: 'edit-shot-job/:key',
        component: () => import('../views/company/EditShotJobPage.vue'),
      },
      {
        // 應徵管理
        path: 'work-apply-list',
        component: () => import('../views/company/WorkApplyList.vue'),
      },
      {
        // 其他申請
        path: 'other-apply-list',
        component: () => import('../views/company/OtherApplyList.vue'),
      },
      {
        // 人才-履歷
        path: 'talent-cv/:id',
        component: () => import('../views/company/TalentCvPage.vue'),
      },
      {
        // 加值服務-廣告管理
        path: 'service-ad',
        component: () => import('../views/company/ServiceAd.vue'),
      },
      {
        // 加值服務-我的訂單
        path: 'service-order',
        component: () => import('../views/company/ServiceOrder.vue'),
      },
      {
        // 加值服務-會員服務
        path: 'service-membership',
        component: () => import('../views/company/ServiceMembership.vue'),
      },
      {
        // 加值服務-使用紀錄
        path: 'service-record',
        component: () => import('../views/company/ServiceRecord.vue'),
      },
      {
        // 帳號設定
        path: 'setting',
        component: () => import('../views/company/SettingAccountCompany.vue'),
      },
      {
        // 帳號設定-用戶管理
        path: 'setting-user-management',
        component: () => import('../views/company/SettingUserManagement.vue'),
      },
      {
        // 設定-文字模板
        path: 'setting-message-template',
        component: () => import('../views/company/SettingMessageTemplate.vue'),
      },
      {
        // 設定-綁定信箱
        path: 'setting-email-bind',
        component: () => import('../views/company/SettingEmailBind.vue'),
      },
      {
        // 設定-通知設定
        path: 'setting-notification',
        component: () => import('../views/company/SettingNotification.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
