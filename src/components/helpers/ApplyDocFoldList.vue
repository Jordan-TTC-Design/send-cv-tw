<template>
  <ul ref="collapse" class="accordion" id="doc-collapse">
    <!-- 應徵文件 -->
    <li class="accordion-item bg-gray-light py-2">
      <p class="text-dark text-center">應徵文件</p>
    </li>
    <li class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: docFoldState !== '履歷' }"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#applyDocument-cv"
          aria-expanded="false"
          aria-controls="applyDocument-cv"
          @click="docFoldState = '履歷'"
        >
          履歷
        </button>
      </h2>
      <div
        id="applyDocument-cv"
        class="accordion-collapse collapse"
        :class="{ show: docFoldState === '履歷' }"
        data-bs-parent="#doc-collapse"
      >
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is shown by default, until
          the collapse plugin adds the appropriate classes that we use to style each element. These
          classes control the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </li>
    <li class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: docFoldState !== '求職信' }"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#applyDocument-coverLetter"
          aria-expanded="false"
          aria-controls="applyDocument-coverLetter"
          @click="docFoldState = '求職信'"
        >
          求職信
        </button>
      </h2>
      <div
        id="applyDocument-coverLetter"
        class="accordion-collapse collapse"
        :class="{ show: docFoldState === '求職信' }"
        data-bs-parent="#doc-collapse"
      >
        <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until
          the collapse plugin adds the appropriate classes that we use to style each element. These
          classes control the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </li>
    <li class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: docFoldState !== '自我介紹影片' }"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#applyDocument-selfIntro"
          aria-expanded="false"
          aria-controls="applyDocument-selfIntro"
          @click="docFoldState = '自我介紹影片'"
        >
          自我介紹影片
        </button>
      </h2>
      <div
        id="applyDocument-selfIntro"
        class="accordion-collapse collapse"
        :class="{ show: docFoldState === '自我介紹影片' }"
        data-bs-parent="#doc-collapse"
      >
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until
          the collapse plugin adds the appropriate classes that we use to style each element. These
          classes control the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </li>
    <li class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: docFoldState !== '公司提問' }"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#applyDocument-companyAsk"
          aria-expanded="false"
          aria-controls="applyDocument-companyAsk"
          @click="docFoldState = '公司提問'"
        >
          公司提問
        </button>
      </h2>
      <div
        id="applyDocument-companyAsk"
        class="accordion-collapse collapse"
        data-bs-parent="#doc-collapse"
        :class="{ show: docFoldState === '公司提問' }"
      >
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until
          the collapse plugin adds the appropriate classes that we use to style each element. These
          classes control the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      docFoldState: '',
      docData: {
        cv: '',
        coverLetter: '',
        video: '',
        question: [],
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
