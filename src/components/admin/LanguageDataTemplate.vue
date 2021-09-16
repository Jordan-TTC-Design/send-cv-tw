<template>
  <Form v-slot="{ errors }" class="dataEditForm" @submit="saveData">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="languageDataName" class="form__label--custom form-label">語言</label>
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="languageDataName"
            ref="languageDataName"
            name="語言"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['語言'] }"
            v-model="tempLanguage.name"
          >
            <option value="" disabled selected>請選擇</option>
            <option v-for="language in formData.languages" :value="language" :key="language">
              {{ language }}
            </option></Field
          >
          <ErrorMessage name="語言" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <div class="col-lg-3 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="languageDataLevel" class="form__label--custom form-label">語言程度</label>
          </div>
          <Field
            id="languageDataLevel"
            ref="languageDataLevel"
            name="語言程度"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['語言程度'] }"
            v-model="tempLanguage.languageLevel"
          >
            <option value="" disabled selected>請選擇</option>
            <option v-for="level in formData.skillLevel" :value="level" :key="level">
              {{ level }}
            </option>
          </Field>
        </div>
      </div>
      <div class="col-lg-3 col-12 d-flex align-items-end">
        <button type="button" class="btn btn-outline-gray-line text-dark mb-4">
          新增證照考試證明
        </button>
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
            <template v-for="(item, index) in tempLanguageList" :key="index">
              <li class="list__item">
                <p class="jobTag list__item__skill">
                  {{ item.name
                  }}<span class="list__item__skillLevel">{{ item.languageLevel }}</span>
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
  emits: ['returnLanguageData', 'reuturnCloseForm'],
  props: ['sendLanguages'],
  data() {
    return {
      tempLanguage: {
        name: '',
        languageLevel: null,
        otherSupport: '',
      },
      tempLanguageList: [],
      formIndex: null,
      formData: {},
    };
  },
  watch: {
    sendLanguages: {
      deep: true,
      handler(newValue) {
        this.tempLanguageList = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
  methods: {
    saveData() {
      this.$emit('returnLanguageData', this.tempLanguageList);
    },
    closeForm() {
      this.$emit('reuturnCloseForm');
    },
    toogleTempData() {
      const obj = {
        name: this.tempLanguage.name,
        languageLevel: this.tempLanguage.languageLevel,
        otherSupport: '',
      };
      this.tempLanguageList.push(obj);
      this.defaultData();
    },
    deleteTempData(index) {
      this.tempLanguageList.splice(index, 1);
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
    this.tempLanguageList = JSON.parse(JSON.stringify(this.sendLanguages));
  },
};
</script>

<style lang="scss"></style>
