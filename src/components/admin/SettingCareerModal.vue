<template>
  <div class="container">
    <div
      ref="settingCareerModal"
      class="settingCareerModal popModal modal fade"
      tabindex="-1"
      id="settingCareerModal"
      aria-hidden="true"
      aria-labelledby="settingCareerModalLabel"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        :class="{
          'modal-sm':
            modalAction === '變更工作性質' ||
            modalAction === '變更上班時段' ||
            modalAction === '變更薪資範圍',
          'modal-lg':
            modalAction === '變更目標職務' ||
            modalAction === '變更目標行業' ||
            modalAction === '變更求職地區',
        }"
      >
        <div class="modal-content">
          <div v-if="modalAction === '變更工作性質'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">工作性質</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body">
              <template v-for="(item, index) in user.career.workType" :key="item.title">
                <div class="form-check border-bottom border-gray-line">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="item"
                    :selected="item.select"
                    :id="`workType--${index}`"
                    v-model="item.select"
                  />
                  <label class="form-check-label" :for="`workType--${index}`">
                    {{ item.title }}
                  </label>
                </div>
              </template>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更上班時段'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">上班時段</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body">
              <template v-for="(item, index) in user.career.workTime" :key="item.title">
                <div class="form-check border-bottom border-gray-line">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="item.title"
                    :selected="item.select"
                    :id="`workTime--${index}`"
                    v-model="item.select"
                  />
                  <label class="form-check-label" :for="`workTime--${index}`">
                    {{ item.title }}
                  </label>
                </div>
              </template>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更目標職務'">
            <div class="popModal__header popModal__header--left">
              <h5 class="popModal__title">目標職務</h5>
              <p class="subTxt--foil">最多選擇10項</p>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body px-0">
              <div class="dataForm border-top border-gray-line">
                <div class="dataForm__leftList">
                  <ul>
                    <li class="list__item list__title">職務類別</li>
                    <template
                      v-for="(item, index) in user.career.jobCategories"
                      :key="item.groupName"
                    >
                      <li class="list__item putPointer" @click="this.tempWorkPlace.city = index">
                        <p>{{ item.groupName }}</p>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="dataForm__contentBox">
                  <ul ref="collapse" class="dataForm__contentBox__list accordion accordion-flush">
                    <li class="list__item list__title">
                      <p>小類</p>
                    </li>
                    <template
                      v-for="(item, index) in user.career.jobCategories[tempWorkPlace.city]
                        .categories"
                      :key="item.categoryName"
                    >
                      <li class="foldList__item accordion-item">
                        <div class="foldList__item__title accordion-header">
                          <div>
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              :id="item.categoryName"
                              v-model="item.selectAll"
                            />
                            <label class="form-check-label" :for="item.categoryName">
                              {{ item.categoryName }}
                            </label>
                          </div>
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="`#jobCategory__categoryName--${index}`"
                          ></button>
                        </div>
                        <div
                          :id="`jobCategory__categoryName--${index}`"
                          class="accordion-collapse collapse"
                        >
                          <div class="accordion-body p-0">
                            <template v-for="job in item.categories" :key="job.name">
                              <li class="list__item list__item--check putPointer">
                                <input
                                  class="form-check-input me-2"
                                  type="checkbox"
                                  :id="job.name"
                                  v-model="job.select"
                                />
                                <label class="form-check-label" :for="job.name">
                                  {{ job.name }}
                                </label>
                              </li>
                            </template>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <div class="popModal__footer--border">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更目標行業'">
            <div class="popModal__header popModal__header--left">
              <h5 class="popModal__title">目標行業</h5>
              <p class="subTxt--foil">最多選擇10項</p>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body px-0">
              <div class="dataForm border-top border-gray-line">
                <div class="dataForm__contentBox w-100">
                  <ul class="dataForm__contentBox__list">
                    <template
                      v-for="item in user.career.industryCategories"
                      :key="item.industryName"
                    >
                      <li class="list__item list__item--check form-check mb-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="item.industryName"
                          v-model="item.select"
                        />
                        <label class="form-check-label" :for="item.industryName">
                          {{ item.industryName }}
                        </label>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <div class="popModal__footer--border">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更求職地區'">
            <div class="popModal__header popModal__header--left">
              <h5 class="popModal__title">求職地區</h5>
              <p class="subTxt--foil">最多選擇10項</p>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body px-0">
              <div class="dataForm border-top border-gray-line">
                <div class="dataForm__leftList">
                  <ul>
                    <li class="list__item list__title">城市</li>
                    <template
                      v-for="(city, index) in user.career.workPlace"
                      :key="`第${index}縣市${city.cityName}`"
                    >
                      <li class="list__item putPointer" @click="this.tempWorkPlace.city = index">
                        <p>{{ city.cityName }}</p>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="dataForm__contentBox">
                  <ul class="dataForm__contentBox__list">
                    <li class="list__item list__title">區域</li>
                    <li
                      v-if="tempWorkPlace.city >= 0"
                      class="list__item list__item--check form-check mb-0"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="cityAll"
                        v-model="user.career.workPlace[tempWorkPlace.city].selectAll"
                      />
                      <label class="form-check-label" for="cityAll">
                        {{ user.career.workPlace[tempWorkPlace.city].cityName }}全區
                      </label>
                    </li>
                    <template
                      v-for="dist in user.career.workPlace[tempWorkPlace.city].district"
                      :key="dist.code"
                    >
                      <li class="list__item list__item--check form-check mb-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="`district--${dist.code}`"
                          v-model="dist.select"
                        />
                        <label class="form-check-label" :for="`district--${dist.code}`">
                          {{ dist.distName }}
                        </label>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
            <div class="popModal__footer--border">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更外派意願'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">外派意願</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="expat"
                  v-model="user.career.expat"
                />
                <label class="form-check-label" for="expat"> 是否接受企業外派 </label>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更薪資範圍'">
            <div class="popModal__header popModal__header--left">
              <h5 class="popModal__title">薪資接受範圍</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body">
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="salaryRangeLow" class="labelBox__label form-label"
                    >薪資待遇範圍起始</label
                  >
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="salaryRangeLow"
                  placeholder="最低"
                  aria-describedby="薪資待遇範圍起始"
                  v-model="user.career.salaryRange.salaryLow"
                />
              </div>
              <div class="form__input mb-2">
                <div class="form__labelBox">
                  <label for="salaryRangeHeight" class="labelBox__label form-label"
                    >薪資待遇範圍結束</label
                  >
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="salaryRangeHeight"
                  placeholder="最高"
                  aria-describedby="薪資待遇範圍結束"
                  v-model="user.career.salaryRange.salaryHeight"
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="salaryRangeInterview"
                  v-model="user.career.salaryRange.salaryInterView"
                />
                <label class="form-check-label" for="salaryRangeInterview"> 接受面議 </label>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';
import emitter from '@/methods/emitter';

export default {
  emits: ['reload'],
  data() {
    return {
      modalAction: '',
      modal: {},
      formData: {},
      user: {},
      tempCareer: {
        salaryRange: {
          salaryLow: null,
          salaryHeight: null,
          salaryInterView: false,
        },
      },
      tempWorkPlace: { city: 0 },
    };
  },
  methods: {
    updateData() {
      this.$emit('update-setting-account-Data', this.accountData);
    },
    openModal(obj) {
      this.modalAction = obj.action;
      console.log(this.modalAction);
      this.user = JSON.parse(JSON.stringify(obj.user));
      setTimeout(() => {
        this.modal.show();
      }, 100);
    },
    closeModal() {
      this.modal.hide();
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.closeModal();
      this.$emit('reload');
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.modal = new Modal(this.$refs.settingCareerModal);
    emitter.on('open-setting-career-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-setting-career-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
