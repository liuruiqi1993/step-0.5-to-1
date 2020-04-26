// pages/transport/transport.js
import Api from '../../request/api';
Page({
	/**
   * 页面的初始数据
   */
	data: {
		list: [],
		statusOption: {
			签收: {
				activeIcon: '/images/icon-1-active.png',
				title: '已签收'
			},
			派件: {
				activeIcon: '/images/icon-2-active.png',
				icon: '/images/icon-2.png',
				title: '派送中'
			},
			在途: {
				activeIcon: '/images/icon-3-active.png',
				icon: '/images/icon-3.png',
				title: '运输中'
			},
			揽收: {
				activeIcon: '/images/icon-4-active.png',
				icon: '/images/icon-4.png',
				title: '已揽件'
			},
			发货: {
				activeIcon: '/images/icon-5-active.png',
				icon: '/images/icon-5.png',
				title: '已发货'
			}
		}
	},
	async get(no) {
		let { ship } = this.data;
		let list = await Api.order_trade(no);
		if (!(list instanceof Array)) list = [];
		list.push({
			time: ship.detail.express_time,
			status: '发货'
		});
		let send = 0;
		list.map((item, index) => {
			if (item.status === '在途') {
				send == 0 ? send++ : (list[index].hide = true);
			}
		});
		this.setData({
			list
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		let ship = wx.getStorageSync('ship');
		this.setData(
			{
				ship
			},
			() => this.get(options.no)
		);
		wx.removeStorageSync('ship');
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
