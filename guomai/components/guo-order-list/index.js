// components/guo-order-list/index.js
Component({
	/**
   * 组件的属性列表
   */
	properties: {
		list: {
			type: Array,
			value: []
		},
		text: String
	},

	/**
   * 组件的初始数据
   */
	data: {},

	/**
   * 组件的方法列表
   */
	methods: {
		onClick() {
			wx.switchTab({
				url: '/pages/home/home'
			});
		}
	}
});
