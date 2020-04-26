// pages/home/home.js
import Api from '../../request/api';
Page({
	/**
   * 页面的初始数据
   */
	data: {
		banner: [],
		typeOptions: [],
		type: [],
		list: [],
		page: 1,
		total: 0
	},
	onChange(e) {
		let { detail } = e;
		this.setData(
			{
				type: detail.slice(-1)
			},
			() => {
				this.resetList();
			}
		);
	},
	toDetail() {
		wx.navigateTo({
			url: `/pages/book/book?id=${this.data.banner.id}`
		});
	},
	async getList() {
		let { list, type: [ type_id ], page, total: currentTotal } = this.data;
		if (currentTotal && currentTotal <= list.length) {
			return;
		}
		let params = {
			page
		};
		type_id && (params.type_id = type_id);
		let { hot, type: typeOptions, index_list: { data, current_page, total } } = await Api.home(params);
		let banner = hot.length ? hot[0] : { id: null, images: [] };
		this.setData({
			typeOptions,
			banner,
			list: list.concat(data),
			page: current_page + 1,
			total
		});
	},
	resetList() {
		this.setData(
			{
				list: [],
				page: 1,
				total: 0
			},
			() => {
				this.getList();
			}
		);
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: async function(options) {
		this.getList();
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
	onReachBottom: function() {
		this.getList();
	},

	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function() {}
});
