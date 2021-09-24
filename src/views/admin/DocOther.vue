<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
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
      <ul class="row" v-if="subMainNav === '影片' && dataReady">
        <li class="col-4">
          <div class="docCard--new putPointer" @click="openDocModal('newVideo')">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增影片</p>
          </div>
        </li>
        <template v-for="(item, index) in user.docData.videoList" :key="index">
          <li class="col-4">
            <div class="docCard docCard--video card">
              <img class="card-img-top" :src="item.imgUrl" alt="影片封面" />
              <div class="card-body d-flex flex-column justify-content-between flex-grow-1">
                <p class="docCard__title mb-2">{{ item.title }}</p>
                <p class="subTxt text-secondary mb-3">更新時間:{{ $filters.date(item.time) }}</p>
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
                  <button type="button" class="btn">
                    <i class="jobIcon-sm bi bi-three-dots"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <ul class="row" v-if="subMainNav === '作品' && dataReady">
        <li class="col-4">
          <div class="docCard--new putPointer" @click="openDocModal('newProduct')">
            <p><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增作品</p>
          </div>
        </li>
        <template v-for="(item, index) in user.docData.productList" :key="index">
          <li class="col-4">
            <div class="docCard">
              <img class="docCard__cover me-3" :src="item.imgUrl" alt="CV封面" />
              <div class="d-flex flex-column flex-grow-1">
                <p class="docCard__title mb-2">{{ item.title }}</p>
                <p class="subTxt text-secondary mb-1">更新時間:{{ $filters.date(item.time) }}</p>
                <p class="subTxt text-secondary">檔案格式：jpg</p>
                <div class="docCard__btnBox">
                  <button type="button" class="btn">
                    <i class="jobIcon-sm bi bi-three-dots"></i>
                  </button>
                </div>
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
      subMainNav: '影片',
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
