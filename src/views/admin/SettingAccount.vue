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
      <div class="row justify-content-center">
        <div class="col-lg-9 col-12">
          <div class="admin__mainContent">
            <h3 class="admin__mainContent__title">帳號設定</h3>
            <div class="admin__mainContent__btnBox">
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">編輯</button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subTopNav: '帳號設定',
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
