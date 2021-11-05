<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container">
      <div class="row" v-if="selectOrder.key === ''">
        <div class="col-3">
          <div class="sideListBox">
            <div class="sideListBox__titleBox">
              <p class="sideListBox__title">搜尋條件</p>
            </div>
            <form class="p-4" @submit="toSearchJob">
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="filterFormkey" class="form__label--custom form-label">訂單編號</label>
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
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="filterFormType" class="form__label--custom form-label"
                    >訂單類別</label
                  >
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
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="filterFormStartDate" class="form__label--custom form-label"
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
              <div class="form__inputBox">
                <div class="form__labelBox">
                  <label for="filterFormEndDate" class="form__label--custom form-label"
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
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-gray-light text-dark">清除</button>
                <button type="button" class="btn btn-companyColor text-light">篩選</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-9 col-12" v-if="dataReady === true">
          <div class="adminContentBox--nonPadding payService__orderList">
            <ul class="adminContentNav w-100">
              <li
                class="adminContentNav__item"
                :class="{ active: subNav === '訂單完成' }"
                @click="subNav = '訂單完成'"
              >
                <p>訂單完成</p>
              </li>
              <li
                class="adminContentNav__item"
                :class="{ active: subNav === '訂單未付款' }"
                @click="subNav = '訂單未付款'"
              >
                <p>訂單未付款<span class="ms-1">99</span></p>
              </li>
              <li
                class="adminContentNav__item"
                :class="{ active: subNav === '訂單取消' }"
                @click="subNav = '訂單取消'"
              >
                <p>訂單取消<span class="ms-1">99</span></p>
              </li>
            </ul>
            <ul class="boxInnerList">
              <li class="boxInnerList__item d-flex align-items-center">
                <ul class="tableList flex-grow-1">
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單編號</p>
                    <p class="tableList__item__txt">MHR928032009320</p>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單內容</p>
                    <p class="tableList__item__txt">大型版面廣告x1...</p>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單金額</p>
                    <div class="d-flex align-items-center">
                      <p class="tableList__item__txt me-2">NT$16,800</p>
                      <button type="button" class="btn tableList__item__tagBtn--company">
                        取消
                      </button>
                    </div>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">建立日期</p>
                    <p class="tableList__item__txt">2021/09/05</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-outline-gray-line text-dark">檢視訂單</button>
              </li>
              <li class="boxInnerList__item d-flex align-items-center">
                <ul class="tableList flex-grow-1">
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單編號</p>
                    <p class="tableList__item__txt">MHR928032009320</p>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單內容</p>
                    <p class="tableList__item__txt">大型版面廣告x1...</p>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">訂單金額</p>
                    <div class="d-flex align-items-center">
                      <p class="tableList__item__txt me-2">NT$16,800</p>
                      <button type="button" class="btn tableList__item__tagBtn--company">
                        取消
                      </button>
                    </div>
                  </li>
                  <li class="tableList__item">
                    <p class="tableList__item__title">建立日期</p>
                    <p class="tableList__item__txt">2021/09/05</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-outline-gray-line text-dark">檢視訂單</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="selectOrder.key !== ''">
        <div class="col-lg-9 col-12">
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
        <div class="col-lg-9 col-12">
          <div class="contentBox orderInfoBox p-4 mb-5">
            <h5 class="subTitle text-dark mb-2 ms-1">訂單資訊</h5>
            <ul class="tableList">
              <li class="tableList__item">
                <p class="tableList__item__title">訂單編號</p>
                <p class="tableList__item__txt">MHR928032009320</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單狀態</p>
                <p class="tableList__item__txt">已付款</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單金額</p>
                <p class="tableList__item__txt mb-1">NT$16,800</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">建立日期</p>
                <p class="tableList__item__txt">2021/09/05</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">訂單建立用戶</p>
                <p class="tableList__item__txt">王小明</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">付款帳號</p>
                <p class="tableList__item__txt mb-1">3566-8041-1593-9509</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">付款日期</p>
                <p class="tableList__item__txt">2021/09/05</p>
              </li>
              <li class="tableList__item">
                <p class="tableList__item__title">發票狀態</p>
                <div class="d-flex align-items-center">
                  <p class="tableList__item__txt me-2">尚未開立發票</p>
                  <button type="button" class="btn tableList__item__tagBtn--company">變更</button>
                </div>
              </li>
            </ul>
          </div>
          <div class="adminContentBox--nonPadding"></div>
        </div>
      </div>
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
      orderType: [
        { typeName: '大型版面廣告' },
        { typeName: '一般版面廣告' },
        { typeName: '小型版面廣告' },
        { typeName: '會員方案' },
        { typeName: '粉絲專頁廣告' },
        { typeName: '推廣職位' },
        { typeName: '其他' },
      ],
    };
  },
  watch: {
    notify: {
      deep: true,
      handler() {
        this.saveData();
      },
    },
  },
  methods: {
    resetSelectorder() {
      this.selectOrder = {
        key: '',
      };
    },
    selectCollapseList(action) {
      this.sideBoxList = action;
      if (action === '首頁廣告') {
        this.sideBoxInnerList = '首頁廣告 - 應徵通知';
      } else if (action === '信箱通知') {
        this.sideBoxInnerList = '信箱通知 - 應徵通知';
      } else if (action === '手機APP通知') {
        this.sideBoxInnerList = '手機APP通知 - 應徵通知';
      }
    },
    selectListItem(action) {
      this.sideBoxInnerList = action;
      this.goAnchor(action);
    },
    // 保存全部用戶資料
    getUserListData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
        this.notify = this.meUser.notify;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.set(this.meUser);
    },
    // 取得資料
    getMeUserData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.tempUser = data;
        this.getUserListData();
      });
    },
    goAnchor(action) {
      this.$refs[action].scrollIntoView();
    },
  },
  created() {
    this.getMeUserData();
  },
};
</script>

<style lang="scss"></style>
