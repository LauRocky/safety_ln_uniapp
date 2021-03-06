
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// uview
import uView from 'uview-ui';
Vue.use(uView);

// request
import {request} from './utils/request.js'
Vue.prototype.$http = request



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif