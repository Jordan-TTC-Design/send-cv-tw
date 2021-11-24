<template>
  <div class="adminPage--py jobPage" v-if="dataReady">
    <Form v-slot="{ errors }" @submit="saveJobData">
      <div class="admin__subHeader admin__subHeader--edit mb-6 box--shadow">
        <div class="container admin__subNav justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <button
              type="button"
              class="btn text-dark me-2"
              @click="goToPageLink(`/company-admin/job-list`)"
            >
              <i class="jobIcon bi bi-chevron-left"></i>
            </button>
            <h2 class="admin__subNav__title me-0" v-once>{{ jobForm.jobName }}</h2>
            <p class="ms-2">- {{ pagePreview ? '預覽狀態' : '編輯狀態' }}</p>
          </div>
          <div>
            <button
              type="button"
              class="btn--preview btn btn-outline-gray-line me-2"
              @click="lookPagePreview"
              :class="{ active: pagePreview }"
            >
              <i class="jobIcon--sm bi bi-eye me-1"></i>{{ pagePreview ? '繼續編輯' : '預覽職位' }}
            </button>
            <button type="submit" class="btn btn-companyColor text-light">儲存職位</button>
          </div>
        </div>
      </div>
      <div class="container" v-if="pagePreview">
        <div class="row">
          <div class="col-lg-9 col-12">
            <div class="jobInfoBox box--shadow position-relative mb-4">
              <div class="d-flex flex-lg-row flex-column">
                <div class="jobInfoBox__imgBox mb-md-0 mb-4">
                  <img
                    class="jobImg putPointer"
                    :src="jobForm.jobImgUrl[0].url || 'https://i.imgur.com/I2erb3u.png'"
                    :alt="`${jobForm.jobName}職位圖片`"
                    @click="openImgModal(jobForm.jobImgUrl[0].url || 'https://i.imgur.com/I2erb3u.png')"
                  />
                  <div class="jobInfoBox__logoImgBox">
                    <img
                      class="logoImg"
                      :src="jobForm.companyInfo.companyLogoUrl"
                      :alt="`${jobForm.companyInfo.companyName}logo`"
                    />
                  </div>
                </div>
                <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                  <div class="mb-1">
                    <p class="jobTag">拍照申請職位</p>
                  </div>
                  <div class="pt-3 d-md-block d-flex flex-column align-items-center">
                    <h2 class="page__title">{{ jobForm.jobName || '未命名職位' }}</h2>
                    <p class="page__link subTxt mb-4 d-block">
                      {{ jobForm.companyInfo.companyName }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-end mb-lg-0 mb-4">
                    <div>
                      <p class="mb-3">
                        <i class="jobIcon--sm me-1 bi bi-geo-alt"></i
                        >{{ jobForm.jobAddress.companyAddress || '尚未填寫' }}
                      </p>
                      <p class="text-dark fw-bold" v-if="!jobForm.jobSalaryRange.salaryInterView">
                        {{ jobForm.jobSalaryRange.salaryLow }}
                        <span
                          class="text-dark fw-bold"
                          v-if="
                            jobForm.jobSalaryRange.salaryHeight &&
                            jobForm.jobSalaryRange.salaryHeight !== 0
                          "
                        >
                          - {{ jobForm.jobSalaryRange.salaryHeight }}</span
                        >
                        NTD / {{ jobForm.jobSalaryRange.salaryType }}
                      </p>
                      <p class="text-dark fw-bold" v-if="jobForm.jobSalaryRange.salaryInterView">
                        薪資面議
                      </p>
                    </div>
                    <p class="subTxt text-secondary text-end">2021.12.12 12:10</p>
                  </div>
                </div>
                <button type="button" class="btn btn-lg btn-primary w-100 d-lg-none d-block mb-3">
                  申請職位
                </button>
                <button type="button" class="btn btn-lg btn-gray-light w-100 d-lg-none d-block">
                  收藏職位
                </button>
              </div>
            </div>
            <!-- 職位內容 -->
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>職位內容
              </h3>
              <ul class="jobDataList pb-3">
                <!-- 職位類 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-card-list"></i>職位類別：
                  </p>
                  <ul v-for="(item, index) in jobForm.jobCategory" :key="index">
                    <li class="jobDataList__item__listTxt">
                      {{ item }}
                      <span
                        v-if="index < jobForm.jobCategory.length - 1"
                        class="fakeInput__txtList__line"
                      ></span>
                    </li>
                  </ul>
                  <p
                    v-if="jobForm.jobCategory.length === 0"
                    class="jobDataList__item__txt noContent"
                  >
                    尚未選擇
                  </p>
                </li>
                <!-- 產業類別 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-building"></i>產業類別：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.companyInfo.companyIndustry === '' }"
                  >
                    {{ jobForm.companyInfo.companyIndustry || '尚未填寫' }}
                  </p>
                </li>
              </ul>
              <swiper
                v-if="jobForm.jobImgUrl.length > 0"
                :slides-per-view="swiperNum"
                :space-between="20"
                :pagination="swiperDetail.pagination"
                :navigation="swiperDetail.navigation"
              >
                <swiper-slide v-for="(item, index) in jobForm.jobImgUrl" :key="index">
                  <div class="shotJobImgBox">
                    <img
                      class="shotJobImgBox__img putPointer"
                      :src="item.url"
                      alt="職位圖片"
                      @click="openImgModal(item.url)"
                    />
                    <p class="shotJobImgBox__content">{{ item.content }}</p>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev swiper-custom">
                  <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                    <i class="bi bi-arrow-left actionIcon"></i>
                  </button>
                </div>
                <div class="swiper-button-next swiper-custom">
                  <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                    <i class="bi bi-arrow-right actionIcon"></i>
                  </button>
                </div>
              </swiper>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>申請方法
              </h3>
              <ul class="jobDataList pb-3">
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-person"></i>企業：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.companyInfo.companyName === '' }"
                  >
                    {{ jobForm.companyInfo.companyName || '尚未填寫' }}
                  </p>
                </li>
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡信箱：
                  </p>
                  <a
                    class="jobDataList__item__txt"
                    :href="`mailto:${jobForm.applyContact.email}`"
                    :class="{ noContent: jobForm.applyContact.email === '' }"
                  >
                    {{ jobForm.applyContact.email || '尚未填寫' }}
                  </a>
                </li>
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-phone"></i>聯絡電話：
                  </p>
                  <a
                    class="jobDataList__item__txt"
                    :href="`tel:${jobForm.applyContact.phone}`"
                    :class="{ noContent: !jobForm.applyContact.phone }"
                  >
                    {{ jobForm.applyContact.phone || '尚未填寫' }}
                  </a>
                </li>
              </ul>
              <swiper
                v-if="jobForm.applyImgUrl.length > 0"
                :slides-per-view="swiperNum"
                :space-between="20"
                :pagination="swiperDetail.pagination"
                :navigation="swiperDetail.navigation"
              >
                <swiper-slide v-for="(item, index) in jobForm.applyImgUrl" :key="index">
                  <div class="shotJobImgBox">
                    <img
                      class="shotJobImgBox__img putPointer"
                      :src="item.url"
                      alt="申請方法"
                      @click="openImgModal(item.url)"
                    />
                    <p class="shotJobImgBox__content">{{ item.content }}</p>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev swiper-custom">
                  <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                    <i class="bi bi-arrow-left actionIcon"></i>
                  </button>
                </div>
                <div class="swiper-button-next swiper-custom">
                  <button type="button" class="btn btn-lg rounded-circle iconBtnBox">
                    <i class="bi bi-arrow-right actionIcon"></i>
                  </button>
                </div>
              </swiper>
            </div>
          </div>
          <div class="col-lg-3 col-12">
            <div class="jobSubBox box--shadow mb-lg-3 p-3 d-lg-block d-none">
              <button type="button" class="btn btn-lg btn-primary w-100">申請職位</button>
            </div>
            <div
              v-if="company.companyInfo.companyImgsUrl.length > 0"
              class="jobSubBox jobPage__companyImage box--shadow mb-3"
            >
              <h5 class="jobSubBox__title">公司照片</h5>
              <div class="companyImgBox">
                <img
                  class="mb-2 putPointer"
                  :src="company.companyInfo.companyImgsUrl[0].url"
                  :alt="`${company.companyInfo.companyName}公司圖片1`"
                  @click="openImgModal(company.companyInfo.companyImgsUrl[0].url)"
                />
                <div class="d-flex justify-content-between">
                  <img
                    v-if="company.companyInfo.companyImgsUrl[1].url !== ''"
                    class="companyImage--sub putPointer"
                    :src="company.companyInfo.companyImgsUrl[1].url"
                    :alt="`${company.companyInfo.companyName}公司圖片2`"
                    @click="openImgModal(company.companyInfo.companyImgsUrl[1].url)"
                  />
                  <img
                    v-if="company.companyInfo.companyImgsUrl[2].url !== ''"
                    :src="company.companyInfo.companyImgsUrl[2].url"
                    :alt="`${company.companyInfo.companyName}公司圖片3`"
                    class="companyImage--sub putPointer"
                    @click="openImgModal(company.companyInfo.companyImgsUrl[2].url)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="!pagePreview">
        <div class="row">
          <div class="col-lg-9 col-12">
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>職位內容
              </h3>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="sendFormInfoJobName" class="labelBox__label form-label"
                    >職位名稱</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <Field
                  id="sendFormInfoJobName"
                  name="職位名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['職位名稱'] }"
                  placeholder="請輸入職位名稱"
                  rules="required"
                  v-model="jobForm.jobName"
                  ref="sendFormInfoJobName"
                ></Field>
                <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="d-flex align-items-end mb-4">
                <div class="form__input me-2">
                  <div class="form__labelBox">
                    <label for="salaryRangeLow" class="labelBox__label form-label"
                      >薪資範圍起始</label
                    >
                    <p class="formTag--must company">必填</p>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="salaryRangeLow"
                    placeholder="最低"
                    aria-describedby="薪資待遇範圍起始"
                    v-model="jobForm.jobSalaryRange.salaryLow"
                  />
                </div>
                <div class="form__input me-2">
                  <div class="form__labelBox">
                    <label for="salaryRangeHeight" class="labelBox__label form-label"
                      >薪資範圍結束</label
                    >
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="salaryRangeHeight"
                    placeholder="最高薪資範圍"
                    aria-describedby="薪資待遇範圍結束"
                    v-model="jobForm.jobSalaryRange.salaryHeight"
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="salaryRangeInterview"
                    v-model="jobForm.jobSalaryRange.salaryInterView"
                  />
                  <label class="form-check-label" for="salaryRangeInterview"> 面議 </label>
                </div>
              </div>
              <div class="form__input form__input">
                <div class="form__labelBox">
                  <label for="jobFormPeopleNeed" class="labelBox__label form-label"
                    >職務類別</label
                  >
                  <p class="formTag--must company">必填</p>
                  <p class="subTxt ms-2 text-secondary">(最多選3項)</p>
                </div>
                <div class="fakeInput" @click="openJobDataSettingModal('職務類別')">
                  <div class="fakeInput__txtList">
                    <p class="text-secondary" v-if="jobForm.jobCategory.length < 1">請選擇</p>
                    <template v-for="that in jobForm.jobCategory" :key="that">
                      <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                    </template>
                  </div>
                  <i class="jobIcon bi bi-chevron-right"></i>
                </div>
              </div>
              <div
                class="row"
                v-for="(item, index) in jobForm.jobImgUrl"
                :key="`sendFormInfoImgs${index}`"
              >
                <div class="col-lg-4 col-12">
                  <ImgInputBoxCompany
                    :imgNumber="index"
                    :mustUpload="index < 1"
                    :inputAction="'muti'"
                    :dataName="'jobImgUrl'"
                    :tempImgUrl="jobForm.jobImgUrl[index].url"
                    @send-img-to-page="getImgData"
                  />
                </div>
                <div class="col-lg-8 col-12 d-flex flex-column justify-content-between">
                  <div class="form__input form__infoEditBox">
                    <div class="form__labelBox">
                      <label
                        for="sendFormInfoJobContent"
                        class="labelBox__label form-label me-2"
                        >{{ `第 ${index + 1} 張圖片備註` }}</label
                      >
                    </div>
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="請輸入"
                      v-model="jobForm.jobImgUrl[index].content"
                      rows="5"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-gray-line text-dark w-100 mb-4"
                    @click="jobForm.jobImgUrl.splice(index, 1)"
                    v-if="index > 0"
                  >
                    清除圖片資料
                  </button>
                </div>
              </div>
              <div
                class="d-flex flex-column align-items-center"
                v-if="jobForm.jobImgUrl.length < 3"
              >
                <p class="mb-2">一張不夠嗎？可以上傳最多三張職位相關圖片</p>
                <button
                  type="button"
                  class="btn btn-gray-light text-companyColor w-50"
                  @click="newImgInput('jobImgUrl')"
                >
                  新增照片
                </button>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>申請方法
              </h3>
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyName" class="labelBox__label form-label"
                        >公司名稱</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="sendFormInfoCompanyName"
                      name="公司名稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司名稱'] }"
                      placeholder="請輸入公司名稱"
                      rules="required"
                      v-model="jobForm.companyInfo.companyName"
                      ref="sendFormInfoCompanyName"
                    ></Field>
                    <ErrorMessage name="公司名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-12">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyEmail" class="labelBox__label form-label"
                        >公司Email</label
                      >
                    </div>
                    <input
                      type="email"
                      class="form-control"
                      id="sendFormInfoCompanyEmail"
                      placeholder="公司Email"
                      aria-describedby="公司Email"
                      v-model="jobForm.applyContact.email"
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <div class="form__input">
                    <div class="form__labelBox">
                      <label for="sendFormInfoCompanyPhone" class="labelBox__label form-label"
                        >公司聯絡電話</label
                      >
                    </div>
                    <input
                      type="tel"
                      class="form-control"
                      id="sendFormInfoCompanyPhone"
                      placeholder="公司聯絡電話"
                      aria-describedby="公司聯絡電話"
                      v-model="jobForm.applyContact.phone"
                    />
                  </div>
                </div>
              </div>
              <div
                class="row"
                v-for="(item, index) in jobForm.applyImgUrl"
                :key="`sendFormInfoImgs${index}`"
              >
                <div class="col-lg-4 col-12">
                  <ImgInputBoxCompany
                    :imgNumber="index"
                    :mustUpload="index < 1"
                    :inputAction="'muti'"
                    :dataName="'applyImgUrl'"
                    :tempImgUrl="jobForm.applyImgUrl[index].url"
                    @send-img-to-page="getImgData"
                  />
                </div>
                <div class="col-lg-8 col-12 d-flex flex-column justify-content-between">
                  <div class="form__input form__infoEditBox">
                    <div class="form__labelBox">
                      <label
                        for="sendFormInfoJobContent"
                        class="labelBox__label form-label me-2"
                        >{{ `第 ${index + 1} 張圖片備註` }}</label
                      >
                    </div>
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="請輸入"
                      v-model="jobForm.applyImgUrl[index].content"
                      rows="5"
                    />
                  </div>
                  <button
                    v-if="index > 0"
                    type="button"
                    class="btn btn-outline-gray-line text-dark w-100 mb-4"
                    @click="jobForm.applyImgUrl.splice(index, 1)"
                  >
                    清除圖片資料
                  </button>
                </div>
              </div>
            </div>
            <div class="jobContentSection box--shadow">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>工作地點
              </h3>
              <div class="d-flex align-items-end mb-4">
                <div class="form__input me-2">
                  <div class="form__labelBox">
                    <label for="jobFormCompanyCity" class="labelBox__label form-label"
                      >縣市</label
                    >
                  </div>
                  <Field
                    id="jobFormCompanyCity"
                    ref="jobFormCompanyCity"
                    name="縣市"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['縣市'] }"
                    v-model="jobForm.jobAddress.addressCity"
                    @change="chooseDist(jobForm.jobAddress.addressCity)"
                  >
                    <option value="" disabled selected>請選擇縣市</option>
                    <option v-for="city in formData.cities" :value="city" :key="city">
                      {{ city }}
                    </option>
                  </Field>
                  <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form__input me-4">
                  <div class="form__labelBox">
                    <label for="jobFormCompanyDist" class="labelBox__label form-label"
                      >區域鄉鎮</label
                    >
                  </div>
                  <Field
                    id="jobFormCompanyDist"
                    ref="jobFormCompanyDist"
                    name="區域鄉鎮"
                    as="select"
                    class="form-control form-select w-auto"
                    :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                    v-model="jobForm.jobAddress.addressDist"
                  >
                    <option value="" disabled selected>請選擇區域鄉鎮</option>
                    <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                      {{ dist }}
                    </option>
                  </Field>
                  <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="sameAddressWithCompany"
                    v-model="sameAddressWithCompany"
                    @change="putCompanyAddressToJob"
                  />
                  <label class="form-check-label" for="sameAddressWithCompany"> 同公司地址 </label>
                </div>
              </div>
              <div class="form__input">
                <div class="form__labelBox">
                  <label for="jobFormAddressDetail" class="labelBox__label form-label"
                    >工作詳細地址</label
                  >
                </div>
                <Field
                  id="jobFormAddressDetail"
                  ref="jobFormAddressDetail"
                  name="工作詳細地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['工作詳細地址'] }"
                  placeholder="請輸入工作詳細地址"
                  v-model="jobForm.jobAddress.addressDetail"
                ></Field>
                <ErrorMessage name="工作詳細地址" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <ImgPopModal />
  <JobDataSettingModal @return-job-data-setting="saveModalData" />
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';
import ImgInputBoxCompany from '@/components/helpers/ImgInputBoxCompany.vue';
import JobDataSettingModal from '@/components/company/JobDataSettingModal.vue';
import ImgPopModal from '@/components/helpers/ImgPopModal.vue';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default {
  components: {
    UpTopBtn,
    ImgPopModal,
    JobDataSettingModal,
    ImgInputBoxCompany,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
      dataReady: false,
      jobkey: '',
      company: {},
      jobForm: {
        jobKey: '',
        is_enabled: true,
        time: null,
        jobName: '',
        jobCategory: [],
        jobSalaryRange: { salaryLow: '', salaryHeight: '', salaryInterView: '' },
        jobContent: '',
        jobImgUrl: [{ url: '', key: '', content: '' }],
        applyImgUrl: [{ url: '', key: '', content: '' }],
        jobAddress: {
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          companyAddress: '',
        },
        companyInfo: {
          companyName: '',
          companyLogoUrl: '',
          companyKey: '',
          companyIndustry: '',
        },
        applyContact: {
          email: '',
          phone: '',
        },
        document: {
          cvkey: '',
          introVideo: { is_enabled: true, key: '' },
          coverLetter: {
            title: '',
            content: '',
          },
        },
      },
      sameAddressWithCompany: false,
      chooseCityDist: [],
      formData: {},
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
      cropper: {}, // 套件切圖工具
      pagePreview: true, // 預覽編輯
      tempImgurl: '',
      // swiper
      swiperNum: 1,
      swiperDetail: {
        autoPlay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: this.swiperNum,
      },
    };
  },
  watch: {
    fullWidth(newValue) {
      if (newValue > 767) {
        this.swiperNum = 1.5;
      } else {
        this.swiperNum = 1;
      }
    },
  },
  computed: {
    workTime() {
      const temArray = [];
      this.jobForm.workTime.forEach((item) => {
        if (item.select) {
          temArray.push(item.title);
        }
      });
      return temArray;
    },
    workType() {
      const temArray = [];
      this.jobForm.workType.forEach((item) => {
        if (item.select) {
          temArray.push(item.title);
        }
      });
      return temArray;
    },
  },
  methods: {
    openImgModal(imgUrl) {
      emitter.emit('imgPopModal-open', imgUrl);
    },
    // New an image input tool.
    newImgInput(dataName) {
      if (dataName === 'jobImgUrl') {
        if (this.jobForm.jobImgUrl.length < 3) {
          this.jobForm.jobImgUrl.push({ url: '', key: '', content: '' });
        }
      } else if (dataName === 'applyImgUrl') {
        if (this.jobForm.applyImgUrl.length < 3) {
          this.jobForm.applyImgUrl.push({ url: '', key: '', content: '' });
        }
      }
    },
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // Get job categroy or driver license from modal.
    saveModalData(obj) {
      if (obj.action === '職務類別') {
        this.jobForm.jobCategory = obj.data;
        console.log(this.jobForm.jobCategory);
      } else if (obj.action === '駕照需求') {
        this.jobForm.conditions.driverLicenses = obj.data;
        console.log(this.jobForm.conditions.driverLicenses);
      }
    },
    // Toggle job categroy or driver license edit modal.
    openJobDataSettingModal(modalAction) {
      emitter.emit('open-job-data-setting-modal', modalAction);
    },
    // Put company address to job form.
    putCompanyAddressToJob() {
      if (this.sameAddressWithCompany) {
        this.jobForm.jobAddress.addressCity = this.company.companyInfo.addressCity;
        this.jobForm.jobAddress.addressDist = this.company.companyInfo.addressDist;
        this.jobForm.jobAddress.addressDetail = this.company.companyInfo.addressDetail;
      } else {
        this.jobForm.jobAddress.addressCity = '';
        this.jobForm.jobAddress.addressDist = '';
        this.jobForm.jobAddress.addressDetail = '';
      }
    },
    // pick city data
    chooseDist(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.jobForm.jobAddress.addressDist = temDist;
    },

    // Toggle preview or edit mode.
    lookPagePreview() {
      if (this.pagePreview) {
        this.pagePreview = false;
      } else {
        this.pagePreview = true;
      }
    },
    // Get img url and put into form
    getImgData(data) {
      if (data.dataName === 'jobImgUrl') {
        this.jobForm.jobImgUrl[data.index].url = data.url;
        this.jobForm.jobImgUrl[data.index].key = data.key;
      } else if (data.dataName === 'applyImgUrl') {
        this.jobForm.applyImgUrl[data.index].url = data.url;
        this.jobForm.applyImgUrl[data.index].key = data.key;
      }
    },
    // save job to company's job list.
    saveJobData() {
      this.jobForm.jobAddress.companyAddress = `${this.jobForm.jobAddress.addressCity}，${this.jobForm.jobAddress.addressDist}，${this.jobForm.jobAddress.addressDetail}`;
      const jobRef = database.ref(`applyList/otherApplyList/shotList/${this.jobkey}`);
      const obj = this.jobForm;
      jobRef.set(obj);
      this.$router.push('/company-admin/shot-job-list');
    },
    // put basic company info into job form.
    putCompanyDataToJob() {
      this.jobForm.companyInfo.companyLogoUrl = this.company.companyInfo.companyLogoUrl;
      this.jobForm.companyInfo.companyKey = '12345678';
    },
    // Get company data from Firebase.
    getCompanyData() {
      const companyRef = database.ref('company');
      companyRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.company = data;
          console.log(this.company);
          this.getJobData();
        }
      });
    },
    getJobData() {
      const jobRef = database.ref(`applyList/otherApplyList/shotList/${this.jobkey}`);
      jobRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.jobForm = data;
          console.log(this.jobForm);
          this.putCompanyDataToJob();
          this.dataReady = true;
        }
      });
    },
  },
  created() {
    this.getCompanyData();
    this.jobkey = this.$route.params.key;
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 500);
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
    };
  },
};
</script>

<style lang="scss"></style>
