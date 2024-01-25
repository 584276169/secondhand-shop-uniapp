import App from './App'
import uView from 'uview-ui'
import Vue from 'vue'
import store from 'store/index.js'
import {router,RouterMount} from 'router/router.js'
import showModal from "components/login_tip.vue"
import agreement from "components/agreement.vue"
import updatevalue from "components/updateInfo.vue"
import initModal from "components/login_Controll.js"
import {request} from "config/request.js"
Vue.use(router)
initModal(Vue);
Vue.component('show-modal',showModal);
Vue.component('agreement',agreement);
Vue.component('updatevalue',updatevalue);
Vue.use(uView);
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$request=request
App.mpType = 'app'
const app = new Vue({
    ...App,
	 store
})
app.$mount()




