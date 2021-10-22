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
                    :src="jobForm.jobImgUrl.url || 'https://i.imgur.com/I2erb3u.png'"
                    :alt="`${jobForm.jobName}職位圖片`"
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
                    <p class="jobTag bg-primary me-2 text-dark" v-if="jobForm.promotedData.promote">
                      <i class="jobIcon-sm bi bi-star-fill me-1 text-dark"></i>精選職位
                    </p>
                    <button type="button" class="jobTag btn">100%匹配度</button>
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
              <ul class="jobDataList">
                <li class="jobDataList__item col-12 flex-column align-items-start">
                  <div v-html="jobForm.jobContent" v-if="jobForm.jobContent !== ''"></div>
                  <p class="jobDataList__item__txt noContent" v-if="jobForm.jobContent === ''">
                    尚未填寫
                  </p>
                </li>
              </ul>
            </div>
            <!-- 應徵條件 -->
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>應徵條件
              </h3>
              <ul class="jobDataList">
                <!-- 學歷要求 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-card-list"></i>學歷要求：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.conditions.education === '' }"
                  >
                    {{ jobForm.conditions.education || '尚未選擇' }}
                  </p>
                </li>
                <!-- 工作經驗 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-card-list"></i>工作經驗：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.conditions.workExp === '' }"
                  >
                    {{ jobForm.conditions.workExp || '尚未選擇' }}
                  </p>
                </li>
                <!-- 語言條件 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-journal"></i>語言條件：
                  </p>
                  <ul v-for="(item, index) in jobForm.conditions.languages" :key="index">
                    <li class="jobTag me-1">
                      {{ `${item.name}-${item.languageLevel}` }}
                    </li>
                  </ul>
                  <p
                    v-if="jobForm.conditions.languages.length === 0"
                    class="jobDataList__item__txt noContent"
                  >
                    尚未填寫
                  </p>
                </li>
                <!-- 技能要求 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-journal"></i>技能要求：
                  </p>
                  <ul v-for="(item, index) in jobForm.conditions.skills" :key="index">
                    <li class="jobTag me-1">
                      {{ item.name }}
                    </li>
                  </ul>
                  <p
                    v-if="jobForm.conditions.skills.length === 0"
                    class="jobDataList__item__txt noContent"
                  >
                    尚未填寫
                  </p>
                </li>
                <li class="jobDataList__item col-12 flex-column align-items-start">
                  <p class="jobDataList__item__title mb-1">其他條件：</p>
                  <div
                    v-html="jobForm.conditions.otherRequirement"
                    v-if="jobForm.conditions.otherRequirement !== ''"
                  ></div>
                  <p
                    class="jobDataList__item__txt noContent"
                    v-if="jobForm.conditions.otherRequirement === ''"
                  >
                    尚未填寫
                  </p>
                </li>
              </ul>
            </div>
            <!-- 其他職位資訊 -->
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>其他職位資訊
              </h3>
              <ul class="jobDataList row">
                <!-- 職位類別 -->
                <li class="jobDataList__item col-lg-6 col-12">
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
                <li class="jobDataList__item col-lg-6 col-12">
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
                <!-- 工作性質 -->
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-journal"></i>工作性質：
                  </p>
                  <ul v-for="(item, index) in workType" :key="index">
                    <li class="jobDataList__item__listTxt">
                      {{ item
                      }}<span
                        v-if="index < workType.length - 1"
                        class="fakeInput__txtList__line"
                      ></span>
                    </li>
                  </ul>
                  <p v-if="workType.length === 0" class="jobDataList__item__txt noContent">
                    尚未選擇
                  </p>
                </li>
                <!-- 工作時間 -->
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-journal"></i>工作時間：
                  </p>
                  <ul v-for="(item, index) in workTime" :key="index">
                    <li class="jobDataList__item__listTxt">
                      {{ item }}
                      <span
                        v-if="index < workTime.length - 1"
                        class="fakeInput__txtList__line"
                      ></span>
                    </li>
                  </ul>
                  <p v-if="workTime.length === 0" class="jobDataList__item__txt noContent">
                    尚未選擇
                  </p>
                </li>
                <!-- 需求人數 -->
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-building"></i>需求人數：
                  </p>
                  <p class="jobDataList__item__txt" :class="{ noContent: !jobForm.peopleNeed }">
                    {{ jobForm.peopleNeed || '尚未填寫' }}
                  </p>
                </li>
                <!-- 外派需求 -->
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-building"></i>外派需求：
                  </p>
                  <p class="jobDataList__item__txt">
                    {{ jobForm.expat ? '需要外派' : '不需外派' }}
                  </p>
                </li>
                <!-- 駕照需求 -->
                <li class="jobDataList__item">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-journal"></i>駕照需求：
                  </p>
                  <ul v-for="(item, index) in jobForm.conditions.driverLicenses" :key="index">
                    <li class="jobDataList__item__listTxt">
                      {{ item }}
                      <span
                        v-if="index < jobForm.conditions.driverLicenses.length - 1"
                        class="fakeInput__txtList__line"
                      ></span>
                    </li>
                  </ul>
                  <p
                    v-if="jobForm.conditions.driverLicenses.length === 0"
                    class="jobDataList__item__txt noContent"
                  >
                    尚未選擇
                  </p>
                </li>
              </ul>
            </div>
            <!-- 申請方法 -->
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>申請方法
              </h3>
              <ul class="jobDataList row">
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-person"></i>職位聯絡人：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.applyContact.name === '' }"
                  >
                    {{ jobForm.applyContact.name || '尚未填寫' }}
                  </p>
                </li>
                <li class="jobDataList__item col-lg-6 col-12">
                  <p class="jobDataList__item__title">
                    <i class="jobIcon--sm me-1 bi bi-envelope"></i>聯絡人職稱：
                  </p>
                  <p
                    class="jobDataList__item__txt"
                    :class="{ noContent: jobForm.applyContact.jobTitle === '' }"
                  >
                    {{ jobForm.applyContact.jobTitle || '尚未填寫' }}
                  </p>
                </li>
                <li class="jobDataList__item col-lg-6 col-12">
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
                <li class="jobDataList__item col-lg-6 col-12">
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
                <li class="jobDataList__item col-12 flex-column align-items-start">
                  <p class="jobDataList__item__title mb-1">申請備註：</p>
                  <div
                    v-html="jobForm.applyContact.otherContent"
                    v-if="jobForm.applyContact.otherContent !== ''"
                  ></div>
                  <p
                    class="jobDataList__item__txt noContent"
                    v-if="jobForm.applyContact.otherContent === ''"
                  >
                    尚未填寫
                  </p>
                </li>
              </ul>
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
                />
                <div class="d-flex justify-content-between">
                  <img
                    v-if="company.companyInfo.companyImgsUrl[1].url !== ''"
                    class="companyImage--sub putPointer"
                    :src="company.companyInfo.companyImgsUrl[1].url"
                    :alt="`${company.companyInfo.companyName}公司圖片2`"
                  />
                  <img
                    v-if="company.companyInfo.companyImgsUrl[2].url !== ''"
                    :src="company.companyInfo.companyImgsUrl[2].url"
                    :alt="`${company.companyInfo.companyName}公司圖片3`"
                    class="companyImage--sub putPointer"
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
            <div class="jobInfoBox box--shadow mb-4 position-relative">
              <div class="d-flex flex-lg-row flex-column">
                <div class="jobInfoBox__imgBox mb-md-0 mb-4 me-5">
                  <ImgInputBoxCompany
                    :imgNumber="0"
                    :mustUpload="false"
                    :inputAction="'single'"
                    :dataName="'jobImgUrl'"
                    :tempImgUrl="jobForm.jobImgUrl.url"
                    @send-img-to-page="getImg"
                  />
                  <p class="subTxt">*如無職位圖片，將使用職位類別預設圖片。</p>
                </div>
                <div class="jobInfoBox__txtBox d-flex flex-column justify-content-between">
                  <!-- 職位名稱 -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormJobName" class="form__label--custom form-label"
                        >職位名稱</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="jobFormJobName"
                      name="職位名稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['職位名稱'] }"
                      placeholder="請輸入職位名稱"
                      rules="required"
                      v-model="jobForm.jobName"
                      ref="jobFormJobName"
                    ></Field>
                    <ErrorMessage name="職位名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <!-- 薪資類型 -->
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormSalaryType" class="form__label--custom form-label"
                        >薪資類型</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <Field
                      id="jobFormSalaryType"
                      ref="jobFormSalaryType"
                      name="薪資類型"
                      as="select"
                      class="form-control form-select w-auto"
                      :class="{ 'is-invalid': errors['薪資類型'] }"
                      rules="required"
                      v-model="jobForm.jobSalaryRange.salaryType"
                    >
                      <option value="" disabled selected>請選擇薪資類型</option>
                      <option v-for="item in formData.salaryType" :value="item" :key="item">
                        {{ item }}
                      </option>
                    </Field>
                  </div>
                  <!-- 薪資範圍 -->
                  <div class="d-flex align-items-end mb-4">
                    <div class="inputGroup--item me-2">
                      <div class="form__labelBox">
                        <label for="jobFormSalaryLow" class="form__label--custom form-label"
                          >薪資範圍起始</label
                        >
                        <p class="formTag--must company">必填</p>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        id="jobFormSalaryLow"
                        placeholder="固定薪資或最低範圍"
                        aria-describedby="薪資待遇範圍起始"
                        v-model="jobForm.jobSalaryRange.salaryLow"
                      />
                    </div>
                    <div class="inputGroup--item me-4">
                      <div class="form__labelBox">
                        <label for="jobFormSalaryHeight" class="form__label--custom form-label"
                          >薪資範圍結束</label
                        >
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        id="jobFormSalaryHeight"
                        placeholder="最高薪資範圍"
                        aria-describedby="薪資待遇範圍結束"
                        v-model="jobForm.jobSalaryRange.salaryHeight"
                      />
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="jobFormSalaryInterView"
                        v-model="jobForm.jobSalaryRange.salaryInterView"
                      />
                      <label class="form-check-label" for="jobFormSalaryInterView"> 面議 </label>
                    </div>
                  </div>
                  <!-- 公司地址 -->
                  <div class="d-flex align-items-end mb-4">
                    <div class="inputGroup--item me-2">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyCity" class="form__label--custom form-label"
                          >公司地址</label
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
                    <div class="inputGroup--item me-4">
                      <div class="form__labelBox">
                        <label for="jobFormCompanyDist" class="form__label--custom form-label"
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
                        @change="show(jobForm.jobAddress.addressDist)"
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
                      <label class="form-check-label" for="sameAddressWithCompany">
                        同公司地址
                      </label>
                    </div>
                  </div>
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormAddressDetail" class="form__label--custom form-label"
                        >公司詳細地址</label
                      >
                    </div>
                    <Field
                      id="jobFormAddressDetail"
                      ref="jobFormAddressDetail"
                      name="公司詳細地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['公司詳細地址'] }"
                      placeholder="請輸入公司詳細地址"
                      v-model="jobForm.jobAddress.addressDetail"
                    ></Field>
                    <ErrorMessage name="公司詳細地址" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>職位內容
              </h3>

              <div class="form__inputBox form__infoEditBox">
                <div class="form__labelBox">
                  <label for="jobFormJobContent" class="form__label--custom form-label"
                    >工作內容</label
                  >
                  <p class="formTag--must company">必填</p>
                </div>
                <ckeditor
                  id="jobFormJobContent"
                  ref="jobFormJobContent"
                  name="工作內容"
                  :editor="editor"
                  tag-name="textarea"
                  v-model="jobForm.jobContent"
                  :config="editorConfig"
                ></ckeditor>
                <Field
                  name="工作內容"
                  type="text"
                  class="form-control d-none"
                  :class="{ 'is-invalid': errors['工作內容'] }"
                  placeholder="請輸入"
                  v-model="jobForm.jobContent"
                  as="textarea"
                  rules="required"
                >
                </Field>
                <ErrorMessage name="工作內容" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>應徵條件
              </h3>
              <div class="row">
                <!-- 學歷 -->
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormEducation" class="form__label--custom form-label"
                        >學歷要求</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <div class="d-flex flex-wrap">
                      <div
                        class="form-check me-2"
                        v-for="(item, index) in formData.education"
                        :key="index"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="item"
                          :id="`education${index}`"
                          name="學歷要求"
                          v-model="jobForm.conditions.education"
                        />
                        <label class="form-check-label" :for="`education${index}`">
                          {{ item }}
                        </label>
                      </div>
                    </div>
                    <Field
                      id="jobFormEducationCheck"
                      ref="jobFormEducationCheck"
                      name="學歷要求"
                      type="text"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['學歷要求'] }"
                      v-model="jobForm.conditions.education"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="學歷要求" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 工作經驗 -->
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormWorkExp" class="form__label--custom form-label"
                        >工作經驗</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <div class="d-flex flex-wrap">
                      <div
                        class="form-check me-2"
                        v-for="(item, index) in formData.workExp"
                        :key="index"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="item"
                          :id="`workExp${index}`"
                          name="工作經驗"
                          v-model="jobForm.conditions.workExp"
                        />
                        <label class="form-check-label" :for="`workExp${index}`">
                          {{ item }}
                        </label>
                      </div>
                    </div>
                    <Field
                      id="jobFormWorkExpCheck"
                      ref="jobFormWorkExpCheck"
                      name="工作經驗"
                      type="text"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['工作經驗'] }"
                      v-model="jobForm.conditions.workExp"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="工作經驗" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 語言 -->
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormLanguage" class="form__label--custom form-label"
                        >語言要求</label
                      >
                    </div>
                    <Field
                      id="jobFormLanguage"
                      ref="jobFormLanguage"
                      name="語言"
                      as="select"
                      class="form-control form-select"
                      :class="{ 'is-invalid': errors['語言'] }"
                      v-model="tempLanguage.name"
                    >
                      <option value="" disabled selected>請選擇</option>
                      <option
                        v-for="language in formData.languages"
                        :value="language"
                        :key="language"
                      >
                        {{ language }}
                      </option>
                    </Field>
                    <ErrorMessage name="語言" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-lg-3 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormLanguageLevel" class="form__label--custom form-label"
                        >語言程度</label
                      >
                    </div>
                    <Field
                      id="jobFormLanguageLevel"
                      ref="jobFormLanguageLevel"
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
                  <button
                    type="button"
                    class="btn--newSkill btn btn-outline-companyColor mb-4"
                    @click="addLanguageData"
                  >
                    <i class="jobIcon--sm bi bi-arrow-90deg-down me-1"></i>
                    加入語言要求
                  </button>
                </div>
                <div class="col-12">
                  <div class="editSkillListBox mb-4">
                    <div class="editSkillListBox__header">
                      <p>已加入之語言要求</p>
                    </div>
                    <ul class="editSkillListBox__list">
                      <template v-for="(item, index) in jobForm.conditions.languages" :key="index">
                        <li class="list__item">
                          <p class="jobTag list__item__skill">
                            {{ item.name
                            }}<span class="list__item__skillLevel">{{ item.languageLevel }}</span>
                            <span
                              ><i
                                class="jobTag__delete jobIcon-sm bi bi-x-lg"
                                @click="jobForm.conditions.languages.splice(index, 1)"
                              ></i
                            ></span>
                          </p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
                <!-- 技能 -->
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormSkillName" class="form__label--custom form-label"
                        >技能要求</label
                      >
                    </div>
                    <Field
                      id="jobFormSkillName"
                      ref="jobFormSkillName"
                      name="技能要求"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['技能要求'] }"
                      placeholder="請輸入技能要求"
                      v-model="tempSkill.name"
                    ></Field>
                  </div>
                </div>
                <div class="col-lg-3 col-12 d-flex align-items-end">
                  <button
                    type="button"
                    class="btn--newSkill btn btn-outline-companyColor mb-4"
                    @click="addSkillData"
                  >
                    <i class="jobIcon--sm bi bi-arrow-90deg-down me-1"></i>
                    加入技能要求
                  </button>
                </div>
                <div class="col-12">
                  <div class="editSkillListBox mb-4">
                    <div class="editSkillListBox__header">
                      <p>已加入之技能要求</p>
                    </div>
                    <ul class="editSkillListBox__list">
                      <template v-for="(item, index) in jobForm.conditions.skills" :key="item.name">
                        <li class="list__item">
                          <p class="jobTag list__item__skill">
                            {{ item.name }}
                            <span
                              ><i
                                class="jobTag__delete jobIcon-sm bi bi-x-lg"
                                @click="jobForm.conditions.skills.splice(index, 1)"
                              ></i
                            ></span>
                          </p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
                <!-- 其他自訂要求 -->
                <div class="col-12">
                  <div class="form__inputBox form__infoEditBox">
                    <div class="form__labelBox">
                      <label for="jobFormOtherRequirement" class="form__label--custom form-label"
                        >其他自訂條件</label
                      >
                    </div>
                    <ckeditor
                      id="jobFormOtherRequirement"
                      ref="jobFormOtherRequirement"
                      name="其他自訂條件"
                      :editor="editor"
                      tag-name="textarea"
                      v-model="jobForm.conditions.otherRequirement"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>其他資訊
              </h3>
              <div class="row">
                <!-- 職務類別 -->
                <div class="col-lg-6 col-12">
                  <div class="inputGroup--item mb-3">
                    <div class="form__labelBox">
                      <label for="jobFormPeopleNeed" class="form__label--custom form-label"
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
                </div>
                <!-- 工作性質 -->
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormWorkType" class="form__label--custom form-label"
                        >工作性質</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <div class="d-flex">
                      <div
                        class="form-check me-4"
                        v-for="(item, index) in jobForm.workType"
                        :key="index"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item.title"
                          :id="`workType${index}`"
                          name="工作性質"
                          v-model="item.select"
                        />
                        <label class="form-check-label" :for="`workType${index}`">
                          {{ item.title }}
                        </label>
                      </div>
                    </div>
                    <Field
                      id="jobFormWorkTypeCheck"
                      ref="jobFormWorkTypeCheck"
                      name="工作性質"
                      type="text"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['工作性質'] }"
                      v-model="jobForm.workType"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="工作性質" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 上班時段 -->
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormWorkTime" class="form__label--custom form-label"
                        >工作時間</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <div class="d-flex">
                      <div
                        class="form-check me-4"
                        v-for="(item, index) in jobForm.workTime"
                        :key="index"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item.title"
                          :id="`workTime${index}`"
                          name="工作時間"
                          v-model="item.select"
                        />
                        <label class="form-check-label" :for="`workTime${index}`">
                          {{ item.title }}
                        </label>
                      </div>
                    </div>
                    <Field
                      id="jobFormWorkTimeCheck"
                      ref="jobFormWorkTimeCheck"
                      name="工作時間"
                      type="text"
                      class="form-control d-none"
                      :class="{ 'is-invalid': errors['工作時間'] }"
                      v-model="jobForm.workTime"
                      rules="required"
                    ></Field>
                    <ErrorMessage name="工作時間" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <!-- 需求人數 -->
                <div class="col-lg-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormPeopleNeed" class="form__label--custom form-label"
                        >需求人數</label
                      >
                      <p class="formTag--must company">必填</p>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      id="jobFormPeopleNeed"
                      placeholder="1"
                      min="1"
                      v-model="jobForm.peopleNeed"
                    />
                  </div>
                </div>
                <!-- 外派需求 -->
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormExpat" class="form__label--custom form-label"
                        >外派需求</label
                      >
                    </div>
                    <div class="d-flex flex-wrap">
                      <div class="form-check me-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="false"
                          id="expat-false"
                          name="expat"
                          checked
                          v-model="jobForm.conditions.expat"
                        />
                        <label class="form-check-label" for="expat-false"> 不需要外派 </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="true"
                          id="expat-true"
                          name="expat"
                          v-model="jobForm.conditions.expat"
                        />
                        <label class="form-check-label" for="expat-true"> 需要外派 </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 駕照需求 -->
                <div class="col-lg-6 col-12">
                  <div class="inputGroup--item mb-3">
                    <label class="form-label inputItem__title"
                      >駕照需求<span class="subTxt ms-2 text-secondary">(最多選3項)</span></label
                    >
                    <div class="fakeInput" @click="openJobDataSettingModal('駕照需求')">
                      <div class="fakeInput__txtList">
                        <p
                          class="text-secondary"
                          v-if="jobForm.conditions.driverLicenses.length < 1"
                        >
                          請選擇
                        </p>
                        <template v-for="that in jobForm.conditions.driverLicenses" :key="that">
                          <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                        </template>
                      </div>
                      <i class="jobIcon bi bi-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <div class="d-flex">
                <h3 class="section__title--sub me-3">
                  <span class="titleTag--doubleCircle me-2"></span>申請方法
                </h3>
                <p>如未填寫，系統會自動帶入建立職位者的聯絡資訊。</p>
              </div>
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormContactName" class="form__label--custom form-label"
                        >聯絡人姓名</label
                      >
                    </div>
                    <Field
                      id="jobFormContactName"
                      ref="jobFormContactName"
                      name="聯絡人姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人姓名'] }"
                      placeholder="請輸入聯絡人姓名"
                      v-model="jobForm.applyContact.name"
                    ></Field>
                    <ErrorMessage name="聯絡人姓名" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormContactTitle" class="form__label--custom form-label"
                        >聯絡人職稱</label
                      >
                    </div>
                    <Field
                      id="jobFormContactTitle"
                      ref="jobFormContactTitle"
                      name="聯絡人職稱"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人職稱'] }"
                      placeholder="請輸入聯絡人職稱"
                      v-model="jobForm.applyContact.jobTitle"
                    ></Field>
                    <ErrorMessage name="聯絡人職稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormContactPhone" class="form__label--custom form-label"
                        >聯絡人電話</label
                      >
                    </div>
                    <Field
                      id="jobFormContactPhone"
                      ref="jobFormContactPhone"
                      name="聯絡人電話"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人電話'] }"
                      placeholder="請輸入聯絡人電話"
                      v-model="jobForm.applyContact.phone"
                    ></Field>
                    <ErrorMessage name="聯絡人電話" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form__inputBox">
                    <div class="form__labelBox">
                      <label for="jobFormContactEmail" class="form__label--custom form-label"
                        >聯絡人Email</label
                      >
                    </div>
                    <Field
                      id="jobFormContactEmail"
                      ref="jobFormContactEmail"
                      name="聯絡人Email"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['聯絡人Email'] }"
                      placeholder="請輸入聯絡人Email"
                      rules="email"
                      v-model="jobForm.applyContact.email"
                    ></Field>
                    <ErrorMessage name="聯絡人Email" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form__inputBox form__infoEditBox">
                    <div class="form__labelBox">
                      <label for="jobFormContactOtherContent" class="form__label--custom form-label"
                        >申請備註</label
                      >
                    </div>
                    <ckeditor
                      id="jobFormContactOtherContent"
                      ref="jobFormContactOtherContent"
                      name="申請備註"
                      :editor="editor"
                      tag-name="textarea"
                      v-model="jobForm.applyContact.otherContent"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
              </div>
            </div>
            <div class="jobContentSection box--shadow mb-4">
              <div class="d-flex">
                <h3 class="section__title--sub me-3">
                  <span class="titleTag--doubleCircle me-2"></span>公司提問
                </h3>
                <p>(可以透過提問事前更了解應徵者，最多可提問3題)</p>
              </div>
              <div class="row">
                <template v-for="(ques, index) in jobForm.questions" :key="index">
                  <div class="col-md-9 col-12">
                    <div class="form__inputBox form__inputBox--question">
                      <div class="form__labelBox">
                        <label for="jobFormContactName" class="form__label--custom form-label">{{
                          `第${index + 1}題`
                        }}</label>
                      </div>
                      <Field
                        id="jobFormContactName"
                        ref="jobFormContactName"
                        :name="`第${index + 1}題`"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors[`第${index + 1}題`] }"
                        :placeholder="`請輸入第${index + 1}題`"
                        v-model="ques.content"
                      >
                      </Field>
                      <button
                        @click="jobForm.questions.splice(index, 1)"
                        type="button"
                        class="iconBox btn btn--circle"
                      >
                        <div class="iconBox__innerBox">
                          <i class="jobIcon bi bi-x-lg"></i>
                        </div>
                      </button>
                      <ErrorMessage
                        :name="`第${index + 1}題`"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-md-3 col-12 d-flex align-items-end">
                    <div class="form__inputBox">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="`第${index + 1}題語音`"
                          v-model="ques.voice"
                        />
                        <label class="form-check-label" :for="`第${index + 1}題語音`">
                          允許語音回答
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                @click="newQuestion"
                v-if="this.jobForm.questions.length < 3"
              >
                新增問題
              </button>
            </div>
          </div>
          <div class="col-lg-3 col-12">
            <div class="jobContentSection box--shadow mb-lg-0 mb-3">
              <h3 class="section__title--sub">
                <span class="titleTag--doubleCircle me-2"></span>付費服務
              </h3>
              <div class="inputGroup--item mb-3">
                <label class="form-label inputItem__title">是否升級為推廣職位</label>
                <div
                  class="btn border-gray-line border btn--switch putPointer"
                  @click="jobForm.promotedData.promote = !jobForm.promotedData.promote"
                >
                  使用付費推廣
                  <div class="switch__container" :class="{ active: jobForm.promotedData.promote }">
                    <div class="switch__controller"></div>
                  </div>
                </div>
              </div>
              <div class="inputGroup--item mb-3" v-if="jobForm.promotedData.promote">
                <label class="form-label inputItem__title">使用額度</label>
                <div class="fakeInput--counter">
                  <div
                    class="fakeBtn"
                    @click="minusData('jobPromoted')"
                    :class="{ disActive: jobForm.promotedData.usedToken < 2 }"
                  >
                    <i class="jobIcon bi bi-dash-circle"></i>
                  </div>
                  <p>{{ jobForm.promotedData.usedToken }}</p>
                  <div
                    class="fakeBtn"
                    @click="plusData('jobPromoted')"
                    :class="{
                      disActive:
                        jobForm.promotedData.usedToken >= company.payService.jobPromoteTokens,
                    }"
                  >
                    <i class="jobIcon bi bi-plus-circle"></i>
                  </div>
                </div>
              </div>
              <p>收費方式：一個額度推廣 7 天</p>
              <p class="mb-5">起算日期：於刊登日期後連續 7 天</p>
              <button type="button" class="btn btn-outline-gray-line text-dark w-100">
                了解付費推廣的好處
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
  </div>
  <JobDataSettingModal @return-job-data-setting="saveModalData" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';
