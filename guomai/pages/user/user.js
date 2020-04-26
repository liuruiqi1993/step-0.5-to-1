// pages/user/user.js
import Api from '../../request/api';
const app = getApp();
const util = require('../../utils/util.js');
Page({
	/**
   * 页面的初始数据
   */
	data: {
		userInfo: app.globalData.userInfo,
		status: 1,
		orderGroups: {},
		init: {
			list: [],
			total: 0,
			page: 1
		},
		tabbar: [
			{
				title: '待发货',
				text: '空空如也~',
				status: 1
			},
			{
				title: '已发货',
				text: '暂无已发货的订单~',
				status: 2
			},
			{
				title: '已收货',
				text: '还没有人收到你的礼物哦~',
				status: 4
			},
			{
				title: '已退款',
				text: '',
				status: 3
			}
		],
		showPop: false,
		popId: null
	},
	async recieve() {
		let { code, data } = await Api.order_received(this.data.popId);
		if (code === 200) {
			wx.showToast({
				title: data,
				icon: 'none'
			});
			this.switchPop({});
			this.onChange({ detail: { name: 2 } });
		}
	},
	switchPop(e) {
		this.setData({
			showPop: !!e.detail,
			popId: e.detail || null
		});
	},
	onChange(e) {
		let status = e.detail.name;
		let { orderGroups, init } = this.data;
		let key = `orderGroups.${status}`;
		this.setData(
			{
				status,
				[key]: init
			},
			() => {
				this.getOrder(status);
			}
		);
	},
	async getOrder(status) {
		let { orderGroups, init } = this.data;
		let key = `orderGroups.${status}`;
		let { list, total: currentTotal, page } = orderGroups[status] || init;
		if (!app.globalData.access_token || (currentTotal && currentTotal <= list.length)) return;
		let { data, total, current_page } = await Api.user_orders({
			page,
			status
		});
		this.setData({
			[key]: {
				total,
				list: list.concat(data),
				page: current_page++
			}
		});
	},
	setList() {
		this.data.tabbar.map((item, index) => {
			this.getOrder(item.status);
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		app.userInfoReadyCallback = (res) => {
			this.setData(
				{
					userInfo: res.userInfo
				},
				() => {
					this.setList();
				}
			);
		};
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		let { orderGroups, status, userInfo } = this.data;
		!userInfo &&
			this.setData({
				userInfo: app.globalData.userInfo
			});
		//从下单支付和收货来的要刷新
		//从订单退回来不一定需要
		if (wx.getStorageSync('refresh')) {
			this.onChange({ detail: { name: status } });
			wx.removeStorageSync('refresh');
		} else if (!orderGroups[status] || !orderGroups[status].list.length) {
			this.setList();
		}
	},

	/**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function() {
		this.switchPop({});
	},

	/**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function() {},

	/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function() {},

	/**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function() {
		this.getOrder(this.data.status);
	},

	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function(res) {
		return util.share(res);
	},

	// tab 点击时执行
	onTabItemTap(item) {
		let { orderGroups, status } = this.data;
		// 列表有内容才刷新，没有会在onShow里面请求
		if (orderGroups[status] && orderGroups[status].list.length) {
			this.onChange({ detail: { name: status } });
		}
	}
});
