<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container-lg pageSubNavContainer--fixed">
      <div class="pageSubNav pageSubNav--sticky mb-5">
        <ul class="innerNav innerNav--fill innerNav--jobSeeker innerNav--single">
          <li
            class="innerNav__item w--50"
            :class="{ active: pageSubNavState === '影片' }"
            @click="this.pageSubNavState = '影片'"
          >
            <p>影片</p>
          </li>
          <li
            class="innerNav__item w--50"
            :class="{ active: pageSubNavState === '作品' }"
            @click="this.pageSubNavState = '作品'"
          >
            <p>作品</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="bg-light rounded p-4 mb-5 d-flex" v-if="pageSubNavState === '影片' && dataReady">
        <div class="bg-gray-line d-flex flex-column justify-content-center px-8">
          <h4 class="mb-4">
            立即上傳
            <span class="text-companyColor">影像短片</span>
            ，做個簡單的自我介紹或盡情發揮所長，找工作更快更方便！
          </h4>
          <p>
            Upload your video clips to introduce yourself or your creative works for betterjob
            seeking experience.
          </p>
        </div>
        <img class="w-50" src="https://i.imgur.com/tOFpDha.png" alt="" />
      </div>
      <ul class="row row-cols-lg-3 row-cols-1 gy-5" v-if="pageSubNavState === '影片' && dataReady">
        <li class="col">
          <div class="newScvCard putPointer h-100" @click="openDocModal('newVideo')">
            <p class="newScvCard__txt"><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增影片</p>
          </div>
        </li>
        <li class="col" v-for="(item, index) in user.docData.videoList" :key="index">
          <div class="scvCard">
            <img class="scvCard__img--top" :src="item.imgUrl" alt="影片封面" />
            <div class="scvCard__body">
              <p class="scvCard__title mb-1">{{ item.title }}</p>
              <p class="scvCard__subTxt mb-4">更新時間:{{ $filters.date(item.time) }}</p>
              <div class="d-flex justify-content-between">
                <button
                  type="button"
                  class="btn text-dark"
                  :class="{
                    'btn-primary': item.introSelect,
                    'btn-outline-gray-line': !item.introSelect,
                  }"
                  @click="changeIntroVideo(index)"
                >
                  <i
                    class="jobIcon-sm bi me-1 text-dark"
                    :class="{ 'bi-eye-slash': !item.introSelect, 'bi-eye': item.introSelect }"
                  ></i
                  >{{ `${item.introSelect ? '已設定自我介紹' : '設定成自我介紹'}` }}
                </button>
                <button type="button" class="btn text-dark">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="row row-cols-lg-3 row-cols-1 gy-5" v-if="pageSubNavState === '作品' && dataReady">
        <li class="col">
          <div class="newScvCard putPointer h-100" @click="openDocModal('newProduct')">
            <p class="newScvCard__txt"><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增作品</p>
          </div>
        </li>
        <template v-for="(item, index) in user.docData.productList" :key="index">
          <li class="col">
            <div class="scvCard flex-row h-100">
              <img class="scvCard__img m-3 me-0" :src="item.imgUrl" alt="作品封面" />
              <div class="scvCard__body flex-grow-1">
                <p class="scvCard__title mb-2">{{ item.title }}</p>
                <p class="subTxt text-secondary mb-1">更新時間:{{ $filters.date(item.time) }}</p>
                <p class="subTxt text-secondary">檔案格式：jpg</p>
              </div>
              <div class="scvCard__btnBox">
                <button type="button" class="btn">
                  <i class="jobIcon-sm bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <DocModal :userData="user" @returnUserData="getUserDataFromModal" />
</template>

<script>
import emitter from '@/methods/emitter';
import AdminNav from '@/components/admin/AdminNav.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import DocModal from '@/components/admin/DocModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
    AdminNav,
    DocModal,
  },
  data() {
    return {
      dataReady: false,
      nowPage: '其他文件',
      pageSubNavState: '影片',
      user: {},
    };
  },
  methods: {
    changeIntroVideo(number) {
      console.log(this.user.docData.videoList[number].introSelect);
      this.user.docData.videoList.forEach((item, index) => {
        if (index === number) {
          this.user.docData.videoList[index].introSelect = true;
        } else {
          this.user.docData.videoList[index].introSelect = false;
        }
      });
      this.saveAllData();
    },
    getUserDataFromModal(userData) {
      this.user = JSON.parse(JSON.stringify(userData));
      this.saveAllData();
    },
    openDocModal(action, index) {
      const obj = {
        action,
      };
      if (action === 'newVideo') {
        emitter.emit('open-doc-modal', obj);
      } else if (action === 'readVideo') {
        obj.index = index;
        emitter.emit('open-doc-modal', obj);
      } else if (action === 'newProduct') {
        emitter.emit('open-doc-modal', obj);
      }
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
    },
  },
  created() {
    this.getFbData();
    emitter.emit('spinner-open-bg', 1000);
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
