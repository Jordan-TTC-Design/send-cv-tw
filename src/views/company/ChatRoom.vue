<template>
  <div class="chatRoom bg-light" v-if="dataReady">
    <div class="chatRoom__leftContainer">
      <div class="chatRoom__filterBox bg-light">
        <div class="searchInput mb-3">
          <i class="jobIcon bi bi-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="關鍵字"
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
      <!-- 聊天列表 -->
      <ul class="chatRoom__userList">
        <template v-for="item in jobApplyData" :key="item.key">
          <li
            :ref="`chatRoom__card--${item.key}`"
            class="list__item chatRoom__card"
            @click="selectChat(item.key)"
          >
            <div class="chatRoom__card__top d-flex mb-2">
              <img class="card__img me-2" :src="user.account.userImgUrl" />
              <div>
                <p class="card__title mb-1">{{ user.account.chineseName }}</p>
                <p class="subTxt mb-1">招募職位：{{ item.jobInfo.jobName }}</p>
                <p class="subTxt">您好，我們最近看到你在找工作...</p>
              </div>
            </div>
            <div class="chatRoom__card__bottom">
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <p class="jobTag me-2">100%</p>
                  <p class="jobTag">{{ item.applyState }}</p>
                </div>
                <p class="subTxt text-secondary">2021/10/12</p>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="chatRoom__chatArea">
      <!-- 用戶 -->
      <div class="chatArea__userBox">
        <div class="d-flex align-items-center">
          <img class="companyLogo me-2" :src="user.account.userImgUrl" alt="公司logo" />
          <p class="pageLink putPointer text-decoration-underline">
            {{ user.account.chineseName }}
          </p>
        </div>
        <button type="button" class="btn btn--circle btn-sm">
          <i class="jobIcon bi bi-three-dots"></i>
        </button>
      </div>
      <!-- 對話視窗 -->
      <div class="chatArea__chatTxtContainer py-4" :class="{ active: chatInput === 10 }">
        <template v-for="item in chatroom" :key="item.key">
          <div class="chatBox checkBox--left">
            <img class="chatBox__img" :src="user.account.userImgUrl" />
            <div class="chatBox__txtBox">
              <div class="chatBox__txtBox__content" v-html="item.message"></div>
            </div>
          </div>
        </template>
        <div class="chatBox checkBox--left">
          <img class="chatBox__img" :src="user.account.userImgUrl" />
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
          <img class="chatBox__img" :src="user.account.userImgUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--left">
          <img class="chatBox__img" :src="user.account.userImgUrl" />
          <div class="chatBox__txtBox">
            <p class="chatBox__txtBox__content">
              你好你好你好你好你好你好你好你好你好你好你好你好你好～
            </p>
          </div>
        </div>
        <div class="chatBox checkBox--right">
          <img class="chatBox__img" :src="user.account.userImgUrl" />
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
      <!-- 輸入框 -->
      <div class="chatArea__inputContainer">
        <div class="input-group mb-3 position-relative">
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
              class="btn btn--circle"
              @click="rightContainer = 'messageTemplate'"
            >
              <i
                class="jobIcon bi bi-chat-left-quote-fill"
                :class="{ 'text-primary-dark': rightContainer === 'messageTemplate' }"
              ></i>
            </button>
          </div>
          <button type="button" class="btn btn-companyColor text-light" @click="addMessage">
            送出
          </button>
        </div>
      </div>
    </div>
    <!-- 用戶資訊 -->
    <div
      v-if="rightContainer === 'userInfo'"
      class="chatRoom__infoArea chatRoom__infoArea--company"
    >
      <ul class="boxSubNav boxSubNav--company">
        <li
          class="boxSubNav__item w--50"
          :class="{ active: boxSubNav === '個人資料' }"
          @click="changeNav('boxSubNav', '個人資料')"
        >
          <p>個人資料</p>
        </li>
        <li
          class="boxSubNav__item w--50"
          :class="{ active: boxSubNav === '應徵資料' }"
          @click="changeNav('boxSubNav', '應徵資料')"
        >
          <p>應徵資料</p>
        </li>
      </ul>
      <div class="personPop__personInfoBox__innerBox border-bottom border-gray-line p-4">
        <img
          style="width: 80px"
          class="personInfoBox__personalImg me-4 rounded"
          :src="user.account.userImgUrl"
          :alt="`${user.account.chineseName}個人求職照片`"
        />
        <div>
          <div class="d-flex align-items-center mb-2">
            <p class="personInfoBox__name text-dark mb-0 me-2">
              {{ user.account.chineseName }}
            </p>
            <p>{{ user.account.gender }} | {{ `28歲` }}</p>
          </div>
          <p class="subTxt text-secondary">最後活動日期：2021/12/12</p>
        </div>
      </div>
      <div ref="sideJobBox" class="sideJobBox pt-0">
        <div v-if="boxSubNav === '個人資料'">
          <ul class="infoList infoList--company">
            <li class="infoList__item show--compressed">
              <p class="infoList__item__title">求職意向</p>
              <ul class="infoList__item__skillList">
                <li class="infoList__item__skillList__skill">ui設計師</li>
                <li class="infoList__item__skillList__skill">前端工程師</li>
              </ul>
            </li>
            <li class="infoList__item infoList__item--job">
              <p class="infoList__item__title">教育程度</p>
              <template v-for="(item, index) in user.educationExp.educations" :key="index">
                <div :class="{ 'mb-2': index < user.educationExp.educations.length - 1 }">
                  <p class="infoList__item__content mb-1">
                    {{ item.schoolName }} -
                    {{ item.majorName }}
                  </p>
                  <p class="infoList__item__subTitle">
                    {{
                      `${item.startYear}.
                          ${item.startMonth}`
                    }}
                    ~
                    {{
                      item.isStillAtSchool
                        ? '仍在學'
                        : `${item.endYear}.
                            ${item.endMonth}`
                    }}
                    <span class="ms-2 text-secondary">{{ item.educationLevel }}</span>
                  </p>
                </div>
              </template>
            </li>
            <li class="infoList__item infoList__item--job">
              <p class="infoList__item__title">工作經驗</p>
              <template v-for="(item, index) in user.workExp.works" :key="index">
                <div :class="{ 'mb-2': index < user.workExp.works.length - 1 }">
                  <p class="infoList__item__content mb-1">
                    {{ item.companyName }} -
                    {{ item.jobName }}
                  </p>
                  <p class="infoList__item__subTitle">
                    {{
                      `${item.startYear}.
                          ${item.startMonth}`
                    }}
                    ~
                    {{
                      item.isStillWork
                        ? '仍在職'
                        : `${item.endYear}.
                            ${item.endMonth}`
                    }}
                  </p>
                </div>
              </template>
            </li>
            <li class="infoList__item show--compressed">
              <p class="infoList__item__title">具備駕照</p>
              <ul class="infoList__item__skillList">
                <template v-for="(item, index) in user.others.driverLicenses" :key="index">
                  <li v-if="item.select" class="infoList__item__skillList__skill">
                    {{ item.name }}
                  </li>
                </template>
              </ul>
            </li>
            <li class="infoList__item show--compressed" v-if="user.others.identities.length !== 0">
              <p class="infoList__item__title">特殊身份</p>
              <ul class="infoList__item__skillList">
                <template v-for="(item, index) in user.others.identities" :key="index">
                  <li v-if="item.select" class="infoList__item__skillList__skill">
                    {{ item.name }}
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
        <div v-if="boxSubNav === '應徵資料'">
          <ul class="infoList infoList--company">
            <li class="infoList__item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">應徵狀態</p>
                  <p class="infoList__item__content">面試邀請</p>
                </div>
                <div class="d-flex">
                  <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                    改時間
                  </button>
                  <button type="button" class="btn btn-gray-light text-dark me-2">婉拒</button>
                  <button type="button" class="btn btn-primary text-dark">同意</button>
                </div>
              </div>
            </li>
            <li class="infoList__item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">面試時間</p>
                  <p class="infoList__item__content">2020.01.13 19:38</p>
                </div>
              </div>
            </li>
            <li class="infoList__item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">面試地點</p>
                  <p class="infoList__item__content">台北市中山區南京東路二段150號10樓</p>
                </div>
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  打開地圖
                </button>
              </div>
            </li>
            <li class="infoList__item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">應徵方式</p>
                  <p class="infoList__item__content">sendCV 申請職位</p>
                </div>
              </div>
            </li>
            <li class="infoList__item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">應徵時間</p>
                  <p class="infoList__item__content">2020.01.13 19:38</p>
                </div>
              </div>
            </li>
            <li class="infoList__item list--last mb-5">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">應徵紀錄</p>
                  <p class="infoList__item__content">
                    面試邀請<span class="subTxt">2020.01.13 19:38</span>
                  </p>
                </div>
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                  查看全部
                </button>
              </div>
            </li>
          </ul>
          <ul ref="collapse" class="accordion">
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
              <div id="applyDocument-coverLetter" class="accordion-collapse collapse">
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
      </div>
    </div>
    <!-- 文字模板 -->
    <div
      v-if="rightContainer === 'messageTemplate'"
      class="chatRoom__infoArea chatRoom__infoArea--company"
    >
      <div></div>
      <div class="sideContainerTitleBox ps-1">
        <button type="button" class="btn" @click="rightContainer = 'userInfo'">
          <i class="jobIcon-sm bi bi-chevron-left me-2"></i>返回
        </button>
      </div>
      <ul class="toolList">
        <li class="toolList__title">純文字模板</li>
        <template v-for="(item, index) in user.messageTemplateList" :key="index">
          <li class="toolList__item putPointer" @click="openDocModal('sendMessageTemplate', index)">
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
  <DocModal
    :userData="user"
    @returnUserData="getUserDataFromModal"
    @sendMessage="getMessageDataFromModal"
  />
