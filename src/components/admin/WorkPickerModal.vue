<template>
  <div class="container">
    <div
      ref="docModal"
      class="settingAccountModal popModal modal fade"
      tabindex="-1"
      id="docModal"
      aria-hidden="true"
      aria-labelledby="docModalLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="popModal__header popModal__header--left">
            <h5 class="popModal__title">選擇資料庫文件{{ nowCvKey }}</h5>
            <p class="popModal__header__subTxt">
              請善加利用標籤，系統會自動帶入欲該職位之相關內容。
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="popModal__body">
            <div class="workPickerBox">
              <div
                class="
                  d-flex
                  justify-content-center justify-content-lg-start
                  align-items-center
                  mb-4
                "
              >
                <ul class="pageSubNav">
                  <li
                    class="pageSubNav__item putPointer"
                    :class="{ active: pageSubNavState === '影片' }"
                    @click="this.pageSubNavState = '影片'"
                  >
                    <p class="pageSubNav__item__title">影片</p>
                  </li>
                  <li
                    class="pageSubNav__item putPointer"
                    :class="{ active: pageSubNavState === '作品' }"
                    @click="this.pageSubNavState = '作品'"
                  >
                    <p class="pageSubNav__item__title">作品</p>
                  </li>
                </ul>
              </div>
              <ul class="row row-cols-lg-3 row-cols-1" v-if="pageSubNavState === '影片' && dataReady">
                <template v-for="(item, index) in user.docData.videoList" :key="index">
                  <li class="col">
                    <div class="scvCard" @click="chooseCV('video', index)">
                      <div class="form-check scvCard__checkBox">
                        <input
                          :ref="`video--${index}`"
                          class="form-check-input"
                          type="checkbox"
                          name="資料庫文件"
                          :checked="item.cvSelect"
                          @click.stop="chooseCV('video', index)"
                        />
                      </div>
                      <div class="imgCover--top">
                        <img class="scvCard__img--top" :src="item.imgUrl" alt="影片封面" />
                      </div>
                      <div class="scvCard__body justify-content-between flex-grow-1">
                        <p class="scvCard__title">{{ item.title }}</p>
                        <p class="scvCard__subTxt">更新時間:{{ $filters.date(item.time) }}</p>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
              <ul class="row row-cols-lg-2 row-cols-1" v-if="pageSubNavState === '作品' && dataReady">
                <template v-for="(item, index) in user.docData.productList" :key="index">
                  <li class="col">
                    <div class="scvCard flex-row" @click="chooseCV('product', index)">
                      <div class="form-check scvCard__checkBox">
                        <input
                          :ref="`product--${index}`"
                          class="form-check-input"
                          type="checkbox"
                          name="資料庫文件"
                          :checked="item.cvSelect === true"
                          @click.stop="chooseCV('product', index)"
                        />
                      </div>
                      <div class="m-3 me-0 imgCover">
                        <img class="scvCard__img" :src="item.imgUrl" alt="CV封面" />
                      </div>
                      <div class="scvCard__body">
                        <p class="scvCard__title mb-2">{{ item.title }}</p>
                        <p class="scvCard__subTxt mb-1">更新時間:{{ $filters.date(item.time) }}</p>
                        <p class="scvCard__subTxt">檔案格式：jpg</p>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="popModal__footer--border">
            <button type="button" class="btn btn-gray-light me-2" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="saveData">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';

export default {
  emits: ['return-user-data'],
  props: ['userData', 'cvKey'],
  data() {
    return {
      date: new Date(),
      modal: {},
      pageSubNavState: '影片',
      dataReady: false,
      selectProductData: [],
      nowCvKey: null,
      videoCvSelect: [],
      user: {},
    };
  },
  watch: {
    cvKey: {
      deep: true,
      handler(newValue) {
        this.nowCvKey = newValue;
      },
    },
    userData: {
      deep: true,
      handler(newValue) {
        this.user = JSON.parse(JSON.stringify(newValue));
        if (this.user !== {}) {
          this.checkCvSelect();
          this.dataReady = true;
        }
      },
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    returnUserData() {
      this.closeModal();
      this.$emit('return-user-data', this.user);
    },
    chooseCV(action, index) {
      if (action === 'video') {
        const item = this.user.docData.videoList[index];
        item.cvSelect = !item.cvSelect;
        this.$refs[`video--${index}`].checked = item.cvSelect;
      } else if (action === 'product') {
        const item = this.user.docData.productList[index];
        item.cvSelect = !item.cvSelect;
        this.$refs[`product--${index}`].checked = item.cvSelect;
      }
    },
    putVideoInToData() {
      this.user.docData.videoList.forEach((item, index) => {
        if (item.cvSelect) {
          if (item.cvList) {
            const place = this.user.docData.videoList[index].cvList.indexOf(this.nowCvKey);
            console.log(place);
            if (place === -1) {
              this.user.docData.videoList[index].cvList.push(this.nowCvKey);
            }
          } else {
            this.user.docData.videoList[index].cvList = [this.nowCvKey];
          }
        } else if (!item.cvSelect) {
          if (item.cvList) {
            console.log(this.user.docData.videoList[index].cvList);
            const place = this.user.docData.videoList[index].cvList.indexOf(this.nowCvKey);
            this.user.docData.videoList[index].cvList.splice(place, 1);
          } else if (!item.cvList) {
            this.user.docData.videoList[index].cvList = [];
          }
        }
      });
      console.log(this.date, this.user.docData.videoList);
    },
    putProductInToData() {
      this.user.docData.productList.forEach((item, index) => {
        if (item.cvSelect) {
          if (item.cvList) {
            const place = this.user.docData.productList[index].cvList.indexOf(this.nowCvKey);
            console.log(place);
            if (place === -1) {
              this.user.docData.productList[index].cvList.push(this.nowCvKey);
            }
          } else {
            this.user.docData.productList[index].cvList = [this.nowCvKey];
          }
        } else if (!item.cvSelect) {
          if (item.cvList) {
            console.log(this.user.docData.productList[index].cvList);
            const place = this.user.docData.productList[index].cvList.indexOf(this.nowCvKey);
            this.user.docData.productList[index].cvList.splice(place, 1);
          } else if (!item.cvList) {
            this.user.docData.productList[index].cvList = [];
          }
        }
      });
      console.log(this.date, this.user.docData.productList);
    },
    checkCvSelect() {
      this.user.docData.videoList.forEach((item, index) => {
        if (item.cvList) {
          const place = item.cvList.indexOf(this.nowCvKey);
          if (place > -1) {
            this.user.docData.videoList[index].cvSelect = true;
          } else {
            this.user.docData.videoList[index].cvSelect = false;
          }
        }
      });
      this.user.docData.productList.forEach((item, index) => {
        if (item.cvList) {
          const place = item.cvList.indexOf(this.nowCvKey);
          if (place > -1) {
            this.user.docData.productList[index].cvSelect = true;
          } else {
            this.user.docData.productList[index].cvSelect = false;
          }
        }
      });
    },
    saveData() {
      this.putVideoInToData();
      this.putProductInToData();
      this.returnUserData();
    },
  },
  created() {
    this.user = this.userData;
    this.nowCvKey = this.cvKey;
  },
  mounted() {
    this.modal = new Modal(this.$refs.docModal);
    emitter.on('open-work-picker-modal', this.openModal);
    emitter.on('close-work-picker-modal', this.closeModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-work-picker-modal', this.openModal);
    emitter.off('close-work-picker-modal', this.closeModal);
  },
};
</script>

<style lang="scss"></style>
