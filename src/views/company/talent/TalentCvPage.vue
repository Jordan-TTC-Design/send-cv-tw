<template>
  <div class="adminPage--py" v-if="dataReady">
    <div class="container">
      <div class="row">
        <div class="col-xl-8">
          <div class="cvSubNav">
            <h2 class="cvSubNav__title ms-4" ref="cvTitle">
              {{ cvData.userData.account.chineseName }}的履歷
            </h2>
            <div class="d-flex">
              <button type="button" class="btn btn-light text-dark me-2">
                <i class="jobIcon bi bi-eyeglasses"></i>
              </button>
              <button type="button" class="btn btn-light text-dark">
                <i class="jobIcon bi bi-share-fill"></i>
              </button>
            </div>
          </div>
          <div class="cvSection position-relative">
            <div class="cvSection__titleBox mb-5">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                個人資訊
              </h3>
            </div>
            <div class="cvSection__userBg">
              <img class="cvSection__userBg__img" :src="cvData.cvImgUrl" alt="履歷封面" />
              <div class="userImgBox">
                <img
                  class="userImgBox__img"
                  src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </div>
            </div>
            <h4 class="mb-3 text-dark">{{ cvData.userData.account.chineseName }}</h4>
            <p class="mb-1">
              <span class="me-3 text-secondary">職稱</span>{{ cvData.userData.account.jobTitle }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">生日</span>{{ cvData.userData.account.birthday }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">聯絡信箱</span>{{ cvData.userData.account.email }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">聯絡電話</span>{{ cvData.userData.account.phone }}
            </p>
            <p class="mb-5">
              <span class="me-3 text-secondary">居住區域</span>
              {{ cvData.userData.account.addressCity }}，{{ cvData.userData.account.addressDist }}
            </p>
            <div class="cvSection__titleBox mb-4">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                自我介紹
              </h3>
            </div>
            <div class="introVideoBox mb-2">
              <img
                class="introVideoBox__video"
                :src="cvData.userData.docData.videoList[2].imgUrl"
                alt=""
              />
            </div>
            <div v-html="cvData.userData.docData.videoList[2].content"></div>
          </div>
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                工作經驗
              </h3>
            </div>
            <ul class="infoList">
              <template v-for="(tempItem, index) in cvData.userData.workExp.works" :key="index">
                <li
                  class="infoList__item infoList__item--job"
                  :ref="`workExp--${index}`"
                  :class="{
                    'list--last': index === cvData.userData.workExp.works.length - 1,
                  }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <div class="d-flex">
                        <p class="infoList__item__jobTitle mb-1 me-2">
                          {{ tempItem.companyName }}
                        </p>
                        <p class="infoList__item__jobTitle mb-1">
                          <span class="me-2">-</span>{{ tempItem.jobName }}
                        </p>
                      </div>
                      <p class="infoList__item__subTitle mb-3">
                        {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                        {{
                          tempItem.isStillWork
                            ? '仍在職'
                            : `${tempItem.endYear}.${tempItem.endMonth}`
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="infoList__item__contentBox">
                    <p class="contentBox__title mb-1">職務內容與成就</p>
                    <div class="infoList__item__content" v-html="tempItem.jobContent"></div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                學歷
              </h3>
            </div>
            <ul class="infoList">
              <template
                v-for="(tempItem, index) in cvData.userData.educationExp.educations"
                :key="index"
              >
                <li
                  class="infoList__item infoList__item--job"
                  :ref="`educationExp--${index}`"
                  :class="{
                    'list--last': index === cvData.userData.educationExp.educations.length - 1,
                  }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="infoList__item__jobTitle mb-1">
                        {{ tempItem.schoolName }} - {{ tempItem.majorName }}
                      </p>
                      <p class="infoList__item__subTitle mb-3">
                        {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                        {{
                          tempItem.isStillAtSchool
                            ? '仍在學'
                            : `${tempItem.endYear}.${tempItem.endMonth}`
                        }}
                        <span class="ms-2 text-secondary">{{ tempItem.educationLevel }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="infoList__item__contentBox">
                    <p class="contentBox__title mb-1">學習專業與經歷</p>
                    <div class="infoList__item__content" v-html="tempItem.educationContent"></div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                專業技能
              </h3>
            </div>
            <ul class="infoList">
              <!-- 語言 -->
              <li ref="languageData" class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <p class="infoList__item__title">語言</p>
                    <ul class="infoList__item__skillList">
                      <template v-for="(item, index) in cvData.userData.languages" :key="index">
                        <li class="infoList__item__skillList__skill">
                          <p>{{ item.name }} - {{ item.languageLevel }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <!-- 證照 -->
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <p class="infoList__item__title">證照</p>
                    <ul class="infoList__item__skillList">
                      <template v-for="(item, index) in cvData.userData.licenses" :key="index">
                        <li class="infoList__item__skillList__skill">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <!-- 技能 -->
              <template v-for="(skill, index) in cvData.userData.skills" :key="index">
                <li
                  class="infoList__item show--compressed"
                  :class="{
                    'list--last': index === cvData.userData.skills.length - 1,
                  }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="infoList__item__title">{{ skill.groupName }}</p>
                      <ul class="infoList__item__skillList">
                        <template v-for="item in skill.skillList" :key="item.name">
                          <li class="infoList__item__skillList__skill">
                            <p>{{ item.name }}</p>
                          </li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <template v-for="(listItem, listIndex) in cvData.cvSectionList" :key="listIndex">
            <div class="cvSection">
              <div class="cvSection__titleBox">
                <h3 class="cvSection__title" :ref="`expDataTitle--${listIndex}`">
                  <div class="tag--doubleCircle--company me-2"></div>
                  {{ listItem.sectionTitle }}
                </h3>
              </div>
              <template v-for="(item, index) in listItem.sectionDataList" :key="index">
                <CVExpTemplate
                  :tempExpSectionData="item"
                  :formNumber="index"
                  :listNumber="listIndex"
                />
              </template>
            </div>
          </template>
          <div class="cvSection" v-if="cvData.userData.docData">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                我的作品
              </h3>
            </div>
            <template v-for="(item, index) in cvData.userData.docData.videoList" :key="index">
              <div
                class="cvExpSection"
                v-if="item.cvList && item.cvList.indexOf(cvData.cvKey) > -1"
              >
                <div class="cvExpSection__titleBox mb-4">
                  <p class="cvExpSection__title">{{ item.title }}</p>
                </div>
                <div class="cvExpSection__content cvExpSection__content--works">
                  <div class="cvExpSection__content__txt" v-html="item.content"></div>
                  <div class="cvExpSection__content__imgBox">
                    <img :src="item.imgUrl" :alt="`${item.title}圖片`" />
                  </div>
                </div>
              </div>
            </template>
            <template v-for="(item, index) in cvData.userData.docData.productList" :key="index">
              <div
                class="cvExpSection"
                v-if="item.cvList && item.cvList.indexOf(cvData.cvKey) > -1"
              >
                <div class="cvExpSection__titleBox mb-4">
                  <p class="cvExpSection__title">{{ item.title }}</p>
                  <div class="dropdown">
                    <button
                      class="btn position-relative"
                      type="button"
                      :id="`dropdownMenuButton--cvExpData--${index}`"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="jobIcon bi bi-three-dots"></i>
                    </button>
                  </div>
                </div>
                <div class="cvExpSection__content cvExpSection__content--works">
                  <div class="cvExpSection__content__txt" v-html="item.content"></div>
                  <div class="cvExpSection__content__imgBox">
                    <img :src="item.imgUrl" :alt="`${item.title}圖片`" />
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- 其他資訊 -->
          <div class="cvSection" v-if="cvData.userData.docData">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle--company me-2"></div>
                其他資訊
              </h3>
            </div>
            <ul class="infoList">
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">駕照</p>
                    <ul class="infoList__item__skillList">
                      <template
                        v-for="(item, index) in cvData.userData.others.driverLicenses"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__item__skillList__skill">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">特殊身份</p>
                    <ul class="infoList__item__skillList">
                      <template
                        v-for="(item, index) in cvData.userData.others.identities"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__item__skillList__skill">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">兵役</p>
                    <ul class="infoList__item__skillList">
                      <template
                        v-for="(item, index) in cvData.userData.others.militaryServices"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__item__skillList__skill">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="sideChatBox">
            <div class="sideChatBox__title">
              <p class="text-light">聊天室</p>
              <p class="text-light">曾鼎鈞</p>
            </div>
            <div class="sideChatBox__chatTxtContainer py-4" :class="{ active: chatInput === 10 }">
              <template v-for="item in chatroom" :key="item.key">
                <div class="chatBox checkBox--left">
                  <img class="chatBox__img" :src="companyData.companyLogoUrl" />
                  <div class="chatBox__txtBox">
                    <div class="chatBox__txtBox__content" v-html="item.message"></div>
                  </div>
                </div>
              </template>
              <div class="chatBox checkBox--left">
                <img class="chatBox__img" :src="companyData.companyLogoUrl" />
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
                <img class="chatBox__img" :src="companyData.companyLogoUrl" />
                <div class="chatBox__txtBox">
                  <p class="chatBox__txtBox__content">
                    你好你好你好你好你好你好你好你好你好你好你好你好你好～
                  </p>
                </div>
              </div>
              <div class="chatBox checkBox--left">
                <img class="chatBox__img" :src="companyData.companyLogoUrl" />
                <div class="chatBox__txtBox">
                  <p class="chatBox__txtBox__content">
                    你好你好你好你好你好你好你好你好你好你好你好你好你好～
                  </p>
                </div>
              </div>
            </div>
            <div class="sideChatBox__inputContainer">
              <div class="input-group mb-3 position-relative">
                <textarea
                  type="text"
                  class="form-control sideChatBox__txtInput"
                  placeholder="請輸入"
                  aria-describedby="basic-addon1"
                  rows="2"
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
                  <button type="button" class="btn btn--circle">
                    <i class="jobIcon bi bi-chat-left-quote-fill"></i>
                  </button>
                </div>
                <button type="button" class="btn btn-companyColor text-light" @click="addMessage">
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <WorkPickerModal :userData="cvData.userData" :cvKey="cvData.cvKey" />
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CVExpTemplate from '@/components/admin/CVExpTemplate.vue';
import WorkPickerModal from '@/components/admin/WorkPickerModal.vue';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CVExpTemplate,
    WorkPickerModal,
  },
  data() {
    return {
      dataReady: false,
      formData: {},
      chooseCityDist: [],
      user: {},
      cvIndex: 0,
      chatroom: [],
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        language: 'zh',
        placeholder: '請輸入...',
        heading: {
          // 設定 Heading 內的樣式，可新增多個
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h3',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
          ],
        },
      },
      tempExpSectionData: {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
      },
      cvData: {},
      companyData: {},
      message: '',
    };
  },
  methods: {
    // 取得 cvData 資料
    getTempCvData() {
      const tempCvDataRef = database.ref('cvList');
      tempCvDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.cvDataList = data;
        this.filterCvData();
        console.log(this.cvDataList);
      });
    },
    filterCvData() {
      const { id } = this.$route.params;
      this.cvDataList.forEach((item, index) => {
        if (item.cvKey === id) {
          this.cvData = item;
          this.cvIndex = index;
          this.dataReady = true;
        }
      });
    },
    // 保存暫存Cv資料
    saveTempCvData() {
      const tempCvDataRef = database.ref(`cvList/${this.cvIndex}`);
      tempCvDataRef.set(this.tempCvData);
    },
    // 清除暫存履歷資料
    cleanTempCvData() {
      const tempCvDataRef = database.ref('tempCvData');
      tempCvDataRef.remove();
    },
    chooseCity(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.user.account.addressDist = temDist;
    },
    // 切換
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
    // firebase chatroom data
    getChatListData() {
      this.chatroom = [];
      const chatroomRef = database.ref('chatroom');
      chatroomRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((item) => {
            // 物件轉陣列
            this.chatroom.push(data[item]);
          });
        }
      });
    },
    toogleChatInput() {
      if (this.chatInput === 2) {
        this.chatInput = 10;
      } else {
        this.chatInput = 2;
      }
    },
    getCompanyAccountData() {
      const AccountRef = database.ref('company/companyInfo');
      AccountRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.companyData = JSON.parse(JSON.stringify(data));
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
  },
  created() {
    this.getTempCvData();
    this.getCompanyAccountData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