</template>

<script>
import database from '@/methods/firebaseinit';
import emitter from '@/methods/emitter';
import DocModal from '@/components/admin/DocModal.vue';

export default {
  components: {
    DocModal,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      dataReady: false,
      boxSubNav: '個人資料',
      rightContainer: 'userInfo',
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
      selectUser: {},
      user: {},
      pageNumber: 1,
      sortWay: 'time',
      // 篩選框顯示與否狀態
      filterData: {
        keyword: '',
      },
      jobCollectionList: [],
      chatInput: 2,
      chatroom: [],
      tempChatRoomData: {
        user: '',
        otherSide: '',
      },
      message: '',
      userRef: database.ref('user'),
      jobApplyData: [],
    };
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
      // this.saveFbData();
      console.log(this.user);
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
    // firebase chatroom data
    getChatListData() {
      const chatroomRef = database.ref('chatroom');
      chatroomRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.chatroom = data;
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
    getJobApplyDataData() {
      const jobApplyDataRef = database.ref('company/applyListData');
      jobApplyDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          this.jobApplyData = [];
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.jobApplyData.push(data[item]);
          });
          this.getUserData();
        }
      });
    },
    // 取得暫時用戶資料
    getUserData() {
      const userDataRef = database.ref('user');
      userDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          this.user = data;
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getJobApplyDataData();
    this.getChatListData();
    emitter.emit('spinner-open-bg', 1200);
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
