<template>
  <Form
    ref="editAccountEducationData"
    class="dataEditForm"
    v-slot="{ errors }"
    @submit="saveEducationData('new')"
  >
    <div class="row">
      <!-- 學校名稱 -->
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="educationDataSchoolName" class="form__label--custom form-label"
              >學校名稱</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="educationDataSchoolName"
            ref="educationDataSchoolName"
            name="學校名稱"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['學校名稱'] }"
            placeholder="請輸入學校名稱"
            rules="required"
            v-model="tempEducationExp.schoolName"
          ></Field>
          <ErrorMessage name="學校名稱" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 主修科目 -->
      <div class="col-lg-6 col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="educationDataMajorName" class="form__label--custom form-label"
              >主修科目</label
            >
          </div>
          <Field
            id="educationDataMajorName"
            ref="educationDataMajorName"
            name="主修科目"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['主修科目'] }"
            placeholder="請輸入主修科目"
            v-model="tempEducationExp.majorName"
          ></Field>
        </div>
      </div>
      <div class="col-12">
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="educationDataEducationLevel" class="form__label--custom form-label"
              >學歷</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <div class="d-flex flex-wrap">
            <div
              class="form-check me-2"
              v-for="(item, index) in formData.candidateEducation"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                :value="item"
                :id="`education${index}`"
                name="學歷"
                v-model="tempEducationExp.educationLevel"
              />
              <label class="form-check-label" :for="`education${index}`">
                {{ item }}
              </label>
            </div>
            <Field
              id="educationDataEducationLevel"
              ref="educationDataEducationLevel"
              name="學歷"
              type="text"
              class="form-control d-none"
              :class="{ 'is-invalid': errors['學歷'] }"
              v-model="tempEducationExp.educationLevel"
              rules="required"
            ></Field>
            <ErrorMessage name="學歷" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>
      </div>
      <!-- 就讀年份 -->
      <div class="col-lg-6 col-12 d-flex">
        <div class="form__inputBox me-2">
          <div class="form__labelBox">
            <label for="educationDataStartYear" class="form__label--custom form-label"
              >就讀日期</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="educationDataStartYear"
            ref="educationDataStartYear"
            name="就讀年份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['就讀年份'] }"
            rules="required"
            v-model="tempEducationExp.startYear"
            @change="createEndYears"
          >
            <option value="" disabled selected>請選擇就讀年份</option>
            <option v-for="year in yearArray" :value="year" :key="year">
              {{ year }}
            </option>
          </Field>
          <ErrorMessage name="就讀年份" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="educationDataStartMonth" class="form__label--custom form-label invisible"
              >就讀月份</label
            >
          </div>
          <Field
            id="educationDataStartMonth"
            ref="educationDataStartMonth"
            name="就讀月份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['就讀月份'] }"
            rules="required"
            v-model="tempEducationExp.startMonth"
          >
            <option value="" disabled selected>請選擇就讀月份</option>
            <option v-for="month in formData.months" :value="month" :key="month">
              {{ month }}
            </option>
          </Field>
          <ErrorMessage name="就讀月份" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 畢業年份 -->
      <div class="col-lg-6 col-12 d-flex">
        <div class="form__inputBox me-2">
          <div class="form__labelBox">
            <label for="educationDataEndYear" class="form__label--custom form-label"
              >畢業日期</label
            >
            <p class="formTag--must">必填</p>
          </div>
          <Field
            id="educationDataEndYear"
            ref="educationDataEndYear"
            name="畢業年份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['畢業年份'] }"
            rules="required"
            v-model="tempEducationExp.endYear"
          >
            <option value="" disabled selected>請選擇畢業年份</option>
            <option v-for="year in endYearArray" :value="year" :key="year">
              {{ year }}
            </option>
          </Field>
          <ErrorMessage name="畢業年份" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="form__inputBox">
          <div class="form__labelBox">
            <label for="educationDataEndMonth" class="form__label--custom form-label invisible"
              >畢業月份</label
            >
          </div>
          <Field
            id="educationDataEndMonth"
            ref="educationDataEndMonth"
            name="畢業月份"
            as="select"
            class="form-control form-select"
            :class="{ 'is-invalid': errors['畢業月份'] }"
            rules="required"
            v-model="tempEducationExp.endMonth"
          >
            <option value="" disabled selected>請選擇畢業月份</option>
            <option v-for="month in formData.months" :value="month" :key="month">
              {{ month }}
            </option>
          </Field>
          <ErrorMessage name="畢業月份" class="invalid-feedback"></ErrorMessage>
        </div>
      </div>
      <!-- 在學表現＆成就 -->
      <div class="col-12">
        <div class="form__inputBox form__infoEditBox">
          <div class="form__labelBox">
            <label for="educationDataContent" class="form__label--custom form-label"
              >在學表現＆成就</label
            >
          </div>
          <ckeditor
            id="educationDataContent"
            ref="educationDataContent"
            name="在學表現＆成就"
            :editor="editor"
            tag-name="textarea"
            v-model="tempEducationExp.educationContent"
            :config="editorConfig"
          ></ckeditor>
          <Field
            name="在學表現＆成就"
            type="text"
            class="form-control d-none"
            :class="{ 'is-invalid': errors['在學表現＆成就'] }"
            placeholder="請輸入"
            v-model="tempEducationExp.educationContent"
            as="textarea"
            rules="required"
          >
          </Field>
          <ErrorMessage name="在學表現＆成就" class="invalid-feedback"></ErrorMessage>
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
  emits: ['returnEducationExpData', 'reuturnCloseForm'],
  props: ['educationExpData', 'formNumber'],
  data() {
    return {
      tempEducationExp: {
        schoolName: '',
        majorName: '',
        educationContent: '',
        educationLevel: null,
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillAtSchool: false,
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
    educationExpData: {
      deep: true,
      handler(newValue) {
        this.tempEducationExp = JSON.parse(JSON.stringify(newValue));
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
    saveEducationData() {
      const obj = {
        data: this.tempEducationExp,
        num: this.formIndex,
      };
      this.$emit('returnEducationExpData', obj);
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
    createEndYears() {
      this.endYearArray = [];
      const myDate = new Date();
      let startYear = 0;
      startYear = parseInt(this.tempEducationExp.startYear, 10);
      console.log(startYear);
      const endYear = myDate.getFullYear();
      for (let i = startYear; i <= endYear; i += 1) {
        this.endYearArray.unshift(i);
      }
    },
  },
  created() {
    this.formData = webData;
    this.tempEducationExp = JSON.parse(JSON.stringify(this.educationExpData));
    this.formIndex = this.formNumber;
    this.createYears();
  },
};
</script>

<style lang="scss"></style>
