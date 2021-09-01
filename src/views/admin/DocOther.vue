<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">文件</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('document-cv')"
            :class="{ active: subTopNav === '履歷' }"
          >
            <p class="admin__subNav__txt me-1">履歷</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('document-cover-letter')"
            :class="{ active: subTopNav === '求職信' }"
          >
            <p class="admin__subNav__txt me-1">求職信</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="goToPageLink('document-other')"
            :class="{ active: subTopNav === '其他文件' }"
          >
            <p class="admin__subNav__txt me-1">其他文件</p>
          </li>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center justify-content-lg-start align-items-center mb-5">
        <ul class="page__sideNav">
          <li
            class="page__sideNav__item putPointer"
            :class="{ active: subMainNav === '影片' }"
            @click="this.subMainNav = '影片'"
          >
            <p class="page__sideNav__item__title">影片</p>
          </li>
          <li
            class="page__sideNav__item putPointer"
            :class="{ active: subMainNav === '作品' }"
            @click="this.subMainNav = '作品'"
          >
            <p class="page__sideNav__item__title">作品</p>
          </li>
        </ul>
      </div>
      <ul class="row" v-if="subMainNav === '影片'">
        <li class="col-4">
          <div class="docCard--new putPointer">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增影片</p>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--video card">
            <img class="card-img-top me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="card-body d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title mb-2">我的自我介紹</p>
              <p class="subTxt text-secondary mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>設定成自我介紹
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--video card">
            <img class="card-img-top me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="card-body d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title mb-2">我的自我介紹</p>
              <p class="subTxt text-secondary mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>設定成自我介紹
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--video card">
            <img class="card-img-top me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="card-body d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title mb-2">我的自我介紹</p>
              <p class="subTxt text-secondary mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>設定成自我介紹
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="row" v-if="subMainNav === '作品'">
        <li class="col-4">
          <div class="docCard--new putPointer">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增作品</p>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <img class="docCard__cover me-2" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
            <div class="d-flex flex-column justify-content-between flex-grow-1">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt text-secondary mb-2">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    UpTopBtn,
  },
  data() {
    return {
      subTopNav: '其他文件',
      subMainNav: '影片',
    };
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
  },
  created() {
    emitter.emit('spinner-open-bg', 1000);
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
