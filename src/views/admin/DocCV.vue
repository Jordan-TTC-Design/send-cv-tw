<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container">
      <ul class="row">
        <li class="col-4">
          <router-link class="docCard--new putPointer" to="document-cv/cv/edit">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增履歷</p>
          </router-link>
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
              <router-link to="document-cv/cv" class="docCard__title">UI設計</router-link>
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
import AdminNav from '@/components/admin/AdminNav.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';

export default {
  components: {
    UpTopBtn,
    AdminNav,
  },
  data() {
    return {
      nowPage: '履歷',
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
