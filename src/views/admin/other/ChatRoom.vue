<template>
  <div class="chatRoom bg-light" v-if="dataReady">
    <div class="chatRoom__chatListArea" :class="{ 'rwdClose--sm': rwdSelect !== '' }">
      <div class="chatRoom__filterBox bg-light">
        <div class="searchInput mb-3">
          <i class="jobIcon bi bi-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="職位關鍵字"
            aria-describedby="關鍵字"
            v-model="filterData.keyword"
          />
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn--circle me-2">
            <i class="jobIcon bi bi-filter"></i>
          </button>
          <select class="form-select" id="searchFilterForm-city">
            <option selected value="全部">全部信件</option>
            <option value="全部">未讀信件</option>
            <option value="全部">已讀信件</option>
          </select>
        </div>
      </div>
      <ul class="chatRoom__chatList">
        <template v-for="temItem in nowPageJobs" :key="temItem.id">
          <li
            :ref="`chatRoom__card--${temItem.id}`"
            class="list__item chatCard"
            @click="selectListItem(temItem.id)"
          >
            <div class="chatCard__top d-flex mb-2">
              <img class="chatCard__img me-2" :src="temItem.options.company.companyLogoUrl" />
              <div class="flex-grow-1">
                <p class="chatCard__title mb-1">{{ temItem.options.company.companyName }}</p>
                <p class="subTxt mb-1">招募職位：{{ temItem.title }}</p>
                <p class="subTxt">您好，我們最近看到你在找工作...</p>
              </div>
            </div>
            <div class="chatCard__footer">
              <div class="chatCard__tagList">
                <p class="jobTag me-2">100%</p>
                <p class="jobTag">已申請</p>
              </div>
              <p class="subTxt text-secondary">2021/10/12</p>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- 中間聊天 -->
    <div class="chatRoom__chatArea" :class="{ 'rwdClose--sm': rwdSelect === '' }">
      <div class="chatArea__userBox">
        <div class="d-flex align-items-center">
          <button type="button" class="btn d-md-none" @click="backToList">
            <i class="jobIcon bi bi-chevron-left"></i>
          </button>
          <img
            class="companyLogo me-2"
            :src="jobItem.options.company.companyLogoUrl"
            alt="公司logo"
          />
          <router-link
            class="pageLink putPointer text-decoration-underline"
            :to="`/products-list/company/${jobItem.options.company.companyLink}`"
            >{{ jobItem.options.company.companyName }}</router-link
          >
        </div>
        <div class="d-flex">
          <button
            type="button"
            class="btn btn-outline-light d-xl-none text-dark me-2"
            @click="openInfoArea = 'userInfo'"
          >
            <i class="jobIcon-sm bi bi-info-square-fill me-2"></i>應徵資訊
          </button>
          <button type="button" class="btn btn--circle btn-sm">
            <i class="jobIcon bi bi-three-dots"></i>
          </button>
        </div>
      </div>
      <div class="chatArea__txtContainer py-4" :class="{ active: chatInput === 10 }">
        <template v-for="item in chatroom" :key="item.key">
          <div class="chatBox checkBox--left">
            <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
            <div class="chatBox__txtBox">
              <div class="chatBox__txtBox__content" v-html="item.message"></div>
            </div>
          </div>
        </template>
        <div class="chatBox checkBox--left">
          <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--right">
          <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--left">
          <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--right">
          <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--right">
          <img class="chatBox__img" :src="jobItem.options.company.companyLogoUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
              你好你好你好你好你好你好你好你好你好你好你好你好你好
              你好你好你好你好你好你好你好你好你好你好你好你好你好
            </p>
          </div>
        </div>
      </div>
      <div class="chatArea__inputContainer">
        <div class="input-group mb-3">
          <textarea
            type="text"
            class="form-control chatArea__txtInput"
            placeholder="請輸入"
            aria-describedby="basic-addon1"
            :rows="chatInput"
            v-model="message"
          />
          <button
            type="button"
            @click="toogleChatInput"
            class="btn--openTextArea btn btn-gray-light"
          >
            <i class="jobIcon bi bi-arrows-angle-expand"></i>
          </button>
        </div>
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <button type="button" class="btn btn--circle">
              <i class="jobIcon bi bi-archive-fill"></i>
            </button>
            <button type="button" class="btn btn--circle">
              <i class="jobIcon bi bi-folder-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-gray-line"
              @click="openInfoArea = 'messageTemplate'"
            >
              <i
                class="jobIcon bi bi-chat-left-quote-fill"
                :class="{ 'text-primary-dark': openInfoArea === 'messageTemplate' }"
              ></i>
            </button>
          </div>
          <button type="button" class="btn btn-primary" @click="addMessage">送出</button>
        </div>
      </div>
    </div>
    <!-- 右側資訊欄 -->
    <div class="chatRoom__infoArea" :class="{ active: openInfoArea === 'userInfo' }">
      <div class="border-bottom border-gray-line d-xl-none">
        <button type="button" class="btn" @click="openInfoArea = ''">
          <i class="jobIcon-sm bi bi-chevron-left me-2"></i>返回
        </button>
      </div>
      <NavBoxNav
              :nav-list="boxNavList"
              :nav-setting="boxNavSetting"
              v-model:box-nav-state="boxNavState"
            />
      <swiper
        :slides-per-view="swiperNum"
        :space-between="20"
        :autoplay="swiperDetail.autoPlay"
        :pagination="swiperDetail.pagination"
      >
        <swiper-slide v-for="(img, index) in jobItem.options.company.companyImagesUrl" :key="index">
          <div class="companyImageContainer">
            <div class="imgCover"></div>
            <img class="companyImageContainer__img" :src="img" alt="企業圖片" />
            <p class="companyImageContainer__txt subTxt text-light">公司環境</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="sideJobContainer pt-0">
        <div class="sideJobContainer__header p-3">
          <div class="d-flex align-items-center mb-3">
            <p class="jobTag bg-primary me-2"><i class="jobIcon-sm bi bi-star-fill"></i></p>
            <button type="button" class="jobTag btn">100%</button>
          </div>
          <div class="flex-grow-1">
            <router-link
              class="sideJobContainer__title mb-3 d-block"
              type="button"
              :to="`/products-list/product/${jobItem.id}`"
              >{{ jobItem.title }}</router-link
            >
            <p class="subTxt" v-if="!jobItem.options.job.salaryInterView">
              <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
              {{ jobItem.price }} / 月薪
            </p>
            <p class="subTxt" v-if="jobItem.options.job.salaryInterView">
              <span><i class="jobIcon--sm me-1 bi bi-currency-dollar"></i></span>
              薪資面議
            </p>
          </div>
        </div>
        <div class="sideJobContainer__body p-3" v-if="boxNavState === 1">
          <ul class="infoList infoList--jobSeeker infoList--withBtn">
            <li class="infoList__item">
              <div>
                <p class="infoList__item__title">應徵狀態</p>
                <p class="infoList__item__content">面試邀請</p>
              </div>
              <div class="infoList__btnBox">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  改時間
                </button>
                <button type="button" class="btn btn-gray-light text-dark me-2">婉拒</button>
                <button type="button" class="btn btn-primary text-dark">同意</button>
              </div>
            </li>
            <li class="infoList__item">
              <div>
                <p class="infoList__item__title">面試時間</p>
                <p class="infoList__item__content">2020.01.13 19:38</p>
              </div>
            </li>
            <li class="infoList__item">
              <div>
                <p class="infoList__item__title">面試地點</p>
                <p class="infoList__item__content">台北市中山區南京東路二段150號10樓</p>
              </div>
              <div class="infoList__btnBox">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  打開地圖
                </button>
              </div>
            </li>
            <li class="infoList__item">
              <div>
                <p class="infoList__item__title">應徵方式</p>
                <p class="infoList__item__content">sendCV 申請職位</p>
              </div>
            </li>
            <li class="infoList__item">
              <div>
                <p class="infoList__item__title">應徵時間</p>
                <p class="infoList__item__content">2020.01.13 19:38</p>
              </div>
            </li>
            <li class="infoList__item list--last mb-5">
              <div>
                <p class="infoList__item__title">應徵紀錄</p>
                <p class="infoList__item__content">
                  面試邀請<span class="subTxt">2020.01.13 19:38</span>
                </p>
              </div>
              <div class="infoList__btnBox">
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  查看全部
                </button>
              </div>
            </li>
          </ul>
          <ul ref="collapseDoc" class="accordion">
            <!-- 應徵文件 -->
            <li class="accordion-item bg-gray-light py-2">
              <p class="text-dark text-center">應徵文件</p>
            </li>
            <li class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#applyDocument-cv"
                  aria-expanded="false"
                  aria-controls="applyDocument-cv"
                >
                  履歷
                </button>
              </h2>
              <div id="applyDocument-cv" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It is shown by default,
                  until the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions. You can modify any of this with custom CSS or
                  overriding our default variables. It's also worth noting that just about any HTML
                  can go within the <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#applyDocument-coverLetter"
                  aria-expanded="false"
                  aria-controls="applyDocument-coverLetter"
                >
                  求職信
                </button>
              </h2>
              <div id="applyDocument-coverLetter" class="accordion-collapse collapse show">
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by
                  default, until the collapse plugin adds the appropriate classes that we use to
                  style each element. These classes control the overall appearance, as well as the
                  showing and hiding via CSS transitions. You can modify any of this with custom CSS
                  or overriding our default variables. It's also worth noting that just about any
                  HTML can go within the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#applyDocument-selfIntro"
                  aria-expanded="false"
                  aria-controls="applyDocument-selfIntro"
                >
                  自我介紹影片
                </button>
              </h2>
              <div id="applyDocument-selfIntro" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default,
                  until the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions. You can modify any of this with custom CSS or
                  overriding our default variables. It's also worth noting that just about any HTML
                  can go within the <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </li>
            <li class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#applyDocument-companyAsk"
                  aria-expanded="false"
                  aria-controls="applyDocument-companyAsk"
                >
                  公司提問
                </button>
              </h2>
              <div id="applyDocument-companyAsk" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default,
                  until the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions. You can modify any of this with custom CSS or
                  overriding our default variables. It's also worth noting that just about any HTML
                  can go within the <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="sideJobContainer__body p-3" v-if="boxNavState === 2">
          <div class="sideJobContainer__section">
            <h3 class="sectionTitle--withTag mb-4">
              <span class="sectionTitleTag--double me-2"></span>職位內容
            </h3>
            <ul class="jobDataList">
              <li class="jobDataList__item flex-column align-items-start">
                <div v-html="jobItem.content" v-if="jobItem.content !== ''"></div>
                <p class="jobDataList__item__txt noContent" v-if="jobItem.content === ''">
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
          <div class="sideJobContainer__section">
            <h3 class="sectionTitle--withTag mb-4">
              <span class="sectionTitleTag--double me-2"> </span>應徵條件
            </h3>
            <ul class="jobDataList">
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>學歷要求：{{
                    jobItem.options.job.education
                  }}
                </p>
              </li>
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作經驗：{{
                    jobItem.options.job.workExp
                  }}
                </p>
              </li>
              <li class="jobDataList__item col-12 flex-column align-items-start">
                <p class="jobDataList__item__title mb-1">其他條件：</p>
                <div
                  v-html="jobItem.options.job.otherRequirement"
                  v-if="jobItem.options.job.otherRequirement !== ''"
                ></div>
                <p
                  class="jobDataList__item__txt noContent"
                  v-if="jobItem.options.job.otherRequirement === ''"
                >
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
          <div class="sideJobContainer__section">
            <h3 class="sectionTitle--withTag mb-4">
              <span class="sectionTitleTag--double me-2"></span>其他職位資訊
            </h3>
            <ul class="jobDataList">
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：{{
                    jobItem.options.job.workType
                  }}
                </p>
              </li>
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-clock"></i>工作時間：{{
                    jobItem.options.job.workTime
                  }}
                </p>
              </li>
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：{{
                    jobItem.options.company.industryCategory
                  }}
                </p>
              </li>
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作類別：{{ jobItem.category }}
                </p>
              </li>
            </ul>
          </div>
          <div class="sideJobContainer__section">
            <h3 class="sectionTitle--withTag mb-4">
              <span class="sectionTitleTag--double me-2"></span>申請方法
            </h3>
            <ul class="jobDataList">
              <li class="jobDataList__item">
                <p class="jobDataList__item__title">
                  <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：{{
                    jobItem.options.company.companyContact
                  }}
                </p>
              </li>
              <li class="jobDataList__item">
                <a
                  class="jobDataList__item__title d-block"
                  :href="`mailto:${jobItem.options.company.companyEmail}`"
                >
                  <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：{{
                    jobItem.options.company.companyEmail
                  }}
                </a>
              </li>
              <li class="jobDataList__item">
                <a
                  class="jobDataList__item__title d-block"
                  :href="`tel:${jobItem.options.company.companyTel}`"
                >
                  <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：{{
                    jobItem.options.company.companyTel
                  }}
                </a>
              </li>
              <li class="jobDataList__item flex-column align-items-start">
                <p class="jobDataList__item__title">申請備註：</p>
                <div
                  v-html="jobItem.options.job.otherApplyInfo"
                  v-if="jobItem.options.job.otherApplyInfo !== ''"
                ></div>
                <p
                  class="jobDataList__item__txt noContent"
                  v-if="jobItem.options.job.otherApplyInfo === ''"
                >
                  尚未填寫
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="chatRoom__infoArea chatRoom__infoArea--jobSeeker"
      :class="{ active: openInfoArea === 'messageTemplate' }"
    >
      <div class="border-bottom border-gray-line">
        <button type="button" class="btn d-xl-none" @click="openInfoArea = ''">
          <i class="jobIcon-sm bi bi-chevron-left me-2"></i>返回
        </button>
      </div>
      <ul class="chatToolList">
        <li class="chatToolList__title">純文字模板</li>
        <template v-for="(item, index) in user.messageTemplateList" :key="index">
          <li
            class="chatToolList__item putPointer"
            @click="openDocModal('sendMessageTemplate', index)"
          >
            {{ item.title }}
          </li>
        </template>
      </ul>
      <div class="chatRoom__infoArea__footer">
        <button
          type="button"
          class="btn btn-outline-gray-line text-companyColor me-2"
          @click="openDocModal('newMessageTemplate')"
        >
          新增文字模板
        </button>
        <button
          type="button"
          class="btn btn-outline-gray-line text-dark"
          @click="goToPageLink('setting-message-template')"
        >
          前往管理模板
        </button>
      </div>
    </div>
  </div>
  <div
    class="menuCover--chat"
    ref="menuCover"
    @click="openInfoArea = ''"
    :class="{ active: openInfoArea === 'userInfo' || openInfoArea === 'messageTemplate' }"
  ></div>
  <JobCollect></JobCollect>
  <DocModal
    :userData="user"
    @returnUserData="getUserDataFromModal"
    @sendMessage="getMessageDataFromModal"
  />
