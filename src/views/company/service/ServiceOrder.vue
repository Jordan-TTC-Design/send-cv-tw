<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl">
      <div class="row" v-if="selectOrder.key === ''">
        <div class="col-lg-3">
          <form
            class="sideContentBox rwdSideModal"
            @submit="toSearchJob"
            :class="{ active: filterOpen }"
          >
            <div class="sideContentBox__header">
              <p class="subTxt">篩選</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn text-dark">清除條件</button>
              </div>
            </div>
            <div class="sideContentBox__body">
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="filterFormkey" class="labelBox__label form-label">訂單編號</label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="filterFormkey"
                  placeholder="訂單編號"
                  aria-describedby="訂單編號"
                  v-model="filterForm.key"
                />
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="filterFormType" class="labelBox__label form-label">訂單類別</label>
                </div>
                <select
                  class="form-select"
                  aria-label="訂單類別"
                  id="filterFormType"
                  v-model="filterForm.type"
                >
                  <option disabled>請選擇訂單類別</option>
                  <option selected value="不限">不限</option>
                  <option
                    v-for="(item, index) in orderType"
                    :value="item.typeName"
                    :key="`訂單類別${index}`"
                  >
                    {{ item.typeName }}
                  </option>
                </select>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="filterFormStartDate" class="labelBox__label form-label"
                    >訂單日期範圍起始</label
                  >
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="filterFormStartDate"
                  placeholder="訂單日期範圍起始"
                  aria-describedby="訂單日期範圍起始"
                  v-model="filterForm.startDate"
                />
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="filterFormEndDate" class="labelBox__label form-label"
                    >訂單日期範圍結束</label
                  >
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="filterFormEndDate"
                  placeholder="訂單日期範圍結束"
                  aria-describedby="訂單日期範圍結束"
                  v-model="filterForm.endDate"
                />
              </div>
            </div>
            <div class="sideContentBox__footer--border">
              <button type="submit" class="btn btn-companyColor text-light w--100">篩選</button>
            </div>
          </form>
        </div>
        <div class="col-lg-9">
          <div class="adminContentBox adminContentBox--full payService__orderList">
            <ul class="innerNav innerNav--company innerNav--bgColor">
              <li
                class="innerNav__item"
                :class="{ active: subNav === '訂單完成' }"
                @click="subNav = '訂單完成'"
              >
                <p>
                  訂單完成<span class="ms-1">{{ payFinishNum }}</span>
                </p>
              </li>
              <li
                class="innerNav__item"
                :class="{ active: subNav === '訂單未付款' }"
                @click="subNav = '訂單未付款'"
              >
                <p>
                  訂單未付款<span class="ms-1">{{ unPayNum }}</span>
                </p>
              </li>
              <li
                class="innerNav__item"
                :class="{ active: subNav === '訂單取消' }"
                @click="subNav = '訂單取消'"
              >
                <p>
                  訂單取消<span class="ms-1">{{ orderDeclineNum }}</span>
                </p>
              </li>
            </ul>
            <ul class="boxInnerList">
              <template v-for="item in nowOrderList" :key="item.key">
                <li class="boxInnerList__item d-flex align-items-center">
                  <ul class="tableList flex-grow-1">
                    <li class="tableList__item">
                      <p class="tableList__item__title">訂單編號</p>
                      <p class="tableList__item__txt">{{ item.key.slice(1, 12) }}...</p>
                    </li>
                    <li class="tableList__item">
                      <p class="tableList__item__title">訂單內容</p>
                      <p class="tableList__item__txt">
                        {{ item.productList[0].name }}x{{ item.productList[0].num }}
                        <span v-if="item.productList.length > 1">...</span>
                      </p>
                    </li>
                    <li class="tableList__item">
                      <p class="tableList__item__title">訂單金額</p>
                      <div class="d-flex align-items-center flex-wrap">
                        <p class="tableList__item__txt me-2">NT${{ item.totalPrice }}</p>
                        <!-- <button type="button" class="btn tableList__item__tagBtn--company">
                          取消訂單
                        </button> -->
                        <p v-if="item.orderState === '訂單已取消'" class="jobTag">退款處理中</p>
                      </div>
                    </li>
                    <li class="tableList__item">
                      <p class="tableList__item__title">建立日期</p>
                      <p class="tableList__item__txt">{{ $filters.date(item.created_time) }}</p>
                    </li>
                  </ul>
                  <button type="button" class="btn text-dark" @click="this.selectOrder = item">
                    <i class="jobIcon bi bi-eyeglasses text-dark"></i>
                  </button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <!-- 點擊訂單列表展開訂單明細 -->
      <div class="row justify-content-center" v-if="selectOrder.key !== ''">
        <div class="col-lg-9">
          <button
            type="button"
            class="backToPageBtn btn btn-light text-dark mb-4"
            @click="resetSelectorder"
          >
            <i class="bi bi-chevron-left me-2"></i>返回<span class="backToPageBtn__title ms-4"
              >訂單編號：{{ selectOrder.key }}</span
            >
          </button>
        </div>
        <div class="col-lg-9">
          <div class="contentBox orderInfoBox p-4 mb-5">
            <h5 class="subTitle text-dark mb-2 ms-1">訂單資訊</h5>
            <ul class="tableList">
              <li class="tableList__item">
                <p class="tableList__item__title">訂單編號</p>
                <p class="tableList__item__txt">{{ selectOrder.key }}</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單狀態</p>
                <p class="tableList__item__txt">{{ selectOrder.payInfo.payState }}</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單金額</p>
                <p class="tableList__item__txt mb-1">NT${{ selectOrder.totalPrice }}</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">建立日期</p>
                <p class="tableList__item__txt">{{ $filters.date(selectOrder.created_time) }}</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單建立用戶</p>
                <p class="tableList__item__txt">{{ selectOrder.contactInfo.chineseName }}</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">付款方式</p>
                <p class="tableList__item__txt mb-1">{{ selectOrder.payInfo.payType }}</p>
              </li>
              <li
                class="tableList__item"
                v-if="
                  selectOrder.payInfo.payState === '訂單已付款' ||
                  selectOrder.payInfo.payState === '退款處理中' ||
                  selectOrder.payInfo.payState === '已完成退款'
                "
              >
                <p class="tableList__item__title">付款帳號</p>
                <p class="tableList__item__txt mb-1">3566-8041-1593-9509</p>
              </li>
              <li
                class="tableList__item"
                v-if="
                  selectOrder.payInfo.payState === '訂單已付款' ||
                  selectOrder.payInfo.payState === '退款處理中' ||
                  selectOrder.payInfo.payState === '已完成退款'
                "
              >
                <p class="tableList__item__title">付款日期</p>
                <p class="tableList__item__txt">2021/09/05</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">發票狀態</p>
                <div class="d-flex align-items-center">
                  <p class="tableList__item__txt me-2">{{ selectOrder.invoice.state }}</p>
                  <button
                    type="button"
                    class="btn tableList__item__tagBtn--company"
                    v-if="selectOrder.invoice.state === '尚未開立發票'"
                  >
                    變更
                  </button>
                  <button
                    type="button"
                    class="btn tableList__item__tagBtn--company"
                    v-if="selectOrder.invoice.state === '已開立發票'"
                  >
                    查看
                  </button>
                </div>
              </li>
              <li class="tableList__item" v-if="selectOrder.payInfo.payState === '已完成退款'">
                <p class="tableList__item__title">退款帳號</p>
                <p class="tableList__item__txt mb-1">3566-8041-1593-9509</p>
              </li>
              <li class="tableList__item" v-if="selectOrder.payInfo.payState === '已完成退款'">
                <p class="tableList__item__title">退款日期</p>
                <p class="tableList__item__txt">2021/09/05</p>
              </li>
            </ul>
          </div>
          <div class="adminContentBox flexTable serviceCart">
            <div class="flexTable__header">
              <p class="flexTable__cell flexTable__cell--3">商品名稱</p>
              <p class="flexTable__cell flexTable__cell--1 text-center">項目金額</p>
              <p class="flexTable__cell flexTable__cell--2 text-center">購買數量</p>
              <p class="flexTable__cell flexTable__cell--1 text-center">小計</p>
            </div>
            <div class="flexTable__body">
              <template v-for="item in selectOrder.productList" :key="item.name">
                <div class="flexTable__item align-items-center">
                  <div class="flexTable__cell flexTable__cell--3 d-flex align-items-center">
                    <img class="w-50 rounded me-2" :src="item.imgUrl" alt="訂單圖片" />
                    <div class="w-50">
                      <p class="flexTable__body__item__title mb-1">{{ item.name }}</p>
                      <p class="subTxt">{{ item.name }}使用額度</p>
                    </div>
                  </div>
                  <p class="flexTable__cell flexTable__cell--1 text-center">NT${{ item.price }}</p>
                  <div class="flexTable__cell flexTable__cell--2 text-center">
                    <p>{{ item.num }}</p>
                  </div>
                  <p class="flexTable__cell flexTable__cell--1 text-center">
                    NT${{ item.totalPrice }}
                  </p>
                </div>
              </template>
              <div class="d-flex justify-content-end align-items-center py-4 me-4">
                <p class="subTxt me-2 text-danger">有問題？歡迎聯絡我們</p>
                <button type="button" class="btn btn-gray-light text-dark">聯絡客服</button>
              </div>
            </div>
            <div
              class="
                flexTable__footer
                align-items-center
                border-top border-gray-line
                justify-content-between
              "
            >
              <button
                type="button"
                class="btn btn-gray-light text-dark"
                v-if="selectOrder.orderState === '訂單未付款'"
              >
                取消訂單
              </button>
              <button
                type="button"
                class="btn btn-gray-light text-dark"
                v-if="selectOrder.orderState === '訂單已完成'"
              >
                申請退款
              </button>
              <div class="d-flex align-items-center justify-content-end">
                <p class="me-2">訂單金額：NTD {{ selectOrder.totalPrice }}</p>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  v-if="
                    selectOrder.orderState === '訂單已完成' ||
                    selectOrder.orderState === '訂單已取消'
                  "
                >
                  再次購買
                </button>
                <button
                  type="button"
                  class="btn btn-companyColor text-light"
                  v-if="
                    selectOrder.orderState === '訂單未付款' &&
                    selectOrder.payInfo.payType === '信用卡付款'
                  "
                >
                  立即付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sideBtnBox d-lg-none">
      <button type="button" class="sideBtn btn btn-light mb-2" @click="filterOpen = !filterOpen">
        <i class="jobIcon bi bi-funnel-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      dataReady: false,
      nowPage: '我的訂單',
      subNav: '訂單完成',
      orderList: [],
      filterForm: {
        key: '',
        type: '不限',
        startDate: null,
        endDate: null,
      },
      selectOrder: { key: '' },
      orderType: [
        { typeName: '大型版面廣告' },
        { typeName: '一般版面廣告' },
        { typeName: '小型版面廣告' },
        { typeName: '會員方案' },
        { typeName: '粉絲專頁廣告' },
        { typeName: '推廣職位' },
        { typeName: '其他' },
      ],
      // rwd
      filterOpen: false,
    };
  },
  computed: {
    nowOrderList() {
      // 不知道要先分類好，還是切換再分
      const tempArray = this.orderList.filter((item) => item.orderState === this.subNav);
      return tempArray;
    },
    payFinishNum() {
      const tempArray = this.orderList.filter((item) => item.orderState === '訂單已付款');
      return tempArray.length;
    },
    unPayNum() {
      const tempArray = this.orderList.filter((item) => item.orderState === '訂單未付款');
      return tempArray.length;
    },
    orderDeclineNum() {
      const tempArray = this.orderList.filter((item) => item.orderState === '訂單已取消');
      return tempArray.length;
    },
  },
  methods: {
    resetSelectorder() {
      this.selectOrder = { key: '' };
    },
    getOrderList() {
      this.orderList = [];
      const orderListRef = database.ref('company/orderList');
      orderListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.orderList.push(data[item]);
          });
        }
        console.log(this.orderList);
      });
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="scss"></style>
