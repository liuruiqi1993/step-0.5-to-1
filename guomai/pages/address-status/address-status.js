// pages/address-status/address-status.js
Page({
	/**
   * 页面的初始数据
   */
	data: {
		type: null,
		text: {
			1: '地址提交成功，请耐心等待您的礼品哦～',
			2: '礼物已被别人领取哦~',
			3: '礼物超过24小时未领取，已退回～'
		}
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		this.setData({
			type: options.type
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
	onShareAppMessage: function() {}
});
