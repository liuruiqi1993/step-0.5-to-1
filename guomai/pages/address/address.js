// pages/address/address.js
import Api from '../../request/api';
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk = new QQMapWX({
	key: ''
});
Page({
	/**
   * 页面的初始数据
   */
	data: {
		order_id: null,
		userInfo: null,
		area: [],
		full_address: '',
		contact_name: '',
		contact_phone: '',
		direct: '',
		order: null
	},
	async submit(e) {
		// todo 校验
		let { order_id, full_address, area, contact_name, contact_phone, direct } = this.data;
		if (
			!full_address.trim() ||
			!contact_name.trim() ||
			!contact_phone.trim() ||
			area.filter((item) => item.trim()).length !== 3
		) {
			wx.showToast({
				title: '请填写完整',
				icon: 'none'
			});
		} else {
			let location = {
				zip: area.join(' '),
				full_address,
				contact_name,
				contact_phone: direct ? `${contact_phone}-${direct}` : contact_phone
			};
			if (order_id) {
				// 好友提交订单，成功之后将按钮改成返回
				// todo
				let it = await Api.add_address({
					order_id,
					...location
				});
				wx.showToast({
					title: it,
					icon: 'none'
				});
				wx.redirectTo({
					url: '/pages/address-status/address-status?type=1'
				});
			} else {
				wx.setStorageSync('location', location);
				wx.navigateTo({
					url: '/pages/order/order'
				});
			}
		}
	},
	bindChange({ detail: { value }, currentTarget: { dataset: { key } } }) {
		this.setData({
			[key]: value
		});
	},
	getLocation() {
		let _this = this;
		wx.chooseLocation({
			success(result) {
				let { address, latitude, longitude, name } = result;
				qqmapsdk.reverseGeocoder({
					location: { latitude, longitude },
					success(res) {
						let {
							result: {
								address_component: { city, district, province, street },
								address_reference: { town }
							}
						} = res;
						_this.setData({
							area: [ province, city, district ],
							full_address: `${town ? town.title + '-' : ''}${street ? street + '-' : ''}${name}`
						});
					},
					fail(e) {
						console.log(e);
					}
				});
			},
			fail(e) {
				wx.showModal({
					title: '需要获取位置信息授权',
					confirmText: '去授权',
					success(res) {
						res.confirm && wx.openSetting();
					}
				});
			}
		});
	},
	initLocation() {
		// 初始化地址和联系人
		let location = wx.getStorageSync('location');
		if (location) {
			let { zip, full_address, contact_name, contact_phone: phone } = location;
			let [ contact_phone, direct ] = phone.split('-');
			this.setData({
				area: zip.split(' '),
				full_address,
				contact_name,
				contact_phone,
				direct
			});
		}
	},
	async getOrder(no) {
		let { userInfo } = this.data;
		let order = await Api.order_detail(no);
		// 填写地址的人，点击进入的，已填写收货信息的页面；
		// 其他人进入，提示礼盒已被领取
		// 超时未填写，提示已退款
		if (order.receive_user_id) {
			wx.redirectTo({
				url: `/pages/address-status/address-status?type=${userInfo.id == order.receive_user_id ? 1 : 2}`
			});
		} else if (new Date(order.created_at) - new Date() <= -3 /* 24 * 60 */ * 60 * 1000) {
			wx.redirectTo({
				url: `/pages/address-status/address-status?type=3`
			});
		}
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		let { id, from, no } = options;

		console.log(options);

		let userInfo = app.globalData.userInfo;
		this.setData({
			userInfo,
			order_id: id || null
		});
		// 如果是自己邀请自己就跳去个人中心
		// 如果有订单no就请求订单详情
		// 如果是自己买书不会有from和no
		if (from && from == userInfo.id) {
			wx.setStorageSync('refresh', true);
			wx.switchTab({ url: '/pages/user/user' });
		} else if (no) {
			this.getOrder(no);
		} else {
			this.initLocation();
		}
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		let userInfo = app.globalData.userInfo;
		!userInfo &&
			wx.navigateTo({
				url: '/pages/login/login'
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
