<template>
  <div class="adminPage--py">
    <div class="admin__subHeader admin__subHeader--edit mb-6 box--shadow">
      <div class="container admin__subNav justify-content-between align-items-center">
        <h2 class="admin__subNav__title me-0">{{ nowPage }}</h2>
        <div>
          <router-link
            class="btn btn-outline-gray-line text-dark me-2"
            type="button"
            :to="`/company-admin/service-ad`"
            >繼續購物</router-link
          >
        </div>
      </div>
    </div>
    <div class="container" v-if="dataReady === true">
      <div class="row">
        <div class="col-lg-9 col-12">
          <div class="adminContentBox--nonPadding flexTable serviceCart">
            <div class="flexTable__header">
              <p class="flexTable__cell flexTable__cell--3">商品名稱</p>
              <p class="flexTable__cell flexTable__cell--1 text-center">項目金額</p>
              <p class="flexTable__cell flexTable__cell--2 text-center">購買數量</p>
              <p class="flexTable__cell flexTable__cell--1 text-center">小計</p>
              <p class="flexTable__cell invisible">操作</p>
            </div>
            <div class="flexTable__body">
              <div class="flexTable__item align-items-center">
                <div class="flexTable__cell flexTable__cell--3 d-flex align-items-center">
                  <img
                    class="w-50 rounded me-2"
                    src="https://i.imgur.com/w4Eeknw.jpeg"
                    alt="訂單圖片"
                  />
                  <div>
                    <p class="flexTable__body__item__title mb-1">首頁廣告</p>
                    <p class="subTxt">大型版面廣告使用額度</p>
                  </div>
                </div>
                <p class="flexTable__cell flexTable__cell--1 text-center">NT$400</p>
                <div class="flexTable__cell flexTable__cell--2 inputGroup--item">
                  <div class="fakeInput--counter w-100">
                    <div
                      class="fakeBtn"
                      @click="minusData('大型看板廣告')"
                      :class="{ disActive: product.num < 1 }"
                    >
                      <i class="jobIcon bi bi-dash-circle"></i>
                    </div>
                    <p>{{ product.num }}</p>
                    <div class="fakeBtn" @click="plusData('大型看板廣告')">
                      <i class="jobIcon bi bi-plus-circle"></i>
                    </div>
                  </div>
                </div>
                <p class="flexTable__cell flexTable__cell--1 text-center">
                  NT${{ product.num * 400 }}
                </p>
                <div class="flexTable__cell">
                  <button type="button" class="btn"><i class="jobIcon-sm bi bi-x-lg"></i></button>
                </div>
              </div>
            </div>
            <div class="flexTable__footer">
              <p class="flexTable__cell flexTable__cell--1 text-end">訂單金額：NTD 1200</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="sideListBox">
            <div class="sideListBox__titleBox">
              <p class="sideListBox__title">付款設定</p>
            </div>
            <form class="p-4" @submit="toSearchJob">
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="payType" class="form__label--custom form-label">付款方式</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="card"
                      id="payType--card"
                      name="payType"
                      :checked="cart.payType === 'card'"
                      v-model="cart.payType"
                    />
                    <label class="form-check-label" for="payType--card"> 信用卡付款 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="atm"
                      id="payType--atm"
                      name="payType"
                      :checked="cart.payType === 'atm'"
                      v-model="cart.payType"
                    />
                    <label class="form-check-label" for="payType--atm">
                      ATM付款(轉帳/網路線上繳款)
                    </label>
                    <p class="subTxt text-secondary">
                      每筆訂單會產生一組虛擬代碼，依虛擬代碼進行ATM轉帳。
                    </p>
                  </div>
                </div>
              </div>
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="payType" class="form__label--custom form-label">發票類型</label>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="一般電子發票"
                      id="invoiceType--normal"
                      name="invoiceType"
                      :checked="cart.invoice.type === '一般電子發票'"
                      v-model="cart.invoice.type"
                    />
                    <label class="form-check-label" for="invoiceType--normal"> 一般電子發票 </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="電子統編發票"
                      id="invoiceType--company"
                      name="invoiceType"
                      :checked="cart.invoice.type === '電子統編發票'"
                      v-model="cart.invoice.type"
                    />
                    <label class="form-check-label" for="invoiceType--company">
                      電子統編發票
                    </label>
                  </div>
                </div>
                <div v-if="cart.invoice.type === '電子統編發票'">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="unitNumber" class="form__label--custom form-label"
                        >統一編號</label
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="unitNumber"
                      placeholder="統一編號"
                      aria-describedby="統一編號"
                      v-model="cart.invoice.unitNumber"
                    />
                  </div>
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="companyName" class="form__label--custom form-label"
                        >發票抬頭</label
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="companyName"
                      placeholder="發票抬頭"
                      aria-describedby="發票抬頭"
                      v-model="cart.invoice.companyName"
                    />
                  </div>
                </div>
              </div>
              <p class="mb-4 subTxt text-secondary">
                *如果尚未決定付款方式，您可以先建立訂單待日後再付款。
              </p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-gray-light text-dark">建立訂單</button>
                <button type="button" class="btn btn-companyColor text-light">前往付款</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '@/methods/firebaseinit';

export default {
  components: {},
  data() {
    return {
      scrollTop: 0,
      elementTop: 0,
      nowPage: '我的訂單',
      sideBoxList: '首頁廣告',
      sideBoxInnerList: '首頁廣告 - 應徵通知',
      subNav: '訂單完成',
      meUser: {},
      tempUser: {},
      dataReady: false,
      filterForm: {
        key: '',
        type: '不限',
        startDate: null,
        endDate: null,
      },
      selectOrder: {
        key: 'MHR928032009320',
      },
      cart: {
        key: '',
        created__time: null,
        invoice: {
          type: '一般電子發票',
          companyName: '',
          unitNumber: null,
          created__time: null,
        },
        payType: 'card',
        totalPrice: '',
        productList: [],
      },
      product: {
        name: '',
        key: '',
        num: 1,
        price: null,
        totalPrice: null,
      },
    };
  },
  methods: {
    resetSelectorder() {
      this.selectOrder = {
        key: '',
      };
    },
    getCart() {
      const cartRef = database.ref('company/cart');
      cartRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.cart = data;
        }
        this.getMeUserData();
      });
    },
    // 取得資料
    getMeUserData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.tempUser = data;
        this.dataReady = true;
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss"></style>
