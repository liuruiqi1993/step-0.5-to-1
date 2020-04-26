// components/guo-list/index.js
const app = getApp();
Component({
	/**
   * 组件的属性列表
   */
	properties: {
		list: Array
	},

	/**
   * 组件的初始数据
   */
	data: {
		imgURL: app.globalData.imgURL
	},

	/**
   * 组件的方法列表
   */
	methods: {
		onClick(e) {
			let { currentTarget: { dataset: { id } } } = e;
			wx.navigateTo({
				url: `/pages/book/book?id=${id}`
			});
		}
	}
});
