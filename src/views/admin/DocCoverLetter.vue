<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
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
import AdminNav from '@/components/admin/AdminNav.vue';

export default {
  components: {
    UpTopBtn,
    DocModal,
    AdminNav,
  },
  data() {
    return {
      nowPage: '求職信',
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
