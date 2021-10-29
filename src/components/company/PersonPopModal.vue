<template>
  <div class="container">
    <div
      ref="personPopModal"
      class="modal fade popModal personPop"
      id="personPopModal"
      aria-hidden="true"
      aria-labelledby="personPopModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl heightFixed">
        <div class="modal-content" v-if="modalAction === '瀏覽人才'">
          <div class="popModal__header">
            <div class="personPop__personInfoBox px-5 mb-5">
              <div class="personPop__personInfoBox__innerBox">
                <img
                  class="personInfoBox__personalImg me-4"
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
                  <p class="subTxt text-secondary mb-4">最後活動日期：2021/12/12</p>
                  <div class="d-flex">
                    <p class="jobTag me-2">應徵狀態：申請中</p>
                    <p class="jobTag me-2 putPointer">匹配度：80%</p>
                  </div>
                </div>
              </div>
              <div class="btnBox">
                <button
                  type="button"
                  class="btn btn-companyColor text-light me-2"
                  @click="chooseAction"
                >
                  選擇動作
                </button>
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">聯絡</button>
                <router-link
                  :to="`talent-cv/${cvList[0].cvKey}`"
                  class="btn btn-outline-gray-line text-dark me-2"
                  >履歷</router-link
                >
                <button type="button" class="btn btn-outline-gray-line text-dark me-2">收藏</button>
              </div>
            </div>
            <button type="button" class="btn-close" @click="closeModal"></button>
            <ul class="personPop__nav">
              <li
                class="personPop__nav__item"
                :class="{ active: subNav === '個人資料' }"
                @click="subNav = '個人資料'"
              >
                <p>個人資料</p>
              </li>
              <li
                class="personPop__nav__item"
                :class="{ active: subNav === '應徵資料' }"
                @click="subNav = '應徵資料'"
              >
                <p>應徵資料</p>
              </li>
              <li
                class="personPop__nav__item"
                :class="{ active: subNav === '備註' }"
                @click="subNav = '備註'"
              >
                <p>備註</p>
              </li>
            </ul>
          </div>
          <div class="popModal__body personPopContentBox mb-5">
            <ul class="infoList infoList--company" v-if="subNav === '個人資料'">
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
              <li
                class="infoList__item show--compressed"
                v-if="user.others.identities.length !== 0"
              >
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
            <ul class="infoList infoList--company" v-if="subNav === '應徵資料'">
              <li class="infoList__item">
                <p class="infoList__item__title">應徵職位</p>
                <p class="infoList__item__content">ui設計師</p>
              </li>
              <li class="infoList__item">
                <p class="infoList__item__title">申請時間</p>
                <p class="infoList__item__content">2021/10/12 12:20</p>
              </li>
              <li class="infoList__item">
                <p class="infoList__item__title">申請時間</p>
                <p class="infoList__item__content">2021/10/12 12:20</p>
              </li>
              <li class="infoList__item d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">應徵紀錄</p>
                  <p class="infoList__item__content">申請 - ui設計師 2021/12/12 12:21</p>
                </div>
                <button type="button" class="btn btn-outline-gray-line text-dark">查看紀錄</button>
              </li>
              <li class="infoList__item d-flex justify-content-between align-items-center">
                <div>
                  <p class="infoList__item__title">備註</p>
                  <p class="infoList__item__content">這是一首簡單的小情歌</p>
                </div>
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  備註<span class="subTxt text-secondary ms-1">(12)</span>
                </button>
              </li>
            </ul>
            <ul class="infoList infoList--company" v-if="subNav === '應徵資料'">
              <li class="infoList__item">
                <p class="infoList__item__title">履歷</p>
                <div class="personPopContentBox__doc">
                  <img
                    class="personPopContentBox__doc__img me-2"
                    src="https://i.imgur.com/I2erb3u.png"
                    alt="履歷圖片"
                  />
                  <div class="d-flex flex-column justify-content-center">
                    <p class="mb-1">設計師履歷</p>
                    <p class="subTxt">最後更新時間：2021/12/12</p>
                  </div>
                </div>
              </li>
              <li class="infoList__item">
                <p class="infoList__item__title">自我介紹</p>
                <div class="personPopContentBox__doc">
                  <img
                    class="personPopContentBox__doc__img me-2"
                    src="https://i.imgur.com/I2erb3u.png"
                    alt="履歷圖片"
                  />
                  <div class="d-flex flex-column justify-content-center">
                    <p class="mb-1">我的影片</p>
                    <p class="subTxt">最後更新時間：2021/12/12</p>
                  </div>
                </div>
              </li>
              <li class="infoList__item">
                <p class="infoList__item__title">求職信</p>
                <p class="infoList__item__content">
                  你好，我是曾鼎鈞。
                  我對於貴公司的業務很有興趣，我希望能在貴公司工作。我從台灣國立師範大學畢業，今年28歲，已當完兵，會開車。
                  希望我能在貴公司學習與努力，我會一直努力學習的，不怕辛苦。 感謝抽空閱讀我的履歷。
                </p>
              </li>
            </ul>
            <div v-if="subNav === '備註'">
              <div class="input-group mb-4">
                <textarea
                  type="text"
                  class="form-control chatArea__txtInput"
                  placeholder="請輸入"
                  aria-describedby="basic-addon1"
                  rows="3"
                  v-model="message"
                />
                <button
                  type="button"
                  @click="saveMemo"
                  class="btn--openTextArea btn btn-companyColor text-light"
                >
                  送出
                </button>
              </div>
              <ul class="infoList infoList--company">
                <li class="infoList__item">
                  <p class="infoList__item__content">
                    這裡是GoPro Taiwan
                    玩家交流專屬社團，內容包含GoPro配件討論/拍攝技巧/後製剪接/照片分享/影片分享等資訊，如果與GoPro無關，請不要張貼，謝謝。
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="infoList__item__subTitle">Jordan / 2021/12/21</p>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      刪除備註
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
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import database from '@/methods/firebaseinit';

export default {
  data() {
    return {
      modal: {},
      subNav: '個人資料',
      modalAction: '',
      dataReady: false,
      formData: {},
      cvList: [],
      user: {},
      actionModal: {},
    };
  },
  methods: {
    openModal(obj) {
      console.log(obj);
      this.user = obj.user;
      this.modalAction = obj.action;
      this.modal.show();
      this.getShotJobList();
    },
    getShotJobList() {
      const shotJobListRef = database.ref('cvList');
      shotJobListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.cvList = data;
        this.dataReady = true;
      });
    },
    chooseAction() {
      const obj = {
        action: '選擇動作',
        user: this.user,
      };
      emitter.emit('open-person-action-modal', obj);
      this.closeModal();
    },
    closeModal() {
      this.modal.hide();
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.personPopModal);
    emitter.on('open-person-pop-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-person-pop-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
