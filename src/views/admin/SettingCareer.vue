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
                          <template v-for="(item, index) in user.career.workType" :key="index">
                            <li v-if="item.select" class="infoList__item__skillList__skill">
                              <p>{{ item.title }}</p>
                            </li>
                          </template>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更工作性質')"
                      >
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
                          <template v-for="(item, index) in user.career.workTime" :key="index">
                            <li v-if="item.select" class="infoList__item__skillList__skill">
                              <p>{{ item.title }}</p>
                            </li>
                          </template>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更上班時段')"
                      >
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
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更目標職務')"
                      >
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
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更目標行業')"
                      >
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
                          <template v-for="(city, index) in user.career.workPlace" :key="index">
                            <li v-if="city.selectAll" class="infoList__item__skillList__skill">
                                <p>{{ city.cityName }}全區</p>
                              </li>
                            <template v-for="dist in city.district" :key="dist.code">
                              <li v-if="dist.select" class="infoList__item__skillList__skill">
                                <p>{{ city.cityName }}，{{ dist.distName }}</p>
                              </li>
                            </template>
                          </template>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更求職地區')"
                      >
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
                            <p>
                              {{ `${user.career.expat}` ? '可接受企業外派' : '不接受企業外派' }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更外派需求')"
                      >
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
                            <p>
                              {{ user.career.salaryRange.salaryLow }}元 -
                              {{ user.career.salaryRange.salaryHeight }}元 ，
                              {{
                                `${user.career.salaryRange.salaryInterView}`
                                  ? '可接受面議'
                                  : '不接受面議'
                              }}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn text-dark"
                        @click="openSettingModal('變更薪資範圍')"
                      >
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
  <SettingCareerModal @reload="getFbData" />
</template>

<script>
import emitter from '@/methods/emitter';
import SettingCareerModal from '@/components/admin/SettingCareerModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: { SettingCareerModal },
  data() {
    return {
      subTopNav: '求職意向',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      user: {
        account: {
          chineseName: '',
          EnglishName: '',
          jobTitle: '',
          gender: '',
          birthday: '',
          email: '',
          phone: '',
          addressCity: '',
          addressDist: '',
          password: '',
          socialMedia: [],
        },
        workExp: {
          years: 0,
          works: [],
        },
        educationExp: {
          lastestEducation: '',
          educations: [],
        },
        languages: [],
        Licenses: [],
        skill: [],
        others: {
          driverLicenses: [],
          identity: [],
          militaryService: '',
        },
        career: {
          workType: [],
          workTime: [],
          targetJobs: [],
          targetIndustries: [],
          targetPlaces: [],
          expat: true,
          salaryRange: {
            lowest: 0,
            highest: 0,
            interview: false,
          },
        },
      },
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
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      console.log('load');
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
      console.log(this.user);
    },
    openSettingModal(action) {
      const obj = {
        action,
        user: this.user,
      };
      emitter.emit('open-setting-career-modal', obj);
    },
  },
  created() {
    this.getFbData();
  },
};
</script>

<style lang="scss"></style>
