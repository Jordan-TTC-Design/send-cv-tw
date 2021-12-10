<template>
  <Form
    v-slot="{ errors }"
    class="dataEditForm"
    @submit="saveData"
  >
    <div class="row">
      <!-- 證照 -->
      <div class="col-lg-6 col-12">
        <div class="form__input">
          <div class="form__labelBox">
            <label for="languageDataName" class="labelBox__label form-label">證照名稱</label>
          </div>
          <Field
            id="languageDataName"
            ref="languageDataName"
            name="證照名稱"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['證照名稱'] }"
            v-model="tempLicense"
          >
          </Field>
          <ErrorMessage name="證照名稱" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <div class="col-12">
        <button
          type="button"
          class="btn--newSkill btn btn-outline-companyColor mb-4"
          @click="toogleTempData"
        >
          <i class="jobIcon--sm bi bi-arrow-90deg-down me-1"></i>
          加入已建立項目
        </button>
      </div>
      <div class="col-12">
        <div class="editSkillListBox mb-4">
          <div class="editSkillListBox__header">
            <p>已建立項目</p>
          </div>
          <ul class="editSkillListBox__list">
            <template v-for="(item, index) in tempLicenseList" :key="index">
              <li class="list__item">
                <p class="jobTag list__item__skill">
                  {{ item.name }}
                  <span
                    ><i
                      class="jobTag__delete jobIcon-sm bi bi-x-lg"
                      @click="deleteTempData(index)"
                    ></i
                  ></span>
                </p>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="button" class="btn btn-gray-light me-2" @click="closeForm">
          取消
        </button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </div>
  </Form>
</template>
<script>
import webData from '@/methods/webData';

export default {
  emits: ['returnLicenseData', 'reuturnCloseForm'],
  props: ['sendLicenses'],
  data() {
    return {
      tempLicense: '',
      tempLicenseList: [],
      formIndex: null,
      formData: {},
    };
  },
  watch: {
    sendLicenses: {
      deep: true,
      handler(newValue) {
        this.tempLicenseList = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
  methods: {
    saveData() {
      this.$emit('returnLicenseData', this.tempLicenseList);
    },
    closeForm() {
      this.$emit('reuturnCloseForm');
    },
    toogleTempData() {
      const obj = {
        name: this.tempLicense,
      };
      this.tempLicenseList.push(obj);
      this.defaultData();
    },
    deleteTempData(index) {
      this.tempLicenseList.splice(index, 1);
    },
    defaultData() {
      this.tempLanguage = {
        name: '',
        languageLevel: null,
        otherSupport: '',
      };
    },
  },
  created() {
    this.formData = webData;
    this.tempLicenseList = JSON.parse(JSON.stringify(this.sendLicenses));
  },
};
</script>

<style lang="scss"></style>
