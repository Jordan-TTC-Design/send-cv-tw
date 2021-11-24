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
          'modal-sm': modalAction === '變更身份' || modalAction === '變更兵役',
        }"
      >
        <div class="modal-content">
          <div v-if="modalAction === '變更駕照'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">駕照</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body--p">
              <div class="row">
                <template v-for="(item, index) in user.others.driverLicenses" :key="item.name">
                  <div class="col-6">
                    <div class="form-check border-bottom border-gray-line">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="item.name"
                        :selected="item.select"
                        :id="`workType--${index}`"
                        v-model="item.select"
                      />
                      <label class="form-check-label" :for="`workType--${index}`">
                        {{ item.name }}
                      </label>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="popModal__footer">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveAllData">保存</button>
            </div>
          </div>
          <div v-if="modalAction === '變更身份'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">特殊身份</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body--p">
              <template v-for="(item, index) in user.others.identities" :key="item.name">
                <div class="form-check border-bottom border-gray-line">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="item.name"
                    :selected="item.select"
                    :id="`workTime--${index}`"
                    v-model="item.select"
                  />
                  <label class="form-check-label" :for="`workTime--${index}`">
                    {{ item.name }}
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
          <div v-if="modalAction === '變更兵役'">
            <div class="popModal__header popModal__header--center">
              <h5 class="popModal__title">兵役</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="popModal__body--p">
              <template v-for="(item, index) in user.others.militaryServices" :key="item.name">
                <div class="form-check border-bottom border-gray-line">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="item.name"
                    :selected="item.select"
                    :id="`workTime--${index}`"
                    v-model="item.select"
                  />
                  <label class="form-check-label" :for="`workTime--${index}`">
                    {{ item.name }}
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
    emitter.on('close-setting-career-modal', this.closeModal);
    emitter.on('return-setting-career-modal', this.returnUserData);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-setting-career-modal', this.openModal);
    emitter.off('close-setting-career-modal', this.closeModal);
    emitter.off('return-setting-career-modal', this.returnUserData);
  },
};
</script>

<style lang="scss"></style>
