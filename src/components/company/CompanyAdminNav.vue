<template>
  <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
    <div class="container">
      <ul v-if="adminMainSection === '企業中心'" class="admin__subNav admin__subNav--company">
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">企業中心</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-over-view')"
          :class="{ active: nowPage === '總覽' }"
        >
          <p class="admin__subNav__txt me-1">總覽</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-info')"
          :class="{ active: nowPage === '企業資料' }"
        >
          <p class="admin__subNav__txt me-1">企業資料</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('company-page-view')"
          :class="{ active: nowPage === '公司頁面' }"
        >
          <p class="admin__subNav__txt me-1">公司頁面</p>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '職位管理'"
        class="admin__subNav admin__subNav--company position-relative w-100"
      >
        <li class="d-md-flex align-items-center d-none">
          <h2 class="admin__subNav__title">{{ `職位管理` }}</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('job-list')"
          :class="{ active: nowPage === '公司職位' }"
        >
          <p class="admin__subNav__txt me-1">公司職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('shot-job-list')"
          :class="{ active: nowPage === '拍照申請職位' }"
        >
          <p class="admin__subNav__txt me-1">拍照申請職位</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('work-apply-list')"
          :class="{ active: nowPage === '應徵管理' }"
        >
          <p class="admin__subNav__txt me-1">應徵管理</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('other-apply-list')"
          :class="{ active: nowPage === '自我推薦' }"
        >
          <p class="admin__subNav__txt me-1">自我推薦</p>
        </li>
        <li class="d-flex align-items-center position-absolute end-0 h-100">
          <button
            type="btn"
            class="btn btn-companyColor text-light"
            @click="goToPageLink('new-job')"
          >
            新增職位
          </button>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '人才資料'"
        class="admin__subNav admin__subNav--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">人才資料</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('talent-search')"
          :class="{ active: nowPage === '搜尋人才' }"
        >
          <p class="admin__subNav__txt me-1">搜尋人才</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('talent-collection')"
          :class="{ active: nowPage === '收藏人才' }"
        >
          <p class="admin__subNav__txt me-1">收藏人才</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('talent-recommend')"
          :class="{ active: nowPage === '推薦人才' }"
        >
          <p class="admin__subNav__txt me-1">推薦人才</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('talent-record')"
          :class="{ active: nowPage === '瀏覽紀錄' }"
        >
          <p class="admin__subNav__txt me-1">瀏覽紀錄</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('talent-history')"
          :class="{ active: nowPage === '歷史面試' }"
        >
          <p class="admin__subNav__txt me-1">歷史面試</p>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '加值服務'"
        class="admin__subNav admin__subNav--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">加值服務</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('service-ad')"
          :class="{ active: nowPage === '廣告管理' }"
        >
          <p class="admin__subNav__txt me-1">廣告管理</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('service-order')"
          :class="{ active: nowPage === '我的訂單' }"
        >
          <p class="admin__subNav__txt me-1">我的訂單</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('service-membership')"
          :class="{ active: nowPage === '會員方案' }"
        >
          <p class="admin__subNav__txt me-1">會員方案</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('service-record')"
          :class="{ active: nowPage === '使用紀錄' }"
        >
          <p class="admin__subNav__txt me-1">使用紀錄</p>
        </li>
        <li class="d-flex align-items-center position-absolute end-0 h-100">
          <p class="me-2">目前使用：<span class="text-companyColor">免費方案</span></p>
          <button type="btn" class="btn btn-gray-light text-dark me-2">變更會員方案</button>
          <button
            type="btn"
            class="btn btn-companyColor text-light btnNumber"
            @click="goToPageLink('service-cart')"
          >
            購物車
            <span
              class="btnNumber__number btnNumber__number--companyColor"
              v-if="cart.totalNum > 0"
              >{{ cart.totalNum }}</span
            >
          </button>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '設定'"
        class="admin__subNav admin__subNav--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-md-flex d-none">
          <h2 class="admin__subNav__title">設定</h2>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting')"
          :class="{ active: nowPage === '我的帳戶' }"
        >
          <p class="admin__subNav__txt me-1">我的帳戶</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-user-management')"
          :class="{ active: nowPage === '用戶管理' }"
        >
          <p class="admin__subNav__txt me-1">用戶管理</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-message-template')"
          :class="{ active: nowPage === '文字模板' }"
        >
          <p class="admin__subNav__txt me-1">文字模板</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-email-bind')"
          :class="{ active: nowPage === '綁定信箱' }"
        >
          <p class="admin__subNav__txt me-1">綁定信箱</p>
        </li>
        <li
          class="admin__subNav__item"
          @click="goToPageLink('setting-notification')"
          :class="{ active: nowPage === '通知設定' }"
        >
          <p class="admin__subNav__txt me-1">通知設定</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import database from '@/methods/firebaseinit';
import emitter from '@/methods/emitter';

export default {
  props: ['nowPage'],
  data() {
    return {
      adminMainSection: '企業中心',
      cart: {},
      dataReady: false,
    };
  },
  watch: {
    nowPage: {
      deep: true,
      handler() {
        this.checkMainSection();
      },
    },
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    defaultCart() {
      this.cart = {
        key: '',
        created__time: null,
        payType: 'card',
        totalPrice: 0,
        totalNum: 0,
        productList: [],
        memo: '',
        payInfo: {
          payState: '',
          payDate: '',
          payAccount: '',
        },
        invoice: {
          state: '尚未開立發票',
          type: '一般電子發票',
          created_time: '',
          companyName: '',
          unitNumber: '',
        },
        contactInfo: {
          name: '',
          phone: '',
          email: '',
        },
      };
    },
    sendBackCart() {
      console.log('接收到');
      console.log(this.cart);
      emitter.emit('send-back-cart-data', this.cart);
    },
    getCart() {
      const cartRef = database.ref('company/cart');
      cartRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.cart = data;
        }
      });
    },
    checkMainSection() {
      if (this.nowPage === '總覽' || this.nowPage === '企業資料' || this.nowPage === '公司頁面') {
        this.adminMainSection = '企業中心';
      } else if (
        this.nowPage === '公司職位'
        || this.nowPage === '拍照申請職位'
        || this.nowPage === '應徵管理'
        || this.nowPage === '自我推薦'
      ) {
        this.adminMainSection = '職位管理';
      } else if (
        this.nowPage === '搜尋人才'
        || this.nowPage === '收藏人才'
        || this.nowPage === '推薦人才'
        || this.nowPage === '瀏覽紀錄'
        || this.nowPage === '歷史面試'
      ) {
        this.adminMainSection = '人才資料';
      } else if (
        this.nowPage === '廣告管理'
        || this.nowPage === '我的訂單'
        || this.nowPage === '會員方案'
        || this.nowPage === '使用紀錄'
      ) {
        this.adminMainSection = '加值服務';
      } else if (
        this.nowPage === '我的帳戶'
        || this.nowPage === '用戶管理'
        || this.nowPage === '文字模板'
        || this.nowPage === '綁定信箱'
        || this.nowPage === '通知設定'
      ) {
        this.adminMainSection = '設定';
      }
    },
  },
  created() {
    this.defaultCart();
    this.getCart();
    this.checkMainSection();
  },
  mounted() {
    emitter.on('toogle-get-cart-data', this.getCart);
    emitter.on('toogle-send-cart-data', this.sendBackCart);
  },
  unmounted() {
    emitter.off('toogle-get-cart-data', this.getCart);
    emitter.off('toogle-send-cart-data', this.sendBackCart);
  },
};
</script>

<style lang="scss"></style>
