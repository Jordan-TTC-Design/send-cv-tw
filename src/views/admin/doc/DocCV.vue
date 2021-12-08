<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container-lg">
      <ul class="row row-cols-xl-3 row-cols-lg-2 row-cols-1 gy-5">
        <li class="col">
          <router-link class="newScvCard putPointer h-100" to="document-cv/cv/new">
            <p class="newScvCard__txt"><i class="jobIcon-sm bi bi-plus-lg me-1"></i>新增履歷</p>
          </router-link>
        </li>
        <template v-for="(item, index) in cvList" :key="index">
          <li class="col">
            <router-link class="scvCard flex-row h-100" :to="`document-cv/cv/${item.cvKey}`">
              <div class="scvCard__body flex-grow-1 justify-content-between">
                <p class="scvCard__title">{{ item.cvName }}</p>
                <p class="subTxt mb-3">更新時間：{{ $filters.date(item.cvKey) }}</p>
                <div class="d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-outline-gray-line text-dark"
                    @click="toggleCvState(index)"
                  >
                    <i class="jobIcon-sm bi bi-eye me-1"></i>隱藏履歷
                  </button>
                  <div class="dropdown">
                    <button
                      class="btn position-relative"
                      type="button"
                      :id="`dropdownMenuButton--cvExpData--${index}`"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="jobIcon-sm bi bi-three-dots text-dark"></i>
                    </button>
                    <ul
                      :ref="`dropDownMenu--${index}`"
                      class="dropDownMenu dropdown-menu"
                      :aria-labelledby="`dropdownMenuButton--cvExpData--${index}`"
                    >
                      <li class="dropDownMenu__item dropdown-item" @click="deleteData(index)">
                        刪除
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <img class="scvCard__img m-3 ms-0" :src="item.cvImgUrl" alt="CV封面" />
            </router-link>
          </li>
        </template>
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
import database from '@/methods/firebaseinit';

export default {
  components: {
    UpTopBtn,
    AdminNav,
  },
  data() {
    return {
      nowPage: '履歷',
      cvList: [],
      dataReady: false,
    };
  },
  methods: {
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    getCvData() {
      const cvRef = database.ref('cvList');
      cvRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const cv = data;
        this.cvList = cv;
        this.dataReady = true;
      });
    },
    // 保存Cv資料
    saveCvData() {
      const cvRef = database.ref('cvList');
      cvRef.set(this.cvList);
    },
    // 刪除履歷列表項目
    deleteData(index) {
      this.cvList.splice(index, 1);
      this.saveCvData();
    },
  },
  created() {
    this.getCvData();
    emitter.emit('spinner-open-bg', 1000);
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
