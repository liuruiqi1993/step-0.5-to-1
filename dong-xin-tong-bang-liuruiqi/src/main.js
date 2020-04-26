import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import store from './stores';
import util from './utils';
import ElementUI from 'element-ui';
import './assets/base.less';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$util = util;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
