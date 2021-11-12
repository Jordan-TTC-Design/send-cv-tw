<template>
  <header class="header header--front">
    <div ref="Search" class="header__searchModal">
      <SearchModal />
    </div>
    <div ref="headerUserMenuModal" class="header__userMenuModal" @click="closeHeaderMenuModal">
      <UserMenu />
    </div>
    <div class="container d-flex justify-content-between align-items-center">
      <h1>
        <router-link ia-current="page" to="/"
          ><img
            class="header__logo"
            src="@/assets/images/logo/sendCV-logo-black.svg"
            alt="SendCVTW logo"
        /></router-link>
      </h1>
      <div class="header__navBox" ref="headerNavBox">
        <ul class="header__nav" ref="headerNav">
          <li class="nav__item nav-item" :class="{ active: this.navState === '首頁' }">
            <router-link class="nav__item__link nav-link" aria-current="page" to="/"
              >優質職位</router-link
            >
          </li>
          <li class="nav__item nav-item" :class="{ active: this.navState === '優質企業' }">
            <router-link
              class="nav__item__link nav-link"
              aria-current="page"
              to="/company-recommend"
              >優質企業</router-link
            >
          </li>
          <li class="nav__item nav-item" :class="{ active: this.navState === '優質工作' }">
            <router-link class="nav__item__link nav-link" to="/products-list">全部職位</router-link>
          </li>
          <li class="nav__item nav-item d-lg-block d-none">
            <button class="nav__item__link nav-link btn" type="button" @click="openSearchModal">
              搜尋
            </button>
          </li>
          <li class="nav__item nav-item">
            <div class="userBox">
              <div class="userBox__person me-2">
                <div class="userBox__person__box">
                  <img src="https://i.imgur.com/ZWHoRPi.png" alt="個人相片" />
                </div>
              </div>
              <div
                ref="userBoxPersonMenuBtn"
                class="userBox__person__menu btn--circle"
                @click="openHeaderMenuModal"
              >
                <i class="text-dark jobIcon bi bi-chevron-up"></i>
                <i class="text-dark jobIcon bi bi-chevron-down"></i>
              </div>
            </div>
          </li>
          <li class="nav__item nav-item d-lg-none d-block">
            <router-link
              class="nav__item__link nav-link text-white"
              to="/company-admin/company-home"
              >企業會員加入</router-link
            >
          </li>
          <li class="nav__item nav-item d-lg-none d-block">
            <router-link class="nav__item__link nav-link text-white" to="/add-job"
              >新建職位</router-link
            >
          </li>
        </ul>
      </div>
      <div class="bgCover menuCover" ref="menuCover" @click="openRwdMenu"></div>
      <div class="d-flex d-lg-none">
        <div class="hamburgerMenu d-flex me-2" @click="openSearchModal" ref="headerSearchIcon">
          <i class="jobIcon bi bi-search"></i>
        </div>
        <div class="hamburgerMenu d-flex" @click="openRwdMenu">
          <i class="jobIcon bi bi-list"></i>
        </div>
      </div>
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
import UserMenu from '@/components/helpers/UserMenu.vue';

export default {
  components: {
    SearchModal,
    UserMenu,
  },
  data() {
    return {
      navState: '',
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
    openHeaderMenuModal() {
      this.$refs.headerUserMenuModal.classList.toggle('active');
      this.$refs.userBoxPersonMenuBtn.classList.toggle('active');
    },
    closeHeaderMenuModal() {
      this.$refs.headerUserMenuModal.classList.remove('active');
      this.$refs.userBoxPersonMenuBtn.classList.remove('active');
    },
  },
  mounted() {
    this.checkNavState();
    this.closeSearchModal();
    this.closeRwdMenu();
    this.closeHeaderMenuModal();
  },
  updated() {
    this.checkNavState();
    this.closeSearchModal();
    this.closeHeaderMenuModal();
    this.closeRwdMenu();
  },
};
</script>
