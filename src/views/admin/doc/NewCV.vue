<template>
  <div class="adminPage--py">
    <div class="container" v-if="dataReady">
      <div class="row">
        <div class="col-xl-8">
          <div class="cvSubNav">
            <h2 class="cvSubNav__title ms-4 d-flex align-items-center" ref="cvTitle">
              {{ tempCvData.cvName }}
              <button type="button" class="btn ms-2" @click="toggleCvTitleInput">
                <i class="jobIcon bi bi-pencil-square text-dark"></i>
              </button>
            </h2>
            <div class="d-flex d-none" ref="cvTitle--edit">
              <div class="form__input mb-0 me-2">
                <input
                  id="cvTitle--edit"
                  name="履歷名稱"
                  type="text"
                  class="form-control h-100"
                  placeholder="請輸入履歷名稱"
                  v-model="tempCvData.cvName"
                />
              </div>
              <button type="button" class="btn btn-gray-light text-dark" @click="saveCvTitle">
                保存
              </button>
            </div>
            <div class="d-flex">
              <button type="button" class="btn btn-light text-dark me-2">
                <i class="jobIcon bi bi-eyeglasses"></i>
              </button>
              <button type="button" class="btn btn-light text-dark">
                <i class="jobIcon bi bi-gear-fill"></i>
              </button>
              <button type="button" class="btn btn-primary" @click="uploadCvToCvList">
                保存
              </button>
            </div>
          </div>
          <div class="cvSection position-relative">
            <div class="cvSection__titleBox mb-5">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                個人資訊
              </h3>
            </div>
            <div class="cvSection__userBg">
              <img class="cvSection__userBg__img" :src="tempCvData.cvImgUrl" alt="履歷封面" />
              <button
                type="button"
                class="cvSection__userBg__btn btn btn--circle"
                @click="openExsitImgEditModal(tempCvData.cvImgUrl)"
              >
                <i class="jobIcon bi bi-pencil-square text-dark"></i>
              </button>
              <div class="userImgBox">
                <img
                  class="userImgBox__img"
                  :src="tempCvData.userData.account.userImgUrl"
                  alt="個人照片"
                />
              </div>
            </div>
            <h4 class="mb-3 text-dark">{{ tempCvData.userData.account.chineseName }}</h4>
            <p class="mb-1">
              <span class="me-3 text-secondary">職稱</span
              >{{ tempCvData.userData.account.jobTitle }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">生日</span
              >{{ tempCvData.userData.account.birthday }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">聯絡信箱</span
              >{{ tempCvData.userData.account.email }}
            </p>
            <p class="mb-1">
              <span class="me-3 text-secondary">聯絡電話</span
              >{{ tempCvData.userData.account.phone }}
            </p>
            <p class="mb-5">
              <span class="me-3 text-secondary">居住區域</span>
              {{ tempCvData.userData.account.addressCity }}，{{
                tempCvData.userData.account.addressDist
              }}
            </p>
            <div class="cvSection__titleBox mb-4">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                自我介紹
              </h3>
            </div>
            <div class="introVideoBox mb-2">
              <img
                class="introVideoBox__video"
                :src="tempCvData.userData.docData.videoList[2].imgUrl"
                alt=""
              />
            </div>
            <div v-html="tempCvData.userData.docData.videoList[2].content"></div>
          </div>
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                工作經驗
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editWorkExp--new')"
              >
                新增工作經驗
              </button>
            </div>
            <ul class="infoList">
              <li class="w-100">
                <WorkExpTemplate
                  v-if="editTemplate === 'editWorkExp--new'"
                  :workExpData="tempWorkExp"
                  :formNumber="'new'"
                  @returnWorkExpData="saveWorkExpData"
                  @reuturnCloseForm="closeTemplate"
                />
              </li>
              <template v-for="(tempItem, index) in tempCvData.userData.workExp.works" :key="index">
                <li
                  class="infoList__item infoList__item--job"
                  :ref="`workExp--${index}`"
                  :class="{
                    'd-none': editTemplate === `editWorkExp--${index}`,
                    'list--last': index === tempCvData.userData.workExp.works.length - 1,
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
                </li>
                <li class="w-100">
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
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                學歷
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editEducationExp--new')"
              >
                新增學歷
              </button>
            </div>
            <ul class="infoList">
              <li class="w-100">
                <EducationExpTemplate
                  v-if="editTemplate === `editEducationExp--new`"
                  :educationExpData="tempEducation"
                  :formNumber="'new'"
                  @returnEducationExpData="saveEducationExpData"
                  @reuturnCloseForm="closeTemplate"
                />
              </li>
              <template
                v-for="(tempItem, index) in tempCvData.userData.educationExp.educations"
                :key="index"
              >
                <li
                  class="infoList__item infoList__item--job"
                  :ref="`educationExp--${index}`"
                  :class="{
                    'd-none': editTemplate === `editEducationExp--${index}`,
                    'list--last': index === tempCvData.userData.educationExp.educations.length - 1,
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
                    <div class="infoList__item__content" v-html="tempItem.educationContent"></div>
                  </div>
                </li>
                <li class="w-100">
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
          <div class="cvSection">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                專業技能
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line btn--text--dark"
                @click="editTemplateData('editSkill--new')"
              >
                新增專業技能
              </button>
            </div>
            <ul class="infoList">
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
                      <template v-for="(item, index) in tempCvData.userData.languages" :key="index">
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
              <li class="w-100">
                <LanguageDataTemplate
                  v-if="editTemplate === `editLanguage`"
                  :sendLanguages="tempCvData.userData.languages"
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
                      <template v-for="(item, index) in tempCvData.userData.licenses" :key="index">
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
              <li class="w-100">
                <LicenseDataTemplate
                  v-if="editTemplate === `editLicense`"
                  :sendLicenses="tempCvData.userData.licenses"
                  @returnLicenseData="saveLicenseData"
                  @reuturnCloseForm="closeTemplate"
                />
              </li>
              <!-- 技能 -->
              <template v-for="(skill, index) in tempCvData.userData.skills" :key="index">
                <li
                  class="infoList__item show--compressed"
                  :class="{
                    'd-none': editTemplate === `editSkill--${index}`,
                    'list--last': index === tempCvData.userData.skills.length - 1,
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
                <li class="w-100">
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
              <li class="w-100">
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
          <template v-for="(listItem, listIndex) in tempCvData.cvSectionList" :key="listIndex">
            <div class="cvSection">
              <div class="cvSection__titleBox">
                <h3 class="cvSection__title" :ref="`expDataTitle--${listIndex}`">
                  <div class="tag--doubleCircle me-2"></div>
                  {{ listItem.sectionTitle }}
                  <button
                    type="button"
                    class="btn ms-2"
                    @click="toggleCvSectionTitleInput(listIndex)"
                  >
                    <i class="jobIcon bi bi-pencil-square text-dark"></i>
                  </button>
                </h3>
                <div class="d-flex d-none" :ref="`expDataTitle--${listIndex}--edit`">
                  <div class="form__input mb-0 me-2">
                    <input
                      :id="`expDataTitle--${listIndex}--input`"
                      name="標題"
                      type="text"
                      class="form-control h-100"
                      placeholder="請輸入標題"
                      v-model="listItem.sectionTitle"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-gray-light text-dark"
                    @click="saveCvSectionTitle(listIndex)"
                  >
                    保存
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-gray-line text-dark"
                  @click="newCvSectionTemplateData(listIndex)"
                >
                  新增
                </button>
              </div>
              <template v-for="(item, index) in listItem.sectionDataList" :key="index">
                <CVExpTemplate
                  :tempExpSectionData="item"
                  :formNumber="index"
                  :listNumber="listIndex"
                  @returnExpSectionData="saveCvSectionTemplateData"
                  @deleteData="deleteCvSectionTemplateData"
                />
              </template>
            </div>
          </template>
          <div class="cvSection" v-if="tempCvData.userData.docData">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                我的作品
              </h3>
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                @click="openSelectWorkModal"
              >
                選擇文件庫
              </button>
            </div>
            <template v-for="(item, index) in tempCvData.userData.docData.videoList" :key="index">
              <div
                class="cvExpSection"
                v-if="item.cvList && item.cvList.indexOf(tempCvData.cvKey) > -1"
              >
                <div class="cvExpSection__titleBox mb-4">
                  <p class="cvExpSection__title">{{ item.title }}</p>
                  <div class="dropdown">
                    <button
                      class="btn position-relative"
                      type="button"
                      :id="`dropdownMenuButton--cvExpData--${index}`"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="jobIcon bi bi-three-dots"></i>
                    </button>
                  </div>
                </div>
                <div class="cvExpSection__content cvExpSection__content--works">
                  <div class="cvExpSection__content__txt" v-html="item.content"></div>
                  <div class="cvExpSection__content__imgBox">
                    <img :src="item.imgUrl" :alt="`${item.title}圖片`" />
                  </div>
                </div>
              </div>
            </template>
            <template v-for="(item, index) in tempCvData.userData.docData.productList" :key="index">
              <div
                class="cvExpSection"
                v-if="item.cvList && item.cvList.indexOf(tempCvData.cvKey) > -1"
              >
                <div class="cvExpSection__titleBox mb-4">
                  <p class="cvExpSection__title">{{ item.title }}</p>
                  <div class="dropdown">
                    <button
                      class="btn position-relative"
                      type="button"
                      :id="`dropdownMenuButton--cvExpData--${index}`"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="jobIcon bi bi-three-dots"></i>
                    </button>
                  </div>
                </div>
                <div class="cvExpSection__content cvExpSection__content--works">
                  <div class="cvExpSection__content__txt" v-html="item.content"></div>
                  <div class="cvExpSection__content__imgBox">
                    <img :src="item.imgUrl" :alt="`${item.title}圖片`" />
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- 其他資訊 -->
          <div class="cvSection" v-if="tempCvData.userData.docData">
            <div class="cvSection__titleBox">
              <h3 class="cvSection__title">
                <div class="tag--doubleCircle me-2"></div>
                其他資訊
              </h3>
            </div>
            <ul class="infoList">
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">駕照</p>
                    <ul class="infoList__innerList">
                      <template
                        v-for="(item, index) in tempCvData.userData.others.driverLicenses"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">特殊身份</p>
                    <ul class="infoList__innerList">
                      <template
                        v-for="(item, index) in tempCvData.userData.others.identities"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="infoList__item show--compressed">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="infoList__item__title">兵役</p>
                    <ul class="infoList__innerList">
                      <template
                        v-for="(item, index) in tempCvData.userData.others.militaryServices"
                        :key="index"
                      >
                        <li v-if="item.select" class="infoList__innerList__item">
                          <p>{{ item.name }}</p>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="cvSideBox sideContentBox rwdSideModal" :class="{ active: filterOpen }">
            <div class="cvSideBox__title">
              <p>履歷完成度</p>
              <p>0%</p>
            </div>
            <ul class="cvSideBox__sectionList">
              <li class="list__item">
                <p class="cvSideBox__sectionList__txt">
                  個人資料<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item">
                <p class="cvSideBox__sectionList__txt">
                  自我介紹<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  工作經驗<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  教育程度<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  專業技能<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  其他資訊<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <li class="list__item cvSideBox__sectionList--change">
                <div class="cvSideBox__sectionList__changeBtn"></div>
                <p class="cvSideBox__sectionList__txt">
                  我的作品<i
                    class="cvSideBox__sectionList__check jobIcon-sm ms-1 bi bi-check-circle-fill"
                  ></i>
                </p>
                <button type="buttonn" class="btn"><i class="jobIcon bi bi-three-dots"></i></button>
              </li>
              <template v-for="(listItem, listIndex) in tempCvData.cvSectionList" :key="listIndex">
                <li class="list__item cvSideBox__sectionList--change">
                  <div class="cvSideBox__sectionList__changeBtn"></div>
                  <p class="cvSideBox__sectionList__txt">
                    {{ listItem.sectionTitle }}
                  </p>
                  <button
                    class="btn position-relative"
                    type="button"
                    :id="`dropdownMenuButton--cvSectionList--${listIndex}`"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="jobIcon bi bi-three-dots"></i>
                  </button>
                  <ul
                    :ref="`cvSectionList--${listIndex}`"
                    class="dropDownMenu dropdown-menu"
                    :aria-labelledby="`dropdownMenuButton--cvSectionList--${listIndex}`"
                  >
                    <li class="dropDownMenu__item dropdown-item">調整排序</li>
                    <li
                      class="dropDownMenu__item dropdown-item"
                      @click="deleteExpCvSection(listIndex)"
                    >
                      刪除
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
            <div class="cvSideBox__footer">
              <button
                type="button"
                class="btn btn-outline-gray-line text-dark"
                @click="newCvTemplateSection"
              >
                新增履歷板塊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sideBtnBox">
    <UpTopBtn />
    <button
      type="button"
      class="sideBtn btn btn-light mt-2 d-xl-none"
      @click="filterOpen = !filterOpen"
    >
      <i class="jobIcon bi bi-stack"></i>
    </button>
  </div>
  <WorkPickerModal
    :userData="tempCvData.userData"
    :cvKey="tempCvData.cvKey"
    @returnUserData="getUserDataFromModal"
  />
  <ExsitImgEditModal @emit-send-img-data="getImg" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CVExpTemplate from '@/components/admin/CVExpTemplate.vue';
import WorkExpTemplate from '@/components/admin/WorkExpTemplate.vue';
import EducationExpTemplate from '@/components/admin/EducationExpTemplate.vue';
import LanguageDataTemplate from '@/components/admin/LanguageDataTemplate.vue';
import LicenseDataTemplate from '@/components/admin/LicenseDataTemplate.vue';
import SkillDataTemplate from '@/components/admin/SkillDataTemplate.vue';
import WorkPickerModal from '@/components/admin/WorkPickerModal.vue';
import UpTopBtn from '@/components/helpers/UpTopBtn.vue';
import ExsitImgEditModal from '@/components/helpers/ExsitImgEditModal.vue';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import database from '@/methods/firebaseinit';

export default {
  components: {
    CVExpTemplate,
    WorkExpTemplate,
    EducationExpTemplate,
    SkillDataTemplate,
    LanguageDataTemplate,
    LicenseDataTemplate,
    ExsitImgEditModal,
    WorkPickerModal,
    UpTopBtn,
  },
  data() {
    return {
      date: new Date(),
      dataReady: false,
      nowPage: '基本資料',
      personalState: true,
      settingSideList: '個人資料',
      editMode: false,
      editTemplate: '', // 編輯哪一塊
      formData: {},
      chooseCityDist: [],
      user: {},
      cvData: {
        cvName: '第一份履歷',
        expSectionList: [{ title: '我的大學經歷', content: '我的' }],
      },
      tempImgurl: '',
      tempWorkExp: {},
      tempEducation: {},
      tempSkill: {},
      tempLanguage: {},
      tempLicense: '',
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
      tempSkillList: { groupName: '', skillList: [] },
      tempExpSectionData: {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
      },
      tempCvData: {},
      // rwd
      filterOpen: false,
    };
  },
  watch: {
    date(newValue) {
      const data = Math.ceil(newValue.valueOf() / 1000);
      this.user.account.birthday = data;
    },
  },
  methods: {
    // 打開普通圖片編輯器
    openExsitImgEditModal(imgUrl) {
      console.log(imgUrl);
      emitter.emit('open-ExistImgEditModal', imgUrl);
    },
    // 取得圖片
    getImg(data) {
      this.tempImgurl = data;
      this.updateImg();
    },
    // 上傳圖片
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
          this.tempCvData.cvImgUrl = res.data.data.link;
          this.saveTempCvData();
          emitter.emit('spinner-close');
        })
        .catch((err) => {
          console.log(err);
          emitter.emit('spinner-close');
        });
    },
    // 刪除履歷列表項目
    deleteExpCvSection(listIndex) {
      this.tempCvData.cvSectionList.splice(listIndex, 1);
      this.saveTempCvData();
    },
    editTemplateData(txt) {
      this.editMode = true;
      this.editTemplate = txt;
    },
    // 保存履歷中的工作經驗
    saveWorkExpData(obj) {
      if (obj.num === 'new') {
        this.tempCvData.userData.workExp.works.push(obj.data);
      } else {
        this.tempCvData.userData.workExp.works[obj.num] = obj.data;
      }
      this.saveTempCvData();
      this.closeTemplate();
    },
    // 保存履歷中的學歷
    saveEducationExpData(obj) {
      if (obj.num === 'new') {
        this.tempCvData.userData.educationExp.educations.push(obj.data);
      } else {
        this.tempCvData.userData.educationExp.educations[obj.num] = obj.data;
      }
      this.saveTempCvData();
      this.closeTemplate();
    },
    // 保存履歷中的技能
    saveSkillData(obj) {
      if (obj.num === 'new') {
        this.tempCvData.userData.skills.push(obj.data);
      } else {
        this.tempCvData.userData.skills[obj.num] = obj.data;
      }
      this.saveTempCvData();
      this.closeTemplate();
    },
    // 保存履歷中的語言
    saveLanguageData(obj) {
      this.tempCvData.userData.languages = obj;
      this.saveTempCvData();
      this.closeTemplate();
    },
    // 保存履歷中的證照
    saveLicenseData(obj) {
      this.tempCvData.userData.licenses = obj;
      this.saveTempCvData();
      this.closeTemplate();
    },
    // 關閉工作經驗、教育程度、技能等modal
    closeTemplate() {
      this.editTemplate = '';
      this.editMode = false;
    },
    // 取得modal資料
    getUserDataFromModal(obj) {
      this.tempCvData.userData = JSON.parse(JSON.stringify(obj));
      this.saveTempCvData();
    },
    // 打開選擇文件
    openSelectWorkModal() {
      emitter.emit('open-work-picker-modal');
    },
    // 切換編輯履歷大標題輸入框
    toggleCvTitleInput() {
      this.$refs.cvTitle.classList.toggle('d-none');
      this.$refs['cvTitle--edit'].classList.toggle('d-none');
    },
    // 保存履歷大標題
    saveCvTitle() {
      if (this.tempCvData.cvName === '') {
        this.tempCvData.cvName = '未命名履歷';
      }
      this.toggleCvTitleInput();
      this.saveTempCvData();
    },
    // 編輯其他資訊
    openSettingModal(action) {
      const obj = {
        action,
        user: this.user,
      };
      emitter.emit('open-setting-career-modal', obj);
    },
    // 以下是針對特殊履歷板塊的操作
    // 新增履歷板塊
    newCvTemplateSection() {
      if (this.tempCvData.cvSectionList) {
        const sectionLength = this.tempCvData.cvSectionList.length;
        this.tempCvData.cvSectionList[sectionLength] = {
          sectionTitle: '未命名板塊',
          sectionNumber: sectionLength - 1,
          sectionDataList: [],
        };
      } else if (!this.tempCvData.cvSectionList) {
        this.tempCvData.cvSectionList = [
          {
            sectionTitle: '未命名板塊',
            sectionNumber: 0,
            sectionDataList: [],
          },
        ];
      }
      this.saveTempCvData();
    },
    // 切換編籬履歷板塊大標題輸入框
    toggleCvSectionTitleInput(listIndex) {
      this.$refs[`expDataTitle--${listIndex}`].classList.toggle('d-none');
      this.$refs[`expDataTitle--${listIndex}--edit`].classList.toggle('d-none');
    },
    // 保存履歷板塊大標題
    saveCvSectionTitle(listIndex) {
      console.log(this.tempCvData.cvSectionList[listIndex].sectionTitle);
      if (this.tempCvData.cvSectionList[listIndex].sectionTitle === '') {
        this.tempCvData.cvSectionList[listIndex].sectionTitle = '未命名板塊';
      }
      this.toggleCvSectionTitleInput(listIndex);
      this.saveTempCvData();
    },
    // 刪除指定履歷板塊
    deleteCvSection(templateData) {
      this.cvData.cvSectionList.splice(templateData.index, 1);
      this.saveAllData();
    },
    // 新增特殊履歷板塊資料
    newCvSectionTemplateData(listIndex) {
      const obj = {
        title: '',
        content: '',
        imgUrl: '',
        editorStyle: '',
        editMode: true,
      };
      if (this.tempCvData.cvSectionList[listIndex].sectionDataList) {
        this.tempCvData.cvSectionList[listIndex].sectionDataList.push(obj);
      } else {
        this.tempCvData.cvSectionList[listIndex].sectionDataList = [obj];
      }
    },
    // 保存特殊履歷板塊資料
    saveCvSectionTemplateData(templateData) {
      const listNum = templateData.listIndex;
      const itemNum = templateData.index;
      const { data } = templateData;
      if (templateData.index !== 'new') {
        this.tempCvData.cvSectionList[listNum].sectionDataList[itemNum] = data;
      } else {
        const obj = {
          title: data.title,
          editorStyle: data.editorStyle,
          imgUrl: data.imgUrl,
          content: data.content,
        };
        this.tempCvData.cvSectionList[templateData.listIndex].sectionDataList.push(obj);
      }
      this.saveTempCvData();
    },
    // 刪除特殊履歷板塊資料
    deleteCvSectionTemplateData(templateData) {
      const listNum = templateData.listIndex;
      const itemNum = templateData.index;
      console.log(this.tempCvData.cvSectionList[listNum]);
      this.tempCvData.cvSectionList[listNum].sectionDataList.splice(itemNum, 1);
      this.saveTempCvData();
    },
    // 刪除工作、學歷、技能紀錄
    deleteTemplateData(action, index) {
      if (action === 'workExp') {
        this.tempCvData.userData.workExp.works.splice(index, 1);
      } else if (action === 'education') {
        this.tempCvData.userData.educationExp.educations.splice(index, 1);
      } else if (action === 'skill') {
        this.tempCvData.userData.skills.splice(index, 1);
      }
      this.saveTempCvData();
    },
    // 以下針對履歷資料操作
    // 取得 tempCvData 資料
    getTempCvData() {
      const tempCvDataRef = database.ref('tempCvData');
      tempCvDataRef.once('value', (snapshot) => {
        const data = snapshot.val();
        // 判斷是否有暫存資料，如果沒有就複製user資料到新履歷資料
        if (!data) {
          this.newCvAndCopyUserData();
        } else {
          this.tempCvData = data;
          this.dataReady = true;
        }
        console.log(this.tempCvData);
      });
    },
    // 建立新履歷並複製用戶資料
    newCvAndCopyUserData() {
      const userRef = database.ref('user');
      userRef.once('value', (snapshot) => {
        const data = JSON.parse(JSON.stringify(snapshot.val()));
        this.tempCvData = {
          cvName: '未命名履歷',
          cvKey: `${Math.floor(Date.now() / 1000)}`,
          userData: {
            account: data.account,
            docData: data.docData,
            educationExp: data.educationExp,
            workExp: data.workExp,
            languages: data.languages,
            skills: data.skills,
            licenses: data.licenses,
            others: data.others,
          },
          cvSectionList: [],
        };
        console.log(this.tempCvData);
        this.dataReady = true;
        this.saveTempCvData();
      });
    },
    // 保存暫存Cv資料
    saveTempCvData() {
      const tempCvDataRef = database.ref('tempCvData');
      tempCvDataRef.set(this.tempCvData);
    },
    // 新增履歷至履歷列表
    uploadCvToCvList() {
      const cvRef = database.ref('cvList');
      cvRef.once('value', (snapshot) => {
        const data = snapshot.val();
        data.push(this.tempCvData);
        cvRef.set(data);
        this.cleanTempCvData();
        this.$router.push('document-cv/cv');
      });
    },
    // 清除暫存履歷資料
    cleanTempCvData() {
      const tempCvDataRef = database.ref('tempCvData');
      tempCvDataRef.remove();
    },
    chooseCity(cityName) {
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
    this.getTempCvData();
    this.formData = webData;
    this.chooseCityDist = this.formData.districts['台北市'].district;
    emitter.emit('spinner-open-bg', 800);
    this.defaultTempData();
  },
};
</script>

<style lang="scss"></style>
ＦＦ
