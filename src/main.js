import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// Import the plugin here
import { Auth0Plugin } from "./auth";

const authconfig = {
  domain:   process.env.VUE_APP_AUTH_DOMAIN,
  clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
  audience: process.env.VUE_APP_AUTH_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
}

// Install the authentication plugin here
Vue.use(Auth0Plugin, authconfig);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
