<template>
  <header ref="header" class="header header--jobSeeker container-fluid">
    <h1 class="header__logo">
      <router-link class="h-100" aria-current="page" to="/"
        ><img class="h-100" src="@/assets/images/logo/sendCV-logo-black.svg" alt="SendCVTW logo"
      /></router-link>
    </h1>
    <div class="d-flex align-items-center">
      <div class="hamburgerMenu me-2" @click="openSearchModal" ref="headerSearchIcon">
        <i class="jobIcon text-dark bi bi-search"></i>
      </div>
      <div class="hamburgerMenu me-2">
        <i class="jobIcon text-dark bi bi-chat-left-dots"></i>
      </div>
      <div class="header__nav" ref="headerNavBox">
        <ul class="header__nav__innerList order-lg-1 order-2" ref="headerNav">
          <li
            class="innerList__item me-2 order-lg-1 order-2"
            :class="{ active: this.navState === '首頁' }"
          >
            <router-link class="innerList__item__link" aria-current="page" to="/"
              >優質工作</router-link
            >
          </li>
          <li
            class="innerList__item me-2 order-lg-2 order-3"
            :class="{ active: this.navState === '優質企業' }"
          >
            <router-link class="innerList__item__link" aria-current="page" to="/company-recommend"
              >優質企業</router-link
            >
          </li>
          <li
            class="innerList__item rwdUserContainer order-lg-3 order-1"
            v-if="loginState"
            @click="userMenuOpen = !userMenuOpen"
          >
            <div class="userBox mb-lg-0 mb-4">
              <div class="userBox__person">
                <img src="https://i.imgur.com/ZWHoRPi.png" alt="個人相片" />
              </div>
            </div>
            <p class="d-lg-none">用戶名稱</p>
          </li>
        </ul>
        <ul
          class="header__nav__innerList header__nav__loginBtnList order-lg-2 order-1"
          v-if="!loginState"
        >
          <li class="innerList__item">
            <button
              class="innerList__item__link btn btn--login--jobSeeker"
              type="button"
              @click="login"
            >
              登入 / 註冊
            </button>
          </li>
          <li class="innerList__item">
            <router-link
              class="innerList__item__link btn btn--login--company"
              to="/company-admin/company-home"
              >企業專區</router-link
            >
          </li>
        </ul>
        <ul
          class="userMenu userMenu--jobSeeker order-3"
          :class="{ active: userMenuOpen }"
          @click="userMenuOpen = !userMenuOpen"
          v-if="loginState"
        >
          <li class="userMenu__item">
            <router-link class="userMenu__item__link" to="/admin/work-application"
              >工作</router-link
            >
          </li>
          <li class="userMenu__item">
            <router-link class="userMenu__item__link" to="/admin/document-cv">文件</router-link>
          </li>
          <li class="userMenu__item">
            <router-link class="userMenu__item__link" to="/admin/chatroom">聊天室</router-link>
          </li>
          <li class="userMenu__item">
            <router-link class="userMenu__item__link" to="/admin/setting">帳戶設定</router-link>
          </li>
          <li class="userMenu__item logoutBtn">
            <button type="button" class="btn btn-gray-light text-dark w-100" @click="logout">
              登出
            </button>
          </li>
        </ul>
      </div>
      <div class="hamburgerMenu d-lg-none" @click="openRwdMenu">
        <i class="jobIcon text-dark bi bi-list"></i>
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
</template>
<script>
import SearchModal from '@/components/front/SearchModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    SearchModal,
  },
  data() {
    return {
      userMenuOpen: false,
      dataReady: false,
      loginState: true,
      navState: '',
      userAccountData: {},
      language: 'Chinese',
    };
  },
  methods: {
    changeLanguage() {
      if (this.language === 'Chinese') {
        this.language = 'English';
      } else if (this.language === 'English') {
        this.language = 'Chinese';
      }
    },
    checkNavState() {
      if (this.$route.path === '/') {
        this.navState = '首頁';
      } else if (this.$route.path === '/company-recommend') {
        this.navState = '優質企業';
      } else if (this.$route.path === '/products-list') {
        this.navState = '優質工作';
      } else if (this.$route.path === '/collection') {
        this.navState = '收藏';
      } else {
        this.navState = '';
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
    checkLogin() {
      this.loginState = this.userAccountData.login;
      if (this.loginState === false) {
        this.$router.push('/');
      }
    },
    logout() {
      console.log('成功登出');
      this.userAccountData.login = false;
      const userAccountDataRef = database.ref('user/account');
      userAccountDataRef.set(this.userAccountData);
      this.reload();
    },
    getJobSeekerUserData() {
      const userAccountDataRef = database.ref('user/account');
      userAccountDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.userAccountData = data;
          console.log(this.userAccountData);
          this.checkLogin();
        }
      });
    },
  },
  mounted() {
    this.getJobSeekerUserData();
    this.checkNavState();
    this.closeSearchModal();
    this.closeRwdMenu();
  },
  updated() {
    this.checkNavState();
    this.closeSearchModal();
    this.closeRwdMenu();
  },
};
</script>
