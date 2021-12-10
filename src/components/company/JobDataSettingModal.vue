<template>
  <div
    ref="recommedModal"
    id="recommedModal"
    class="popModal modal fade"
    aria-hidden="true"
    aria-labelledby="recommedModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" ref="collapse">
      <div class="modal-content">
        <div class="popModal__header popModal__header--center">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div v-if="modalAction === '職務類別'">
          <div class="popModal__body">
            <div class="popModal__body__subNav justify-content-end">
              <p class="subTxt text-secondary">最多選擇3項</p>
            </div>
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__leftList">
                <ul>
                  <li class="list__item list__title">職務類別</li>
                  <template v-for="(item, index) in formData.jobCategories" :key="item.groupName">
                    <li class="list__item putPointer" @click="tempItem.index = index">
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
                    v-for="(item, index) in formData.jobCategories[tempItem.index].categories"
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
            <button type="button" class="btn btn-primary" @click="saveThisData('職務類別')">
              確定
            </button>
          </div>
        </div>
        <div v-if="modalAction === '駕照需求'">
          <div class="popModal__body">
            <div class="popModal__body__subNav justify-content-end">
              <p class="subTxt text-secondary">最多選擇3項</p>
            </div>
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__contentBox w-100">
                <ul class="dataForm__contentBox__list">
                  <template v-for="item in formData.driverLicenses" :key="item">
                    <li class="list__item list__item--check form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="item"
                        :id="item"
                        v-model="driverLicenses"
                      />
                      <label class="form-check-label" :for="item">
                        {{ item }}
                      </label>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="popModal__footer--border">
            <button type="button" class="btn btn-primary" @click="saveThisData('駕照需求')">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';

export default {
  emits: ['return-job-data-setting'],
  data() {
    return {
      collapse: {},
      modal: {},
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      jobCategories: [],
      driverLicenses: [],
      tempItem: { index: 0 },
    };
  },
  methods: {
    openModal(obj) {
      console.log(obj);
      this.mainAction = obj;
      this.modalAction = this.mainAction;
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    saveThisData(action) {
      if (action === '職務類別') {
        this.jobCategories = [];
        this.formData.jobCategories.forEach((item) => {
          if (item.selectAll) {
            console.log(item);
            this.jobCategories.push(item.groupName);
          } else {
            item.categories.forEach((job) => {
              console.log(job);
              if (job.selectAll) {
                this.jobCategories.push(job.categoryName);
              } else {
                job.categories.forEach((obj) => {
                  if (obj.select) {
                    this.jobCategories.push(obj.name);
                  }
                });
              }
            });
          }
        });
        console.log(this.jobCategories);
        const obj = {
          action,
          data: this.jobCategories,
        };
        this.$emit('return-job-data-setting', obj);
        this.closeModal();
      } else if (action === '駕照需求') {
        const obj = {
          action,
          data: this.driverLicenses,
        };
        this.$emit('return-job-data-setting', obj);
        this.closeModal();
      }
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse);
    this.modal = new Modal(this.$refs.recommedModal);
    emitter.on('open-job-data-setting-modal', this.openModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-job-data-setting-modal', this.openModal);
  },
};
</script>

<style lang="scss"></style>
