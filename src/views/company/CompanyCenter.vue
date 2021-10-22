<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container" v-if="dataReady">
      <div class="row mb-5">
        <div class="col-6">
          <div class="rounded bg-white box--shadow p-5 h-100 d-flex">
            <div class="setting__personImgBox me-5">
              <img class="personImgBox__img" src="https://i.imgur.com/ZWHoRPi.png" alt="" />
            </div>
            <div class="flex-grow-1 d-flex justify-content-between flex-column">
              <div>
                <p class="mb-3">曾鼎鈞</p>
                <p class="subTxt mb-2">{{ user.account.phone }}</p>
                <p class="subTxt mb-2">{{ user.account.email }}</p>
                <p class="mb-5">求職狀態：<span class="text-primary-dark">開啟求職中</span></p>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-gray-line text-dark">
                  編輯個人資料
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row notificationList">
            <div class="col-6 mb-4">
              <div class="notificationList__item p-3">
                <div>
                  <p class="text-dark mb-2">面試邀請</p>
                  <p class="subTxt">尚未邀請</p>
                </div>
                <img
                  class="notificationList__item__img"
                  src="https://i.imgur.com/cvRC6Ln.png"
                  alt="面試邀請"
                />
              </div>
            </div>
            <div class="col-6 mb-4">
              <div class="notificationList__item p-3">
                <div>
                  <p class="text-dark mb-2">企業來訪</p>
                  <p class="subTxt">24 間企業</p>
                </div>
                <img
                  class="notificationList__item__img"
                  src="https://i.imgur.com/sjManxc.png"
                  alt="面試邀請"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="notificationList__item p-3">
                <div>
                  <p class="text-dark mb-2">企業新職位</p>
                  <p class="subTxt">10個新職位</p>
                </div>
                <img
                  class="notificationList__item__img"
                  src="https://i.imgur.com/Jt0TIXd.png"
                  alt="面試邀請"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="notificationList__item p-3">
                <div>
                  <p class="text-dark mb-2">錄取通知</p>
                  <p class="subTxt">尚未邀請</p>
                </div>
                <img
                  class="notificationList__item__img"
                  src="https://i.imgur.com/jVaHla4.png"
                  alt="面試邀請"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar box--shadow pb-1">
        <div class="calendar__header">
          <button type="button" class="btn"><i class="jobIcon bi bi-arrow-left"></i></button>
          <div class="d-flex">
            <button type="button" class="btn btn-outline-gray-line text-dark me-2">
              2020/07<i class="jobIcon-sm ms-1 bi bi-calendar"></i>
            </button>
            <button type="button" class="btn btn-outline-primary text-primary-dark me-2">
              今日
            </button>
          </div>

          <button type="button" class="btn"><i class="jobIcon bi bi-arrow-right"></i></button>
        </div>
        <table class="table calendar__table">
          <thead>
            <tr class="calendar__weekBox">
              <th class="calendar__weekBox__day">週日</th>
              <th class="calendar__weekBox__day">週一</th>
              <th class="calendar__weekBox__day">週二</th>
              <th class="calendar__weekBox__day">週三</th>
              <th class="calendar__weekBox__day">週四</th>
              <th class="calendar__weekBox__day">週五</th>
              <th class="calendar__weekBox__day">週六</th>
            </tr>
          </thead>
          <tbody>
            <tr class="calendar__dayBox">
              <td class="calendar__dayBox__date"><p>1/1</p></td>
              <td class="calendar__dayBox__date"><p>1/2</p></td>
              <td class="calendar__dayBox__date"><p>1/3</p></td>
              <td class="calendar__dayBox__date"><p>1/4</p></td>
              <td class="calendar__dayBox__date"><p>1/5</p></td>
              <td class="calendar__dayBox__date">
                <p>1/6</p>
                <ul class="mt-1">
                  <li class="jobTag putPointer mb-1">15:30 - 聚賢亞洲</li>
                  <li class="jobTag putPointer">17:30 - 台灣電通</li>
                </ul>
              </td>
              <td class="calendar__dayBox__date"><p>1/7</p></td>
            </tr>
            <tr class="calendar__dayBox">
              <td class="calendar__dayBox__date"><p class="">1/8</p></td>
              <td class="calendar__dayBox__date"><p class="">1/9</p></td>
              <td class="calendar__dayBox__date"><p class="">1/10</p></td>
              <td class="calendar__dayBox__date"><p class="">1/11</p></td>
              <td class="calendar__dayBox__date"><p class="">1/12</p></td>
              <td class="calendar__dayBox__date"><p class="">1/13</p></td>
              <td class="calendar__dayBox__date"><p class="">1/14</p></td>
            </tr>
            <tr class="calendar__dayBox">
              <td class="calendar__dayBox__date"><p class="">1/15</p></td>
              <td class="calendar__dayBox__date"><p class="">1/16</p></td>
              <td class="calendar__dayBox__date"><p class="">1/17</p></td>
              <td class="calendar__dayBox__date"><p class="">1/18</p></td>
              <td class="calendar__dayBox__date"><p class="">1/19</p></td>
              <td class="calendar__dayBox__date"><p class="">1/20</p></td>
              <td class="calendar__dayBox__date"><p class="">1/21</p></td>
            </tr>
            <tr class="calendar__dayBox">
              <td class="calendar__dayBox__date"><p class="">1/22</p></td>
              <td class="calendar__dayBox__date"><p class="">1/23</p></td>
              <td class="calendar__dayBox__date"><p class="">1/24</p></td>
              <td class="calendar__dayBox__date"><p class="">1/25</p></td>
              <td class="calendar__dayBox__date"><p class="">1/26</p></td>
              <td class="calendar__dayBox__date"><p class="">1/27</p></td>
              <td class="calendar__dayBox__date"><p class="">1/28</p></td>
            </tr>
            <tr class="calendar__dayBox">
              <td class="calendar__dayBox__date"><p class="">1/29</p></td>
              <td class="calendar__dayBox__date"><p class="">1/30</p></td>
              <td class="calendar__dayBox__date"><p class="">1/31</p></td>
              <td class="calendar__dayBox__date nextMonth"><p class="">2/1</p></td>
              <td class="calendar__dayBox__date nextMonth"><p class="">2/2</p></td>
              <td class="calendar__dayBox__date nextMonth"><p class="">2/3</p></td>
              <td class="calendar__dayBox__date nextMonth"><p class="">2/4</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import CompanyAdminNav from '@/components/company/CompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: { CompanyAdminNav },
  data() {
    return {
      nowPage: '總覽',
      user: {},
      dataReady: false,
    };
  },
  methods: {
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
        this.dataReady = true;
      });
    },
  },
  created() {
    this.getFbData();
    emitter.emit('spinner-open-bg', 800);
  },
};
</script>

<style lang="scss"></style>
