<template>
  <div class="page--py bg-light">
    <div class="container">
      <div class="row justify-content-lg-between justify-content-center mb-lg-8 pt-lg-7 mb-8 pt-6">
        <div class="col-lg-5 col-10 mb-lg-0 mb-5">
          <div class="h-100 d-flex flex-column justify-content-center">
            <h3 class="pageTitle mb-5 text-lg-start text-center">
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
        <div class="col-lg-12 col-10">
          <h3 class="pageTitle mb-5 text-lg-start text-center">成為付費用戶有什麼好處？</h3>
          <p class="mb-lg-8 mb-6 text-lg-start text-center">
            讓我們為您的徵才活動適時地提供幫助，讓您更有效率的使用SendCV。
          </p>
        </div>
        <div class="col-lg-6 col-md-12 col-12">
          <div class="bg-gray-light rounded d-flex mb-4">
            <div class="p-6">
              <h5 class="text-dark mb-2">專屬的企業廣告</h5>
              <p class="mb-5">您可以在網站首頁或是粉絲專頁刊登廣告，傳遞企業最新的求職資訊。</p>
              <button type="button" class="btn btn-light text-dark">了解更多</button>
            </div>
            <img class="w-50" src="https://i.imgur.com/N3KuGQr.png" alt="" />
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-12">
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
      <div class="row mb-lg-8 pt-lg-7 mb-8 pt-6 justify-content-lg-start justify-content-center">
        <div class="col-lg-6 col-10 mb-lg-8 mb-6">
          <h3 class="pageTitle text-lg-start text-center">比較不同方案</h3>
          <p class="mb-5 text-lg-start text-center">
            除了免費會員外，我們提供兩種不同的會員方案，除了基本的刊登職位、搜尋人才履歷外，另外增加方便企業招募的服務，以及推薦給求職人的功能。
          </p>
        </div>
        <div class="col-12">
          <div class="memberShipList flexTable d-flex">
            <div class="flexTable__header flex-column p-0 border-0">
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
                <div
                  class="
                    flexTable__cell flexTable__cell--4
                    border-top-0
                    flex-column
                    justify-content-start
                  "
                >
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
                <div
                  class="
                    flexTable__cell flexTable__cell--4
                    border-top-0
                    flex-column
                    justify-content-start
                  "
                >
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
                <div
                  class="
                    flexTable__cell flexTable__cell--4
                    border-top-0
                    flex-column
                    justify-content-start
                  "
                >
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
      <div class="row mb-lg-8 pt-lg-7 mb-8 pt-6">
        <div class="col-12">
          <h3 class="pageTitle mb-5 text-lg-start text-center">為您提供多元的服務</h3>
          <p class="mb-lg-8 mb-6 text-lg-start text-center">
            不管您購買什麼方案，都可以享有以下的額外服務，讓您在徵才的同時從眾多企業中脫穎而出!
          </p>
        </div>
        <div class="col-lg-4 col-12">
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
        <div class="col-lg-4 col-12">
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
        <div class="col-lg-4 col-12">
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
