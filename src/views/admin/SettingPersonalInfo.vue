<template>
  <div class="adminPage--py">
    <div ref="adminSubHeader" class="admin__subHeader mb-6 box--shadow">
      <div class="container">
        <div class="admin__subNav">
          <li class="d-flex align-items-center d-md-flex d-none">
            <h2 class="admin__subNav__title">個人帳戶</h2>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('基本資料')"
            :class="{ active: subTopNav === '基本資料' }"
          >
            <p class="admin__subNav__txt me-1">基本資料</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('求職意向')"
            :class="{ active: subTopNav === '求職意向' }"
          >
            <p class="admin__subNav__txt me-1">求職意向</p>
          </li>
          <li
            class="admin__subNav__item"
            @click="changeSideHeader('帳號設定')"
            :class="{ active: subTopNav === '帳號設定' }"
          >
            <p class="admin__subNav__txt me-1">帳號設定</p>
          </li>
        </div>
      </div>
    </div>
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-3 col-12">
          <div class="setting__sideList">
            <div class="setting__sideList__top">
              <div class="setting__personImgBox mb-4">
                <img class="personImgBox__img" src="https://i.imgur.com/ZWHoRPi.png" alt="" />
              </div>
              <p class="mb-3">曾鼎鈞</p>
              <div class="inputGroup--item w-100">
                <div
                  class="inputItem__switch form-check form-switch border border-gray-line rounded"
                >
                  <input
                    id="sendFormInfoCostToken"
                    type="checkbox"
                    class="form-check-input ms-0 me-2 mt-0"
                    data-action="showCompanyJob"
                    :checked="personalState ? true : false"
                    @change="changePersonalState"
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
            <ul class="setting__sideList__nav">
              <li
                class="nav__item"
                @click="selectListItem('個人資料')"
                :class="{ active: settingSideList === '個人資料' }"
              >
                <p class="nav__item__title">個人資料</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('工作經驗')"
                :class="{ active: settingSideList === '工作經驗' }"
              >
                <p class="nav__item__title">工作經驗</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('教育程度')"
                :class="{ active: settingSideList === '教育程度' }"
              >
                <p class="nav__item__title">教育程度</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('專業技能')"
                :class="{ active: settingSideList === '專業技能' }"
              >
                <p class="nav__item__title">專業技能</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
              <li
                class="nav__item"
                @click="selectListItem('其他')"
                :class="{ active: settingSideList === '其他' }"
              >
                <p class="nav__item__title">其他</p>
                <i class="jobIcon bi bi-check-circle-fill"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <!-- 個人資訊 -->
          <div class="admin__mainContent" v-if="settingSideList === '個人資料'">
            <h3 class="admin__mainContent__title">個人資料</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="toogleData('editMode')"
              >
                編輯
              </button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                您於基本資料，並不會被外部搜尋引擎所搜尋，同時 SendCV
                將依照個人資料保護法保障您的個人隱私，請放心～
              </p>
            </div>
            <div v-if="!editMode">
              <ul class="row mb-5">
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">姓名</p>
                    <p class="infoList__item__content">{{ user.account.chineseName }}</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">目前職稱</p>
                    <p class="infoList__item__content">{{ user.account.jobTitle }}</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">性別</p>
                    <p class="infoList__item__content">
                      {{ user.account.gender === 'male' ? '男性' : '女性' }}
                    </p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">生日</p>
                    <p class="infoList__item__content">{{ user.account.birthday }}</p>
                  </div>
                </li>
              </ul>
              <ul class="row mb-5">
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">電子信箱</p>
                    <p class="infoList__item__content">{{ user.account.email }}</p>
                  </div>
                </li>
                <li class="col-6">
                  <div class="infoList__item">
                    <p class="infoList__item__title">聯絡電話</p>
                    <p class="infoList__item__content">{{ user.account.phone }}</p>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item">
                    <p class="infoList__item__title">居住地址</p>
                    <p class="infoList__item__content">
                      {{ user.account.addressCity }}，{{ user.account.addressDist }}
                    </p>
                  </div>
                </li>
              </ul>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item listLast">
                    <p class="infoList__item__title">社群連結</p>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <i class="jobIcon bi bi-facebook me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                        <p class="socialMediaBox__link subTxt">FaceBook</p>
                      </div>
                    </div>
                    <div class="infoList__item__socialMediaBox putPointer mb-2">
                      <i class="jobIcon bi bi-google me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">Jordan Tseng</p>
                        <p class="socialMediaBox__link subTxt">Google</p>
                      </div>
                    </div>
                    <div class="infoList__item__socialMediaBox putPointer">
                      <i class="jobIcon bi bi-globe2 me-6"></i>
                      <div>
                        <p class="socialMediaBox__title mb-1">個人作品網站</p>
                        <p class="socialMediaBox__link subTxt">https://Jordan.ttc.design.com</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="editMode">
              <Form ref="editAccountPersonalData" v-slot="{ errors }" @submit.prevent="saveAllData">
                <div class="row">
                  <!-- 姓名 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataName" class="form__label--custom form-label"
                          >姓名</label
                        >
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
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataJobTitle" class="form__label--custom form-label"
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
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataGender" class="form__label--custom form-label"
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
                            :value="item"
                            :id="`education${index}`"
                            name="性別"
                            v-model="user.account.gender"
                          />
                          <label class="form-check-label" :for="`education${index}`">
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
                        placeholder="請輸入性別"
                        rules="required"
                        v-model="user.account.gender"
                      ></Field>
                      <ErrorMessage name="性別" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <!-- 生日 -->
                  <div class="col-lg-6 col-12">
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="form__label--custom form-label"
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
                  <div class="col-12">
                    <div class="form__inputBox w-50">
                      <div class="form__labelBox">
                        <label for="accountDataEmail" class="form__label--custom form-label"
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
                  <div class="col-12">
                    <div class="form__inputBox w-50">
                      <div class="form__labelBox">
                        <label for="accountDataPhone" class="form__label--custom form-label"
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
                  <div class="col-12 d-flex">
                    <div class="form__inputBox me-2">
                      <div class="form__labelBox">
                        <label for="accountDataCity" class="form__label--custom form-label"
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
                    <div class="form__inputBox">
                      <div class="form__labelBox">
                        <label for="accountDataCity" class="form__label--custom form-label"
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
          <div class="admin__mainContent" v-if="settingSideList === '工作經驗'">
            <h3 class="admin__mainContent__title">工作經驗</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="newWorkData"
                :disabled="editMode"
              >
                <i
                  class="jobIcon--sm bi bi-plus-lg me-1"
                  :class="{ 'text-gray-line': editMode }"
                ></i
                >新增工作經驗
              </button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">
                建議可以依照時間先後建立資訊，並且多描述在該企業上班時所貢獻之事物，讓企業能了解您的特質與能力。
              </p>
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
                  <div ref="workExpEdit--new" class="dataEditForm d-none">
                    <Form
                      ref="editAccountWorkExpData"
                      v-slot="{ errors }"
                      @submit="saveWorkData('new')"
                    >
                      <div class="row">
                        <!-- 企業名稱 -->
                        <div class="col-lg-6 col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label
                                for="workExpDataCompanyName"
                                class="form__label--custom form-label"
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
                              <label for="workExpDataJobName" class="form__label--custom form-label"
                                >職位名稱</label
                              >
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
                              <label
                                for="workExpDataStartYear"
                                class="form__label--custom form-label"
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
                              <label
                                for="workExpDataStartMonth"
                                class="form__label--custom form-label invisible"
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
                              <label for="workExpDataEndYear" class="form__label--custom form-label"
                                >離職日期</label
                              >
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
                              <label
                                for="workExpDataEndMonth"
                                class="form__label--custom form-label invisible"
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
                            <ErrorMessage
                              name="職務內容＆成就"
                              class="invalid-feedback"
                            ></ErrorMessage>
                          </div>
                        </div>
                        <div class="col-12 d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-gray-light me-2"
                            @click="closeWorkTemplateData(index)"
                          >
                            取消
                          </button>
                          <button type="submit" class="btn btn-primary">保存</button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </li>
                <template v-for="(tempItem, index) in user.workExp.works" :key="index">
                  <li class="col-12" :ref="`workExp--${index}`">
                    <div class="infoList__item infoList__item--job">
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
                        <button
                          type="button"
                          class="btn position-relative"
                          @click="openDropDownMenu(index)"
                          :disabled="editMode"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                          <ul :ref="`dropDownMenu--${index}`" class="dropDownMenu">
                            <li
                              class="dropDownMenu__item"
                              @click="toggleTemplateData('workExp', index)"
                            >
                              編輯
                            </li>
                            <li class="dropDownMenu__item">調整排序</li>
                            <li
                              class="dropDownMenu__item"
                              @click="deleteTemplateData('workExp', index)"
                            >
                              刪除
                            </li>
                          </ul>
                        </button>
                      </div>
                      <div class="infoList__item__contentBox">
                        <p class="contentBox__title mb-1">職務內容與成就</p>
                        <div class="infoList__item__content" v-html="tempItem.jobContent"></div>
                      </div>
                    </div>
                  </li>
                  <li class="col-12">
                    <div :ref="`workExpEdit--${index}`" class="dataEditForm d-none">
                      <Form
                        ref="editAccountWorkExpData"
                        v-slot="{ errors }"
                        @submit="saveWorkData('old', index)"
                      >
                        <div class="row">
                          <!-- 企業名稱 -->
                          <div class="col-lg-6 col-12">
                            <div class="form__inputBox">
                              <div class="form__labelBox">
                                <label
                                  for="workExpDataCompanyName"
                                  class="form__label--custom form-label"
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
                                <label
                                  for="workExpDataJobName"
                                  class="form__label--custom form-label"
                                  >職位名稱</label
                                >
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
                                <label
                                  for="workExpDataStartYear"
                                  class="form__label--custom form-label"
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
                                <label
                                  for="workExpDataStartMonth"
                                  class="form__label--custom form-label invisible"
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
                                <option
                                  v-for="month in formData.months"
                                  :value="month"
                                  :key="month"
                                >
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
                                <label
                                  for="workExpDataEndYear"
                                  class="form__label--custom form-label"
                                  >離職日期</label
                                >
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
                                <label
                                  for="workExpDataEndMonth"
                                  class="form__label--custom form-label invisible"
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
                                <option
                                  v-for="month in formData.months"
                                  :value="month"
                                  :key="month"
                                >
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
                                <label
                                  for="workExpDataContent"
                                  class="form__label--custom form-label"
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
                              <ErrorMessage
                                name="職務內容＆成就"
                                class="invalid-feedback"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div class="col-12 d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn btn-gray-light me-2"
                              @click="closeWorkTemplateData(index)"
                            >
                              取消
                            </button>
                            <button type="submit" class="btn btn-primary">保存</button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- 教育程度 -->
          <div class="admin__mainContent" v-if="settingSideList === '教育程度'">
            <h3 class="admin__mainContent__title">教育程度</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="newEducationData"
              >
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增教育程度
              </button>
            </div>
            <div class="remind mb-5">
              <p class="remind__title">小提醒：</p>
              <p class="remind__content">建議可以簡述在您於該所學校學習之專業技能、學習經歷。</p>
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
                  <div ref="educationExpEdit--new" class="dataEditForm d-none">
                    <Form
                      ref="editAccountEducationData"
                      v-slot="{ errors }"
                      @submit="saveEducationData('new')"
                    >
                      <div class="row">
                        <!-- 學校名稱 -->
                        <div class="col-lg-6 col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label
                                for="educationDataSchoolName"
                                class="form__label--custom form-label"
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
                              v-model="tempEducation.schoolName"
                            ></Field>
                            <ErrorMessage name="學校名稱" class="invalid-feedback"></ErrorMessage>
                          </div>
                        </div>
                        <!-- 主修科目 -->
                        <div class="col-lg-6 col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label
                                for="educationDataMajorName"
                                class="form__label--custom form-label"
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
                              v-model="tempEducation.majorName"
                            ></Field>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label
                                for="educationDataEducationLevel"
                                class="form__label--custom form-label"
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
                                  v-model="tempEducation.educationLevel"
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
                                v-model="tempEducation.educationLevel"
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
                              <label
                                for="educationDataStartYear"
                                class="form__label--custom form-label"
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
                              v-model="tempEducation.startYear"
                              @change="createEndYears('education')"
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
                              <label
                                for="educationDataStartMonth"
                                class="form__label--custom form-label invisible"
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
                              v-model="tempEducation.startMonth"
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
                              <label
                                for="educationDataEndYear"
                                class="form__label--custom form-label"
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
                              v-model="tempEducation.endYear"
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
                              <label
                                for="educationDataEndMonth"
                                class="form__label--custom form-label invisible"
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
                              v-model="tempEducation.endMonth"
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
                              <label for="workExpDataContent" class="form__label--custom form-label"
                                >在學表現＆成就</label
                              >
                            </div>
                            <ckeditor
                              id="workExpDataContent"
                              ref="workExpDataContent"
                              name="在學表現＆成就"
                              :editor="editor"
                              tag-name="textarea"
                              v-model="tempEducation.educationContent"
                              :config="editorConfig"
                            ></ckeditor>
                            <Field
                              name="在學表現＆成就"
                              type="text"
                              class="form-control d-none"
                              :class="{ 'is-invalid': errors['在學表現＆成就'] }"
                              placeholder="請輸入"
                              v-model="tempEducation.educationContent"
                              as="textarea"
                              rules="required"
                            >
                            </Field>
                            <ErrorMessage
                              name="在學表現＆成就"
                              class="invalid-feedback"
                            ></ErrorMessage>
                          </div>
                        </div>
                        <div class="col-12 d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-gray-light me-2"
                            @click="closeEducationTemplateData"
                          >
                            取消
                          </button>
                          <button type="submit" class="btn btn-primary">保存</button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </li>
                <template v-for="(tempItem, index) in user.educationExp.educations" :key="index">
                  <li class="col-12">
                    <div class="infoList__item infoList__item--job">
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
                        <button
                          type="button"
                          class="btn position-relative"
                          @click="openDropDownMenu(index)"
                          :disabled="editMode"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                          <ul :ref="`dropDownMenu--${index}`" class="dropDownMenu">
                            <li
                              class="dropDownMenu__item"
                              @click="toggleTemplateData('education', index)"
                            >
                              編輯
                            </li>
                            <li class="dropDownMenu__item">調整排序</li>
                            <li
                              class="dropDownMenu__item"
                              @click="deleteTemplateData('education', index)"
                            >
                              刪除
                            </li>
                          </ul>
                        </button>
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
                </template>
              </ul>
            </div>
          </div>
          <!-- 專業技能 -->
          <div class="admin__mainContent" v-if="settingSideList === '專業技能'">
            <h3 class="admin__mainContent__title">專業技能</h3>
            <div class="admin__mainContent__btnBox">
              <button
                type="button"
                class="btn btn--switch me-2"
                @click="toogleData('skillShowStyle')"
              >
                <div class="switch__container" :class="{ active: skillShowStyle }">
                  <div class="switch__controller"></div>
                </div>
                {{ skillShowStyle ? '密集顯示' : '一般顯示' }}
              </button>
              <button type="button" class="btn btn-outline-gray-line btn--text--dark">
                <i class="jobIcon--sm bi bi-plus-lg me-1"></i>新增專業技能
              </button>
            </div>
            <div>
              <ul class="row" v-if="skillShowStyle === true">
                <!-- 語言 -->
                <li class="col-12">
                  <div
                    ref="languageData"
                    class="infoList__item show--compressed"
                    :class="{ 'd-none': editTemplate === 'editLanguage' }"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">語言</p>
                        <ul class="infoList__item__skillList">
                          <template v-for="(item, index) in user.languages" :key="index">
                            <li class="infoList__item__skillList__skill">
                              <p>{{ item.name }} - {{ item.languageLevel }}</p>
                            </li>
                          </template>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn position-relative"
                        @click="openDropDownMenu('language')"
                        :disabled="editTemplate !== ''"
                      >
                        <i class="jobIcon bi bi-three-dots"></i>
                        <ul ref="dropDownMenu--language" class="dropDownMenu">
                          <li
                            class="dropDownMenu__item"
                            @click="this.editTemplate = 'editLanguage'"
                          >
                            編輯
                          </li>
                          <li class="dropDownMenu__item">調整排序</li>
                          <li class="dropDownMenu__item" @click="deleteWorkExpData(index)">刪除</li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </li>
                <!-- 語言編輯 -->
                <li class="col-12">
                  <Form
                    v-if="editTemplate === 'editLanguage'"
                    v-slot="{ errors }"
                    class="dataEditForm"
                  >
                    <div class="row">
                      <div class="col-lg-6 col-12">
                        <div class="form__inputBox">
                          <div class="form__labelBox">
                            <label for="languageDataName" class="form__label--custom form-label"
                              >語言</label
                            >
                            <p class="formTag--must">必填</p>
                          </div>
                          <Field
                            id="languageDataName"
                            ref="languageDataName"
                            name="語言"
                            as="select"
                            class="form-control form-select"
                            :class="{ 'is-invalid': errors['語言'] }"
                            rules="required"
                            v-model="tempLanguage.name"
                          >
                            <option value="" disabled selected>請選擇</option>
                            <option
                              v-for="language in formData.languages"
                              :value="language"
                              :key="language"
                            >
                              {{ language }}
                            </option></Field
                          >
                          <ErrorMessage name="語言" class="invalid-feedback"></ErrorMessage>
                        </div>
                      </div>
                      <div class="col-lg-3 col-12">
                        <div class="form__inputBox">
                          <div class="form__labelBox">
                            <label for="languageDataLevel" class="form__label--custom form-label"
                              >語言程度</label
                            >
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
                            <option
                              v-for="level in formData.skillLevel"
                              :value="level"
                              :key="level"
                            >
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
                          @click="toogleTempData('language', 'add')"
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
                            <template v-for="(item, index) in user.languages" :key="index">
                              <li class="list__item">
                                <p class="jobTag list__item__skill">
                                  {{ item.name
                                  }}<span class="list__item__skillLevel">{{
                                    item.languageLevel
                                  }}</span>
                                  <span
                                    ><i
                                      class="jobTag__delete jobIcon-sm bi bi-x-lg"
                                      @click="deleteTempData('language', index)"
                                    ></i
                                  ></span>
                                </p>
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                      <div class="col-12 d-flex justify-content-end">
                        <button
                          type="button"
                          class="btn btn-gray-light me-2"
                          @click="this.editTemplate = ''"
                        >
                          取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="saveEditTemplateData">
                          保存
                        </button>
                      </div>
                    </div>
                  </Form>
                </li>
                <!-- 證照 -->
                <li class="col-12">
                  <div
                    class="infoList__item show--compressed"
                    :class="{ 'd-none': editTemplate === 'editLicense' }"
                  >
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">證照</p>
                        <ul class="infoList__item__skillList">
                          <template v-for="(item, index) in user.licenses" :key="index">
                            <li class="infoList__item__skillList__skill">
                              <p>{{ item.name }}</p>
                            </li>
                          </template>
                        </ul>
                      </div>
                      <button
                        type="button"
                        class="btn position-relative"
                        @click="openDropDownMenu('license')"
                        :disabled="editTemplate !== ''"
                      >
                        <i class="jobIcon bi bi-three-dots"></i>
                        <ul ref="dropDownMenu--license" class="dropDownMenu">
                          <li
                            class="dropDownMenu__item"
                            @click="toggleTemplateData('license', 'license')"
                          >
                            編輯
                          </li>
                          <li class="dropDownMenu__item">調整排序</li>
                          <li class="dropDownMenu__item" @click="deleteWorkExpData(index)">刪除</li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </li>
                <!-- 證照編輯 -->
                <li class="col-12">
                  <Form
                    v-if="editTemplate === 'editLicense'"
                    v-slot="{ errors }"
                    class="dataEditForm"
                    @submit="saveEditTemplateData"
                  >
                    <div class="row">
                      <!-- 證照 -->
                      <div class="col-lg-6 col-12">
                        <div class="form__inputBox">
                          <div class="form__labelBox">
                            <label for="languageDataName" class="form__label--custom form-label"
                              >證照名稱</label
                            >
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
                          @click="toogleLicenseData('add')"
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
                            <template v-for="(item, index) in user.licenses" :key="index">
                              <li class="list__item">
                                <p class="jobTag list__item__skill">
                                  {{ item.name }}
                                  <span
                                    ><i
                                      class="jobTag__delete jobIcon-sm bi bi-x-lg"
                                      @click="toogleLicenseData('delete', index)"
                                    ></i
                                  ></span>
                                </p>
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                      <div class="col-12 d-flex justify-content-end">
                        <button
                          type="button"
                          class="btn btn-gray-light me-2"
                          @click="this.editTemplate = ''"
                        >
                          取消
                        </button>
                        <button type="submit" class="btn btn-primary">保存</button>
                      </div>
                    </div>
                  </Form>
                </li>
                <!-- 技能 -->
                <template v-for="(skill, index) in user.skills" :key="index">
                  <li class="col-12">
                    <div
                      class="infoList__item listLast show--compressed"
                      :class="{ 'd-none': editTemplate === `editSkill--${index}` }"
                    >
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <p class="infoList__item__title">{{ skill.groupName }}</p>
                          <ul class="infoList__item__skillList">
                            <template v-for="item in skill.skillList" :key="item.name">
                              <li class="infoList__item__skillList__skill">
                                <p>{{ item.name }}</p>
                              </li>
                            </template>
                          </ul>
                        </div>
                        <button
                          type="button"
                          class="btn position-relative"
                          @click="openDropDownMenu(index)"
                          :disabled="editTemplate !== ''"
                        >
                          <i class="jobIcon bi bi-three-dots"></i>
                          <ul :ref="`dropDownMenu--${index}`" class="dropDownMenu">
                            <li
                              class="dropDownMenu__item"
                              @click="toggleTemplateData('skill', index)"
                            >
                              編輯
                            </li>
                            <li class="dropDownMenu__item">調整排序</li>
                            <li class="dropDownMenu__item" @click="deleteWorkExpData(index)">
                              刪除
                            </li>
                          </ul>
                        </button>
                      </div>
                    </div>
                  </li>
                  <!-- 技能編輯 -->
                  <li class="col-12">
                    <Form
                      v-if="editTemplate === `editSkill--${index}`"
                      v-slot="{ errors }"
                      class="dataEditForm"
                    >
                      <div class="row">
                        <!-- 技能類別 -->
                        <div class="col-lg-6 col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label for="skillDataCategory" class="form__label--custom form-label"
                                >技能類別</label
                              >
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
                              v-model="skill.groupName"
                            ></Field>
                            <ErrorMessage name="技能類別" class="invalid-feedback"></ErrorMessage>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <!-- 技能名稱 -->
                        <div class="col-lg-6 col-12">
                          <div class="form__inputBox">
                            <div class="form__labelBox">
                              <label
                                for="skillDataCategorySkillName"
                                class="form__label--custom form-label"
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
                            @click="toogleTempData('skill', 'add', index)"
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
                              <template v-for="(item, num) in skill.skillList" :key="item.name">
                                <li class="list__item">
                                  <p class="jobTag list__item__skill">
                                    {{ item.name }}
                                    <span
                                      ><i
                                        class="jobTag__delete jobIcon-sm bi bi-x-lg"
                                        @click="skill.skillList.splice(num, 1)"
                                      ></i
                                    ></span>
                                  </p>
                                </li>
                              </template>
                            </ul>
                          </div>
                        </div>
                        <div class="col-12 d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-gray-light me-2"
                            @click="this.editTemplate = ''"
                          >
                            取消
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="saveEditTemplateData"
                          >
                            保存
                          </button>
                        </div>
                      </div>
                    </Form>
                  </li>
                </template>
              </ul>
              <ul class="row" v-if="skillShowStyle === false">
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>語言</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>中文 - 專業</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>英文 - 流利 / 雅思 6.5分</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>日文 - 專業 / 日檢 N2</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Sketch</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>證照</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>美國風險管理師ARM</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>美國會計師CPA</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>國際ERP電腦稽核師CEAP</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--normal">
                    <div class="infoList__item__titleBox">
                      <p>設計</p>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                    <ul class="infoList__item__skillList">
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe Illustrator</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe PhotoShop</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Adobe XD</p>
                      </li>
                      <li class="infoList__item__skillList__skill">
                        <p>Sketch</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 其他 -->
          <div class="admin__mainContent" v-if="settingSideList === '其他'">
            <h3 class="admin__mainContent__title">其他</h3>
            <div>
              <ul class="row">
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">駕照</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>重型機車</p>
                          </li>
                          <li class="infoList__item__skillList__skill">
                            <p>小型汽車</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">身份</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>無特殊身份</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="col-12">
                  <div class="infoList__item listLast show--compressed">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <p class="infoList__item__title">兵役</p>
                        <ul class="infoList__item__skillList">
                          <li class="infoList__item__skillList__skill">
                            <p>役畢</p>
                          </li>
                        </ul>
                      </div>
                      <button type="button" class="btn">
                        <i class="jobIcon bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
  data() {
    return {
      date: new Date(),
      subTopNav: '基本資料',
      personalState: true,
      settingSideList: '個人資料',
      skillShowStyle: true,
      editMode: false,
      formData: {},
      chooseCityDist: [],
      user: {
        account: {
          chineseName: '',
          EnglishName: '',
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
          identity: [],
          militaryService: '',
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
      tempWorkExp: {},
      tempEducation: {},
      tempSkill: {},
      tempLanguage: {},
      tempLicense: '',
      yearArray: [],
      endYearArray: [],
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
      editTemplate: '',
      skills: { groupName: '', skillList: [] },
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
    // 展開下拉選單
    openDropDownMenu(index) {
      this.$refs[`dropDownMenu--${index}`].classList.add('active');
      console.log(this.$refs[`dropDownMenu--${index}`].classList);
    },
    // 工作經驗
    // 新增工作經驗
    newWorkData() {
      this.editMode = true;
      this.$refs['workExpEdit--new'].classList.toggle('d-none');
      this.defaultTempData();
    },
    // 編輯工作經驗
    toggleTemplateData(action, index) {
      this.editMode = true;
      this.$refs[`dropDownMenu--${index}`].classList.remove('active');
      if (action === 'workExp') {
        this.$refs[`workExp--${index}`].classList.add('d-none');
        this.$refs[`workExpEdit--${index}`].classList.remove('d-none');
        this.tempWorkExp = this.user.workExp.works[index];
      } else if (action === 'education') {
        this.$refs[`workExp--${index}`].classList.add('d-none');
        this.$refs[`workExpEdit--${index}`].classList.remove('d-none');
      } else if (action === 'language') {
        this.editTemplate = 'editLanguage';
      } else if (action === 'license') {
        this.editTemplate = 'editLicense';
      } else if (action === 'skill') {
        this.editTemplate = `editSkill--${index}`;
      }
    },
    // 保存工作經驗資料
    saveWorkData(action, index) {
      this.editMode = false;
      console.log(this.tempWorkExp);
      console.log(index);
      if (action === 'old') {
        this.user.workExp.works.splice(index, 1, this.tempWorkExp);
      } else if (action === 'new') {
        this.user.workExp.works.push(this.tempWorkExp);
      }
      this.closeWorkTemplateData(index);
      this.saveAllData();
      this.getFbData();
    },
    // 刪除工作經驗
    deleteWorkExpData(index) {
      this.user.workExp.works.splice(index, 1);
      this.saveAllData();
      this.getFbData();
    },
    // 關閉
    closeWorkTemplateData(index) {
      this.editMode = false;
      if (index) {
        this.$refs[`workExp--${index}`].classList.toggle('d-none');
        this.$refs[`workExpEdit--${index}`].classList.toggle('d-none');
      } else {
        this.$refs['workExpEdit--new'].classList.toggle('d-none');
      }
      this.defaultTempData();
    },
    // 教育程度
    // 新增教育程度
    newEducationData() {
      this.editMode = true;
      this.$refs['educationExpEdit--new'].classList.toggle('d-none');
      this.defaultTempData();
    },
    // 保存教育程度
    saveNewEducationData() {
      this.saveWorkData('new');
    },
    // 保存教育程度
    saveEducationData(action, index) {
      this.editMode = false;
      if (action === 'old') {
        this.user.educationExp.educations.splice(index, 1, this.tempEducation);
      } else if (action === 'new') {
        this.user.educationExp.educations.push(this.tempEducation);
      }
      this.closeEducationTemplateData(index);
      this.saveAllData();
      this.getFbData();
    },
    // 編輯已建立項目：證照
    toogleLicenseData(action, ...theArgs) {
      if (action === 'add') {
        const obj = {
          name: this.tempLicense,
        };
        this.user.licenses.push(obj);
        this.tempLicense = '';
      } else if (action === 'delete') {
        this.user.licenses.splice(theArgs, 1);
      }
    },
    toogleTempData(section, action, index) {
      if (action === 'add') {
        if (section === 'language') {
          const obj = {
            name: this.tempLanguage.name,
            languageLevel: this.tempLanguage.languageLevel,
            otherSupport: this.tempLanguage.otherSupport,
          };
          this.user.languages.push(obj);
          console.log(this.user.languages);
        }
        if (section === 'skill') {
          const obj = {
            name: this.tempSkill.name,
            otherSupport: '',
          };
          this.user.skills[index].skillList.push(obj);
        }
        this.defaultTempData();
      }
    },
    saveSkillTemplateData() {
      if (this.user.skills[this.skill.groupName]) {
        this.user.skills[this.skill.groupName].skillList = this.skills.skillList;
      } else {
        const obj = {
          groupName: this.skill.groupName,
          skillList: this.skills.skillList,
        };
        this.user.skills.push(obj);
      }
      this.editTemplate = '';
      this.saveAllData();
    },
    deleteTempData(section, index) {
      if (section === 'language') {
        this.user.languages.splice(index, 1);
      }
    },
    deleteSkillData(index) {
      this.user.languages.splice(index, 1);
    },
    saveEditTemplateData() {
      this.editTemplate = '';
      this.saveAllData();
    },
    // 關閉教育程度
    closeEducationTemplateData(index) {
      this.editMode = false;
      if (index) {
        this.$refs[`educationExp--${index}`].classList.toggle('d-none');
        this.$refs[`educationExpEdit--${index}`].classList.toggle('d-none');
      } else {
        this.$refs['educationExpEdit--new'].classList.toggle('d-none');
      }
      this.defaultTempData();
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
    choose(cityName) {
      this.chooseCityDist = [];
      this.chooseCityDist = this.formData.districts[cityName].district;
      const [temDist] = this.chooseCityDist;
      this.user.account.addressDist = temDist;
    },
    toogleData(dataName) {
      if (this[dataName]) {
        this[dataName] = false;
      } else if (!this[dataName]) {
        this[dataName] = true;
      }
      console.log(webData);
      console.log(this.formData);
    },
    changePersonalState() {
      if (this.personalState) {
        this.personalState = false;
      } else if (!this.personalState) {
        this.personalState = true;
      }
    },
    selectListItem(navName) {
      this.settingSideList = navName;
      this.editMode = false;
    },
    changeSideHeader(navName) {
      if (navName === '基本資料') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting');
      } else if (navName === '求職意向') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-career');
      } else if (navName === '帳號設定') {
        this.subTopNav = navName;
        this.$router.push('/admin/setting-account');
      }
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
      this.skills = { groupName: '', skillList: [] };
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
    this.createYears();
    this.defaultTempData();
  },
};
</script>

<style lang="scss"></style>