import ImgInputBoxCompany from '@/components/helpers/ImgInputBoxCompany.vue';
import JobDataSettingModal from '@/components/company/JobDataSettingModal.vue';

export default {
  components: {
    UpTopBtn,
    JobDataSettingModal,
    ImgInputBoxCompany,
  },
  data() {
    return {
      dataReady: false,
      jobkey: '',
      company: {},
      jobForm: {
        id: null,
        jobName: '',
        is_enabled: true,
        jobCategory: [],
        jobImgUrl: { url: '', key: '' },
        peopleNeed: null,
        workTime: [
          { title: '日班', select: false },
          { title: '夜班', select: false },
          { title: '假日班', select: false },
        ],
        workType: [
          { title: '全職', select: false },
          { title: '兼職', select: false },
          { title: '實習', select: false },
        ],
        expat: null,
        companyInfo: {
          companyName: '',
          companyLogoUrl: '',
          companyKey: '',
          companyIndustry: '',
        },
        jobAddress: {
          addressCity: '',
          addressDist: '',
          addressDetail: '',
          companyAddress: '',
        },
        jobSalaryRange: {
          salaryLow: null,
          salaryHeight: null,
          salaryInterView: false,
          salaryType: '月薪',
        },
        createdTime: null,
        editedTime: null,
        promotedData: {
          promote: false,
          time: null,
          usedToken: 1,
        },
        questions: [{ content: '', key: '', voice: false }],
        jobContent: '',
        conditions: {
          workExp: '',
          education: '',
          languages: [],
          skills: [],
          driverLicenses: [],
          otherRequirement: '',
          jobCategory: [],
          identity: [],
          militaryService: '',
        },
        applyContact: {
          name: '',
          email: '',
          phone: '',
          jobTitle: '',
          otherContent: '',
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
      questions: {
        answer: '',
      },
      cropper: {}, // 套件切圖工具
      pagePreview: false, // 預覽編輯
      tempLanguage: {
        // 處理語言要求用
        name: '',
        languageLevel: null,
        otherSupport: '',
      },
      tempLanguageList: [],
      tempSkill: {
        // 處理技能要求用
        name: '',
        otherSupport: '',
      },
      tempSkillList: [],
      tempImgurl: '',
    };
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
    goToPageLink(routerLink) {
      this.$router.push(routerLink);
    },
    // promote token +1
    plusData(dataName) {
      if (dataName === 'jobPromoted') {
        if (this.jobForm.promotedData.usedToken < this.company.payService.jobPromoteTokens) {
          this.jobForm.promotedData.usedToken += 1;
        }
      }
    },
    // promote token -1
    minusData(dataName) {
      if (dataName === 'jobPromoted') {
        if (this.jobForm.promotedData.usedToken > 1) {
          this.jobForm.promotedData.usedToken -= 1;
        }
      }
    },
    // If user use promote, It will cost token.
    costCompanyJobPromoteTokens() {
      if (this.jobForm.promotedData.promote) {
        this.company.payService.jobPromoteTokens -= this.jobForm.promotedData.usedToken;
        const companyRef = database.ref('company/payService');
        companyRef.set(this.company.payService);
      }
    },
    // New a preInterview question to job form.
    newQuestion() {
      if (this.jobForm.questions.length < 3) {
        this.jobForm.questions.push({ content: '', key: '', voice: false });
      }
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
    // New a skill to job form.
    addSkillData() {
      const obj = {
        name: this.tempSkill.name,
        otherSupport: '',
      };
      this.jobForm.conditions.skills.push(obj);
      this.tempSkill.name = '';
    },
    // New a language to job form.
    addLanguageData() {
      const obj = {
        name: this.tempLanguage.name,
        languageLevel: this.tempLanguage.languageLevel,
        otherSupport: '',
      };
      this.jobForm.conditions.languages.push(obj);
      this.tempLanguage.name = '';
      this.tempLanguage.languageLevel = '';
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
    checkJobDataExist() {
      if (!this.jobForm.conditions.languages) {
        this.jobForm.conditions.languages = [];
      } else if (!this.jobForm.conditions.skills) {
        this.jobForm.conditions.skills = [];
      } else if (!this.jobForm.conditions.driverLicenses) {
        this.jobForm.conditions.driverLicenses = [];
      } else if (!this.jobForm.conditions.identity) {
        this.jobForm.conditions.identity = [];
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
    // Get img data form Cropper modal.
    getImg(data) {
      console.log(data);
      this.jobForm.jobImgUrl.url = data.url;
      this.jobForm.jobImgUrl.key = data.key;
    },
    // save job to company's job list.
    saveJobData() {
      if (this.jobForm.applyContact.name === '') {
        this.putContactInfoToJob();
      }
      this.jobForm.jobAddress.companyAddress = `${this.jobForm.jobAddress.addressCity}，${this.jobForm.jobAddress.addressDist}，${this.jobForm.jobAddress.addressDetail}`;
      const jobRef = database.ref(`company/jobList/${this.jobkey}`);
      const obj = this.jobForm;
      jobRef.set(obj);
      this.$router.push('/company-admin/job-list');
    },
    // put basic company info into job form.
    putCompanyDataToJob() {
      this.jobForm.companyInfo.companyName = this.company.companyInfo.companyName;
      this.jobForm.companyInfo.companyLogoUrl = this.company.companyInfo.companyLogoUrl;
      this.jobForm.companyInfo.companyKey = '12345678';
      this.jobForm.companyInfo.companyIndustry = this.company.companyInfo.companyIndustry;
    },
    // put company main contact info to job form.
    putContactInfoToJob() {
      this.jobForm.applyContact.name = this.company.mainContact.name;
      this.jobForm.applyContact.jobTitle = this.company.mainContact.jobTitle;
      this.jobForm.applyContact.mail = this.company.mainContact.mail;
      this.jobForm.applyContact.phone = this.company.mainContact.phone;
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
      const jobRef = database.ref(`company/jobList/${this.jobkey}`);
      jobRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.jobForm = data;
          console.log(this.jobForm);
          this.checkJobDataExist();
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
};
</script>

<style lang="scss"></style>
