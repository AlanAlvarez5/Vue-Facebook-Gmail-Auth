import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueChatScroll from 'vue-chat-scroll'

import { auth } from  "./firebase"

Vue.use(VueChatScroll)
Vue.config.productionTip = false

auth.onAuthStateChanged(function(user){
  if(user){
    store.dispatch('setUsuario', user)
  }

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})


