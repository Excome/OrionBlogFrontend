import Vue from 'vue'
import "./api/resource"
import "@babel/polyfill"
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor )
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
