<template>
  <div class="adminPage--py">
    <NavAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-12">
          <div class="admin__mainContent">
            <h3 class="pageSubTitle mb-5">求職意向</h3>
            <div class="remind mb-4">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                求職意向是讓系統判斷您的求職目標與條件，建議您可以填寫完整資訊，系統會根據以下資訊以及您的基本資料為您推薦與評分職位適合度。
              </p>
            </div>
            <div>
              <ul class="infoList infoList--jobSeeker infoList--withBtn infoList--row">
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">工作性質</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.career.workType" :key="index">
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.title }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更工作性質')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">上班時段</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.career.workTime" :key="index">
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.title }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更上班時段')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">目標職務</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.career.jobCategories" :key="index">
                        <template
                          v-for="(cate, number) in item.categories"
                          :key="`cate--${number}`"
                        >
                          <li v-if="cate.selectAll" class="infoList__innerList__item">
                            <p>{{ cate.categoryName }}全區</p>
                          </li>
                          <template v-for="(job, num) in cate.categories" :key="`job--${num}`">
                            <li v-if="job.select" class="infoList__innerList__item">
                              <p>{{ job.name }}</p>
                            </li>
                          </template>
                        </template>
                      </template>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更目標職務')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">目標行業</p>
                    <ul class="infoList__innerList">
                      <template
                        v-for="(item, index) in user.career.industryCategories"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.industryName }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更目標行業')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">求職地區</p>
                    <ul class="infoList__innerList">
                      <template v-for="(city, index) in user.career.workPlace" :key="index">
                        <li v-if="city.selectAll" class="infoList__innerList__item">
                          <p>{{ city.cityName }}全區</p>
                        </li>
                        <template v-for="dist in city.district" :key="dist.code">
                          <li v-if="dist.select" class="infoList__innerList__item">
                            <p>{{ city.cityName }}，{{ dist.distName }}</p>
                          </li>
                        </template>
                      </template>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更求職地區')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item">
                  <div>
                    <p class="infoList__item__title">外派意願</p>
                    <ul class="infoList__innerList">
                      <li class="infoList__innerList__item">
                        <p>
                          {{ user.career.expat ? '可接受企業外派' : '不接受企業外派' }}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更外派意願')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
                  </div>
                </li>
                <li class="infoList__item listLast">
                  <div>
                    <p class="infoList__item__title">薪資範圍</p>
                    <ul class="infoList__innerList">
                      <li class="infoList__innerList__item">
                        <p>
                          {{ user.career.salaryRange.salaryLow }}元 -
                          {{ user.career.salaryRange.salaryHeight }}元 ，
                          {{
                            user.career.salaryRange.salaryInterView ? '可接受面議' : '不接受面議'
                          }}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="infoList__btnBox">
                    <button
                      type="button"
                      class="btn text-dark"
                      @click="openSettingModal('變更薪資範圍')"
                    >
                      <i class="jobIcon--sm bi bi-pencil-square"></i>
                    </button>
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
import NavAdminNav from '@/components/admin/NavAdminNav.vue';

export default {
  components: { SettingCareerModal, NavAdminNav },
  data() {
    return {
      nowPage: '求職意向',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      user: {
        account: {
          chineseName: '',
          englishName: '',
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
          expat: null,
          salaryRange: {
            lowest: 0,
            highest: 0,
            interview: null,
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
      console.log(this.user.career);
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
