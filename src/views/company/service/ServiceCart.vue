<template>
  <div class="adminPage--py">
    <div class="adminSubNav adminSubNav--rwdNomal mb-6 box--shadow">
      <div class="container-xl adminSubNav__innerList justify-content-between align-items-center">
        <h2 class="adminSubNav__innerList__title me-0">{{ nowPage }}</h2>
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
    <div class="container-xl" v-if="dataReady === true">
      <div class="row gy-5">
        <div class="col-lg-9">
          <div class="adminContentBox flexTable serviceCart">
            <div class="flexTable__header">
              <p class="flexTable__cell flexTable__cell--3">商品名稱</p>
              <p class="flexTable__cell flexTable__cell--2 text-center d-md-block d-none">購買數量</p>
              <p class="flexTable__cell flexTable__cell--1 text-center d-md-block d-none">小計</p>
              <p class="flexTable__cell invisible">操作</p>
            </div>
            <div class="flexTable__body">
              <template v-for="(item, index) in cart.productList" :key="item.name">
                <div class="flexTable__item cartItem">
                  <div class="flexTable__cell flexTable__cell--3 cartItem__productArea">
                    <img class="w--50 w--sm--25 rounded" :src="item.imgUrl" alt="訂單圖片" />
                    <div class="ps-4">
                      <p class="flexTable__body__item__title mb-1">{{ item.name }}</p>
                      <p class="subTxt mb-2">{{ item.name }}使用額度</p>
                      <p class="subTxt">NT$400</p>
                    </div>
                  </div>
                  <div class="flexTable__cell flexTable__cell--2 cartItem__numArea">
                    <div class="fakeInput--counter w--100 w--sm--75">
                      <div
                        class="fakeBtn"
                        @click="minusData(index)"
                        :class="{ disActive: item.num === 1 }"
                      >
                        <i class="jobIcon bi bi-dash-circle"></i>
                      </div>
                      <p>{{ item.num }}</p>
                      <div class="fakeBtn" @click="plusData(index)">
                        <i class="jobIcon bi bi-plus-circle"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 d-md-block d-none">
                    <p class="text-center">
                    NT${{ countedTotal(item.price, item.num) }}
                  </p>
                  </div>
                  <div class="flexTable__cell">
                    <button type="button" class="btn btn--cartDelete" @click="deleteProduct(index)">
                      <i class="jobIcon-sm bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </template>
            </div>
            <div class="flexTable__footer">
              <p class="flexTable__cell flexTable__cell--1 text-end">
                訂單金額：NTD {{ cartTotal }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="sideContentBox payBillBox">
            <div class="sideContentBox__header">
              <p class="subTxt">付款設定</p>
            </div>
            <form @submit="payBill">
              <div class="sideContentBox__body">
                <div class="form__input">
                  <div class="form__labelBox">
                    <label for="payType" class="labelBox__label form-label">付款方式</label>
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
                <div class="form__input">
                  <div class="form__labelBox">
                    <label for="payType" class="labelBox__label form-label">發票類型</label>
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
                      <label class="form-check-label" for="invoiceType--normal">
                        一般電子發票
                      </label>
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
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="unitNumber" class="labelBox__label form-label">統一編號</label>
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
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="companyName" class="labelBox__label form-label">發票抬頭</label>
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
              </div>
              <div class="sideContentBox__footer--border d-flex justify-content-between">
                <button type="button" class="btn btn-gray-light text-dark" @click="sendOrder">
                  建立訂單
                </button>
                <button type="submit" class="btn btn-companyColor text-light">前往付款</button>
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
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      dataReady: false,
      nowPage: '購物車',
      meUser: {},
      companyInfo: {},
      cart: {},
    };
  },
  computed: {
    cartTotal() {
      let totalPrice = 0;
      if (this.cart.productList) {
        this.cart.productList.forEach((item) => {
          totalPrice += item.price * item.num;
        });
      }
      return totalPrice;
    },
  },
  methods: {
    deleteProduct(index) {
      // 要加上詢問
      this.cart.totalNum -= this.cart.productList[index].num;
      this.cart.productList.splice(index, 1);
      this.saveCartData();
    },
    saveCartData() {
      const cartRef = database.ref('company/cart');
      cartRef.set(this.cart);
      emitter.emit('toogle-get-cart-data');
    },
    minusData(index) {
      if (this.cart.productList[index].num > 1) {
        this.cart.productList[index].num -= 1;
      }
    },
    plusData(index) {
      this.cart.productList[index].num += 1;
    },
    countedTotal(price, number) {
      const totalPrice = price * number;
      return totalPrice;
    },
    deleteCart() {
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
      const cartRef = database.ref('company/cart');
      cartRef.set(this.cart);
      emitter.emit('toogle-get-cart-data');
    },
    getCart() {
      const cartRef = database.ref('company/cart');
      cartRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.cart = data;
          console.log(data);
          this.dataReady = true;
        }
      });
    },
    sendOrder() {
      // 設定訂單建立人聯絡資訊
      this.cart.created_time = `${Math.floor(Date.now() / 1000)}`;
      this.cart.payInfo.payState = '訂單未付款';
      this.cart.orderState = '訂單未付款';
      this.cart.contactInfo = {
        companyName: this.companyInfo.companyName,
        companyKey: this.companyInfo.companyKey,
        chineseName: this.meUser.chineseName,
        jobTitle: this.meUser.jobTitle,
        userKey: this.meUser.key,
        phone: this.meUser.phone,
        email: this.meUser.email,
      };
      const orderListRef = database.ref('company/orderList');
      const { key } = orderListRef.push();
      const obj = this.cart;
      obj.key = key;
      orderListRef.child(key).set(obj);
      console.log(this.cart);
      this.deleteCart();
      this.$router.push('service-order');
    },
    // 取得資料
    getMeUserData() {
      const meUserRef = database.ref('company/myAccount');
      meUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
        console.log(this.meUser);
      });
    },
    getCompanyInfoData() {
      const companyRef = database.ref('company/companyInfo');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.companyInfo = data;
        console.log(this.companyInfo);
      });
    },
  },
  created() {
    this.getCart();
    this.getMeUserData();
    this.getCompanyInfoData();
  },
};
</script>

<style lang="scss"></style>
