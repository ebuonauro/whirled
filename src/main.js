import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';

// Bootstrap and Bootstrap Vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make Bootstrap globally available throughout the project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
