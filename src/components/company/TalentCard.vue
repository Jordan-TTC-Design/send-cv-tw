<template>
  <li class="talentCard talentCard--inner">
    <div class="talentCard__userImgBox">
      <div class="talentCard__introVideo">
        <p class="subTxt text-secondary">尚未設定</p>
      </div>
      <img
        class="talentCard__personalImg"
        :src="user.account.userImgUrl"
        :alt="`${user.account.chineseName}個人求職照片`"
      />
    </div>
    <div class="talentCard__body">
      <div class="talentNameInfo mb-3">
        <p class="talentNameInfo__name me-2 putPointer"
        @click="openPersonPopModal('瀏覽人才')">
          {{ user.account.chineseName }}
        </p>
        <p>{{ user.account.gender }} | {{ `28歲` }}</p>
      </div>
      <ul class="talentInfo">
        <li class="talentInfo__item">
          <p class="talentInfo__item__title">投遞職位</p>
          <p>{{ jobData.jobName }}</p>
        </li>
        <li class="talentInfo__item">
          <p class="talentInfo__item__title">最高學歷</p>
          <p>
            {{
              user.educationExp.educations[user.educationExp.educations.length - 1]
                .educationLevel || '尚未填寫'
            }}
          </p>
        </li>
        <li class="talentInfo__item">
          <p class="talentInfo__item__title">工作經驗</p>
          <p>
            {{ user.workExp.works[user.workExp.works.length - 1].jobName || '無工作經驗' }}
          </p>
        </li>
        <li class="talentInfo__item">
          <p class="talentInfo__item__title">申請時間</p>
          <p>{{ $filters.date(jobData.time) }}</p>
        </li>
      </ul>
    </div>
    <div class="talentCard__btnBox">
      <button
        type="button"
        class="btn btn-outline-companyColor me-2"
        @click="selectAction('選擇動作')"
      >
        選擇動作
      </button>
      <button type="button" class="btn btn-outline-gray-line text-dark me-2">聯絡</button>
      <button type="button" class="btn text-dark">
        <i class="bi bi-three-dots"></i>
      </button>
    </div>
    <button class="collectBtn btn btn-outline-gray-line position-absolute" type="button">
      <i class="jobIcon bi bi-bookmark-fill"></i>
    </button>
  </li>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  components: {
  },
  props: ['user', 'jobData', 'selectJobKey'],
  methods: {
    selectAction(action) {
      const obj = {
        action,
        user: this.user,
        key: this.selectJobKey || '',
      };
      emitter.emit('open-person-action-modal', obj);
    },
    openPersonPopModal(action) {
      const obj = {
        action,
        user: this.user,
        key: this.selectJobKey || '',
      };
      emitter.emit('open-person-pop-modal', obj);
    },
  },
};
</script>

<style lang="scss"></style>
