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
          <div class="docCard--new putPointer" @click="openDocModal('newCoverLetter')">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增求職信</p>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--coverLetter">
            <p class="docCard__title">我的第一封求職信</p>
            <p class="docCard--coverLetter__content subTxt mb-3">
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
            </p>
            <div class="d-flex justify-content-between align-items-end">
              <p class="subTxt">更新時間: 2019.07.20</p>
              <button type="button" class="btn">
                <i class="jobIcon-sm bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--coverLetter">
            <p class="docCard__title">我的第一封求職信</p>
            <p class="docCard--coverLetter__content subTxt mb-3">
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
            </p>
            <div class="d-flex justify-content-between align-items-end">
              <p class="subTxt">更新時間: 2019.07.20</p>
              <button type="button" class="btn">
                <i class="jobIcon-sm bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </li>
        <li class="col-4">
          <div class="docCard docCard--coverLetter">
            <p class="docCard__title">我的第一封求職信</p>
            <p class="docCard--coverLetter__content subTxt mb-3">
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
              我對於貴公司的業務很有興趣，我希望能在貴公司工作。
            </p>
            <div class="d-flex justify-content-between align-items-end">
              <p class="subTxt">更新時間: 2019.07.20</p>
              <button type="button" class="btn">
                <i class="jobIcon-sm bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <DocModal />
</template>

<script>
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import DocModal from '@/components/admin/DocModal.vue';

export default {
  components: {
    UpTopBtn,
    DocModal,
  },
  data() {
    return {
      subTopNav: '求職信',
      editLetterModal: {},
    };
  },
  methods: {
    openDocModal(action) {
      emitter.emit('open-doc-modal', action);
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
  },
  created() {
    emitter.emit('spinner-open-bg', 1000);
  },
};
</script>

<style lang="scss"></style>
