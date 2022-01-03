import { createApp } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { dropdown } from 'bootstrap/js/dist/dropdown';
import date from '@/methods/filters';
// import db from '@/methods/firebase';
import App from './App.vue';
import router from './router';

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
app.use(CKEditor);
app.config.globalProperties.$filters = { date };
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router);
app.use(dropdown);
// app.use(db);
app.use(VueAxios, axios);

router.afterEach(() => {
  window.scrollTo(0, 0); // 讓畫面每次都會回到最上面
});

app.mount('#app');
