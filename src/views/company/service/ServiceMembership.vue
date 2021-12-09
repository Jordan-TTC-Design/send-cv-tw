<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl">
      <div class="rounded bg-light box--shadow p-5">
        <div class="row">
          <div class="col-6">
            <h2 class="pageTitle mb-5">成為SendCV的付費用戶，取得完整的服務及支援!</h2>
            <p>依據企業的預算及狀況，選擇最合適的價格方案，解決你的招聘需求。</p>
          </div>
          <div class="col-6">
            <img class="w-100" src="https://i.imgur.com/sVTCMNu.jpg" alt="會員方案圖片" />
          </div>
          <div class="col-12">
            <ul class="memberShipList">
              <li class="memberShipList__titleItem">
              </li>
              <li class="memberShipList__item"></li>
              <li class="memberShipList__item"></li>
              <li class="memberShipList__item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
// import database from '@/methods/firebaseinit';

export default {
  components: {
    CompanyAdminNav,
  },
  data() {
    return {
      scrollTop: 0,
      elementTop: 0,
      nowPage: '會員方案',
      dataReady: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss"></style>
