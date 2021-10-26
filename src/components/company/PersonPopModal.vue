<template>
  <div
    ref="personPopModal"
    class="modal fade popModal personPopModal"
    id="personPopModal"
    aria-hidden="true"
    aria-labelledby="personPopModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl" ref="collapse">
      <div class="modal-content">
        <div class="popModal__header border-bottom border-gray-line mb-4">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div v-if="modalAction === '瀏覽人才'">
          <div class="modal-body px-0">
            <div class="personPopContentBox">
              <div class="personPopContentBox__leftBox">
                <img
                  class="personPopContentBox__personalImg"
                  :src="user.account.userImgUrl"
                  :alt="`${user.account.chineseName}個人求職照片`"
                />
                <div class="px-4">
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    個人資料
                  </button>
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    應徵資料
                  </button>
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    應徵文件
                  </button>
                </div>
              </div>
              <div class="personPopContentBox__rightBox">
                <div class="mb-4">
                  <div class="d-flex align-items-center mb-2">
                    <p class="personCard__name mb-0 me-2">{{ user.account.chineseName }}</p>
                    <p>{{ user.account.gender }} | {{ `28歲` }}</p>
                  </div>
                  <p class="subTxt text-secondary mb-2">最後活動日期：2021/12/12</p>
                  <div class="d-flex">
                    <p class="jobTag me-2">申請階段</p>
                  </div>
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2 mb-1">
                    <span class="titleTag--doubleCircle--company me-2"></span>個人資料
                  </h3>
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
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2">
                    <span class="titleTag--doubleCircle--company me-2"></span>應徵資料
                  </h3>
                  <ul class="infoList infoList--company">
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
                      <button type="button" class="btn btn-outline-gray-line text-dark">
                        查看紀錄
                      </button>
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
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2">
                    <span class="titleTag--doubleCircle--company me-2"></span>應徵文件
                  </h3>
                  <ul class="infoList infoList--company">
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
                        希望我能在貴公司學習與努力，我會一直努力學習的，不怕辛苦。
                        感謝抽空閱讀我的履歷。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-primary" @click="saveThisData('職務類別')">
              確定
            </button>
          </div>
        </div>
        <div v-if="modalAction === '瀏覽人才2'">
          <div class="modal-body px-0">
            <div class="personPopContentBox">
              <div class="personPopContentBox__leftBox">
                <img
                  class="personCard__personalImg"
                  :src="user.account.userImgUrl"
                  :alt="`${user.account.chineseName}個人求職照片`"
                />
                <div class="px-4">
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    個人資料
                  </button>
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    應徵資料
                  </button>
                  <button type="button" class="btn btn-gray-light text-dark w-100 mb-2">
                    應徵文件
                  </button>
                </div>
              </div>
              <div class="personPopContentBox__rightBox">
                <div class="mb-4">
                  <div class="d-flex align-items-center mb-2">
                    <p class="personCard__name mb-0 me-2">{{ user.account.chineseName }}</p>
                    <p>{{ user.account.gender }} | {{ `28歲` }}</p>
                  </div>
                  <p class="subTxt text-secondary mb-2">最後活動日期：2021/12/12</p>
                  <div class="d-flex">
                    <p class="jobTag me-2">申請階段</p>
                  </div>
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2 mb-1">
                    <span class="titleTag--doubleCircle--company me-2"></span>個人資料
                  </h3>
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
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2">
                    <span class="titleTag--doubleCircle--company me-2"></span>應徵資料
                  </h3>
                  <ul class="infoList infoList--company">
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
                      <button type="button" class="btn btn-outline-gray-line text-dark">
                        查看紀錄
                      </button>
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
                </div>
                <div class="mb-4">
                  <h3 class="section__title--sub border-bottom border-companyColor pb-2">
                    <span class="titleTag--doubleCircle--company me-2"></span>應徵文件
                  </h3>
                  <ul class="infoList infoList--company">
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
                        希望我能在貴公司學習與努力，我會一直努力學習的，不怕辛苦。
                        感謝抽空閱讀我的履歷。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-primary" @click="saveThisData('職務類別')">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';

export default {
  emits: ['return-person-pop'],
  data() {
    return {
      collapse: {},
      modal: {},
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      jobCategories: [],
      driverLicenses: [],
      tempItem: { index: 0 },
      user: {},
    };
  },
  methods: {
    openModal(obj) {
      console.log(obj);
      this.mainAction = obj.action;
      this.user = obj.user;
      this.modalAction = this.mainAction;
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    saveThisData(action) {
      if (action === '職務類別') {
        this.jobCategories = [];
        this.formData.jobCategories.forEach((item) => {
          if (item.selectAll) {
            console.log(item);
            this.jobCategories.push(item.groupName);
          } else {
            item.categories.forEach((job) => {
              console.log(job);
              if (job.selectAll) {
                this.jobCategories.push(job.categoryName);
              } else {
                job.categories.forEach((obj) => {
                  if (obj.select) {
                    this.jobCategories.push(obj.name);
                  }
                });
              }
            });
          }
        });
        console.log(this.jobCategories);
        const obj = {
          action,
          data: this.jobCategories,
        };
        this.$emit('return-person-pop', obj);
        this.closeModal();
      } else if (action === '駕照需求') {
        const obj = {
          action,
          data: this.driverLicenses,
        };
        this.$emit('return-person-pop', obj);
        this.closeModal();
      }
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse);
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
