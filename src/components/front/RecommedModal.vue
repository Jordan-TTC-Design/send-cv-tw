<template>
  <div
    ref="recommedModal"
    class="modal fade popModal"
    id="recommedModal"
    aria-hidden="true"
    aria-labelledby="recommedModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="popModal__header popModal__header--center">
          <h5 class="popModal__title">{{ mainAction }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div v-if="modalAction === '新增興趣推薦條件' && dataReady">
          <div class="modal-body px-0">
            <div class="dataForm border-top border-gray-line dataForm--interestForm">
              <div class="dataForm__innerList p-5">
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >自訂條件名稱</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="searchFilterTop-keyword"
                    placeholder="自訂條件名稱"
                    aria-describedby="自訂條件名稱"
                    v-model="careerData.title"
                  />
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標行業</label>
                  <div class="fakeInput" @click="modalAction = '設定目標行業'">
                    <div class="fakeInput__txtList">
                      <p
                        class="text-secondary"
                        v-if="careerData.industryCategoriesSelect.length === 0"
                      >
                        請選擇
                      </p>
                      <template v-for="that in careerData.industryCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標職務</label>
                  <div class="fakeInput" @click="modalAction = '設定目標職務'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="careerData.jobCategoriesSelect.length === 0">
                        請選擇
                      </p>
                      <template v-for="that in careerData.jobCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標地區</label>
                  <div class="fakeInput" @click="modalAction = '設定目標地區'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="careerData.workPlaceSelect.length === 0">
                        請選擇
                      </p>
                      <template v-for="that in careerData.workPlaceSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="d-flex align-items-end mb-3">
                  <div class="inputGroup--item me-2">
                    <label for="salaryRangeLow" class="form-label inputItem__title"
                      >薪資待遇範圍起始</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="salaryRangeLow"
                      placeholder="最低"
                      aria-describedby="薪資待遇範圍起始"
                      v-model="careerData.salaryRange.salaryLow"
                    />
                  </div>
                  <div class="inputGroup--item me-2">
                    <label for="salaryRangeHeight" class="form-label inputItem__title"
                      >薪資待遇範圍結束</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="salaryRangeHeight"
                      placeholder="最高"
                      aria-describedby="薪資待遇範圍結束"
                      v-model="careerData.salaryRange.salaryHeight"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="salaryRangeInterview"
                      v-model="careerData.salaryRange.salaryInterView"
                    />
                    <label class="form-check-label" for="salaryRangeInterview"> 接受面議 </label>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >工作性質</label
                  >
                  <div class="d-flex">
                    <template v-for="(item, index) in careerData.workType" :key="item.title">
                      <div
                        class="form-check formCheck--btn flex-grow-1 putPointer"
                        :class="{ 'me-2': index < careerData.workType.length - 1 }"
                        @click="item.select = !item.select"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item"
                          :selected="item.select"
                          :id="`workType--${index}`"
                          v-model="item.select"
                        />
                        <label
                          class="form-check-label"
                          :for="`workType--${index}`"
                          @click="item.select = !item.select"
                        >
                          {{ item.title }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >工作時間</label
                  >
                  <div class="d-flex">
                    <template v-for="(item, index) in careerData.workTime" :key="item.title">
                      <div
                        class="form-check formCheck--btn flex-grow-1 putPointer"
                        :class="{ 'me-2': index < careerData.workTime.length - 1 }"
                        @click="item.select = !item.select"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item"
                          :selected="item.select"
                          :id="`workTime--${index}`"
                          v-model="item.select"
                        />
                        <label
                          class="form-check-label"
                          :for="`workTime--${index}`"
                          @click="item.select = !item.select"
                        >
                          {{ item.title }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >外派機會</label
                  >
                  <div
                    class="form-check formCheck--btn putPointer"
                    @click="careerData.expat = !careerData.expat"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="expat"
                      v-model="careerData.expat"
                    />
                    <label
                      class="form-check-label putPointer"
                      for="expat"
                      @click="careerData.expat = !careerData.expat"
                    >
                      是否接受企業外派
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-gray-light me-2" @click="closeModal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="returnCareerData('新增興趣推薦條件')"
            >
              保存
            </button>
          </div>
        </div>
        <div v-if="modalAction === '編輯興趣推薦條件' && dataReady">
          <div class="modal-body px-0">
            <div class="dataForm border-top border-gray-line dataForm--interestForm">
              <div class="dataForm__innerList p-5">
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >自訂條件名稱</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="searchFilterTop-keyword"
                    placeholder="自訂條件名稱"
                    aria-describedby="自訂條件名稱"
                    v-model="careerData.title"
                  />
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標行業</label>
                  <div class="fakeInput" @click="modalAction = '設定目標行業'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="!careerData.industryCategoriesSelect">
                        請選擇
                      </p>
                      <template v-for="that in careerData.industryCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標職務</label>
                  <div class="fakeInput" @click="modalAction = '設定目標職務'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="!careerData.jobCategoriesSelect">請選擇</p>
                      <template v-for="that in careerData.jobCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標地區</label>
                  <div class="fakeInput" @click="modalAction = '設定目標地區'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="!careerData.workPlaceSelect">請選擇</p>
                      <template v-for="that in careerData.workPlaceSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="d-flex align-items-end mb-3">
                  <div class="inputGroup--item me-2">
                    <label for="salaryRangeLow" class="form-label inputItem__title"
                      >薪資待遇範圍起始</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="salaryRangeLow"
                      placeholder="最低"
                      aria-describedby="薪資待遇範圍起始"
                      v-model="careerData.salaryRange.salaryLow"
                    />
                  </div>
                  <div class="inputGroup--item me-2">
                    <label for="salaryRangeHeight" class="form-label inputItem__title"
                      >薪資待遇範圍結束</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="salaryRangeHeight"
                      placeholder="最高"
                      aria-describedby="薪資待遇範圍結束"
                      v-model="careerData.salaryRange.salaryHeight"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="salaryRangeInterview"
                      v-model="careerData.salaryRange.salaryInterView"
                    />
                    <label class="form-check-label" for="salaryRangeInterview"> 接受面議 </label>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >工作性質</label
                  >
                  <div class="d-flex">
                    <template v-for="(item, index) in careerData.workType" :key="item.title">
                      <div
                        class="form-check formCheck--btn flex-grow-1 putPointer"
                        :class="{ 'me-2': index < careerData.workType.length - 1 }"
                        @click="item.select = !item.select"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item"
                          :selected="item.select"
                          :id="`workType--${index}`"
                          v-model="item.select"
                        />
                        <label
                          class="form-check-label"
                          :for="`workType--${index}`"
                          @click="item.select = !item.select"
                        >
                          {{ item.title }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >工作時間</label
                  >
                  <div class="d-flex">
                    <template v-for="(item, index) in careerData.workTime" :key="item.title">
                      <div
                        class="form-check formCheck--btn flex-grow-1 putPointer"
                        :class="{ 'me-2': index < careerData.workTime.length - 1 }"
                        @click="item.select = !item.select"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="item"
                          :selected="item.select"
                          :id="`workTime--${index}`"
                          v-model="item.select"
                        />
                        <label
                          class="form-check-label"
                          :for="`workTime--${index}`"
                          @click="item.select = !item.select"
                        >
                          {{ item.title }}
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >外派機會</label
                  >
                  <div
                    class="form-check formCheck--btn putPointer"
                    @click="careerData.expat = !careerData.expat"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="expat"
                      v-model="careerData.expat"
                    />
                    <label
                      class="form-check-label putPointer"
                      for="expat"
                      @click="careerData.expat = !careerData.expat"
                    >
                      是否接受企業外派
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line justify-content-between">
            <button type="button" class="btn btn-gray-light me-2" @click="deleteData">
              刪除設定
            </button>
            <div class="d-flex">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="returnCareerData('編輯興趣推薦條件')"
              >
                保存
              </button>
            </div>
          </div>
        </div>
        <div v-if="modalAction === '新增興趣行業推薦條件' && dataReady">
          <div class="modal-body px-0">
            <div class="dataForm border-top border-gray-line dataForm--interestForm">
              <div class="dataForm__innerList p-5">
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >自訂條件名稱</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="searchFilterTop-keyword"
                    placeholder="自訂條件名稱"
                    aria-describedby="自訂條件名稱"
                    v-model="careerData.title"
                  />
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標行業</label>
                  <div class="fakeInput" @click="modalAction = '設定目標行業'">
                    <div class="fakeInput__txtList">
                      <p
                        class="text-secondary"
                        v-if="careerData.industryCategoriesSelect.length === 0"
                      >
                        請選擇
                      </p>
                      <template v-for="that in careerData.industryCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標地區</label>
                  <div class="fakeInput" @click="modalAction = '設定目標地區'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="careerData.workPlaceSelect.length === 0">
                        請選擇
                      </p>
                      <template v-for="that in careerData.workPlaceSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >外派機會</label
                  >
                  <div
                    class="form-check formCheck--btn putPointer"
                    @click="careerData.expat = !careerData.expat"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="expat"
                      v-model="careerData.expat"
                    />
                    <label
                      class="form-check-label putPointer"
                      for="expat"
                      @click="careerData.expat = !careerData.expat"
                    >
                      是否接受企業外派
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-gray-light me-2" @click="closeModal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="returnCareerData('新增興趣行業推薦條件')"
            >
              保存
            </button>
          </div>
        </div>
        <div v-if="modalAction === '編輯興趣行業推薦條件' && dataReady">
          <div class="modal-body px-0">
            <div class="dataForm border-top border-gray-line dataForm--interestForm">
              <div class="dataForm__innerList p-5">
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >自訂條件名稱</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="searchFilterTop-keyword"
                    placeholder="自訂條件名稱"
                    aria-describedby="自訂條件名稱"
                    v-model="careerData.title"
                  />
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標行業</label>
                  <div class="fakeInput" @click="modalAction = '設定目標行業'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="!careerData.industryCategoriesSelect">
                        請選擇
                      </p>
                      <template v-for="that in careerData.industryCategoriesSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label class="form-label inputItem__title">目標地區</label>
                  <div class="fakeInput" @click="modalAction = '設定目標地區'">
                    <div class="fakeInput__txtList">
                      <p class="text-secondary" v-if="!careerData.workPlaceSelect">請選擇</p>
                      <template v-for="that in careerData.workPlaceSelect" :key="that">
                        <p>{{ that }}<span class="fakeInput__txtList__line"></span></p>
                      </template>
                    </div>
                    <i class="jobIcon bi bi-chevron-right"></i>
                  </div>
                </div>
                <div class="inputGroup--item mb-3">
                  <label for="searchFilterTop-keyword" class="form-label inputItem__title"
                    >外派機會</label
                  >
                  <div
                    class="form-check formCheck--btn putPointer"
                    @click="careerData.expat = !careerData.expat"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="expat"
                      v-model="careerData.expat"
                    />
                    <label
                      class="form-check-label putPointer"
                      for="expat"
                      @click="careerData.expat = !careerData.expat"
                    >
                      是否接受企業外派
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line justify-content-between">
            <button type="button" class="btn btn-gray-light me-2" @click="deleteData">
              刪除設定
            </button>
            <div class="d-flex">
              <button type="button" class="btn btn-gray-light me-2" @click="closeModal">
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="returnCareerData('編輯興趣推薦條件')"
              >
                保存
              </button>
            </div>
          </div>
        </div>
        <div v-if="modalAction === '設定目標職務'">
          <div class="modal-body px-0">
            <div class="popModal__subHeaderNav">
              <p
                class="d-flex align-items-center text-dark putPointer"
                @click="modalAction = mainAction"
              >
                <i class="jobIcon bi bi-chevron-left me-2 text-dark"></i>設定目標職務
              </p>
              <p class="subTxt text-secondary">最多選擇10項</p>
            </div>
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__leftList">
                <ul>
                  <li class="list__item list__title">職務類別</li>
                  <template v-for="(item, index) in careerData.jobCategories" :key="item.groupName">
                    <li class="list__item putPointer" @click="this.tempWorkPlace.city = index">
                      <p>{{ item.groupName }}</p>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="dataForm__contentBox">
                <ul ref="collapse" class="dataForm__contentBox__list accordion accordion-flush">
                  <li class="list__item list__title">
                    <p>小類</p>
                  </li>
                  <template
                    v-for="(item, index) in careerData.jobCategories[tempWorkPlace.city].categories"
                    :key="item.categoryName"
                  >
                    <li class="foldList__item accordion-item">
                      <div class="foldList__item__title accordion-header">
                        <div>
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            :id="item.categoryName"
                            v-model="item.selectAll"
                          />
                          <label class="form-check-label" :for="item.categoryName">
                            {{ item.categoryName }}
                          </label>
                        </div>
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#jobCategory__categoryName--${index}`"
                        ></button>
                      </div>
                      <div
                        :id="`jobCategory__categoryName--${index}`"
                        class="accordion-collapse collapse"
                      >
                        <div class="accordion-body p-0">
                          <template v-for="job in item.categories" :key="job.name">
                            <li class="list__item list__item--check putPointer">
                              <input
                                class="form-check-input me-2"
                                type="checkbox"
                                :id="job.name"
                                v-model="job.select"
                              />
                              <label class="form-check-label" :for="job.name">
                                {{ job.name }}
                              </label>
                            </li>
                          </template>
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-primary" @click="saveThisData('設定目標職務')">
              確定
            </button>
          </div>
        </div>
        <div v-if="modalAction === '設定目標行業'">
          <div class="modal-body px-0">
            <div class="popModal__subHeaderNav">
              <p
                class="d-flex align-items-center text-dark putPointer"
                @click="modalAction = mainAction"
              >
                <i class="jobIcon bi bi-chevron-left me-2 text-dark"></i>設定目標行業
              </p>
              <p class="subTxt text-secondary">最多選擇10項</p>
            </div>
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__contentBox w-100">
                <ul class="dataForm__contentBox__list">
                  <template v-for="item in careerData.industryCategories" :key="item.industryName">
                    <li class="list__item list__item--check form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="item.industryName"
                        v-model="item.select"
                      />
                      <label class="form-check-label" :for="item.industryName">
                        {{ item.industryName }}
                      </label>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-primary" @click="saveThisData('設定目標行業')">
              確定
            </button>
          </div>
        </div>
        <div v-if="modalAction === '設定目標地區'">
          <div class="popModal__subHeaderNav">
            <p
              class="d-flex align-items-center text-dark putPointer"
              @click="modalAction = mainAction"
            >
              <i class="jobIcon bi bi-chevron-left me-2 text-dark"></i>設定求職地區
            </p>
            <p class="subTxt text-secondary">最多選擇10項</p>
          </div>
          <div class="modal-body px-0">
            <div class="dataForm border-top border-gray-line">
              <div class="dataForm__leftList">
                <ul>
                  <li class="list__item list__title">城市</li>
                  <template
                    v-for="(city, index) in careerData.workPlace"
                    :key="`第${index}縣市${city.cityName}`"
                  >
                    <li class="list__item putPointer" @click="this.tempWorkPlace.city = index">
                      <p>{{ city.cityName }}</p>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="dataForm__contentBox">
                <ul class="dataForm__contentBox__list">
                  <li class="list__item list__title">區域</li>
                  <li
                    v-if="tempWorkPlace.city >= 0"
                    class="list__item list__item--check form-check mb-0"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="cityAll"
                      v-model="careerData.workPlace[tempWorkPlace.city].selectAll"
                    />
                    <label class="form-check-label" for="cityAll">
                      {{ careerData.workPlace[tempWorkPlace.city].cityName }}全區
                    </label>
                  </li>
                  <template
                    v-for="dist in careerData.workPlace[tempWorkPlace.city].district"
                    :key="dist.code"
                  >
                    <li class="list__item list__item--check form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`district--${dist.code}`"
                        v-model="dist.select"
                      />
                      <label class="form-check-label" :for="`district--${dist.code}`">
                        {{ dist.distName }}
                      </label>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="popModal__footer border-top border-gray-line">
            <button type="button" class="btn btn-primary" @click="saveThisData('設定目標地區')">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/methods/emitter';
import webData from '@/methods/webData';
import interestData from '@/methods/InterestData';

export default {
  emits: ['return-recommed-data', 'delete-recommed-data'],
  data() {
    return {
      modal: {},
      modalAction: '',
      mainAction: '',
      dataReady: false,
      formData: {},
      careerData: {},
      tempWorkPlace: { city: 0 },
      dataIndex: null,
    };
  },
  methods: {
    openModal(obj) {
      console.log(obj);
      this.mainAction = obj.action;
      this.modalAction = this.mainAction;
      if (this.modalAction === '新增興趣推薦條件') {
        this.newData();
      } else if (this.modalAction === '編輯興趣推薦條件') {
        const user = JSON.parse(JSON.stringify(obj.data));
        this.dataIndex = obj.index;
        this.careerData = user.recommedJobList[this.dataIndex];
        this.dataReady = true;
      } else if (this.modalAction === '新增興趣行業推薦條件') {
        this.newData();
      } else if (this.modalAction === '編輯興趣行業推薦條件') {
        const user = JSON.parse(JSON.stringify(obj.data));
        this.dataIndex = obj.index;
        this.careerData = user.recommedCompanyList[this.dataIndex];
        this.dataReady = true;
      }
      console.log(this.careerData);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    newData() {
      this.careerData = JSON.parse(JSON.stringify(interestData));
      this.careerData.title = '未命名條件';
      console.log(this.careerData);
      this.dataReady = true;
    },
    saveThisData(action) {
      if (action === '設定目標職務') {
        this.careerData.jobCategoriesSelect = [];
        this.careerData.jobCategories.forEach((item) => {
          if (item.selectAll) {
            console.log(item);
            this.careerData.jobCategoriesSelect.push(item.groupName);
          } else {
            item.categories.forEach((job) => {
              console.log(job);
              if (job.selectAll) {
                this.careerData.jobCategoriesSelect.push(job.categoryName);
              } else {
                job.categories.forEach((obj) => {
                  if (obj.select) {
                    this.careerData.jobCategoriesSelect.push(obj.name);
                  }
                });
              }
            });
          }
        });
        console.log(this.careerData.jobCategoriesSelect);
      } else if (action === '設定目標行業') {
        this.careerData.industryCategoriesSelect = [];
        console.log(this.careerData.industryCategories);
        this.careerData.industryCategories.forEach((item) => {
          if (item.select) {
            console.log(item);
            this.careerData.industryCategoriesSelect.push(item.industryName);
          }
        });
        console.log(this.careerData.industryCategoriesSelect);
      } else if (action === '設定目標地區') {
        this.careerData.workPlaceSelect = [];
        this.careerData.workPlace.forEach((item) => {
          if (item.selectAll) {
            this.careerData.workPlaceSelect.push(item.cityName);
          } else {
            console.log(item);
            item.district.forEach((dist) => {
              if (dist.select) {
                this.careerData.workPlaceSelect.push(dist.distName);
              }
            });
          }
        });
        console.log(this.careerData.workPlaceSelect);
      }
      this.modalAction = this.mainAction;
    },
    deleteData() {
      this.$emit('delete-recommed-data', this.dataIndex);
      this.closeModal();
    },
    returnCareerData(action) {
      const obj = {
        action,
        data: this.careerData,
        index: this.dataIndex,
      };
      this.$emit('return-recommed-data', obj);
      this.closeModal();
    },
  },
  created() {
    this.formData = webData;
  },
  mounted() {
    this.modal = new Modal(this.$refs.recommedModal);
    emitter.on('open-recommed-modal', this.openModal);
    emitter.on('close-recommed-modal', this.closeModal);
  },
  unmounted() {
    this.modal.dispose();
    emitter.off('open-recommed-modal', this.openModal);
    emitter.off('close-recommed-modal', this.closeModal);
  },
};
</script>

<style lang="scss"></style>
