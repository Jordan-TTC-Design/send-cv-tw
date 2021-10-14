<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container position-relative companyPage">
      <div class="row justify-content-center">
        <!-- 企業資料 -->
        <div class="col-lg-4 col-12">
          <ul ref="adminSideList" class="admin-sideList list-group">
            <li
              class="
                border-bottom border-gray-line
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                bg-white
                p-3
              "
            >
              <p class="subTxt">目前共 {{ companyJobList.length }} 個職位</p>
            </li>
            <li
              :ref="`companyJobList-${item.id}`"
              :class="{ active: item.id === selectItem.id && fullWidth > 992 }"
              class="sideList__item list-group-item list-group-item-action"
              v-for="item in companyJobList"
              :key="item.id"
              @click="selectListItem(item.id)"
            >
              <p class="sideList__item__title mb-1">
                {{ item.title }}
              </p>
              <p class="sideList__item__subTxt">訂單時間：2021-12-12 }}</p>
            </li>
          </ul>
        </div>
        <div class="col-lg-8 col-12" v-if="selectItem.id">
          <button
            type="button"
            class="applyBackBtn btn btn-light text-dark mt-6 mb-4 d-lg-none"
            @click="backToList"
          >
            <i class="bi bi-chevron-left me-2"></i>返回<span class="applyBackBtn__title ms-4">{{
              selectItem.title
            }}</span>
          </button>
          <div ref="adminSelectBox" class="adminSelectBox box--shadow">
            <div class="selectBox__section">
              <div class="row">
                <div class="col-lg-7 col-12">
                  <h4 class="pageSubTitle mb-2">前端工程師</h4>
                  <p class="sideList__item__subTxt">
                    更新時間：2021-12-12
                  </p>
                </div>
                <div class="col-lg-5 col-12">
                  <div class="adminSelectBox__btnList">
                    <select
                      class="form-select w-auto me-2"
                      @change="changeProductState(selectItem.id)"
                      v-model="selectItem.is_enabled"
                    >
                      <option :selected="selectItem.is_enabled === 1" value="1">發布中</option>
                      <option :selected="selectItem.is_enabled === 0" value="0">關閉職位</option>
                    </select>
                    <p
                      class="btn btn-gray-light me-2"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </p>
                    <button
                      type="button"
                      class="btn btn-gray-light"
                      data-action="deleteItem"
                      :data-id="selectItem.id"
                      @click="openDeleteModal('刪除職位', selectItem.id, selectItem.title)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">職位系統資訊</h4>
              <ul class="adminInfoList">
                <li class="innerList__item">
                  <p class="innerList__item__subTxt">需求人數</p>
                  <p class="innerList__item__txt">12</p>
                </li>
                <li
                  class="innerList__item"
                  v-if="selectItem.options.job.promote === 0 || !selectItem.options.job.promote"
                >
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">
                    免費方案<button
                      type="button"
                      class="btn btn-primary ms-md-3 mt-md-0 mt-2"
                      @click="upGradeJob(selectItem.id, '升級')"
                    >
                      立即付費推播，提高曝光度！
                    </button>
                  </p>
                </li>
                <li class="innerList__item" v-if="selectItem.options.job.promote === 1">
                  <p class="innerList__item__subTxt">職位等級</p>
                  <p class="innerList__item__txt">
                    付費方案
                    <button
                      type="button"
                      class="btn btn-gray-light text-dark ms-md-3 mt-md-0 mt-2"
                      @click="upGradeJob(selectItem.id, '降級')"
                    >
                      切回免費方案
                    </button>
                  </p>
                </li>
              </ul>
            </div>
            <div class="selectBox__section">
              <h4 class="pageSubTitle mb-2">職位資料</h4>
              <div class="jobInfoBox rounded-0 p-0 mb-5">
                <div class="d-flex flex-lg-row flex-column">
                  <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                    <img
                      class="jobImg putPointer"
                      :src="selectItem.imageUrl"
                      :alt="`${selectItem.title}職位圖片`"
                    />
                    <div class="jobInfoBox__logoImgBox">
                      <img
                        class="logoImg"
                        :src="selectItem.options.company.companyLogoUrl"
                        :alt="`${selectItem.options.company.companyName}公司logo`"
                      />
                    </div>
                  </div>
                  <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                    <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                      <h2 class="page__title">{{ selectItem.title }}</h2>
                      <p class="page__link subTxt mb-4 d-block pe-auto">
                        {{ selectItem.options.company.companyName }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                      <div>
                        <p class="mb-3">
                          <span><i class="jobIcon--sm me-1 bi bi-geo-alt"></i></span
                          >{{ selectItem.options.company.companyAddressCity }}
                        </p>
                        <p>
                          <span><i class="jobIcon--sm me-1 bi bi-people"></i></span>需求人數：{{
                            selectItem.num
                          }}
                        </p>
                      </div>
                      <div>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="!selectItem.options.job.salaryInterView"
                        >
                          {{ selectItem.price }} / 月薪
                        </p>
                        <p
                          class="text-primary fw-bold mb-3"
                          v-if="selectItem.options.job.salaryInterView"
                        >
                          薪資面議
                        </p>
                        <p class="subTxt text-secondary text-end">
                          {{ $filters.date(selectItem.options.job.create) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jobContentSection mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>職位內容</h3>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                    selectItem.options.job.workType
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                    selectItem.options.job.workTime
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                    selectItem.options.company.industryCategory
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{
                    selectItem.category
                  }}
                </p>
                <p class="page__txt mb-2">工作內容：</p>
                <div class="page__txt" v-html="selectItem.content"></div>
              </div>
              <div class="jobContentSection mb-5 p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>應徵條件</h3>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-book"> </i>學歷要求：{{
                    selectItem.options.job.education
                  }}
                </p>
                <p class="page__txt mb-2">
                  <i class="jobIcon--sm me-1 bi bi-briefcase"></i>工作經驗：{{
                    selectItem.options.job.workExp
                  }}
                </p>
                <p class="page__txt mb-2">其他條件：</p>
                <div class="page__txt" v-html="selectItem.options.job.otherRequirement"></div>
              </div>
              <div class="jobContentSection p-0">
                <h3 class="section__title--sub"><span class="title__icon"></span>申請方法</h3>
                <p class="mb-2">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                    selectItem.options.company.companyContact
                  }}
                </p>
                <a :href="`mailto:${selectItem.options.company.companyEmail}`" class="mb-2 d-block">
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                    selectItem.options.company.companyEmail
                  }}
                </a>
                <a class="mb-3 d-block" :href="`tel:${selectItem.options.company.companyTel}`">
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                    selectItem.options.company.companyTel
                  }}
                </a>
                <p class="mb-2">申請備註：</p>
                <div v-html="selectItem.options.company.otherApplyInfo"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      scrollTop: 0,
      date: new Date(),
      nowPage: '刊登中職位',
      editMode: false,
      formData: {},
      selectItem: {},
      companyJobList: [],
      company: {},
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
      console.log(data);
      console.dir(this.$filters.date(data));
      console.log(data);
    },
  },
  methods: {
    getImgData(data) {
      console.log(data);
      if (data.dataName === 'companyImgsUrl') {
        console.log(data.dataName);
        this.company.companyInfo.companyImgsUrl[data.index].url = data.url;
        this.company.companyInfo.companyImgsUrl[data.index].key = data.key;
      }
    },
    checkImgInput() {
      if (this.company.companyInfo.companyImgsUrl) {
        if (this.company.companyInfo.companyImgsUrl.length < 3) {
          for (let i = this.company.companyInfo.companyImgsUrl.length; i < 3; i += 1) {
            console.log(i);
            this.company.companyInfo.companyImgsUrl.push({ url: '', key: '' });
          }
        }
      } else {
        this.company.companyInfo.companyImgsUrl = [
          { url: '', key: '' },
          { url: '', key: '' },
          { url: '', key: '' },
        ];
      }
    },
    getImg(data) {
      this.tempImgurl = data;
      this.updateImg();
    },
    updateImg() {
      emitter.emit('spinner-open');
      const item = this.tempImgurl;
      const base64String = item.replace('data:image/jpeg;base64,', '');
      console.log(item);
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: {
          image: base64String,
          type: 'base64',
        },
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
      })
        .then((res) => {
          this.company.companyInfo.companyLogoUrl = res.data.data.link;
          this.saveAllData();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          console.log(err);
          emitter.emit('spinner-close');
        });
    },
    editCompanyData(txt) {
      this.editDataSection = txt;
      this.editMode = true;
    },
    closeCompanyDataForm() {
      this.editDataSection = '';
      this.editMode = false;
    },
    saveCompanyDataForm() {
      this.saveAllData();
      this.editDataSection = '';
      this.editMode = false;
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('company');
      userRef.set(this.company);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('company');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
          this.checkImgInput();
        }
      });
    },
    // 切換
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
  },
  created() {
    this.getFbData();
    this.formData = webData;
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
