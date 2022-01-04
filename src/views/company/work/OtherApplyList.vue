<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl position-relative">
      <div class="row justify-content-center" v-if="dataReady === true">
        <div class="col-lg-10">
          <div class="adminContentBox pb-3">
            <NavBoxNav
              :nav-list="boxNavList"
              :nav-setting="boxNavSetting"
              v-model:box-nav-state="boxNavState"
            />
            <ul ref="candidateList">
              <template v-for="item in mailApplyList" :key="item.key">
                <li class="talentCard talentCard--inner">
                  <div class="talentCard__userImgBox">
                    <div class="talentCard__introVideo">
                      <p class="subTxt--foil">尚未設定</p>
                    </div>
                    <img
                      class="talentCard__personalImg"
                      :src="user.account.userImgUrl"
                      :alt="`${user.account.chineseName}個人求職照片`"
                    />
                  </div>
                  <div class="talentCard__body">
                    <div class="talentNameInfo mb-3">
                      <p
                        class="talentNameInfo__name me-2 putPointer"
                        @click="openPersonPopModal('瀏覽人才')"
                      >
                        {{ user.account.chineseName }}
                      </p>
                      <p>{{ user.account.gender }} | {{ `28歲` }}</p>
                    </div>
                    <ul class="talentInfo">
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">投遞職位</p>
                        <p>{{ item.jobName }}</p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">最高學歷</p>
                        <p>
                          {{
                            user.educationExp.educations[user.educationExp.educations.length - 1]
                              .educationLevel || '尚未填寫'
                          }}
                        </p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">工作經驗</p>
                        <p>
                          {{
                            user.workExp.works[user.workExp.works.length - 1].jobName ||
                            '無工作經驗'
                          }}
                        </p>
                      </li>
                      <li class="talentInfo__item">
                        <p class="talentInfo__item__title">申請時間</p>
                        <p>{{ $filters.date(item.time) }}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="talentCard__btnBox">
                    <button
                      type="button"
                      class="btn btn-outline-companyColor me-2"
                      @click="selectAction('選擇動作')"
                    >
                      選擇動作
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      聯絡
                    </button>
                    <button type="button" class="btn text-dark">
                      <i class="bi bi-three-dots"></i>
                    </button>
                  </div>
                  <button
                    class="collectBtn btn btn-outline-gray-line position-absolute bg-light"
                    type="button"
                  >
                    <i class="jobIcon bi bi-bookmark-fill"></i>
                  </button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';
import NavBoxNav from '@/components/helpers/NavBoxNav.vue';

export default {
  components: {
    CompanyAdminNav,
    NavBoxNav,
  },
  data() {
    return {
      nowPage: '自我推薦',
      boxNavState: 1,
      boxNavList: [
        { title: '新申請', value: 1 },
        { title: '正在聯絡', value: 2 },
        { title: '邀請面試', value: 3 },
        { title: '已瀏覽', value: 4 },
        { title: '已拒絕', value: 5 },
      ],
      boxNavSetting: {
        full: 1,
        style: 1, // jobSeeker 1 company 2
        bg: 1,
        rounded: 1,
      },
      dataReady: false,
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      selectItem: {},
      companyJobList: [],
      mailApplyList: [],
      user: {},
    };
  },
  methods: {
    getJobListData() {
      this.companyJobList = [];
      const jobListDataRef = database.ref('company/jobList');
      jobListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.companyJobList.push(data[item]);
          });
          this.selectJobFormJobList(this.openJobList[0].key);
        }
      });
    },
    getUserData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.getSelfRecommendList();
      });
    },
    getSelfRecommendList() {
      this.mailApplyList = [];
      const maiListDataRef = database.ref('applyList/otherApplyList/mailList');
      maiListDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.mailApplyList.push(data[item]);
          });
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getJobListData();
    this.getUserData();
    emitter.emit('spinner-open-bg', 800);
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
  },
};
</script>

<style lang="scss"></style>
