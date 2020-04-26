import Http from './http.js';

const Url = {
	order_detail: 'order_detail',
	make_order: 'make_order',
	user_orders: 'user_orders',
	user_info: 'user_info',
	gift_detail: 'gift_detail',
	index: 'index',
	add_address: 'add_address',
	wx_login: 'wx_login',
	order_trade: 'order_trade',
	order_received: 'order_received'
};
export default {
	// 微信登录
	async login() {
		const app = getApp();
		let { code, userInfo: { avatarUrl, nickName, gender } } = app.globalData;
		let { data: { access_token, user } } = await Http.post(Url.wx_login, { code, avatarUrl, nickName, gender });
		app.globalData.access_token = access_token;
		app.globalData.userInfo.id = user.id;
		wx.setStorageSync('access_token', access_token);
		wx.setStorageSync('userInfo', app.globalData.userInfo);
	},
	// 首页信息
	async home(params) {
		let { data } = await Http.get(Url.index, params);
		return data;
	},
	// 书盒详情
	async gift_detail(id) {
		let { data } = await Http.get(Url.gift_detail, { gift_id: id });
		return data;
	},
	// 下单
	async make_order(params) {
		let { data } = await Http.post(Url.make_order, params);
		return data;
	},
	// 下单成功添加地址
	async add_address(params) {
		let { data } = await Http.post(Url.add_address, params);
		return data;
	},
	// 用户信息
	async user_info() {
		let it = await Http.get(Url.user_info);
		console.log(it);
	},
	// 订单列表
	async user_orders(params) {
		let { data } = await Http.get(Url.user_orders, params);
		return data;
	},
	async order_detail(no) {
		let { data } = await Http.get(Url.order_detail, { no });
		return data;
	},
	async order_trade(order_no) {
		let { data } = await Http.get(Url.order_trade, { order_no });
		return data;
	},
	async order_received(order_id) {
		return await Http.post(Url.order_received, { order_id });
	}
};
