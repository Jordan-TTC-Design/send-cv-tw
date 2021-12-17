<template>
  <div class="adminPage--py">
    <CompanyAdminNav :nowPage="nowPage" />
    <div class="container-xl" v-if="dataReady">
      <div class="row gy-5">
        <div class="col-lg-6 col-12">
          <div class="sideContentBox pb-3">
            <ul class="innerNav innerNav--company">
              <li class="innerNav__item">
                <p>職位</p>
              </li>
              <li class="innerNav__item">
                <p>邀請面試</p>
              </li>
            </ul>
            <ul class="innerList innerList--company">
              <li class="innerList__item putPointer">
                <p class="text-dark mb-2">產品設計師</p>
                <div
                  class="
                    d-flex
                    flex-wrap
                    align-items-lg-end
                    justify-content-between
                    flex-lg-row flex-column
                  "
                >
                  <div class="d-flex mb-lg-0 mb-2">
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">新申請 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">正在聯絡 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      <p class="subTxt text-dark">邀請面試 1 人</p>
                    </button>
                  </div>
                  <p class="subTxt">更新時間：2021/12/12</p>
                </div>
              </li>
              <li class="innerList__item putPointer">
                <p class="text-dark mb-2">產品設計師</p>
                <div
                  class="
                    d-flex
                    flex-wrap
                    align-items-lg-end
                    justify-content-between
                    flex-lg-row flex-column
                  "
                >
                  <div class="d-flex mb-lg-0 mb-2">
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">新申請 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">正在聯絡 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      <p class="subTxt text-dark">邀請面試 1 人</p>
                    </button>
                  </div>
                  <p class="subTxt">更新時間：2021/12/12</p>
                </div>
              </li>
              <li class="innerList__item putPointer">
                <p class="text-dark mb-2">產品設計師</p>
                <div
                  class="
                    d-flex
                    flex-wrap
                    align-items-lg-end
                    justify-content-between
                    flex-lg-row flex-column
                  "
                >
                  <div class="d-flex mb-lg-0 mb-2">
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">新申請 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark me-2">
                      <p class="subTxt text-dark">正在聯絡 1 人</p>
                    </button>
                    <button type="button" class="btn btn-outline-gray-line text-dark">
                      <p class="subTxt text-dark">邀請面試 1 人</p>
                    </button>
                  </div>
                  <p class="subTxt">更新時間：2021/12/12</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="sideContentBox pb-3">
            <div class="sideContentBox__header">
              <p class="subTxt">目前共 50 則訊息</p>
              <div class="sideContentBox__header__btnBox">
                <button type="button" class="btn">查看更多</button>
              </div>
            </div>
            <ul class="chatRoom__chatList border-bottom border-gray-line">
                <li
                  class="list__item chatCard"
                >
                  <div class="chatCard__top d-flex mb-2">
                    <img class="chatCard__img me-2"  />
                    <div class="flex-grow-1">
                      <p class="chatCard__title mb-1">123</p>
                      <p class="subTxt mb-1">招募職位：444</p>
                      <p class="subTxt">您好，我們最近看到你在找工作...</p>
                    </div>
                  </div>
                  <div class="chatCard__footer">
                    <div class="chatCard__tagList">
                      <p class="jobTag me-2">100%</p>
                      <p class="jobTag">已申請</p>
                    </div>
                    <p class="subTxt text-secondary">2021/10/12</p>
                  </div>
                </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
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
