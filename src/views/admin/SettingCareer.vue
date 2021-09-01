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
            <h3 class="admin__mainContent__title">求職意向</h3>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                求職意向是讓系統判斷您的求職目標與條件，建議您可以填寫完整資訊，系統會根據以下資訊以及您的基本資料為您推薦與評分職位適合度。
              </p>
            </div>
            <div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">工作性質</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>全職</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">上班時段</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>日班</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>夜班</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">目標職務</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>UIUX 設計師</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>前端工程師</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">目標行業</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>網路科技業</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>金融業</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">求職地區</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>台北市，中山區</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>台北市，大安區</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">外派需求</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>可接受</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                      </button>
                    </div>
                  </div>
                </li>
                 <li class="col-12">
                  <div class="infoList__item listLast show--compressed">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <p class="infoList__item__title">薪資範圍</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>最低：35000元</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn text-dark">
                        <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
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
      subTopNav: '求職意向',
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
