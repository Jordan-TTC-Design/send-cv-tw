<template>
  <div ref="adminSubHeader" class="adminSubNav adminSubNav--company container-fluid">
    <div class="container-xxl">
      <ul
        v-if="adminMainSection === '企業中心'"
        class="adminSubNav__innerList adminSubNav__innerList--company"
      >
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">企業中心</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('company-over-view')"
          :class="{ active: nowPage === '總覽' }"
        >
          <p class="adminSubNav__innerList__txt">總覽</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('company-info')"
          :class="{ active: nowPage === '企業資料' }"
        >
          <p class="adminSubNav__innerList__txt">企業資料</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('company-page-view')"
          :class="{ active: nowPage === '公司頁面' }"
        >
          <p class="adminSubNav__innerList__txt">公司頁面</p>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '職位管理'"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="d-md-flex align-items-center d-none">
          <h2 class="adminSubNav__innerList__title">{{ `職位管理` }}</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('job-list')"
          :class="{ active: nowPage === '公司職位' }"
        >
          <p class="adminSubNav__innerList__txt">公司職位</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('shot-job-list')"
          :class="{ active: nowPage === '拍照申請職位' }"
        >
          <p class="adminSubNav__innerList__txt">拍照申請職位</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('work-apply-list')"
          :class="{ active: nowPage === '應徵管理' }"
        >
          <p class="adminSubNav__innerList__txt">應徵管理</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('other-apply-list')"
          :class="{ active: nowPage === '自我推薦' }"
        >
          <p class="adminSubNav__innerList__txt">自我推薦</p>
        </li>
        <li class="adminSubNav__sideBtnList">
          <button type="btn" class="btn sideBtn sideBtn--company" @click="goToPageLink('new-job')">
            <i class="jobIcon bi bi-plus-lg d-lg-none"></i>
            <p class="d-lg-block d-none">新增職位</p>
          </button>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '人才資料'"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">人才資料</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('talent-search')"
          :class="{ active: nowPage === '搜尋人才' }"
        >
          <p class="adminSubNav__innerList__txt">搜尋人才</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('talent-collection')"
          :class="{ active: nowPage === '收藏人才' }"
        >
          <p class="adminSubNav__innerList__txt">收藏人才</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('talent-recommend')"
          :class="{ active: nowPage === '推薦人才' }"
        >
          <p class="adminSubNav__innerList__txt">推薦人才</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('talent-record')"
          :class="{ active: nowPage === '瀏覽紀錄' }"
        >
          <p class="adminSubNav__innerList__txt">瀏覽紀錄</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('talent-history')"
          :class="{ active: nowPage === '歷史面試' }"
        >
          <p class="adminSubNav__innerList__txt">歷史面試</p>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === '加值服務'"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">加值服務</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('service-ad')"
          :class="{ active: nowPage === '廣告管理' }"
        >
          <p class="adminSubNav__innerList__txt">廣告管理</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('service-order')"
          :class="{ active: nowPage === '我的訂單' }"
        >
          <p class="adminSubNav__innerList__txt">我的訂單</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('service-membership')"
          :class="{ active: nowPage === '會員方案' }"
        >
          <p class="adminSubNav__innerList__txt">會員方案</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('service-record')"
          :class="{ active: nowPage === '使用紀錄' }"
        >
          <p class="adminSubNav__innerList__txt">使用紀錄</p>
        </li>
        <li class="adminSubNav__sideBtnList">
          <p class="d-lg-block d-none me-2">目前使用：<span class="text-companyColor">免費方案</span></p>
          <button type="btn" class="btn sideBtn me-lg-2 mb-lg-0 mb-2">
            <i class="jobIcon bi bi-person-badge-fill d-lg-none"></i>
            <p class="d-lg-block d-none">變更會員方案</p>
          </button>
          <button
            type="btn"
            class="btn sideBtn sideBtn--company btnNumber"
            @click="goToPageLink('service-cart')"
          >
            <i class="jobIcon bi bi-cart-fill d-lg-none"></i>
            <p class="d-lg-block d-none">購物車</p>
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
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="d-flex align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">設定</h2>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting')"
          :class="{ active: nowPage === '我的帳戶' }"
        >
          <p class="adminSubNav__innerList__txt">我的帳戶</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-user-management')"
          :class="{ active: nowPage === '用戶管理' }"
        >
          <p class="adminSubNav__innerList__txt">用戶管理</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-message-template')"
          :class="{ active: nowPage === '文字模板' }"
        >
          <p class="adminSubNav__innerList__txt">文字模板</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-email-bind')"
          :class="{ active: nowPage === '綁定信箱' }"
        >
          <p class="adminSubNav__innerList__txt">綁定信箱</p>
        </li>
        <li
          class="adminSubNav__innerList__item"
          @click="goToPageLink('setting-notification')"
          :class="{ active: nowPage === '通知設定' }"
        >
          <p class="adminSubNav__innerList__txt">通知設定</p>
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
