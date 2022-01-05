<template>
  <div class="adminPage--py bg-light pb-0">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl mt-8 mb-8">
      <div class="row gy-8 justify-content-lg-between justify-content-center">
        <div class="col-lg-7">
          <h2 class="displayTitle mb-lg-4 mb-6">現在加入 SendCV 馬上免費使用一個月的完整服務</h2>
          <p>
            您將可以免費享受 SendCV 基本方案的所有功能，完整感受SendCV
            對於徵才效率的提升，您也可以隨時升級更合適您的方案。
          </p>
        </div>
        <div class="col-lg-4 col-10">
          <img class="w-100 rounded" src="https://i.imgur.com/sVTCMNu.jpg" alt="會員方案圖片" />
        </div>
      </div>
    </div>
    <div class="bg-gray-mid py-8">
      <div class="container-md">
        <h3 class="pageTitle text-center">方案選擇</h3>
        <div class="row mt-5 gy-5 flex-lg-row flex-column-reverse">
          <div class="col-lg-4">
            <div class="membershipCard h-100 box--shadow">
              <div class="membershipCard__header border-gray-line">
                <div class="d-flex justify-content-between mb-3 flex-wrap">
                  <h5 class="pageSubTitle">免費方案</h5>
                  <p class="strongTxt">Free</p>
                </div>
                <p class="subTxt--foil">不限期免費使用</p>
              </div>
              <div class="membershipCard__body">
                <ul class="flex-grow-1">
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>無限刊登職位</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>人才資料庫</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>刷新職位</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>廣告刊登</p>
                    <p class="ms-1 subTxt--foil">(需單獨購買)</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>職位招聘廣告設計</p>
                    <p class="ms-1 subTxt--foil">(需單獨購買)</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>網站推廣職位</p>
                    <p class="ms-1 subTxt--foil">(需單獨購買)</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-outline-gray-line w-100 text-dark">
                  選擇此方案
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="membershipCard h-100 box--shadow">
              <div class="membershipCard__header border-gray-line">
                <div class="d-flex justify-content-between mb-3 flex-wrap">
                  <h5 class="pageSubTitle d-flex align-items-center">
                    基本方案<span class="jobTag ms-2 bg-primary text-dark">最熱門</span>
                  </h5>
                  <p class="strongTxt">800 NTD / 月</p>
                </div>
                <p class="subTxt--foil">2 個月付費會員服務(每月省250)</p>
              </div>
              <div class="membershipCard__body">
                <ul class="flex-grow-1 mb-5">
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>無限刊登職位</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>人才資料庫</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>刷新職位</p>
                  </li>
                  <li class="border-top border-gray-line pt-3 mb-4">
                    <p class="subTxt--foil text-companyColor text-center">
                      方案贈送每月額度，每30日自動更新
                    </p>
                  </li>
                  <li class="mb-4">
                    <p class="checkItem">
                      <i class="jobIcon bi bi-check-circle-fill me-2"></i> 廣告刊登 x1
                    </p>
                    <p class="subTxt--foil">網站首頁小版面廣告</p>
                  </li>
                  <li class="mb-4">
                    <p class="checkItem">
                      <i class="jobIcon bi bi-check-circle-fill me-2"></i> 職位招聘廣告設計 x1
                    </p>
                    <p class="subTxt--foil">
                      為您設計兼具視覺與資訊的招聘廣告，不再為如何吸引求職者所煩惱~
                    </p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>網站推廣職位 x2</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-outline-gray-line w-100 text-dark">
                  選擇此方案
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="membershipCard h-100 box--shadow">
              <div class="membershipCard__header bg-companyColor-light">
                <div class="d-flex justify-content-between mb-3 flex-wrap">
                  <h5 class="pageSubTitle d-flex align-items-center text-companyColor">
                    精選方案<span class="jobTag ms-2 bg-companyColor text-light">最優惠</span>
                  </h5>
                  <p class="strongTxt text-companyColor">1,400 NTD / 月</p>
                </div>
                <p class="subTxt--foil text-companyColor">3 個月付費會員服務(每月省500)</p>
              </div>
              <div class="membershipCard__body">
                <ul class="flex-grow-1 mb-5">
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>無限刊登職位</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>人才資料庫</p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>刷新職位</p>
                  </li>
                  <li class="border-top border-gray-line pt-3 mb-4">
                    <p class="subTxt--foil text-companyColor text-center">
                      方案贈送每月額度，每30日自動更新
                    </p>
                  </li>
                  <li class="mb-4">
                    <p class="checkItem">
                      <i class="jobIcon bi bi-check-circle-fill me-2"></i> 廣告刊登 x2
                    </p>
                    <p class="subTxt--foil">網站首頁大版面廣告 x1 + 一般版面廣告 x1</p>
                  </li>
                  <li class="mb-4">
                    <p class="checkItem">
                      <i class="jobIcon bi bi-check-circle-fill me-2"></i> 職位招聘廣告設計 x1
                    </p>
                    <p class="subTxt--foil">
                      為您設計兼具視覺與資訊的招聘廣告，不再為如何吸引求職者所煩惱~
                    </p>
                  </li>
                  <li class="checkItem mb-4">
                    <i class="jobIcon bi bi-check-circle-fill me-2"></i>
                    <p>網站推廣職位 x3</p>
                  </li>
                </ul>
                <button type="button" class="btn btn-outline-gray-line w-100 text-dark">
                  選擇此方案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';
// import database from '@/methods/firebaseinit';

export default {
  components: {
    NavCompanyAdminNav,
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
