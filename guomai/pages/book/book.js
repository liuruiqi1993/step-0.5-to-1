// pages/book/book.js
import Api from '../../request/api';
const app = getApp();
Page({
	/**
   * 页面的初始数据
   */
	data: {
		book: null,
		currentBook: null,
		count: 1,
		total: 0,
		showPop: false,
		imgURL: app.globalData.imgURL
	},
	async getBook(id) {
		let data = await Api.gift_detail(id);
		this.setData(
			{
				book: data
			},
			() => {
				this.onChange({ detail: 0 });
			}
		);
	},
	onChange(e) {
		this.setData(
			{
				currentBook: this.data.book.boxes[e.detail]
			},
			() => {
				this.totalMoney();
			}
		);
	},
	onCountChange(e) {
		this.setData(
			{
				count: e.detail
			},
			() => {
				this.totalMoney();
			}
		);
	},
	totalMoney() {
		let { count, currentBook } = this.data;
		this.setData({
			total: count * currentBook.price
		});
	},
	ready(e) {
		if (app.globalData.userInfo) {
			this.switchPop();
		} else {
			wx.navigateTo({
				url: '/pages/login/login'
			});
		}
	},
	address(e) {
		let { type } = e.currentTarget.dataset;
		let { book, currentBook, count, total, imgURL } = this.data;
		wx.setStorageSync('order', {
			book: { ...currentBook, amount: count },
			group: book,
			order: { total_amount: total, imgURL },
			amount: count
		});
		if (type === '1') {
			// 下单支付
			wx.navigateTo({
				url: '/pages/order/order'
			});
		} else {
			// 跳转填写地址
			wx.navigateTo({
				url: '/pages/address/address'
			});
		}
	},
	tap(e) {
		console.log(e);
	},
	switchPop() {
		this.setData({
			showPop: !this.data.showPop
		});
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		this.getBook(options.id);
	},
	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		this.setData({
			showPop: false
		});
	},

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
