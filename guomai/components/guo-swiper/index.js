// components/guo-swiper/index.js
const app = getApp();
Component({
	/**
   * 组件的属性列表
   */
	properties: {
		imgs: {
			type: Array,
			value: []
		},
		key: {
			type: String,
			value: ''
		},
		hot: {
			type: Boolean,
			value: false
		},
		height: {
			type: Number,
			value: 0
		}
	},

	/**
   * 组件的初始数据
   */
	data: {
		interval: 3000,
		current: 0,
		imgURL: app.globalData.imgURL
	},

	/**
   * 组件的方法列表
   */
	methods: {
		onChange({ detail: { current } }) {
			this.setData({
				current
			});
		}
	}
});
