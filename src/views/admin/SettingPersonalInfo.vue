<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">個人帳戶</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('基本資料')"
            :class="{ active: subTopNav === '基本資料' }"
          >
            <p class="admin__subNav__txt me-1">基本資料</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('求職意向')"
            :class="{ active: subTopNav === '求職意向' }"
          >
            <p class="admin__subNav__txt me-1">求職意向</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('帳號設定')"
            :class="{ active: subTopNav === '帳號設定' }"
          >
            <p class="admin__subNav__txt me-1">帳號設定</p>
          </li>
        </div>
      </div>
    </div>
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-3 col-12">
          <div class="setting__sideList">
            <div class="setting__sideList__top">
              <div class="setting__personImgBox mb-4">
                <img class="personImgBox__img" src="https://i.imgur.com/ZWHoRPi.png" alt="" />
              </div>
              <p class="mb-3">曾鼎鈞</p>
              <div class="inputGroup--item w-100">
                <div
                  class="inputItem__switch form-check form-switch border border-gray-line rounded"
                >
                  <input
                    id="sendFormInfoCostToken"
                    type="checkbox"
                    class="form-check-input ms-0 me-2 mt-0"
                    data-action="showCompanyJob"
                    :checked="personalState ? true : false"
                    @change="changePersonalState"
                  />
                  <label
                    class="form-check-label"
                    for="sendFormInfoCostToken"
                    :class="{ 'text-primary-dark': personalState === true }"
                  >
                    {{ personalState ? `開放求職中` : `已關閉求職` }}
                  </label>
                </div>
              </div>
            </div>
            <ul class="setting__sideList__nav">
              <li
                class="nav__item"
                @click="selectListItem('個人資料')"
                :class="{ active: settingSideList === '個人資料' }"
              >
                <p class="nav__item__title">個人資料</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('工作經驗')"
                :class="{ active: settingSideList === '工作經驗' }"
              >
                <p class="nav__item__title">工作經驗</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('教育程度')"
                :class="{ active: settingSideList === '教育程度' }"
              >
                <p class="nav__item__title">教育程度</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('專業技能')"
                :class="{ active: settingSideList === '專業技能' }"
              >
                <p class="nav__item__title">專業技能</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('其他')"
                :class="{ active: settingSideList === '其他' }"
              >
                <p class="nav__item__title">其他</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <div class="admin__mainContent" v-if="settingSideList === '個人資料'">
            <h3 class="admin__mainContent__title">個人資料</h3>
            <div class="admin__mainContent__btnBox">
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">編輯</button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                您於基本資料，並不會被外部搜尋引擎所搜尋，同時 SendCV
                將依照個人資料保護法保障您的個人隱私，請放心～
              </p>
            </div>
            <div>
              <ul class="row">
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">姓名</p>
                    <p class="infoList__item__content">曾鼎鈞</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">性別</p>
                    <p class="infoList__item__content">男性</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">生日</p>
                    <p class="infoList__item__content">1991年01月01日</p>
                  </div>
                </li>
              </ul>
              <ul class="row">
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">電子信箱</p>
                    <p class="infoList__item__content">曾鼎鈞</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">聯絡電話</p>
                    <p class="infoList__item__content">0987-653-222</p>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item">
                    <p class="infoList__item__title">居住地址</p>
                    <p class="infoList__item__content">台北市中山區南京東路二段150號10樓</p>
                  </div>
                </li>
              </ul>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item listLast">
                    <p class="infoList__item__title">社群連結</p>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <i class="jobIcon bi bi-facebook me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                        <p class="socialMediaBox__link subTxt">FaceBook</p>
                      </div>
                    </div>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <i class="jobIcon bi bi-google me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                        <p class="socialMediaBox__link subTxt">Google</p>
                      </div>
                    </div>
                    <div class="infoList__item__socialMediaBox putPointer">
                      <i class="jobIcon bi bi-globe2 me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">個人作品網站</p>
                        <p class="socialMediaBox__link subTxt">https://Jordan.ttc.design.com</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="admin__mainContent" v-if="settingSideList === '工作經驗'">
            <h3 class="admin__mainContent__title">工作經驗</h3>
            <div class="admin__mainContent__btnBox">
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增工作經驗
              </button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                建議可以依照時間先後建立資訊，並且多描述在該企業上班時所貢獻之事物，讓企業能了解您的特質與能力。
              </p>
            </div>
            <div>
              <div
                class="
                  d-flex
                  bg-gray-light
                  rounded
                  justify-content-between
                  align-items-center
                  p-3
                  mb-3
                "
              >
                <div>
                  <p class="d-inline-block me-4">總年資</p>
                  <p class="d-inline-block">2年6個月</p>
                </div>
              </div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item infoList__item--job">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">
                          工業設計師 - 鴻海精密股份有限公司
                        </p>
                        <p class="infoList__item__subTitle mb-3">2017.09 ~ 仍在職</p>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>

                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">職務內容與成就</p>
                      <p class="infoList__item__content">
                        RWD製作 負責網站、行動裝置APP的UI及視覺設計
                        參與產品規劃討論，以使用者體驗、視覺為出發點提出具體意見
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item infoList__item--job">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">
                          工業設計師 - 鴻海精密股份有限公司
                        </p>
                        <p class="infoList__item__subTitle mb-3">2017.09 ~ 仍在職</p>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">職務內容與成就</p>
                      <p class="infoList__item__content">
                        RWD製作 負責網站、行動裝置APP的UI及視覺設計
                        參與產品規劃討論，以使用者體驗、視覺為出發點提出具體意見
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item infoList__item--job listLast">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">
                          工業設計師 - 鴻海精密股份有限公司
                        </p>
                        <p class="infoList__item__subTitle mb-3">2017.09 ~ 仍在職</p>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">職務內容與成就</p>
                      <p class="infoList__item__content">
                        RWD製作 負責網站、行動裝置APP的UI及視覺設計
                        參與產品規劃討論，以使用者體驗、視覺為出發點提出具體意見
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="admin__mainContent" v-if="settingSideList === '教育程度'">
            <h3 class="admin__mainContent__title">教育程度</h3>
            <div class="admin__mainContent__btnBox">
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增教育程度
              </button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">建議可以簡述在您於該所學校學習之專業技能、學習經歷。</p>
            </div>
            <div>
              <div
                class="
                  d-flex
                  bg-gray-light
                  rounded
                  justify-content-between
                  align-items-center
                  p-3
                  mb-3
                "
              >
                <div>
                  <p class="d-inline-block me-4">最高學歷</p>
                  <p class="d-inline-block">碩士</p>
                </div>
              </div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item infoList__item--job">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">國立台灣師範大學 - 設計研究所</p>
                        <p class="infoList__item__subTitle mb-3">
                          1900 / 09 - 2012 / 06 <span class="ms-2 text-secondary">碩士畢業</span>
                        </p>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>

                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">學習專業與經歷</p>
                      <p class="infoList__item__content">
                        RWD製作 負責網站、行動裝置APP的UI及視覺設計
                        參與產品規劃討論，以使用者體驗、視覺為出發點提出具體意見
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item infoList__item--job listLast">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__jobTitle mb-1">私立銘傳大學 - 商品設計系</p>
                        <p class="infoList__item__subTitle mb-3">
                          1900 / 09 - 2012 / 06 <span class="ms-2 text-secondary">學士畢業</span>
                        </p>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <div class="infoList__item__contentBox">
                      <p class="contentBox__title mb-1">學習專業與經歷</p>
                      <p class="infoList__item__content">
                        RWD製作 負責網站、行動裝置APP的UI及視覺設計
                        參與產品規劃討論，以使用者體驗、視覺為出發點提出具體意見
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="admin__mainContent" v-if="settingSideList === '專業技能'">
            <h3 class="admin__mainContent__title">專業技能</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn--switch me-2"
                @click="toogleData('skillShowStyle')"
              >
                <div class="switch__container" :class="{ active: skillShowStyle }">
                  <div class="switch__controller"></div>
                </div>
                {{ skillShowStyle ? '密集顯示' : '一般顯示' }}
              </button>
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增專業技能
              </button>
            </div>
            <div>
              <ul class="row" v-if="skillShowStyle === true">
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">語言</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>中文 - 專業</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>英文 - 流利 / 雅思 6.5分</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>日文 - 專業 / 日檢 N2</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">證照</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>美國風險管理師ARM</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>美國會計師CPA</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>國際ERP電腦稽核師CEAP</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item listLast show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">設計</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>Adobe Illustrator</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>Adobe PhotoShop</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>Adobe XD</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>Sketch</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="row" v-if="skillShowStyle === false">
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>語言</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>中文 - 專業</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>英文 - 流利 / 雅思 6.5分</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>日文 - 專業 / 日檢 N2</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Sketch</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>證照</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>美國風險管理師ARM</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>美國會計師CPA</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>國際ERP電腦稽核師CEAP</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>設計</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe Illustrator</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe PhotoShop</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe XD</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Sketch</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="admin__mainContent" v-if="settingSideList === '其他'">
            <h3 class="admin__mainContent__title">其他</h3>
            <div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">駕照</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>重型機車</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>小型汽車</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">身份</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>無特殊身份</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item listLast show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">兵役</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>役畢</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subTopNav: '基本資料',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
    };
  },
  methods: {
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
    changePersonalState() {
      if (this.personalState) {
        this.personalState = false;
      } else if (!this.personalState) {
        this.personalState = true;
      }
    },
    selectListItem(navName) {
      this.settingSideList = navName;
    },
    changeSideHeader(navName) {
      if (navName === '基本資料') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting');
      } else if (navName === '求職意向') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-career');
      } else if (navName === '帳號設定') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-account');
      }
    },
  },
};
</script>

<style lang="scss"></style>
