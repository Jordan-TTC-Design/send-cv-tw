<template>
  <div ref="adminSubHeader" class="adminSubNav adminSubNav--company container-fluid">
    <div class="container-xl">
      <ul
        v-if="adminMainSection === navData.company.groupName"
        class="adminSubNav__innerList adminSubNav__innerList--company"
      >
        <li class="align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.company.groupName }}</h2>
        </li>
        <template v-for="item in navData.company.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
      </ul>
      <ul
        v-if="adminMainSection === navData.job.groupName"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.job.groupName }}</h2>
        </li>
        <template v-for="item in navData.job.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
        <li class="adminSubNav__sideBtnList">
          <button type="btn" class="btn sideBtn sideBtn--company" @click="goToPageLink('new-job')">
            <i class="jobIcon bi bi-plus-lg d-lg-none"></i>
            <p class="d-lg-block d-none">新增職位</p>
          </button>
        </li>
      </ul>
      <ul
        v-if="adminMainSection === navData.talent.groupName"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.talent.groupName }}</h2>
        </li>
        <template v-for="item in navData.talent.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
      </ul>
      <ul
        v-if="adminMainSection === navData.ad.groupName"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.ad.groupName }}</h2>
        </li>
        <template v-for="item in navData.ad.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
        <li class="adminSubNav__sideBtnList">
          <p class="d-lg-block d-none me-2">
            目前使用：<span class="text-companyColor">免費方案</span>
          </p>
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
        v-if="adminMainSection === navData.setting.groupName"
        class="adminSubNav__innerList adminSubNav__innerList--company position-relative w-100"
      >
        <li class="align-items-center d-lg-flex d-none">
          <h2 class="adminSubNav__innerList__title">{{ navData.setting.groupName }}</h2>
        </li>
        <template v-for="item in navData.setting.list" :key="item.title">
          <li
            class="adminSubNav__innerList__item"
            @click="goToPageLink(item.url)"
            :class="{ active: nowPage === item.title }"
          >
            <p class="adminSubNav__innerList__txt">{{ item.title }}</p>
          </li>
        </template>
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
      dataReady: false,
      adminMainSection: '企業中心',
      navData: {
        company: {
          groupName: '企業中心',
          list: [
            { title: '總覽', url: 'company-over-view' },
            { title: '企業資料', url: 'company-info' },
            { title: '公司頁面', url: 'company-page-view' },
          ],
        },
        job: {
          groupName: '職位管理',
          list: [
            { title: '公司職位', url: 'job-list' },
            { title: '拍照申請職位', url: 'shot-job-list' },
            { title: '應徵管理', url: 'work-apply-list' },
            { title: '自我推薦', url: 'other-apply-list' },
          ],
        },
        talent: {
          groupName: '人才資料',
          list: [
            { title: '搜尋人才', url: 'talent-search' },
            { title: '收藏人才', url: 'talent-collection' },
            { title: '推薦人才', url: 'talent-recommend' },
            { title: '瀏覽紀錄', url: 'talent-record' },
            { title: '歷史面試', url: 'talent-history' },
          ],
        },
        ad: {
          groupName: '廣告管理',
          list: [
            { title: '我的訂單', url: 'service-order' },
            { title: '廣告管理', url: 'service-ad' },
            { title: '會員方案', url: 'service-membership' },
            { title: '使用紀錄', url: 'service-record' },
          ],
        },
        setting: {
          groupName: '設定',
          list: [
            { title: '我的帳戶', url: 'setting' },
            { title: '用戶管理', url: 'setting-user-management' },
            { title: '文字模板', url: 'setting-message-template' },
            { title: '綁定信箱', url: 'setting-email-bind' },
            { title: '通知設定', url: 'setting-notification' },
          ],
        },
      },
      cart: {},
    };
  },
  watch: {
    nowPage: {
      deep: true,
      handler() {
        this.checkAdminMainSection();
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
    checkAdminMainSection() {
      this.navData.company.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.company.groupName;
        }
      });
      this.navData.job.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.job.groupName;
        }
      });
      this.navData.talent.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.talent.groupName;
        }
      });
      this.navData.ad.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.ad.groupName;
        }
      });
      this.navData.setting.list.forEach((item) => {
        if (item.title === this.nowPage) {
          this.adminMainSection = this.navData.setting.groupName;
        }
      });
    },
  },
  created() {
    this.defaultCart();
    this.getCart();
    this.checkAdminMainSection();
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
