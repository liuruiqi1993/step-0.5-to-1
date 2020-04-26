// pages/order-detail/order-detail.js
import Api from '../../request/api';
const util = require('../../utils/util.js');
const app = getApp();
Page({
	/**
   * 页面的初始数据
   */
	data: {
		order: null,
		showPop: false,
		countDown: 0,
		timeData: {},
		imgURL: app.globalData.imgURL
	},
	async getBook(no) {
		let order = await Api.order_detail(no);
		let countDown = 0;
		if (order.ship_data && order.ship_data.express_time) {
			countDown = new Date(order.ship_data.express_time) - new Date() + 7 * 24 * 3600 * 1000;
		}
		this.setData({
			order,
			countDown
		});
	},
	switchPop(e) {
		let { currentTarget: { dataset: { text } } } = e;
		this.setData({
			showPop: !this.data.showPop,
			popText: !this.data.showPop ? text : ''
		});
	},
	onTimeChange(e) {
		this.setData({
			timeData: e.detail
		});
	},
	async recieve() {
		let { code, data } = await Api.order_received(this.data.order.id);
		if (code === 200) {
			wx.showToast({
				title: data,
				icon: 'none'
			});
			wx.setStorageSync('refresh', true);
			wx.navigateBack();
		}
	},
	copy(e) {
		let { currentTarget: { dataset: { text } } } = e;
		wx.setClipboardData({
			data: text
		});
	},
	toTransport(e) {
		let { order } = this.data;
		let { currentTarget: { dataset: { no } } } = e;
		wx.setStorageSync('ship', {
			location: order.address,
			detail: order.ship_data
		});
		wx.navigateTo({
			url: `/pages/transport/transport?no=${no}`
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		this.getBook(options.no);
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {},

	/**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function() {
		this.setData({
			showPop: false,
			popText: ''
		});
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
	onReachBottom: function() {},

	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function(res) {
		return util.share(res);
	}
});