</template>

<script>
// import Collapse from 'bootstrap/js/dist/collapse';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import database from '@/methods/firebaseinit';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import JobCollect from '@/components/helpers/JobCollect.vue';
import DocModal from '@/components/admin/DocModal.vue';
import NavBoxNav from '@/components/helpers/NavBoxNav.vue';

SwiperCore.use([Autoplay, Pagination]);

export default {
  components: {
    JobCollect,
    DocModal,
    Swiper,
    SwiperSlide,
    NavBoxNav,

  },
  data() {
    return {
      dataReady: false,
      boxNavState: 1,
      boxNavList: [
        { title: '個人資料', value: 1 },
        { title: '應徵資料', value: 2 },
      ],
      boxNavSetting: {
        full: 1,
        style: 0,
        bg: 1,
        rounded: 0,
      },
      fullWidth: 0,
      fullHeight: 0,
      products: [],
      jobsList: [],
      nowPageJobs: [],
      jobItem: {
        options: {
          company: {
            companyImagesUrl: [],
          },
          job: {},
        },
      },
      user: {},
      pageNumber: 1,
      sortWay: 'time',
      formData: {},
      // 篩選框顯示與否狀態
      filterData: {
        keyword: '',
      },
      jobCollectionList: [],
      swiperNum: 1,
      swiperDetail: {
        autoPlay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: this.swiperNum,
      },
      chatInput: 2,
      chatroom: [],
      tempChatRoomData: {
        user: '',
        otherSide: '',
      },
      message: '',
      userRef: database.ref('user'),
      collapse: '',
      // rwd
      rwdSelect: '',
      openInfoArea: '',
    };
  },
  computed: {
    // 所有企業
    sortCompany() {
      const temCompanyArray = [];
      if (this.products.length > 1) {
        this.products.forEach((item) => {
          if (item.description === '企業') {
            temCompanyArray.push(item);
          }
        });
      }
      return temCompanyArray;
    },
  },
  methods: {
    getMessageDataFromModal(messageData) {
      this.message = messageData;
      this.addMessage();
    },
    openDocModal(action, index) {
      const obj = {
        action,
      };
      if (action === 'newMessageTemplate') {
        emitter.emit('open-doc-modal', obj);
      } else if (action === 'sendMessageTemplate') {
        obj.index = index;
        emitter.emit('open-doc-modal', obj);
      }
    },
    getUserDataFromModal(userData) {
      this.user = JSON.parse(JSON.stringify(userData));
      this.saveFbData();
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // 調整列表排序方式
    changeJobSort() {
      if (this.sortWay === 'time') {
        this.jobsList.sort((a, b) => b.options.job.create - a.options.job.create);
      } else if (this.sortWay === 'money') {
        this.jobsList.sort((a, b) => b.price - a.price);
      }
    },
    changePage(nowPageNum) {
      this.pageNumber = nowPageNum;
      this.getNowPageJobs();
    },
    toogleChatInput() {
      if (this.chatInput === 2) {
        this.chatInput = 10;
      } else {
        this.chatInput = 2;
      }
    },
    changeNav(navName, txt) {
      if (this[navName]) {
        this[navName] = txt;
      }
    },
    getJobCollect(collection) {
      this.jobCollectionList = JSON.parse(JSON.stringify(collection));
      this.checkJobCollect();
    },
    checkJobCollect() {
      if (this.nowPageJobs.length > 0 && this.jobCollectionList.length > 0) {
        this.nowPageJobs.forEach((temItem, index) => {
          let check = false;
          this.jobCollectionList.forEach((folder) => {
            folder.jobs.forEach((item) => {
              if (item.id === temItem.id) {
                check = true;
              }
            });
          });
          this.nowPageJobs[index].jobCollectCheck = check;
        });
      }
    },
    selectChatFrist(id) {
      if (this.fullWidth > 991) {
        this.nowPageJobs.forEach((item) => {
          if (item.id === id) {
            this.jobItem = item;
            this.$refs[`chatRoom__card--${item.id}`].classList.add('active');
          } else if (item.id !== id) {
            this.$refs[`chatRoom__card--${item.id}`].classList.remove('active');
          }
        });
        // this.$refs.jobSelectBox.toTop();
      }
    },
    // 本頁職位
    getNowPageJobs() {
      const temPageJobs = [];
      if (this.jobsList.length !== []) {
        const pageFrist = this.pageNumber * 10 - 10;
        this.jobsList.forEach((item, index) => {
          if (pageFrist <= index && index < this.pageNumber * 10) {
            temPageJobs.push(item);
          }
        });
        document.documentElement.scrollTop = 0;
        [this.jobItem] = temPageJobs;
      }
      this.nowPageJobs = JSON.parse(JSON.stringify(temPageJobs));
      this.checkJobCollect();
    },
    // 篩選出所有職位
    classifyJob() {
      this.jobsList = [];
      this.changePage(1);
      this.products.forEach((item) => {
        if (item.description === '職位') {
          const Obj = JSON.parse(JSON.stringify(item)); // 深拷貝
          this.sortCompany.forEach((temCompany) => {
            if (Obj.options.company.companyName === temCompany.title) {
              Obj.options.company.companyLink = temCompany.id;
            }
          });
          this.jobsList.push(Obj);
        }
      });
      this.changeJobSort();
      this.getNowPageJobs();
    },
    // 抓全部資料
    getOgData() {
      emitter.emit('spinner-open');
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          emitter.emit('spinner-close');
          this.classifyJob();
        })
        .catch((err) => {
          emitter.emit('spinner-close');
          emitter.emit('alertMessage-open', err);
        });
    },
    // firebase user data
    getFbData() {
      this.userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = JSON.parse(JSON.stringify(data));
        this.tempChatRoomData.user = this.user.account.chineseName;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveFbData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
    },
    // firebase chatroom data
    getChatListData() {
      const chatroomRef = database.ref('chatroom');
      chatroomRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.chatroom = data;
        console.log(data);
      });
    },
    // put message to chatList and render
    addMessage() {
      const chatroomRef = database.ref('chatroom');
      if (!this.message.trim()) {
        return;
      }
      const { key } = chatroomRef.push();
      console.log(key);
      chatroomRef.child(key).set({
        userName: this.tempChatRoomData.user,
        time: new Date(),
        message: this.message,
        key,
      });
      this.message = '';
      this.getChatListData();
    },
    selectListItem(itemId) {
      this.processSelectData(itemId);
    },
    backToList() {
      this.processSelectData('');
    },
    processSelectData(action) {
      this.rwdSelect = action;
    },
  },
  created() {
    this.getOgData();
    this.getFbData();
    this.getChatListData();
    this.formData = webData;
    emitter.emit('spinner-open-bg', 1200);
  },
  mounted() {
    // this.collapse = new Collapse(this.$refs.collapseDoc);
  },
};
</script>

<style lang="scss"></style>
