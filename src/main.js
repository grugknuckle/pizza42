import Vue from 'vue'
import App from './App.vue'
import Axios from './plugins/axios'
import router from './router'
import { Auth0Plugin } from './auth'
import VueMeta from 'vue-meta'

import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  }
})
Vue.use(VueMeta)
Vue.use(hljs.vuePlugin)
Vue.use(Axios)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
