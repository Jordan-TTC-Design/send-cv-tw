<template>
  <header ref="header" class="header header--company container-fluid">
    <h1 class="header__logo d-flex align-items-center">
      <router-link class="h-100" aria-current="page" to="/"
        ><img class="h-100" src="@/assets/images/logo/sendCV-logo-white.svg" alt="SendCVTW logo"
      /></router-link>
      <span class="subTxt text-light text-nowrap">企業專區</span>
    </h1>
    <div class="d-flex align-items-center" v-if="dataReady">
      <div class="hamburgerMenu me-2" @click="openSearchModal" ref="headerSearchIcon">
        <i class="jobIcon text-light bi bi-search"></i>
      </div>
      <div class="hamburgerMenu me-2">
        <i class="jobIcon bi bi-chat-left-dots text-light"></i>
      </div>
      <div class="header__nav" ref="headerNavBox">
        <ul class="header__nav__innerList" ref="headerNav">
          <li class="innerList__item" @click="userMenuOpen = !userMenuOpen" v-if="loginState">
            <div class="userBox">
              <div class="userBox__person me-2">
                <div class="userBox__person__box">
                  <img src="https://i.imgur.com/ZWHoRPi.png" alt="個人相片" />
                </div>
              </div>
            </div>
          </li>
          <li class="innerList__item me-2" v-if="!loginState">
            <button class="btn text-light" type="button" @click="login">企業登入</button>
          </li>
          <li class="innerList__item me-2" v-if="!loginState">
            <router-link class="nav-link text-light" to="/company-admin/company-home"
              >企業註冊</router-link
            >
          </li>
          <li class="innerList__item" v-if="!loginState">
            <router-link class="btn btn-primary nav-link text-dark" to="/">求職者專區</router-link>
          </li>
        </ul>
        <ul
        ref="headerUserMenuModal"
          class="userMenu order-3 userMenu--company"
          :class="{ active: userMenuOpen }"
          @click="userMenuOpen = !userMenuOpen"
          v-if="loginState"
        >
          <li class="userMenu__item">
            <router-link
              class="userMenu__item__link userMenu__item__link--company"
              to="/company-admin/company-over-view"
              >企業中心</router-link
            >
          </li>
          <li class="userMenu__item">
            <router-link
              class="userMenu__item__link userMenu__item__link--company"
              to="/company-admin/talent-recommend"
              >人才資料</router-link
            >
          </li>
          <li class="userMenu__item">
            <router-link
              class="userMenu__item__link userMenu__item__link--company"
              to="/company-admin/chatroom"
              >聊天室</router-link
            >
          </li>
          <li class="userMenu__item">
            <router-link
              class="userMenu__item__link userMenu__item__link--company"
              to="/company-admin/service-ad"
              >加值服務</router-link
            >
          </li>
          <li class="userMenu__item">
            <router-link
              class="userMenu__item__link userMenu__item__link--company"
              to="/company-admin/setting"
              >帳戶設定</router-link
            >
          </li>
          <li class="userMenu__item logoutBtn">
            <button type="button" class="btn btn-gray-light text-dark w-100" @click="logout">
              登出
            </button>
          </li>
        </ul>
      </div>
      <div class="hamburgerMenu d-flex d-lg-none" @click="openRwdMenu">
        <i class="jobIcon bi bi-list"></i>
      </div>
    </div>
    <div class="menuCover" ref="menuCover" @click="closeRwdMenu"></div>
    <div ref="Search" class="header__searchModal">
      <SearchModal />
    </div>
  </header>
  <div class="main main--bg" ref="main">
    <router-view></router-view>
  </div>
  <footer class="bg-gray-mid">
    <div class="footer--front">
      <div class="container">
        <div class="row py-7 justify-content-lg-between justify-content-start">
          <div class="col-lg-5 col-12">
            <div class="d-flex flex-column align-items-start mb-lg-0 mb-md-6 mb-4">
              <img
                class="mb-4"
                src="@/assets/images/logo/sendCV-logo-white.svg"
                alt="SendCVTW logo"
              />
              <ul class="footer__nav flex-wrap mb-6">
                <li class="footer__nav__item nav-item">
                  <router-link class="footer__nav__item__link nav-link" to="/products-list"
                    ><span class="nav__title">求職者</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
                <li class="footer__nav__item nav-item">
                  <router-link
                    class="footer__nav__item__link nav-link"
                    to="/company-admin/company-over-view"
                    ><span class="nav__title">企業專區</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
                <li class="footer__nav__item nav-item">
                  <router-link class="footer__nav__item__link nav-link" to="/add-job"
                    ><span class="nav__title">快速創建職位</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
                <li class="footer__nav__item nav-item">
                  <router-link class="footer__nav__item__link nav-link" to="/products-list"
                    ><span class="nav__title">關於我們</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
                <li class="footer__nav__item nav-item">
                  <router-link
                    class="footer__nav__item__link nav-link"
                    to="/company-admin/company-home"
                    ><span class="nav__title">聯絡我們</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
                <li class="footer__nav__item nav-item">
                  <router-link class="footer__nav__item__link nav-link" to="/add-job"
                    ><span class="nav__title">條款與政策</span>
                    <i class="text-light bi bi-arrow-right-circle"></i
                  ></router-link>
                </li>
              </ul>
              <p class="ps-2 subTxt text-white text-center">
                © 2021 Talent Group Asia all right reserve
              </p>
            </div>
          </div>
          <div class="col-xl-6 col-lg-7 col-12">
            <div class="d-flex flex-column align-items-end justify-content-between h-100">
              <div
                class="btn--language putPointer"
                :class="{ active: language === 'English' }"
                @click="changeLanguage"
              >
                <p class="btn--language__chinese" :class="{ active: language === 'Chinese' }">
                  繁中
                </p>
                <p class="btn--language__english" :class="{ active: language === 'English' }">
                  ENG
                </p>
              </div>
              <ul class="footer__followUsList">
                <li class="text-light">追蹤我們</li>
                <li>
                  <a
                    class="btn btn--circle"
                    href="https://www.facebook.com/tw.sendcv.me?locale=zh_TW"
                    ><i class="jobIcon bi bi-facebook"></i
                  ></a>
                </li>
                <li>
                  <a class="btn btn--circle" href="https://www.instagram.com/sendcvtw/"
                    ><i class="jobIcon bi bi-instagram"></i
                  ></a>
                </li>
              </ul>
              <ul class="footer__appleDownLoadList">
                <li class="text-light">下載 SendCV APP</li>
                <li>
                  <a
                    class="btn btn-outline-light"
                    href="https://www.facebook.com/tw.sendcv.me?locale=zh_TW"
                    ><img src="@/assets/images/download/apple-store-download.svg" alt=""
                  /></a>
                </li>
                <li>
                  <a class="btn btn-outline-light" href="https://www.instagram.com/sendcvtw/"
                    ><img src="@/assets/images/download/google-play-download.svg" alt=""
                  /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <LoginModal @changeCompanyLogin="getCompanyUserData" />
</template>
<script>
import SearchModal from '@/components/front/SearchModal.vue';
import LoginModal from '@/components/helpers/LoginModal.vue';

import database from '@/methods/firebaseinit';
import emitter from '@/methods/emitter';

export default {
  inject: ['reload'],
  components: {
    SearchModal,
    LoginModal,
  },
  data() {
    return {
      dataReady: false,
      userMenuOpen: false,
      loginState: false,
      navState: '',
      language: 'Chinese',
      companyUser: {},
    };
  },
  methods: {
    login() {
      emitter.emit('open-login-modal', '企業登入');
    },
    logout() {
      console.log('成功登出');
      this.companyUser.login = false;
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.set(this.companyUser);
      this.reload();
    },
    getCompanyUserData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.companyUser = data;
          console.log(this.companyUser);
          this.checkLogin();
        }
      });
    },
    checkLogin() {
      this.loginState = this.companyUser.login;
      if (this.loginState === false) {
        const router = this.$router.currentRoute.value.path;
        if (!router.includes('/company-admin/add-company')) {
          this.$router.push('/company-admin/company-home');
        }
      }
      this.dataReady = true;
    },
    changeLanguage() {
      if (this.language === 'Chinese') {
        this.language = 'English';
      } else if (this.language === 'English') {
        this.language = 'Chinese';
      }
    },
    openRwdMenu() {
      this.$refs.headerNavBox.classList.toggle('active');
      this.$refs.menuCover.classList.toggle('active');
      this.$refs.main.classList.toggle('openRwdMenu');
      this.$refs.headerSearchIcon.classList.toggle('d-none');
      this.$refs.Search.classList.remove('active');
    },
    closeRwdMenu() {
      this.$refs.headerNavBox.classList.remove('active');
      this.$refs.menuCover.classList.remove('active');
      this.$refs.main.classList.remove('openRwdMenu');
      this.$refs.headerSearchIcon.classList.remove('d-none');
    },
    openSearchModal() {
      this.$refs.Search.classList.toggle('active');
    },
    closeSearchModal() {
      this.$refs.Search.classList.remove('active');
    },
  },
  created() {
    this.getCompanyUserData();
  },
};
</script>
