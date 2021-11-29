<template>
  <div class="adminPage--py">
    <AdminNav :nowPage="nowPage" />
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-3">
          <div class="sideContentBox pb-3">
            <div class="sideContentBox__header pt-5">
              <div class="userImgBox mb-4 bg-gray-light mx-auto">
                <img class="userImgBox__img" :src="user.account.userImgUrl" alt="" />
                <div class="userImgBox__editBtn">
                  <button type="button" class="btn btn--circle" @click="openEditUserPhotoModal">
                    <i class="jobIcon bi bi-pencil-square text-dark"></i>
                  </button>
                </div>
              </div>
              <p class="strongTxt mb-3 text-center">曾鼎鈞</p>
              <div class="form__input w-100">
                <div
                  class="inputItem__switch form-check form-switch border border-gray-line rounded"
                >
                  <input
                    id="sendFormInfoCostToken"
                    type="checkbox"
                    class="form-check-input ms-0 me-2 mt-0"
                    data-action="showCompanyJob"
                    :checked="personalState ? true : false"
                    @change="toogleData('personalState')"
                  />
                  <label
                    class="form-check-label"
                    for="sendFormInfoCostToken"
                    :class="{ 'text-primary-dark': personalState === true }"
                  >
                    {{ personalState ? `開放求職中` : `已關閉求職` }}
                  </label>
                </div>
              </div>
            </div>
            <ul class="innerList innerList--jobSeeker innerList--checkList">
              <li
                class="innerList__item"
                @click="selectListItem('個人資料')"
                :class="{ active: settingSideList === '個人資料' }"
              >
                <p class="item__title">個人資料</p>
                <i class="checkIcon--jobSeeker jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="innerList__item"
                @click="selectListItem('工作經驗')"
                :class="{ active: settingSideList === '工作經驗' }"
              >
                <p class="item__title">工作經驗</p>
                <i class="checkIcon--jobSeeker jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="innerList__item"
                @click="selectListItem('教育程度')"
                :class="{ active: settingSideList === '教育程度' }"
              >
                <p class="item__title">教育程度</p>
                <i class="checkIcon--jobSeeker jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="innerList__item"
                @click="selectListItem('專業技能')"
                :class="{ active: settingSideList === '專業技能' }"
              >
                <p class="item__title">專業技能</p>
                <i class="checkIcon--jobSeeker jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="innerList__item"
                @click="selectListItem('其他')"
                :class="{ active: settingSideList === '其他' }"
              >
                <p class="item__title">其他</p>
                <i class="checkIcon--jobSeeker jobIcon bi bi-check-circle-fill"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <!-- 個人資訊 -->
          <div class="adminContentBox adminContentBox--p" v-if="settingSideList === '個人資料'">
            <h3 class="pageSubTitle mb-4">個人資料</h3>
            <div class="remind mb-4">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                您於基本資料，並不會被外部搜尋引擎所搜尋，同時 SendCV
                將依照個人資料保護法保障您的個人隱私，請放心～
              </p>
            </div>
            <div class="adminContentBox__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editPersonalData')"
              >
                編輯
              </button>
            </div>
            <div v-if="!editMode">
              <ul class="infoList infoList--jobSeeker row row-cols-lg-2 row-cols-1 mb-5">
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">姓名</p>
                    <p class="infoList__item__content">{{ user.account.chineseName }}</p>
                  </div>
                </li>
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">目前職稱</p>
                    <p class="infoList__item__content">{{ user.account.jobTitle }}</p>
                  </div>
                </li>
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">性別</p>
                    <p class="infoList__item__content">
                      {{ user.account.gender === '男性' ? '男性' : '女性' }}
                    </p>
                  </div>
                </li>
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">生日</p>
                    <p class="infoList__item__content">{{ user.account.birthday }}</p>
                  </div>
                </li>
              </ul>
              <ul class="infoList infoList--jobSeeker row row-cols-lg-2 row-cols-1 mb-5">
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">電子信箱</p>
                    <p class="infoList__item__content">{{ user.account.email }}</p>
                  </div>
                </li>
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">聯絡電話</p>
                    <p class="infoList__item__content">{{ user.account.phone }}</p>
                  </div>
                </li>
                <li class="col">
                  <div class="infoList__item">
                    <p class="infoList__item__title">居住地址</p>
                    <p class="infoList__item__content">
                      {{ user.account.addressCity }}，{{ user.account.addressDist }}
                    </p>
                  </div>
                </li>
              </ul>
              <ul class="infoList infoList--jobSeeker">
                <li class="infoList__item list--last">
                  <p class="infoList__item__title">社群連結</p>
                  <div class="infoList__item__socialMediaBox putPointer mb-2">
                    <i class="jobIcon bi bi-facebook me-6"></i>
                    <div>
                      <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                      <p class="txtLink">FaceBook</p>
                    </div>
                  </div>
                  <div class="infoList__item__socialMediaBox putPointer mb-2">
                    <i class="jobIcon bi bi-google me-6"></i>
                    <div>
                      <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                      <p class="txtLink">Google</p>
                    </div>
                  </div>
                  <div class="infoList__item__socialMediaBox putPointer">
                    <i class="jobIcon bi bi-globe2 me-6"></i>
                    <div>
                      <p class="socialMediaBox__title mb-1">個人作品網站</p>
                      <p class="txtLink">https://Jordan.ttc.design.com</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="editTemplate === 'editPersonalData'">
              <Form
                ref="editAccountPersonalData"
                v-slot="{ errors }"
                @submit="saveEditTemplateData"
              >
                <div class="row">
                  <!-- 姓名 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataName" class="labelBox__label form-label">姓名</label>
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="accountDataName"
                        ref="accountDataName"
                        name="姓名"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名"
                        rules="required"
                        v-model="user.account.chineseName"
                      ></Field>
                      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <!-- 職稱 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataJobTitle" class="labelBox__label form-label"
                          >目前職稱</label
                        >
                      </div>
                      <Field
                        id="accountDataJobTitle"
                        ref="accountDataJobTitle"
                        name="目前職稱"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['目前職稱'] }"
                        placeholder="目前職稱"
                        v-model="user.account.jobTitle"
                      ></Field>
                      <ErrorMessage name="目前職稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <!-- 性別 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataGender" class="labelBox__label form-label"
                          >性別</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <div class="d-flex flex-wrap">
                        <div
                          class="form-check me-2"
                          v-for="(item, index) in formData.gender"
                          :key="index"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            :id="`gender--${index}`"
                            name="性別"
                            :value="item"
                            v-model="user.account.gender"
                          />
                          <label class="form-check-label" :for="`gender--${index}`">
                            {{ item }}
                          </label>
                        </div>
                      </div>
                      <Field
                        id="accountDataGender"
                        ref="accountDataGender"
                        name="性別"
                        type="text"
                        class="form-control d-none"
                        :class="{ 'is-invalid': errors['性別'] }"
                        rules="required"
                        v-model="user.account.gender"
                      ></Field>
                      <ErrorMessage name="性別" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <!-- 生日 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataBirthday" class="labelBox__label form-label"
                          >生日</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="accountDataBirthday"
                        ref="accountDataBirthday"
                        name="生日"
                        type="date"
                        class="form-control"
                        :class="{ 'is-invalid': errors['生日'] }"
                        placeholder="請輸入生日"
                        rules="required"
                        v-model="user.account.birthday"
                      ></Field>
                      <ErrorMessage name="生日" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <!-- 電子郵件 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="labelBox__label form-label"
                          >電子郵件</label
                        >
                      </div>
                      <input
                        id="accountDataEmail"
                        ref="accountDataEmail"
                        name="電子郵件"
                        type="email"
                        class="form-control"
                        placeholder="請輸入電子郵件"
                        v-model="user.account.email"
                        readonly
                      />
                    </div>
                  </div>
                  <!-- 聯絡電話 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataPhone" class="labelBox__label form-label"
                          >聯絡電話</label
                        >
                      </div>
                      <input
                        id="accountDataPhone"
                        ref="accountDataPhone"
                        name="聯絡電話"
                        type="phone"
                        class="form-control"
                        placeholder="請輸入聯絡電話"
                        v-model="user.account.phone"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-12 d-flex">
                    <div class="form__input me-2">
                      <div class="form__labelBox">
                        <label for="accountDataCity" class="labelBox__label form-label"
                          >居住地址</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="accountDataCity"
                        ref="accountDataCity"
                        name="縣市"
                        as="select"
                        class="form-control form-select w-auto mb-2"
                        :class="{ 'is-invalid': errors['縣市'] }"
                        rules="required"
                        v-model="user.account.addressCity"
                        @change="choose(user.account.addressCity)"
                      >
                        <option value="" disabled selected>請選擇縣市</option>
                        <option v-for="city in formData.cities" :value="city" :key="city">
                          {{ city }}
                        </option>
                      </Field>
                      <ErrorMessage name="縣市" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form__input">
                      <div class="form__labelBox">
                        <label for="accountDataCity" class="labelBox__label form-label"
                          >區域鄉鎮</label
                        >
                        <p class="formTag--must">必填</p>
                      </div>
                      <Field
                        id="accountDataDist"
                        ref="accountDataDist"
                        name="區域鄉鎮"
                        as="select"
                        class="form-control form-select w-auto mb-2"
                        :class="{ 'is-invalid': errors['區域鄉鎮'] }"
                        rules="required"
                        v-model="user.account.addressDist"
                        @change="show(user.account.addressDist)"
                      >
                        <option value="" disabled selected>請選擇區域鄉鎮</option>
                        <option v-for="dist in chooseCityDist" :value="dist" :key="dist">
                          {{ dist }}
                        </option>
                      </Field>
                      <ErrorMessage name="區域鄉鎮" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-gray-light me-2">取消</button>
                    <button type="submit" class="btn btn-primary">保存</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <!-- 工作經驗 -->
          <div class="adminContentBox adminContentBox--p" v-if="settingSideList === '工作經驗'">
            <h3 class="pageSubTitle mb-5">工作經驗</h3>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                建議可以依照時間先後建立資訊，並且多描述在該企業上班時所貢獻之事物，讓企業能了解您的特質與能力。
              </p>
            </div>
            <div class="adminContentBox__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editWorkExp--new')"
                :disabled="editMode"
              >
                <i
                  class="jobIcon--sm bi bi-plus-lg me-1"
                  :class="{ 'text-gray-line': editMode }"
                ></i
                >新增工作經驗
              </button>
            </div>
            <div>
              <div
                class="
                  d-flex
                  bg-gray-light
                  rounded
                  justify-content-between
                  align-items-center
                  p-3
                  mb-3
                "
              >
                <div>
                  <p class="d-inline-block me-4">總年資</p>
                  <p class="d-inline-block">2年6個月</p>
                </div>
              </div>
              <ul class="row">
                <li class="col-12">
                  <WorkExpTemplate
                    v-if="editTemplate === 'editWorkExp--new'"
                    :workExpData="tempWorkExp"
                    :formNumber="'new'"
                    @returnWorkExpData="saveWorkExpData"
                    @reuturnCloseForm="closeTemplate"
                  />
                </li>
                <template v-for="(tempItem, index) in user.workExp.works" :key="index">
                  <li class="col-12">
                    <div
                      class="infoList__item infoList__item--job"
                      :ref="`workExp--${index}`"
                      :class="{
                        'd-none': editTemplate === `editWorkExp--${index}`,
                        'list--last': index === user.workExp.works.length - 1,
                      }"
                    >
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <div class="d-flex">
                            <p class="infoList__item__jobTitle mb-1 me-2">
                              {{ tempItem.companyName }}
                            </p>
                            <p class="infoList__item__jobTitle mb-1">
                              <span class="me-2">-</span>{{ tempItem.jobName }}
                            </p>
                          </div>
                          <p class="infoList__item__subTitle mb-3">
                            {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                            {{
                              tempItem.isStillWork
                                ? '仍在職'
                                : `${tempItem.endYear}.${tempItem.endMonth}`
                            }}
                          </p>
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn position-relative"
                            type="button"
                            :id="`dropdownMenuButton--workExp--${index}`"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            :disabled="editMode"
                          >
                            <i class="jobIcon bi bi-three-dots"></i>
                          </button>
                          <ul
                            :ref="`dropDownMenu--${index}`"
                            class="dropDownMenu dropdown-menu"
                            :aria-labelledby="`dropdownMenuButton--workExp--${index}`"
                          >
                            <li
                              class="dropDownMenu__item dropdown-item"
                              @click="editTemplateData(`editWorkExp--${index}`)"
                            >
                              編輯
                            </li>
                            <li class="dropDownMenu__item dropdown-item">調整排序</li>
                            <li
                              class="dropDownMenu__item dropdown-item"
                              @click="deleteTemplateData('workExp', index)"
                            >
                              刪除
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="infoList__item__contentBox">
                        <p class="contentBox__title mb-1">職務內容與成就</p>
                        <div class="infoList__item__content" v-html="tempItem.jobContent"></div>
                      </div>
                    </div>
                  </li>
                  <li class="col-12">
                    <WorkExpTemplate
                      v-if="editTemplate === `editWorkExp--${index}`"
                      :workExpData="tempItem"
                      :formNumber="index"
                      @returnWorkExpData="saveWorkExpData"
                      @reuturnCloseForm="closeTemplate"
                    />
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- 教育程度 -->
          <div class="adminContentBox adminContentBox--p" v-if="settingSideList === '教育程度'">
            <h3 class="pageSubTitle mb-5">教育程度</h3>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">建議可以簡述在您於該所學校學習之專業技能、學習經歷。</p>
            </div>
            <div class="adminContentBox__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editEducationExp--new')"
              >
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增教育程度
              </button>
            </div>
            <div>
              <div
                class="
                  d-flex
                  bg-gray-light
                  rounded
                  justify-content-between
                  align-items-center
                  p-3
                  mb-3
                "
              >
                <div>
                  <p class="d-inline-block me-4">最高學歷</p>
                  <p class="d-inline-block">碩士</p>
                </div>
              </div>
              <ul class="row">
                <li class="col-12">
                  <EducationExpTemplate
                    v-if="editTemplate === `editEducationExp--new`"
                    :educationExpData="tempEducation"
                    :formNumber="'new'"
                    @returnEducationExpData="saveEducationExpData"
                    @reuturnCloseForm="closeTemplate"
                  />
                </li>
                <template v-for="(tempItem, index) in user.educationExp.educations" :key="index">
                  <li class="col-12">
                    <div
                      class="infoList__item infoList__item--job"
                      :ref="`educationExp--${index}`"
                      :class="{
                        'd-none': editTemplate === `editEducationExp--${index}`,
                        'list--last': index === user.educationExp.educations.length - 1,
                      }"
                    >
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <p class="infoList__item__jobTitle mb-1">
                            {{ tempItem.schoolName }} - {{ tempItem.majorName }}
                          </p>
                          <p class="infoList__item__subTitle mb-3">
                            {{ `${tempItem.startYear}.${tempItem.startMonth}` }} ~
                            {{
                              tempItem.isStillAtSchool
                                ? '仍在學'
                                : `${tempItem.endYear}.${tempItem.endMonth}`
                            }}
                            <span class="ms-2 text-secondary">{{ tempItem.educationLevel }}</span>
                          </p>
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn position-relative"
                            type="button"
                            :id="`dropdownMenuButton--education--${index}`"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            :disabled="editMode"
                          >
                            <i class="jobIcon bi bi-three-dots"></i>
                          </button>
                          <ul
                            :ref="`dropDownMenu--${index}`"
                            class="dropDownMenu dropdown-menu"
                            :aria-labelledby="`dropdownMenuButton--education--${index}`"
                          >
                            <li
                              class="dropDownMenu__item dropdown-item"
                              @click="editTemplateData(`editEducationExp--${index}`)"
                            >
                              編輯
                            </li>
                            <li class="dropDownMenu__item dropdown-item">調整排序</li>
                            <li
                              class="dropDownMenu__item dropdown-item"
                              @click="deleteTemplateData('education', index)"
                            >
                              刪除
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="infoList__item__contentBox">
                        <p class="contentBox__title mb-1">學習專業與經歷</p>
                        <div
                          class="infoList__item__content"
                          v-html="tempItem.educationContent"
                        ></div>
                      </div>
                    </div>
                  </li>
                  <li class="col-12">
                    <EducationExpTemplate
                      v-if="editTemplate === `editEducationExp--${index}`"
                      :educationExpData="tempItem"
                      :formNumber="index"
                      @returnEducationExpData="saveEducationExpData"
                      @reuturnCloseForm="closeTemplate"
                    />
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- 專業技能 -->
          <div class="adminContentBox adminContentBox--p" v-if="settingSideList === '專業技能'">
            <h3 class="pageSubTitle mb-5">專業技能</h3>
            <div class="adminContentBox__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editSkill--new')"
              >
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增專業技能
              </button>
            </div>
            <ul class="infoList infoList--jobSeeker" v-if="skillShowStyle === true">
                <!-- 語言 -->
                <li
                  ref="languageData"
                  class="infoList__item show--compressed"
                  :class="{ 'd-none': editTemplate === 'editLanguage' }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="infoList__item__title">語言</p>
                      <ul class="infoList__innerList">
                        <template v-for="(item, index) in user.languages" :key="index">
                          <li class="infoList__innerList__item">
                            <p>{{ item.name }} - {{ item.languageLevel }}</p>
                          </li>
                        </template>
                      </ul>
                    </div>
                    <div class="dropdown">
                      <button
                        class="btn position-relative"
                        type="button"
                        :id="`dropdownMenuButton--language`"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :disabled="editMode"
                      >
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                      <ul
                        :ref="`dropDownMenu--language`"
                        class="dropDownMenu dropdown-menu"
                        :aria-labelledby="`dropdownMenuButton--language`"
                      >
                        <li
                          class="dropDownMenu__item dropdown-item"
                          @click="editTemplateData(`editLanguage`)"
                        >
                          編輯
                        </li>
                        <li class="dropDownMenu__item dropdown-item">調整排序</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <!-- 語言編輯 -->
                <li>
                  <LanguageDataTemplate
                    v-if="editTemplate === `editLanguage`"
                    :sendLanguages="user.languages"
                    @returnLanguageData="saveLanguageData"
                    @reuturnCloseForm="closeTemplate"
                  />
                </li>
                <!-- 證照 -->
                <li
                  class="infoList__item show--compressed"
                  :class="{ 'd-none': editTemplate === 'editLicense' }"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="infoList__item__title">證照</p>
                      <ul class="infoList__innerList">
                        <template v-for="(item, index) in user.licenses" :key="index">
                          <li class="infoList__innerList__item">
                            <p>{{ item.name }}</p>
                          </li>
                        </template>
                      </ul>
                    </div>
                    <div class="dropdown">
                      <button
                        class="btn position-relative"
                        type="button"
                        :id="`dropdownMenuButton--license`"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :disabled="editMode"
                      >
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                      <ul
                        :ref="`dropDownMenu--license`"
                        class="dropDownMenu dropdown-menu"
                        :aria-labelledby="`dropdownMenuButton--license`"
                      >
                        <li
                          class="dropDownMenu__item dropdown-item"
                          @click="editTemplateData(`editLicense`)"
                        >
                          編輯
                        </li>
                        <li class="dropDownMenu__item dropdown-item">調整排序</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <!-- 證照編輯 -->
                <li>
                  <LicenseDataTemplate
                    v-if="editTemplate === `editLicense`"
                    :sendLicenses="user.licenses"
                    @returnLicenseData="saveLicenseData"
                    @reuturnCloseForm="closeTemplate"
                  />
                </li>
                <!-- 技能 -->
                <template v-for="(skill, index) in user.skills" :key="index">
                  <li
                    class="infoList__item show--compressed"
                    :class="{
                      'd-none': editTemplate === `editSkill--${index}`,
                      'list--last': index === user.skills.length - 1,
                    }"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">{{ skill.groupName }}</p>
                        <ul class="infoList__innerList">
                          <template v-for="item in skill.skillList" :key="item.name">
                            <li class="infoList__innerList__item">
                              <p>{{ item.name }}</p>
                            </li>
                          </template>
                        </ul>
                      </div>
                      <div class="dropdown">
                        <button
                          class="btn position-relative"
                          type="button"
                          :id="`dropdownMenuButton--skill--${index}`"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          :disabled="editMode"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                        </button>
                        <ul
                          :ref="`dropDownMenu--${index}`"
                          class="dropDownMenu dropdown-menu"
                          :aria-labelledby="`dropdownMenuButton--skill--${index}`"
                        >
                          <li
                            class="dropDownMenu__item dropdown-item"
                            @click="editTemplateData(`editSkill--${index}`)"
                          >
                            編輯
                          </li>
                          <li class="dropDownMenu__item dropdown-item">調整排序</li>
                          <li
                            class="dropDownMenu__item dropdown-item"
                            @click="deleteTemplateData('skill', index)"
                          >
                            刪除
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <!-- 技能編輯 -->
                  <li>
                    <SkillDataTemplate
                      v-if="editTemplate === `editSkill--${index}`"
                      :sendSkillData="skill"
                      :formNumber="index"
                      @returnSkillData="saveSkillData"
                      @reuturnCloseForm="closeTemplate"
                    />
                  </li>
                </template>
                <!-- 新增技能 -->
                <li>
                  <SkillDataTemplate
                    v-if="editTemplate === `editSkill--new`"
                    :sendSkillData="tempSkillList"
                    :formNumber="'new'"
                    @returnSkillData="saveSkillData"
                    @reuturnCloseForm="closeTemplate"
                  />
                </li>
              </ul>
          </div>
          <!-- 其他 -->
          <div class="adminContentBox adminContentBox--p" v-if="settingSideList === '其他'">
            <h3 class="pageSubTitle mb-5">其他</h3>
            <ul class="infoList infoList--jobSeeker">
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">駕照</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.others.driverLicenses" :key="index">
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn text-dark btn-gray-light"
                    @click="openSettingModal('變更駕照')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">特殊身份</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.others.identities" :key="index">
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn text-dark btn-gray-light"
                    @click="openSettingModal('變更身份')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
              <li class="infoList__item">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">兵役</p>
                    <ul class="infoList__innerList">
                      <template v-for="(item, index) in user.others.militaryServices" :key="index">
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <button
                    type="button"
                    class="btn--edit btn text-dark btn-gray-light"
                    @click="openSettingModal('變更兵役')"
                  >
                    <i class="jobIcon--sm bi bi-pencil-square me-1"></i>編輯
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SettingPersonalDataModal @reload="getFbData" />
  <UserPhotoEdit :userImgUrl="user.account.userImgUrl" @emit-send-img-data="getImg" />
