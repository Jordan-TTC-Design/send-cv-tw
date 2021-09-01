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
      <ul class="row">
        <li class="col-4">
          <div class="docCard--new putPointer">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增履歷</p>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <div class="d-flex flex-column justify-content-between flex-grow-1 me-2">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>隱藏履歷
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
            <img class="docCard__cover" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <div class="d-flex flex-column justify-content-between flex-grow-1 me-2">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>隱藏履歷
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
            <img class="docCard__cover" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
          </div>
        </li>
        <li class="col-4">
          <div class="docCard">
            <div class="d-flex flex-column justify-content-between flex-grow-1 me-2">
              <p class="docCard__title">UI設計</p>
              <p class="subTxt mb-3">更新時間：2020.12.12 12:30</p>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  <i class="jobIcon-sm bi bi-eye me-1"></i>隱藏履歷
                </button>
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
            <img class="docCard__cover" src="https://i.imgur.com/qcSwLsr.jpg" alt="CV封面" />
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
      subTopNav: '履歷',
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
