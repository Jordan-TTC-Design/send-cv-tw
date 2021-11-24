<template>
  <Form
    v-slot="{ errors }"
    class="dataEditForm"
    @submit="saveSkillData"
    :class="{
      'border-top': formIndex === 'new',
      'border-gray-line': formIndex === 'new',
      'mt-3': formIndex === 'new',
      'pb-0': formIndex === 'new',
      'border-bottom-0': formIndex === 'new',
    }"
  >
    <div class="row">
      <!-- 技能類別 -->
      <div class="col-lg-6 col-12">
        <div class="form__input">
          <div class="form__labelBox">
            <label for="skillDataCategory" class="labelBox__label form-label">技能類別</label>
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="skillDataCategory"
            ref="skillDataCategory"
            name="技能類別"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['技能類別'] }"
            placeholder="請輸入技能類別"
            rules="required"
            v-model="tempSkillList.groupName"
          ></Field>
          <ErrorMessage name="技能類別" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- 技能名稱 -->
      <div class="col-lg-6 col-12">
        <div class="form__input">
          <div class="form__labelBox">
            <label for="skillDataCategorySkillName" class="labelBox__label form-label"
              >技能名稱</label
            >
          </div>
          <Field
            id="skillDataCategorySkillName"
            ref="skillDataCategorySkillName"
            name="技能名稱"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['技能名稱'] }"
            placeholder="請輸入技能名稱"
            v-model="tempSkill.name"
          ></Field>
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
            <template v-for="(item, num) in tempSkillList.skillList" :key="item.name">
              <li class="list__item">
                <p class="jobTag list__item__skill">
                  {{ item.name }}
                  <span
                    ><i
                      class="jobTag__delete jobIcon-sm bi bi-x-lg"
                      @click="tempSkillList.skillList.splice(num, 1)"
                    ></i
                  ></span>
                </p>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="button" class="btn btn-gray-light me-2" @click="closeForm">取消</button>
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </div>
  </Form>
</template>
<script>
import webData from '@/methods/webData';

export default {
  emits: ['returnSkillData', 'reuturnCloseForm'],
  props: ['sendSkillData', 'formNumber'],
  data() {
    return {
      tempSkill: {
        name: '',
        otherSupport: '',
      },
      tempSkillList: {},
      formIndex: null,
      formData: {},
    };
  },
  watch: {
    sendSkillData: {
      deep: true,
      handler(newValue) {
        this.tempSkillList = JSON.parse(JSON.stringify(newValue));
      },
    },
    formNumber: {
      deep: true,
      handler(newValue) {
        this.formIndex = newValue;
      },
    },
  },
  methods: {
    saveSkillData() {
      const obj = {
        data: this.tempSkillList,
        num: this.formIndex,
      };
      this.$emit('returnSkillData', obj);
    },
    closeForm() {
      this.$emit('reuturnCloseForm', this.formIndex);
    },
    toogleTempData() {
      const obj = {
        name: this.tempSkill.name,
        otherSupport: '',
      };
      this.tempSkill.name = '';
      this.tempSkillList.skillList.push(obj);
    },
  },
  created() {
    this.formData = webData;
    this.tempSkillList = JSON.parse(JSON.stringify(this.sendSkillData));
    this.formIndex = this.formNumber;
  },
};
</script>

<style lang="scss"></style>
