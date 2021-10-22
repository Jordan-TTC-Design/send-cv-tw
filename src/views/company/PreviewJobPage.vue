<template>
  <div class="adminPage--py jobPage" v-if="dataReady">
    <div class="admin__subHeader admin__subHeader--edit mb-6 box--shadow">
      <div class="container admin__subNav justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <button type="button" class="btn text-dark me-2"
          @click="goToPageLink(`/company-admin/job-list`)">
            <i class="jobIcon bi bi-chevron-left"></i>
          </button>
          <h2 class="admin__subNav__title">{{ jobForm.jobName }}</h2>
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn-companyColor text-light me-2">升級推廣職位</button>
          <select
            class="form-select w-auto me-2 d-inline-block"
            @change="changeJobState(jobForm.key)"
            v-model="jobForm.is_enabled"
          >
            <option :selected="jobForm.is_enabled === true" :value="true">刊登中</option>
            <option :selected="jobForm.is_enabled === false" :value="false">暫停刊登</option>
          </select>
          <div class="dropdown">
            <button
              class="btn position-relative"
              type="button"
              :id="`dropdownMenuButton--jobEdit`"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="jobIcon bi bi-three-dots text-dark"></i>
            </button>
            <ul
              :ref="`dropDownMent`"
              class="dropDownMenu dropdown-menu"
              :aria-labelledby="`dropdownMenuButton--jobEdit`"
            >
              <li
                class="dropDownMenu__item"
                @click="goToPageLink(`/company-admin/edit-job/${jobForm.key}`)"
              >
                編輯職位
              </li>
              <li class="dropDownMenu__item" @click="deleteJob">刪除職位</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-12">
          <div class="jobInfoBox box--shadow position-relative mb-4">
            <div class="d-flex flex-lg-row flex-column">
              <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                <img
                  class="jobImg putPointer"
                  :src="jobForm.jobImgUrl.url || 'https://i.imgur.com/I2erb3u.png'"
                  :alt="`${jobForm.jobName}職位圖片`"
                />
                <div class="jobInfoBox__logoImgBox">
                  <img
                    class="logoImg"
                    :src="jobForm.companyInfo.companyLogoUrl"
                    :alt="`${jobForm.companyInfo.companyName}logo`"
                  />
                </div>
              </div>
              <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                <div class="mb-1">
                  <p class="jobTag bg-primary me-2 text-dark" v-if="jobForm.promotedData.promote">
                    <i class="jobIcon-sm bi bi-star-fill me-1 text-dark"></i>精選職位
                  </p>
                  <button type="button" class="jobTag btn">100%匹配度</button>
                </div>
                <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                  <h2 class="page__title">{{ jobForm.jobName || '未命名職位' }}</h2>
                  <p class="page__link subTxt mb-4 d-block">
                    {{ jobForm.companyInfo.companyName }}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                  <div>
                    <p class="mb-3">
                      <i class="jobIcon--sm me-1 bi bi-geo-alt"></i
                      >{{ jobForm.jobAddress.companyAddress || '尚未填寫' }}
                    </p>
                    <p class="text-dark fw-bold" v-if="!jobForm.jobSalaryRange.salaryInterView">
                      {{ jobForm.jobSalaryRange.salaryLow }}
                      <span
                        class="text-dark fw-bold"
                        v-if="
                          jobForm.jobSalaryRange.salaryHeight &&
                          jobForm.jobSalaryRange.salaryHeight !== 0
                        "
                      >
                        - {{ jobForm.jobSalaryRange.salaryHeight }}</span
                      >
                      NTD / {{ jobForm.jobSalaryRange.salaryType }}
                    </p>
                    <p class="text-dark fw-bold" v-if="jobForm.jobSalaryRange.salaryInterView">
                      薪資面議
                    </p>
                  </div>
                  <p class="subTxt text-secondary text-end">2021.12.12 12:10</p>
                </div>
              </div>
              <button type="button" class="btn btn-lg btn-primary w-100 d-lg-none d-block mb-3">
                申請職位
              </button>
              <button type="button" class="btn btn-lg btn-gray-light w-100 d-lg-none d-block">
                收藏職位
              </button>
            </div>
          </div>
          <!-- 職位內容 -->
          <div class="jobContentSection box--shadow mb-4">
            <h3 class="section__title--sub">
              <span class="titleTag--doubleCircle me-2"></span>職位內容
            </h3>
            <ul class="jobDataList">
              <li class="jobDataList__item col-12 flex-column align-items-start">
                <div v-html="jobForm.jobContent" v-if="jobForm.jobContent !== ''"></div>
                <p class="jobDataList__item__txt noContent" v-if="jobForm.jobContent === ''">
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
          <!-- 應徵條件 -->
          <div class="jobContentSection box--shadow mb-4">
            <h3 class="section__title--sub">
              <span class="titleTag--doubleCircle me-2"></span>應徵條件
            </h3>
            <ul class="jobDataList">
              <!-- 學歷要求 -->
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>學歷要求：
                </p>
                <p
                  class="jobDataList__item__txt"
                  :class="{ noContent: jobForm.conditions.education === '' }"
                >
                  {{ jobForm.conditions.education || '尚未選擇' }}
                </p>
              </li>
              <!-- 工作經驗 -->
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作經驗：
                </p>
                <p
                  class="jobDataList__item__txt"
                  :class="{ noContent: jobForm.conditions.workExp === '' }"
                >
                  {{ jobForm.conditions.workExp || '尚未選擇' }}
                </p>
              </li>
              <!-- 語言條件 -->
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>語言條件：
                </p>
                <ul v-for="(item, index) in jobForm.conditions.languages" :key="index">
                  <li class="jobTag me-1">
                    {{ `${item.name}-${item.languageLevel}` }}
                  </li>
                </ul>
                <p
                  v-if="jobForm.conditions.languages.length === 0"
                  class="jobDataList__item__txt noContent"
                >
                  尚未填寫
                </p>
              </li>
              <!-- 技能要求 -->
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>技能要求：
                </p>
                <ul v-for="(item, index) in jobForm.conditions.skills" :key="index">
                  <li class="jobTag me-1">
                    {{ item.name }}
                  </li>
                </ul>
                <p
                  v-if="jobForm.conditions.skills.length === 0"
                  class="jobDataList__item__txt noContent"
                >
                  尚未填寫
                </p>
              </li>
              <li class="jobDataList__item col-12 flex-column align-items-start">
                <p class="jobDataList__item__title mb-1">其他條件：</p>
                <div
                  v-html="jobForm.conditions.otherRequirement"
                  v-if="jobForm.conditions.otherRequirement !== ''"
                ></div>
                <p
                  class="jobDataList__item__txt noContent"
                  v-if="jobForm.conditions.otherRequirement === ''"
                >
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
          <!-- 其他職位資訊 -->
          <div class="jobContentSection box--shadow mb-4">
            <h3 class="section__title--sub">
              <span class="titleTag--doubleCircle me-2"></span>其他職位資訊
            </h3>
            <ul class="jobDataList row">
              <!-- 職位類別 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>職位類別：
                </p>
                <ul v-for="(item, index) in jobForm.jobCategory" :key="index">
                  <li class="jobDataList__item__listTxt">
                    {{ item }}
                    <span
                      v-if="index < jobForm.jobCategory.length - 1"
                      class="fakeInput__txtList__line"
                    ></span>
                  </li>
                </ul>
                <p v-if="jobForm.jobCategory.length === 0" class="jobDataList__item__txt noContent">
                  尚未選擇
                </p>
              </li>
              <!-- 產業類別 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：
                </p>
                <p
                  class="jobDataList__item__txt"
                  :class="{ noContent: jobForm.companyInfo.companyIndustry === '' }"
                >
                  {{ jobForm.companyInfo.companyIndustry || '尚未填寫' }}
                </p>
              </li>
              <!-- 工作性質 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：
                </p>
                <ul v-for="(item, index) in workType" :key="index">
                  <li class="jobDataList__item__listTxt">
                    {{ item
                    }}<span
                      v-if="index < workType.length - 1"
                      class="fakeInput__txtList__line"
                    ></span>
                  </li>
                </ul>
                <p v-if="workType.length === 0" class="jobDataList__item__txt noContent">
                  尚未選擇
                </p>
              </li>
              <!-- 工作時間 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作時間：
                </p>
                <ul v-for="(item, index) in workTime" :key="index">
                  <li class="jobDataList__item__listTxt">
                    {{ item }}
                    <span
                      v-if="index < workTime.length - 1"
                      class="fakeInput__txtList__line"
                    ></span>
                  </li>
                </ul>
                <p v-if="workTime.length === 0" class="jobDataList__item__txt noContent">
                  尚未選擇
                </p>
              </li>
              <!-- 需求人數 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>需求人數：
                </p>
                <p class="jobDataList__item__txt" :class="{ noContent: !jobForm.peopleNeed }">
                  {{ jobForm.peopleNeed || '尚未填寫' }}
                </p>
              </li>
              <!-- 外派需求 -->
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>外派需求：
                </p>
                <p class="jobDataList__item__txt">
                  {{ jobForm.expat ? '需要外派' : '不需外派' }}
                </p>
              </li>
              <!-- 駕照需求 -->
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>駕照需求：
                </p>
                <ul v-for="(item, index) in jobForm.conditions.driverLicenses" :key="index">
                  <li class="jobDataList__item__listTxt">
                    {{ item }}
                    <span
                      v-if="index < jobForm.conditions.driverLicenses.length - 1"
                      class="fakeInput__txtList__line"
                    ></span>
                  </li>
                </ul>
                <p
                  v-if="jobForm.conditions.driverLicenses.length === 0"
                  class="jobDataList__item__txt noContent"
                >
                  尚未選擇
                </p>
              </li>
            </ul>
          </div>
          <!-- 申請方法 -->
          <div class="jobContentSection box--shadow mb-4">
            <h3 class="section__title--sub">
              <span class="titleTag--doubleCircle me-2"></span>申請方法
            </h3>
            <ul class="jobDataList row">
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：
                </p>
                <p
                  class="jobDataList__item__txt"
                  :class="{ noContent: jobForm.applyContact.name === '' }"
                >
                  {{ jobForm.applyContact.name || '尚未填寫' }}
                </p>
              </li>
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡人職稱：
                </p>
                <p
                  class="jobDataList__item__txt"
                  :class="{ noContent: jobForm.applyContact.jobTitle === '' }"
                >
                  {{ jobForm.applyContact.jobTitle || '尚未填寫' }}
                </p>
              </li>
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：
                </p>
                <a
                  class="jobDataList__item__txt"
                  :href="`mailto:${jobForm.applyContact.email}`"
                  :class="{ noContent: jobForm.applyContact.email === '' }"
                >
                  {{ jobForm.applyContact.email || '尚未填寫' }}
                </a>
              </li>
              <li class="jobDataList__item col-lg-6 col-12">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：
                </p>
                <a
                  class="jobDataList__item__txt"
                  :href="`tel:${jobForm.applyContact.phone}`"
                  :class="{ noContent: !jobForm.applyContact.phone }"
                >
                  {{ jobForm.applyContact.phone || '尚未填寫' }}
                </a>
              </li>
              <li class="jobDataList__item col-12 flex-column align-items-start">
                <p class="jobDataList__item__title mb-1">申請備註：</p>
                <div
                  v-html="jobForm.applyContact.otherContent"
                  v-if="jobForm.applyContact.otherContent !== ''"
                ></div>
                <p
                  class="jobDataList__item__txt noContent"
                  v-if="jobForm.applyContact.otherContent === ''"
                >
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="jobSubBox box--shadow mb-lg-3 p-3 d-lg-block d-none">
            <button type="button" class="btn btn-lg btn-primary w-100">申請職位</button>
          </div>
          <div
            v-if="company.companyInfo.companyImgsUrl.length > 0"
            class="jobSubBox jobPage__companyImage box--shadow mb-3"
          >
            <h5 class="jobSubBox__title">公司照片</h5>
            <div class="companyImgBox">
              <img
                class="mb-2 putPointer"
                :src="company.companyInfo.companyImgsUrl[0].url"
                :alt="`${company.companyInfo.companyName}公司圖片1`"
              />
              <div class="d-flex justify-content-between">
                <img
                  v-if="company.companyInfo.companyImgsUrl[1].url !== ''"
                  class="companyImage--sub putPointer"
                  :src="company.companyInfo.companyImgsUrl[1].url"
                  :alt="`${company.companyInfo.companyName}公司圖片2`"
                />
                <img
                  v-if="company.companyInfo.companyImgsUrl[2].url !== ''"
                  :src="company.companyInfo.companyImgsUrl[2].url"
                  :alt="`${company.companyInfo.companyName}公司圖片3`"
                  class="companyImage--sub putPointer"
                />
              </div>
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
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      dataReady: false,
      jobkey: '',
      company: {},
      jobForm: {
        id: null,
        jobName: '',
        is_enabled: true,
        jobCategory: [],
        jobImgUrl: { url: '', key: '' },
        peopleNeed: null,
        workTime: [
          { title: '日班', select: false },
          { title: '夜班', select: false },
          { title: '假日班', select: false },
        ],
        workType: [
          { title: '全職', select: false },
          { title: '兼職', select: false },
          { title: '實習', select: false },
        ],
        expat: null,
        companyInfo: {
          companyName: '',
          companyLogoUrl: '',
          companyKey: '',
          companyIndustry: '',
        },
        jobAddress: {
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          companyAddress: '',
        },
        jobSalaryRange: {
          salaryLow: null,
          salaryHeight: null,
          salaryInterView: false,
          salaryType: '月薪',
        },
        createdTime: null,
        editedTime: null,
        promotedData: {
          promote: false,
          time: null,
          usedToken: 1,
        },
        questions: [{ content: '', key: '', voice: false }],
        jobContent: '',
        conditions: {
          workExp: '',
          education: '',
          languages: [],
          skills: [],
          driverLicenses: [],
          otherRequirement: '',
          jobCategory: [],
          identity: [],
          militaryService: '',
        },
        applyContact: {
          name: '',
          email: '',
          phone: '',
          jobTitle: '',
          otherContent: '',
        },
      },
      sameAddressWithCompany: false,
      chooseCityDist: [],
      questions: {
        answer: '',
      },
    };
  },
  computed: {
    workTime() {
      const temArray = [];
      this.jobForm.workTime.forEach((item) => {
        if (item.select) {
          temArray.push(item.title);
        }
      });
      return temArray;
    },
    workType() {
      const temArray = [];
      this.jobForm.workType.forEach((item) => {
        if (item.select) {
          temArray.push(item.title);
        }
      });
      return temArray;
    },
  },
  methods: {
    changeJobState(itemId) {
      // 要先建立詢問彈跳視窗
      this.saveJobData(itemId);
    },
    saveJobData(itemId) {
      const jobDataRef = database.ref(`company/jobList/${itemId}`);
      jobDataRef.set(this.jobForm);
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // promote token +1
    plusData(dataName) {
      if (dataName === 'jobPromoted') {
        if (this.jobForm.promotedData.usedToken < this.company.payService.jobPromoteTokens) {
          this.jobForm.promotedData.usedToken += 1;
        }
      }
    },
    // promote token -1
    minusData(dataName) {
      if (dataName === 'jobPromoted') {
        if (this.jobForm.promotedData.usedToken > 1) {
          this.jobForm.promotedData.usedToken -= 1;
        }
      }
    },
    // If user use promote, It will cost token.
    costCompanyJobPromoteTokens() {
      if (this.jobForm.promotedData.promote) {
        this.company.payService.jobPromoteTokens -= this.jobForm.promotedData.usedToken;
        this.saveCompanyData();
      }
    },
    checkJobDataExist() {
      if (!this.jobForm.conditions.languages) {
        this.jobForm.conditions.languages = [];
      } else if (!this.jobForm.conditions.skills) {
        this.jobForm.conditions.skills = [];
      } else if (!this.jobForm.conditions.driverLicenses) {
        this.jobForm.conditions.driverLicenses = [];
      } else if (!this.jobForm.conditions.identity) {
        this.jobForm.conditions.identity = [];
      }
    },
    // Save all  company data to Firebase.
    saveCompanyData() {
      const companyRef = database.ref('company');
      companyRef.set(this.company);
    },
    // put basic company info into job form.
    putCompanyDataToJob() {
      this.jobForm.companyInfo.companyName = this.company.companyInfo.companyName;
      this.jobForm.companyInfo.companyLogoUrl = this.company.companyInfo.companyLogoUrl;
      this.jobForm.companyInfo.companyKey = '12345678';
      this.jobForm.companyInfo.companyIndustry = this.company.companyInfo.companyIndustry;
    },
    // Get company data from Firebase.
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
          this.getJobData();
        }
      });
    },
    getJobData() {
      const jobRef = database.ref(`company/jobList/${this.jobkey}`);
      jobRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.jobForm = data;
          console.log(this.jobForm);
          this.checkJobDataExist();
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getCompanyData();
    if (this.$route.params.pageAction === 'preview') {
      this.pagePreview = true;
    } else if (this.$route.params.pageAction === 'edit') {
      this.pagePreview = false;
    }
    this.jobkey = this.$route.params.key;
    emitter.emit('spinner-open-bg', 500);
  },
};
</script>

<style lang="scss"></style>