</template>

<script>
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import AdminNav from '@/components/admin/AdminNav.vue';
import UserPhotoEdit from '@/components/admin/UserPhotoEdit.vue';
import WorkExpTemplate from '@/components/admin/WorkExpTemplate.vue';
import EducationExpTemplate from '@/components/admin/EducationExpTemplate.vue';
import LanguageDataTemplate from '@/components/admin/LanguageDataTemplate.vue';
import LicenseDataTemplate from '@/components/admin/LicenseDataTemplate.vue';
import SkillDataTemplate from '@/components/admin/SkillDataTemplate.vue';
import SettingPersonalDataModal from '@/components/admin/SettingPersonalDataModal.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    AdminNav,
    WorkExpTemplate,
    UserPhotoEdit,
    EducationExpTemplate,
    SkillDataTemplate,
    LanguageDataTemplate,
    LicenseDataTemplate,
    SettingPersonalDataModal,
  },
  data() {
    return {
      date: new Date(),
      nowPage: '基本資料',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      editMode: false,
      editTemplate: '', // 編輯哪一塊
      formData: {},
      chooseCityDist: [],
      user: {
        account: {
          chineseName: '',
          englishName: '',
          jobTitle: '',
          gender: '',
          birthday: '',
          email: '',
          phone: '',
          addressCity: '',
          addressDist: '',
          password: '',
          socialMedia: [],
        },
        workExp: {
          years: 0,
          works: [],
        },
        educationExp: {
          lastestEducation: '',
          educations: [],
        },
        languages: [],
        licenses: [],
        skill: [],
        others: {
          driverLicenses: [],
          identities: [],
          militaryServices: [],
        },
        career: {
          workType: [],
          workTime: [],
          targetJobs: [],
          targetIndustries: [],
          targetPlaces: [],
          expat: null,
          salaryRange: {
            lowest: 0,
            highest: 0,
            interview: null,
          },
        },
      },
      tempImgurl: '',
      tempWorkExp: {},
      tempEducation: {},
      tempSkill: {},
      tempLanguage: {},
      tempLicense: '',
      tempSkillList: { groupName: '', skillList: [] },
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
      console.log(data);
      console.dir(this.$filters.date(data));
      console.log(data);
    },
  },
  methods: {
    getImg(data) {
      this.tempImgurl = data;
      this.updateImg();
    },
    updateImg() {
      emitter.emit('spinner-open');
      const item = this.tempImgurl;
      const base64String = item.replace('data:image/jpeg;base64,', '');
      console.log(item);
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: {
          image: base64String,
          type: 'base64',
        },
        headers: {
          Authorization: 'Client-ID ef6e862acf052df',
        },
      })
        .then((res) => {
          this.user.account.userImgUrl = res.data.data.link;
          this.saveAllData();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          console.log(err);
          emitter.emit('spinner-close');
        });
    },
    openEditUserPhotoModal() {
      emitter.emit('open-uploadUserImgModal', '個人照片說明1');
    },
    editTemplateData(txt) {
      this.editMode = true;
      this.editTemplate = txt;
    },
    saveWorkExpData(obj) {
      if (obj.num === 'new') {
        this.user.workExp.works.push(obj.data);
      } else {
        this.user.workExp.works[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveSkillData(obj) {
      if (obj.num === 'new') {
        this.user.skills.push(obj.data);
      } else {
        this.user.skills[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveEducationExpData(obj) {
      if (obj.num === 'new') {
        this.user.educationExp.educations.push(obj.data);
      } else {
        this.user.educationExp.educations[obj.num] = obj.data;
      }
      this.saveAllData();
      this.closeTemplate();
    },
    saveLanguageData(obj) {
      this.user.languages = obj;
      this.saveAllData();
      this.closeTemplate();
    },
    saveLicenseData(obj) {
      this.user.licenses = obj;
      this.saveAllData();
      this.closeTemplate();
    },
    saveEditTemplateData() {
      this.editTemplate = '';
      this.saveAllData();
    },
    closeTemplate() {
      this.editTemplate = '';
      this.editMode = false;
    },
    deleteTemplateData(action, index) {
      if (action === 'workExp') {
        this.user.workExp.works.splice(index, 1);
      } else if (action === 'education') {
        this.user.educationExp.educations.splice(index, 1);
      } else if (action === 'skill') {
        this.user.skills.splice(index, 1);
      }
      this.saveAllData();
      this.getFbData();
    },
    // 保存資料
    saveAllData() {
      const userRef = database.ref('user');
      userRef.set(this.user);
      this.getFbData();
      this.editMode = false;
    },
    // 取得資料
    getFbData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.user = data;
      });
    },
    choose(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.user.account.addressDist = temDist;
    },
    // 切換
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
    },
    // 切換頁面
    selectListItem(navName) {
      this.settingSideList = navName;
      this.closeTemplate();
    },
    // 編輯其他資訊
    openSettingModal(action) {
      const obj = {
        action,
        user: this.user,
      };
      emitter.emit('open-setting-career-modal', obj);
    },
    defaultTempData() {
      this.tempWorkExp = {
        companyName: '',
        jobName: '',
        jobContent: '',
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillWork: false,
      };
      this.tempEducation = {
        schoolName: '',
        majorName: '',
        educationContent: '',
        educationLevel: null,
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        isStillAtSchool: false,
      };
      this.tempSkill = {
        name: '',
        otherSupport: '',
      };
      this.tempSkillList = { groupName: '', skillList: [] };
      this.tempLanguage = {
        name: '',
        languageLevel: null,
        otherSupport: '',
      };
    },
  },
  created() {
    this.getFbData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 800);
    this.defaultTempData();
  },
};
</script>

<style lang="scss"></style>
