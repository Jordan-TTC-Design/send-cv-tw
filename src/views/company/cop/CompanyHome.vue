<template>
  <div class="page--py bg-light">
    <div class="container-md">
      <div class="row justify-content-lg-between justify-content-center mb-lg-8 pt-lg-7 mb-8 pt-6">
        <div class="col-xl-6 col-lg-7 col-10 mb-lg-0 mb-5">
          <div class="h-100 d-flex flex-column justify-content-center">
            <h3 class="displayTitle mb-5 text-lg-start text-center">
              成為 SendCV 的付費用戶，取得完整的服務及支援!
            </h3>
            <p class="mb-lg-8 mb-6 text-lg-start text-center">
              您將可以免費享受 SendCV 基本方案的所有功能，完整感受SendCV
              對於徵才效率的提升，您也可以隨時升級更合適您的方案。
            </p>
            <div
              class="d-flex justify-content-lg-start justify-content-center flex-lg-row flex-column"
            >
              <button
                type="button"
                class="btn btn-companyColor text-light me-lg-2 mb-lg-0 mb-2"
                @click="goToPageLink('/company-admin/add-company/freeLevel')"
              >
                馬上註冊免費會員
              </button>
              <button type="button" class="btn btn-gray-light text-dark">查看高級會員方案</button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-10">
          <img class="w-100 rounded" src="https://i.imgur.com/7f1ovUK.png" alt="會員方案圖片" />
        </div>
      </div>
      <div class="row mb-lg-8 justify-content-center pt-lg-7 mb-8 pt-6">
        <div class="col-lg-12">
          <h3 class="pageTitle mb-5 text-lg-start text-center">成為付費用戶有什麼好處？</h3>
          <p class="mb-lg-8 mb-6 text-lg-start text-center">
            讓我們為您的徵才活動適時地提供幫助，讓您更有效率的使用SendCV。
          </p>
        </div>
        <div class="col-lg-6">
          <div class="bg-gray-light rounded d-flex mb-4">
            <div class="p-6">
              <h5 class="text-dark mb-2">專屬的企業廣告</h5>
              <p class="mb-5">您可以在網站首頁或是粉絲專頁刊登廣告，傳遞企業最新的求職資訊。</p>
              <button type="button" class="btn btn-light text-dark">了解更多</button>
            </div>
            <img class="w-50" src="https://i.imgur.com/N3KuGQr.png" alt="" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-gray-light rounded d-flex mb-4">
            <div class="p-6">
              <h5 class="text-dark mb-2">設定推廣職位</h5>
              <p class="mb-5">將您的徵才職位設定為推廣職位，讓職位獲得更多的曝光度。</p>
              <button type="button" class="btn btn-light text-dark">了解更多</button>
            </div>
            <img class="w-50" src="https://i.imgur.com/9Wz2KVc.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-mid py-8">
      <div class="container-md">
        <div class="col-lg-6 mb-6">
          <h3 class="pageTitle text-lg-start text-center mb-4">比較不同方案</h3>
          <p class="mb-5 text-lg-start text-center">
            除了免費會員外，我們提供兩種不同的會員方案，除了基本的刊登職位、搜尋人才履歷外，另外增加方便企業招募的服務，以及推薦給求職人的功能。
          </p>
        </div>
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
                <button
                  type="button"
                  class="btn btn-outline-gray-line w-100 text-dark"
                  @click="goToPageLink('/company-admin/add-company/freeLevel')"
                >
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
                <button
                  type="button"
                  class="btn btn-outline-gray-line w-100 text-dark"
                  @click="goToPageLink('/company-admin/add-company/normalLevel')"
                >
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
                <button
                  type="button"
                  class="btn btn-outline-gray-line w-100 text-dark"
                  @click="goToPageLink('/company-admin/add-company/featuredLevel')"
                >
                  選擇此方案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-md">
      <div class="row mb-lg-8 pt-lg-7 mb-8 pt-6">
        <div class="col-12">
          <h3 class="pageTitle mb-5 text-lg-start text-center">為您提供多元的服務</h3>
          <p class="mb-lg-8 mb-6 text-lg-start text-center">
            不管您購買什麼方案，都可以享有以下的額外服務，讓您在徵才的同時從眾多企業中脫穎而出!
          </p>
        </div>
        <div class="col-lg-4">
          <div
            class="
              d-flex
              flex-lg-column flex-row
              align-items-lg-start align-items-center
              mb-lg-0 mb-5
            "
          >
            <img
              class="w--50 w--md--25"
              src="https://i.imgur.com/HI3BRW9.png"
              alt="美化企業頁面圖片"
            />
            <div class="p-4">
              <h5 class="text-dark mb-2">美化企業頁面</h5>
              <p class="mb-lg-5">提供您經過設計的企業模板，讓您自行挑選符合企業的版面樣式。</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div
            class="
              d-flex
              flex-lg-column flex-row
              align-items-lg-start align-items-center
              mb-lg-0 mb-5
            "
          >
            <img
              class="w--50 w--md--25"
              src="https://i.imgur.com/Are6h7b.png"
              alt="讓企業脫穎而出圖片"
            />
            <div class="p-4">
              <h5 class="text-dark mb-2">讓企業脫穎而出</h5>
              <p class="mb-lg-5">
                成為 SendCV 每週推薦的優質企業，提高企業的能見度讓，讓更多的求職者看見。
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div
            class="
              d-flex
              flex-lg-column flex-row
              align-items-lg-start align-items-center
              mb-lg-0 mb-5
            "
          >
            <img
              class="w--50 w--md--25"
              src="https://i.imgur.com/upnTPL7.png"
              alt="每週推薦郵件圖片"
            />
            <div class="p-4">
              <h5 class="text-dark mb-2">每週推薦郵件</h5>
              <p class="mb-lg-5">
                每週都會寄送您的職位給正在尋找類似職位的求職者，不會錯過任何合適的人才。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
</template>

<script>
// import database from '@/methods/firebaseinit';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      dataReady: false,
    };
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
  },
  created() {},
};
</script>

<style lang="scss"></style>
