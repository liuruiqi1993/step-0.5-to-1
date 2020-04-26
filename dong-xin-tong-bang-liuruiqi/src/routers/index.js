import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const $view = (file) => require('@/views/' + file).default;

const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: { name: 'yewuguanli' }
		},
		{
			path: '/yewuguanli',
			name: 'yewuguanli',
			meta: { name: '业务管理' },
			component: $view('yewuguanli'),
			redirect: { name: 'meitiziyuan' },
			children: [
				{
					path: 'meitiziyuan',
					name: 'meitiziyuan',
					meta: { name: '媒体资源' },
					component: $view('yewuguanli/meitiziyuan')
				}
			]
		},
		{
			path: '*',
			redirect: '/yewuguanli'
		}
	]
});
router.beforeEach((to, from, next) => {
	if (to.fullPath === from.fullPath) {
		return;
	} else {
		next();
	}
});
export default router;
