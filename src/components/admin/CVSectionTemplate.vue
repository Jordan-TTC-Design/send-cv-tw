<template>
  <div class="cvExpSection">
    <div class="cvExpSection__titleBox mb-4">
      <p class="cvExpSection__title">{{ expSectionData.title }}</p>
      <button type="button" class="btn--circle btn">
        <i class="jobIcon bi bi-pencil-square"></i>
      </button>
    </div>
    <div
      class="cvExpSection__content"
      :class="{ 'cvExpSection--largeImg': expSectionData.editorStyle === 'largeImg' }"
    >
      <div class="cvExpSection__content__txt" v-html="expSectionData.content"></div>
      <div class="cvExpSection__content__imgBox" v-if="expSectionData.editorStyle !== 'onlyTxt'">
        <img :src="expSectionData.imgUrl" :alt="`${expSectionData.title}圖片`" />
      </div>
    </div>
  </div>
</template>

<script>
import webData from '@/methods/webData';
// import emitter from '@/methods/emitter';

export default {
  emits: ['returnExpSectionData', 'reuturnCloseForm'],
  props: ['sendSectionData', 'formNumber'],
  data() {
    return {
      expSectionData: {
        title: '',
        content: '',
        imgUrl: 'https://i.imgur.com/ctKogiV.jpg',
        editorStyle: '',
      },
      tempImg: {
        src: 'https://i.imgur.com/ctKogiV.jpg',
        isUpDated: true,
      },
      formIndex: null,
      formData: {},
    };
  },
  watch: {
    sendSectionData: {
      deep: true,
      handler(newValue) {
        this.expSectionData = JSON.parse(JSON.stringify(newValue));
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
    saveData() {
      const obj = {
        data: this.expSectionData,
        num: this.formIndex,
      };
      this.$emit('returnExpSectionData', obj);
    },
    closeForm() {
      this.$emit('reuturnCloseForm', this.formIndex);
    },
  },
  created() {
    this.formData = webData;
    this.expSectionData = JSON.parse(JSON.stringify(this.sendSectionData));
    this.formIndex = this.formNumber;
  },
};
</script>

<style lang="scss"></style>
