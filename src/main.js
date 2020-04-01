import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueSpinnersCss from "vue-spinners-css";
Vue.use(VueSpinnersCss)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
