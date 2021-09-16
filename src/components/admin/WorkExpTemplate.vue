<template>
  <Form
    ref="workExpEdit--new"
    class="dataEditForm"
    v-slot="{ errors }"
    @submit="saveWorkData('new')"
  >
    <div class="row">
      <!-- 企業名稱 -->
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="workExpDataCompanyName" class="form__label--custom form-label"
              >企業名稱</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="workExpDataCompanyName"
            ref="workExpDataCompanyName"
            name="企業名稱"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['企業名稱'] }"
            placeholder="請輸入企業名稱"
            rules="required"
            v-model="tempWorkExp.companyName"
          ></Field>
          <ErrorMessage name="企業名稱" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 職位名稱 -->
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="workExpDataJobName" class="form__label--custom form-label">職位名稱</label>
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="workExpDataJobName"
            ref="workExpDataJobName"
            name="職位名稱"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['職位名稱'] }"
            placeholder="請輸入職位名稱"
            rules="required"
            v-model="tempWorkExp.jobName"
          ></Field>
          <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 到職年份 -->
      <div class="col-lg-6 col-12 d-flex">
        <div class="form__inputBox me-2">
          <div class="form__labelBox">
            <label for="workExpDataStartYear" class="form__label--custom form-label"
              >就讀年份</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="workExpDataStartYear"
            ref="workExpDataStartYear"
            name="到職年份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['到職年份'] }"
            rules="required"
            v-model="tempWorkExp.startYear"
            @change="createEndYears('work')"
          >
            <option value="" disabled selected>請選擇到職年份</option>
            <option v-for="year in yearArray" :value="year" :key="year">
              {{ year }}
            </option>
          </Field>
          <ErrorMessage name="到職年份" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="workExpDataStartMonth" class="form__label--custom form-label invisible"
              >到職月份</label
            >
          </div>
          <Field
            id="workExpDataStartMonth"
            ref="workExpDataStartMonth"
            name="到職月份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['到職月份'] }"
            rules="required"
            v-model="tempWorkExp.startMonth"
          >
            <option value="" disabled selected>請選擇到職月份</option>
            <option v-for="month in formData.months" :value="month" :key="month">
              {{ month }}
            </option>
          </Field>
          <ErrorMessage name="到職月份" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 離職年份 -->
      <div class="col-lg-6 col-12 d-flex">
        <div class="form__inputBox me-2">
          <div class="form__labelBox">
            <label for="workExpDataEndYear" class="form__label--custom form-label">離職日期</label>
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="workExpDataEndYear"
            ref="workExpDataEndYear"
            name="離職年份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['離職年份'] }"
            rules="required"
            v-model="tempWorkExp.endYear"
          >
            <option value="" disabled selected>請選擇離職年份</option>
            <option v-for="year in endYearArray" :value="year" :key="year">
              {{ year }}
            </option>
          </Field>
          <ErrorMessage name="離職年份" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="workExpDataEndMonth" class="form__label--custom form-label invisible"
              >離職月份</label
            >
          </div>
          <Field
            id="workExpDataEndMonth"
            ref="workExpDataEndMonth"
            name="離職月份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['離職月份'] }"
            rules="required"
            v-model="tempWorkExp.endMonth"
          >
            <option value="" disabled selected>請選擇離職月份</option>
            <option v-for="month in formData.months" :value="month" :key="month">
              {{ month }}
            </option>
          </Field>
          <ErrorMessage name="離職月份" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 職務內容＆成就 -->
      <div class="col-12">
        <div class="form__inputBox form__infoEditBox">
          <div class="form__labelBox">
            <label for="workExpDataContent" class="form__label--custom form-label"
              >職務內容＆成就</label
            >
          </div>
          <ckeditor
            id="workExpDataContent"
            ref="workExpDataContent"
            name="職務內容＆成就"
            :editor="editor"
            tag-name="textarea"
            v-model="tempWorkExp.jobContent"
            :config="editorConfig"
          ></ckeditor>
          <Field
            name="職務內容＆成就"
            type="text"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['職務內容＆成就'] }"
            placeholder="請輸入"
            v-model="tempWorkExp.jobContent"
            as="textarea"
            rules="required"
          >
          </Field>
          <ErrorMessage name="職務內容＆成就" class="invalid-feedback"></ErrorMessage>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import webData from '@/methods/webData';
// import emitter from '@/methods/emitter';

export default {
  emits: ['returnWorkExpData', 'reuturnCloseForm'],
  props: ['workExpData', 'formNumber'],
  data() {
    return {
      tempWorkExp: {
        companyName: '',
        jobName: '',
        jobContent: '',
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillWork: false,
      },
      formIndex: null,
      formData: {},
      tempCoverLetter: {
        title: '',
        content: '',
      },
      // 編輯器套件
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        language: 'zh',
        placeholder: '請輸入...',
        heading: {
          // 設定 Heading 內的樣式，可新增多個
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h3',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
          ],
        },
      },
      yearArray: [],
      endYearArray: [],
    };
  },
  watch: {
    workExpData: {
      deep: true,
      handler(newValue) {
        this.tempWorkExp = JSON.parse(JSON.stringify(newValue));
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
    saveWorkData() {
      const obj = {
        data: this.tempWorkExp,
        num: this.formIndex,
      };
      this.$emit('returnWorkExpData', obj);
    },
    closeForm() {
      this.$emit('reuturnCloseForm', this.formIndex);
    },
    createYears() {
      const myDate = new Date();
      const startYear = myDate.getFullYear() - 100;
      const endYear = myDate.getFullYear();
      for (let i = startYear; i <= endYear; i += 1) {
        this.yearArray.unshift(i);
      }
      this.endYearArray = this.yearArray;
    },
    createEndYears(text) {
      this.endYearArray = [];
      const myDate = new Date();
      let startYear = 0;
      console.log(text);
      if (text === 'work') {
        startYear = parseInt(this.tempWorkExp.startYear, 10);
      } else if (text === 'education') {
        startYear = parseInt(this.tempEducation.startYear, 10);
      }
      console.log(startYear);
      const endYear = myDate.getFullYear();
      for (let i = startYear; i <= endYear; i += 1) {
        this.endYearArray.unshift(i);
      }
    },
  },
  created() {
    this.formData = webData;
    this.tempWorkExp = JSON.parse(JSON.stringify(this.workExpData));
    this.formIndex = this.formNumber;
    this.createYears();
  },
};
</script>

<style lang="scss"></style>
