// pages/pay/pay.js
const util = require('../../utils/util.js');
Page({
	/**
   * 页面的初始数据
   */
	data: {
		order_id: null,
		no: null,
		order: null,
		location: null
	},
	back() {
		wx.setStorageSync('refresh', true);
		wx.switchTab({ url: '/pages/user/user' });
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		this.setData({
			order_id: options.id,
			no: options.no,
			order: wx.getStorageSync('order'),
			location: wx.getStorageSync('location') || null
		});
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
	onHide: function() {},

	/**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function() {
		wx.removeStorageSync('order');
		wx.removeStorageSync('location');
	},

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
		setTimeout(this.back, 2000);
		return util.share(res);
	}
});
