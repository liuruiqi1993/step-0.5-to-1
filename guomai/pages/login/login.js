//index.js
//获取应用实例
import Api from '../../request/api';
const app = getApp();

Page({
	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		});
	},
	onLoad: function() {
		if (app.globalData.userInfo) {
			this.login(app.globalData.userInfo);
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = (res) => {
				this.login(res.userInfo);
			};
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: (res) => {
					this.loginSuccess(res.userInfo);
				}
			});
		}
	},
	getUserInfo: function(e) {
		this.login(e.detail.userInfo);
	},
	async login(userInfo) {
		app.globalData.userInfo = userInfo;
		await Api.login();
		this.loginSuccess(userInfo);
	},
	loginSuccess(userInfo) {
		this.setData({
			userInfo,
			hasUserInfo: true
		});
		wx.navigateBack();
	}
});
