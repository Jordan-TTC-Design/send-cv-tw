<template>
  <div class="adminPage--py">
    <NavCompanyAdminNav :nowPage="nowPage" />
    <div
      class="container-xl pageSubNavContainer--sticky mb-5 d-lg-none"
      :class="{ 'rwdClose--md': rwdSelect === '' }"
    >
      <div class="pageSubNav btnBox">
        <button type="button" class="btn" @click="backToList">
          <i class="jobIcon-sm bi bi-chevron-left me-2"></i>返回
        </button>
      </div>
    </div>
    <div class="container-xl" v-if="dataReady === true">
      <div class="row">
        <div class="col-lg-3" :class="{ 'rwdClose--md': rwdSelect !== '' }">
          <div ref="sideContentBox" class="sideContentBox rwdSelectBox pb-3">
            <div class="collapseList collapseList--company">
              <div
                class="collapseList__header putPointer"
                @click="selectCollapseList('sendCV Web通知')"
                :class="{ active: sideBoxList === 'sendCV Web通知' }"
              >
                <p class="item__title d-flex justify-content-between">sendCV Web通知</p>
                <p class="">
                  <i v-if="sideBoxList !== 'sendCV Web通知'" class="jobIcon bi bi-chevron-down"></i>
                  <i v-if="sideBoxList === 'sendCV Web通知'" class="jobIcon bi bi-chevron-up"></i>
                </p>
              </div>
              <ul class="collapseList__body" :class="{ active: sideBoxList === 'sendCV Web通知' }">
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('sendCV Web通知 - 應徵通知')"
                  :class="{ active: mainContentList === 'sendCV Web通知 - 應徵通知' }"
                >
                  <p class="collapseList__item__title">應徵通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('sendCV Web通知 - 聊天室通知')"
                  :class="{ active: mainContentList === 'sendCV Web通知 - 聊天室通知' }"
                >
                  <p class="collapseList__item__title">聊天室通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('sendCV Web通知 - 推薦通知')"
                  :class="{ active: mainContentList === 'sendCV Web通知 - 推薦通知' }"
                >
                  <p class="collapseList__item__title">推薦通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('sendCV Web通知 - 面試提醒通知')"
                  :class="{ active: mainContentList === 'sendCV Web通知 - 面試提醒通知' }"
                >
                  <p class="collapseList__item__title">面試提醒通知</p>
                </li>
              </ul>
            </div>
            <div class="collapseList collapseList--company">
              <div
                class="collapseList__header putPointer"
                @click="selectCollapseList('信箱通知')"
                :class="{ active: sideBoxList === '信箱通知' }"
              >
                <p class="item__title d-flex justify-content-between">信箱通知</p>
                <p class="">
                  <i v-if="sideBoxList !== '信箱通知'" class="jobIcon bi bi-chevron-down"></i>
                  <i v-if="sideBoxList === '信箱通知'" class="jobIcon bi bi-chevron-up"></i>
                </p>
              </div>
              <ul class="collapseList__body" :class="{ active: sideBoxList === '信箱通知' }">
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('信箱通知 - 應徵通知')"
                  :class="{ active: mainContentList === '信箱通知 - 應徵通知' }"
                >
                  <p class="collapseList__item__title">應徵通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('信箱通知 - 聊天室通知')"
                  :class="{ active: mainContentList === '信箱通知 - 聊天室通知' }"
                >
                  <p class="collapseList__item__title">聊天室通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('信箱通知 - 推薦通知')"
                  :class="{ active: mainContentList === '信箱通知 - 推薦通知' }"
                >
                  <p class="collapseList__item__title">推薦通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('信箱通知 - 職位通知')"
                  :class="{ active: mainContentList === '信箱通知 - 職位通知' }"
                >
                  <p class="collapseList__item__title">職位通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('信箱通知 - 面試提醒通知')"
                  :class="{ active: mainContentList === '信箱通知 - 面試提醒通知' }"
                >
                  <p class="collapseList__item__title">面試提醒通知</p>
                </li>
              </ul>
            </div>
            <div class="collapseList collapseList--company">
              <div
                class="collapseList__header putPointer"
                @click="selectCollapseList('手機APP通知')"
                :class="{ active: sideBoxList === '手機APP通知' }"
              >
                <p class="item__title d-flex justify-content-between">手機APP通知</p>
                <p>
                  <i v-if="sideBoxList !== '手機APP通知'" class="jobIcon bi bi-chevron-down"></i>
                  <i v-if="sideBoxList === '手機APP通知'" class="jobIcon bi bi-chevron-up"></i>
                </p>
              </div>
              <ul class="collapseList__body" :class="{ active: sideBoxList === '手機APP通知' }">
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('手機APP通知 - 應徵通知')"
                  :class="{ active: mainContentList === '手機APP通知 - 應徵通知' }"
                >
                  <p class="collapseList__item__title">應徵通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('手機APP通知 - 聊天室通知')"
                  :class="{ active: mainContentList === '手機APP通知 - 聊天室通知' }"
                >
                  <p class="collapseList__item__title">聊天室通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('手機APP通知 - 推薦通知')"
                  :class="{ active: mainContentList === '手機APP通知 - 推薦通知' }"
                >
                  <p class="collapseList__item__title">推薦通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('手機APP通知 - 職位通知')"
                  :class="{ active: mainContentList === '手機APP通知 - 職位通知' }"
                >
                  <p class="collapseList__item__title">職位通知</p>
                </li>
                <li
                  class="collapseList__item putPointer"
                  @click="selectListItem('手機APP通知 - 面試提醒通知')"
                  :class="{ active: mainContentList === '手機APP通知 - 面試提醒通知' }"
                >
                  <p class="collapseList__item__title">面試提醒通知</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-9" :class="{ 'rwdClose--md': rwdSelect === '' }">
          <ul v-if="sideBoxList === 'sendCV Web通知'">
            <li ref="sendCV Web通知 - 應徵通知" class="mb-5 rounded bg-light box--shadow">
              <div class="border-bottom border-gray-line ps-4">
                <h3 class="sectionTitle--withTag pt-5 pb-2">
                <span class="sectionTitleTag--double--company me-2"></span>sendCV Web通知
              </h3>
              </div>
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item">
                  <p class="text-dark">應徵相關通知</p>
                  <p class="text-companyColor me-4">建議開啟</p>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">使用網站申請</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.applys.useWeb = !notify.web.applys.useWeb"
                    >
                      {{ notify.web.applys.useWeb ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.useWeb }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">使用拍照申請</p>
                    <p class="subTxt">當有求職者透過拍照申請創建職位或應徵時，會通知您！</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.applys.useShotToApply = !notify.web.applys.useShotToApply"
                    >
                      {{ notify.web.applys.useShotToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.useShotToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">寫郵件SendCV</p>
                    <p class="mb-1 subTxt">
                      當有求職者透過 寫郵件SendCV 寄送履歷自我推薦，會通知您！
                    </p>
                    <p class="subTxt text-companyColor">＊建議開啟通知不會錯過潛在優質人才。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.web.applys.useEmailToApply = !notify.web.applys.useEmailToApply
                      "
                    >
                      {{ notify.web.applys.useEmailToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.useEmailToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意面試通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.applys.agreeInterView = !notify.web.applys.agreeInterView"
                    >
                      {{ notify.web.applys.agreeInterView ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.agreeInterView }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.applys.agreeAdmission = !notify.web.applys.agreeAdmission"
                    >
                      {{ notify.web.applys.agreeAdmission ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.agreeAdmission }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.applys.refuse = !notify.web.applys.refuse"
                    >
                      {{ notify.web.applys.refuse ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.applys.refuse }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="sendCV Web通知 - 聊天室通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <p class="text-dark">聊天室通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.chatRoom.is_enabled = !notify.web.chatRoom.is_enabled"
                    >
                      {{ notify.web.chatRoom.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.chatRoom.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="sendCV Web通知 - 推薦通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">推薦通知</p>
                    <p class="subTxt">
                      為已建立的職位推薦符合的求職者，保持開啟狀態不錯過任何優秀人才。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.recommend.is_enabled = !notify.web.recommend.is_enabled"
                    >
                      {{ notify.web.recommend.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.recommend.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="sendCV Web通知 - 面試提醒通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">面試提醒通知</p>
                    <p class="subTxt">開啟功能將在面試前一天提醒您，幫助您提前做準備。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.web.interView.is_enabled = !notify.web.interView.is_enabled"
                    >
                      {{ notify.web.interView.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.web.interView.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <ul v-if="sideBoxList === '信箱通知'">
            <li ref="信箱通知 - 應徵通知" class="mb-5 rounded bg-light box--shadow">
              <div class="border-bottom border-gray-line ps-4">
                <h3 class="sectionTitle--withTag pt-5 pb-2">
                <span class="sectionTitleTag--double--company me-2"></span>信箱通知
              </h3>
              </div>
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item">
                  <p class="text-dark">應徵相關通知</p>
                  <p class="text-companyColor me-4">建議開啟</p>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">使用網站申請</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.applys.useWeb = !notify.email.applys.useWeb"
                    >
                      {{ notify.email.applys.useWeb ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.useWeb }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">使用拍照申請</p>
                    <p class="subTxt">當有求職者透過拍照申請創建職位或應徵時，會通知您！</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.applys.useShotToApply = !notify.email.applys.useShotToApply
                      "
                    >
                      {{ notify.email.applys.useShotToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.useShotToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">寫郵件SendCV</p>
                    <p class="mb-1 subTxt">
                      當有求職者透過 寫郵件SendCV 寄送履歷自我推薦，會通知您！
                    </p>
                    <p class="subTxt text-companyColor">＊建議開啟通知不會錯過潛在優質人才。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.applys.useEmailToApply = !notify.email.applys.useEmailToApply
                      "
                    >
                      {{ notify.email.applys.useEmailToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.useEmailToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意面試通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.applys.agreeInterView = !notify.email.applys.agreeInterView
                      "
                    >
                      {{ notify.email.applys.agreeInterView ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.agreeInterView }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.applys.agreeAdmission = !notify.email.applys.agreeAdmission
                      "
                    >
                      {{ notify.email.applys.agreeAdmission ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.agreeAdmission }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.applys.refuse = !notify.email.applys.refuse"
                    >
                      {{ notify.email.applys.refuse ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.applys.refuse }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="信箱通知 - 聊天室通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <p class="text-dark">聊天室通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.chatRoom.is_enabled = !notify.email.chatRoom.is_enabled"
                    >
                      {{ notify.email.chatRoom.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.chatRoom.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="信箱通知 - 推薦通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">推薦通知</p>
                    <p class="subTxt">
                      為已建立的職位推薦符合的求職者，保持開啟狀態不錯過任何優秀人才。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.recommend.is_enabled = !notify.email.recommend.is_enabled
                      "
                    >
                      {{ notify.email.recommend.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.recommend.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="信箱通知 - 職位通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item">
                  <p class="text-dark">職位相關通知</p>
                  <p class="text-companyColor me-4">建議開啟</p>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">職位成功發布</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.jobs.success = !notify.email.jobs.success"
                    >
                      {{ notify.email.jobs.success ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.jobs.success }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="mb-1 text-dark">職位關閉</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.jobs.closed = !notify.email.jobs.closed"
                    >
                      {{ notify.email.jobs.closed ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.jobs.closed }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="mb-1 text-dark">職位重啟</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.jobs.restart = !notify.email.jobs.restart"
                    >
                      {{ notify.email.jobs.restart ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.jobs.restart }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="text-dark mb-1">同意面試通知</p>
                    <p class="subTxt">
                      為已建立的職位推薦符合的求職者，保持開啟狀態不錯過任何優秀人才。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.email.jobs.promote = !notify.email.jobs.promote"
                    >
                      {{ notify.email.jobs.promote ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.jobs.promote }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="信箱通知 - 面試提醒通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">面試提醒通知</p>
                    <p class="subTxt">開啟功能將在面試前一天提醒您，幫助您提前做準備。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.email.interView.is_enabled = !notify.email.interView.is_enabled
                      "
                    >
                      {{ notify.email.interView.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.email.interView.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <ul v-if="sideBoxList === '手機APP通知'">
            <li ref="手機APP通知 - 應徵通知" class="mb-5 rounded bg-light box--shadow">
              <div class="border-bottom border-gray-line ps-4">
                <h3 class="sectionTitle--withTag pt-5 pb-2">
                <span class="sectionTitleTag--double--company me-2"></span>手機APP通知
              </h3>
              </div>
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item">
                  <p class="text-dark">應徵相關通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.is_enabled = !notify.app.applys.is_enabled"
                    >
                      {{ notify.app.applys.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">使用網站申請</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.useWeb = !notify.app.applys.useWeb"
                    >
                      {{ notify.app.applys.useWeb ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.useWeb }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">使用拍照申請</p>
                    <p class="subTxt">當有求職者透過拍照申請創建職位或應徵時，會通知您！</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.useShotToApply = !notify.app.applys.useShotToApply"
                    >
                      {{ notify.app.applys.useShotToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.useShotToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">寫郵件SendCV</p>
                    <p class="mb-1 subTxt">
                      當有求職者透過 寫郵件SendCV 寄送履歷自我推薦，會通知您！
                    </p>
                    <p class="subTxt text-companyColor">＊建議開啟通知不會錯過潛在優質人才。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="
                        notify.app.applys.useEmailToApply = !notify.app.applys.useEmailToApply
                      "
                    >
                      {{ notify.app.applys.useEmailToApply ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.useEmailToApply }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意面試通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.agreeInterView = !notify.app.applys.agreeInterView"
                    >
                      {{ notify.app.applys.agreeInterView ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.agreeInterView }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.agreeAdmission = !notify.app.applys.agreeAdmission"
                    >
                      {{ notify.app.applys.agreeAdmission ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.agreeAdmission }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">同意錄取通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.applys.refuse = !notify.app.applys.refuse"
                    >
                      {{ notify.app.applys.refuse ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.applys.refuse }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="手機APP通知 - 聊天室通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <p class="text-dark">聊天室通知</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.chatRoom.is_enabled = !notify.app.chatRoom.is_enabled"
                    >
                      {{ notify.app.chatRoom.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.chatRoom.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="手機APP通知 - 推薦通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">推薦通知</p>
                    <p class="subTxt">
                      為已建立的職位推薦符合的求職者，保持開啟狀態不錯過任何優秀人才。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.recommend.is_enabled = !notify.app.recommend.is_enabled"
                    >
                      {{ notify.app.recommend.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.recommend.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="手機APP通知 - 職位通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item">
                  <p class="text-dark">職位相關通知</p>
                  <p class="text-companyColor me-4">建議開啟</p>
                </li>
                <li class="infoList__item">
                  <p class="text-dark">職位成功發布</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.jobs.success = !notify.app.jobs.success"
                    >
                      {{ notify.app.jobs.success ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.jobs.success }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="mb-1 text-dark">職位關閉</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.jobs.closed = !notify.app.jobs.closed"
                    >
                      {{ notify.app.jobs.closed ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.jobs.closed }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <p class="mb-1 text-dark">職位重啟</p>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.jobs.restart = !notify.app.jobs.restart"
                    >
                      {{ notify.app.jobs.restart ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.jobs.restart }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="infoList__item">
                  <div class="infoList__item__txtBox">
                    <p class="text-dark mb-1">同意面試通知</p>
                    <p class="subTxt">
                      為已建立的職位推薦符合的求職者，保持開啟狀態不錯過任何優秀人才。
                    </p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.jobs.promote = !notify.app.jobs.promote"
                    >
                      {{ notify.app.jobs.promote ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.jobs.promote }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li ref="手機APP通知 - 面試提醒通知" class="mb-5 rounded bg-light box--shadow">
              <ul class="infoList--lg infoList--bgHover">
                <li class="infoList__item border-0">
                  <div class="infoList__item__txtBox">
                    <p class="mb-1 text-dark">面試提醒通知</p>
                    <p class="subTxt">開啟功能將在面試前一天提醒您，幫助您提前做準備。</p>
                  </div>
                  <div class="infoList__btnBox">
                    <div
                      class="btn btn--switch btn--switch--company putPointer"
                      @click="notify.app.interView.is_enabled = !notify.app.interView.is_enabled"
                    >
                      {{ notify.app.interView.is_enabled ? `開啟` : `已關閉` }}
                      <div
                        class="ms-2 switch__container"
                        :class="{ active: notify.app.interView.is_enabled }"
                      >
                        <div class="switch__controller"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavCompanyAdminNav from '@/components/company/NavCompanyAdminNav.vue';
import database from '@/methods/firebaseinit';

export default {
  components: {
    NavCompanyAdminNav,
  },
  data() {
    return {
      scrollTop: 0,
      elementTop: 0,
      rwdSelect: '',
      nowPage: '通知設定',
      sideBoxList: 'sendCV Web通知',
      mainContentList: 'sendCV Web通知 - 應徵通知',
      notify: {
        web: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          interView: { is_enabled: true },
        },
        email: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          jobs: {
            is_enabled: true,
            success: true,
            closed: true,
            restart: true,
            promote: true,
          },
          interView: { is_enabled: true },
        },
        app: {
          applys: {
            is_enabled: true,
            useWeb: true,
            useShotToApply: true,
            useEmailToApply: true,
            agreeInterView: true,
            agreeAdmission: true,
            refuse: true,
          },
          chatRoom: { is_enabled: true },
          recommend: { is_enabled: true },
          jobs: {
            is_enabled: true,
            success: true,
            closed: true,
            restart: true,
            promote: true,
          },
          interView: { is_enabled: true },
        },
      },
      meUser: {},
      tempUser: {},
      dataReady: false,
    };
  },
  watch: {
    notify: {
      deep: true,
      handler() {
        this.saveData();
      },
    },
  },
  methods: {
    selectCollapseList(action) {
      this.sideBoxList = action;
      if (action === 'sendCV Web通知') {
        this.mainContentList = 'sendCV Web通知 - 應徵通知';
      } else if (action === '信箱通知') {
        this.mainContentList = '信箱通知 - 應徵通知';
      } else if (action === '手機APP通知') {
        this.mainContentList = '手機APP通知 - 應徵通知';
      }
    },
    async selectListItem(action) {
      await this.processSelectData(action);
      this.goAnchor(action);
    },
    async backToList() {
      await this.processSelectData('');
      document.documentElement.scrollTop = 0;
    },
    processSelectData(action) {
      this.rwdSelect = action;
      this.mainContentList = action;
    },
    // 保存全部用戶資料
    getUserListData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.meUser = data;
        this.notify = this.meUser.notify;
        this.dataReady = true;
      });
    },
    // 保存資料
    saveData() {
      const { key } = this.tempUser;
      const companyUserListRef = database.ref(`company/userList/${key}`);
      companyUserListRef.set(this.meUser);
    },
    // 取得資料
    getMeUserData() {
      const companyUserRef = database.ref('company/myAccount');
      companyUserRef.once('value', (snapshot) => {
        const data = snapshot.val();
        this.tempUser = data;
        this.getUserListData();
      });
    },
    goAnchor(action) {
      this.$refs[action].scrollIntoView();
    },
  },
  created() {
    this.getMeUserData();
  },
};
</script>

<style lang="scss"></style>
