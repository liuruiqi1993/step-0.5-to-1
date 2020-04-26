// components/guo-order-item/index.js
const app = getApp();
Component({
	/**
   * 组件的属性列表
   */
	properties: {
		order: {
			type: Object,
			value: {}
		}
	},

	/**
   * 组件的初始数据
   */
	data: {
		showLocation: false,
		imgURL: app.globalData.imgURL
	},

	/**
   * 组件的方法列表
   */
	methods: {
		toDetail(e) {
			JSON.stringify;
			let { currentTarget: { dataset: { no } } } = e;
			wx.navigateTo({
				url: `/pages/order-detail/order-detail?no=${no}`
			});
		},
		recieve(e) {
			this.triggerEvent('popUp', e.currentTarget.dataset.id, { bubbles: true, composed: true });
		},
		toTransport(e) {
			let { order } = this.properties;
			let { currentTarget: { dataset: { no } } } = e;
			wx.setStorageSync('ship', {
				location: order.address,
				detail: order.ship_data
			});
			wx.navigateTo({
				url: `/pages/transport/transport?no=${no}`
			});
		},
		switchLocation() {
			this.setData({
				showLocation: !this.data.showLocation
			});
		}
	}
});
