// pages/order/order.js
import Api from '../../request/api';
Page({
	/**
   * 页面的初始数据
   */
	data: {
		order: null,
		location: null
	},
	async submit() {
		let { order: { book, group, amount }, location } = this.data;
		try {
			let { order_id, pay_data, order_no } = await Api.make_order({
				gifts: [
					{
						gift_id: group.id,
						box_id: book.id,
						amount
					}
				]
			});
			wx.requestPayment({
				...pay_data,
				async success(result) {
					if (location) {
						// 如果有地址就是买给自己的，立即上传地址
						await Api.add_address({
							order_id,
							...location
						});
					} else {
						// 没地址就去分享给好友
					}
					wx.redirectTo({
						url: `/pages/pay/pay?id=${order_id}&no=${order_no}`
					});
				},
				fail: () => {
					wx.showToast({
						title: '支付失败',
						icon: 'none'
					});
					// wx.switchTab({
					// 	url: '/pages/user/user'
					// });
				}
			});
		} catch (e) {
			wx.showToast({
				title: '下单失败',
				icon: 'none'
			});
			console.log(e);
		}
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		this.setData({
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
