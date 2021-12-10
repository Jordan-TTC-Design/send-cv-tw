<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl">
      <div class="rounded bg-light box--shadow p-5">
        <div class="row gy-8">
          <div class="col-6">
            <h2 class="pageTitle mb-5">成為SendCV的付費用戶，取得完整的服務及支援!</h2>
            <p>依據企業的預算及狀況，選擇最合適的價格方案，解決你的招聘需求。</p>
          </div>
          <div class="col-6">
            <img class="w-100 rounded" src="https://i.imgur.com/sVTCMNu.jpg" alt="會員方案圖片" />
          </div>
          <div class="col-12">
            <div class="memberShipList flexTable d-flex">
              <div class="flexTable__header flex-column p-0 border-0 d-xl-flex d-none">
                <div class="flexTable__cell flexTable__cell--4 border-top-0 ps-3">
                  <p>方案費用</p>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">刊登職位數量</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">搜尋人才</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">推廣新職位</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">首頁廣告</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">粉絲專頁廣告</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">設定推廣職位</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">成為推薦企業</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">每週推薦郵件</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
                <div class="flexTable__cell flexTable__cell--1">
                  <p class="me-2">美化企業頁面</p>
                  <i class="btn jobIcon bi bi-info-circle"></i>
                </div>
              </div>
              <div class="flexTable__body d-flex flex-row p-0">
                <div class="flexTable__item flexTable__cell--1 border-0">
                  <div class="flexTable__cell flexTable__cell--4 memberShipList__itemHeader">
                    <h5 class="my-4">免費方案</h5>
                    <h3 class="text-dark fw-bold mb-2">
                      <span class="me-2 subTxt text-dark">$</span>免費<span
                        class="ms-2 subTxt text-dark"
                        >/月</span
                      >
                    </h3>
                    <p class="subTxt text-secondary mb-3 invisible">免費使用</p>
                    <button
                      type="button"
                      class="btn btn-companyColor text-light"
                      @click="goToPageLink('/company-admin/add-company/freeLevel')"
                    >
                      立即註冊
                    </button>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p class="me-2">無限制</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>可加購額度</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>可加購額度</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>可加購額度</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-gray-light"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-gray-light"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-gray-light"></i>
                  </div>
                </div>
                <div class="flexTable__item flexTable__cell--1 border-0 memberShipList__hotItem">
                  <div class="flexTable__cell flexTable__cell--4 memberShipList__itemHeader">
                    <h5 class="my-4">基本方案</h5>
                    <h3 class="text-dark fw-bold mb-2">
                      <span class="me-2 subTxt text-dark">$</span>800<span
                        class="ms-2 subTxt text-dark"
                        >/月</span
                      >
                    </h3>
                    <p class="subTxt text-secondary mb-3">
                      單月方案，每月為您省<span class="mx-1 text-companyColor">150</span>元
                    </p>
                    <button
                      type="button"
                      class="btn btn-companyColor text-light"
                      @click="goToPageLink('/company-admin/add-company/normalLevel')"
                    >
                      立即註冊
                    </button>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p class="me-2">無限制</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>小版面廣告 x1</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>美化社群廣告次數 x1</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>設定推廣職位 x3</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                </div>
                <div class="flexTable__item flexTable__cell--1 border-0 memberShipList__bestItem">
                  <div class="flexTable__cell flexTable__cell--4 memberShipList__itemHeader">
                    <h5 class="my-4">精選方案</h5>
                    <h3 class="text-dark fw-bold mb-2">
                      <span class="me-2 subTxt text-dark">$</span>1,400<span
                        class="ms-2 subTxt text-dark"
                        >/月</span
                      >
                    </h3>
                    <p class="subTxt text-secondary mb-3">
                      3個月方案，每月為您省<span class="mx-1 text-companyColor">500</span>元
                    </p>
                    <button
                      type="button"
                      class="btn btn-companyColor text-light"
                      @click="goToPageLink('/company-admin/add-company/featuredLevel')"
                    >
                      立即註冊
                    </button>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p class="me-2">無限制</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>大版面廣告 x1 + 一般版面廣告 x1</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>美化社群廣告次數 x2</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <p>設定推廣職位 x5</p>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                  <div class="flexTable__cell flexTable__cell--1 flexTable__cell--center">
                    <i class="jobIcon bi-check-circle-fill text-companyColor"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
// import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      scrollTop: 0,
      elementTop: 0,
      nowPage: '會員方案',
      dataReady: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss"></style>
