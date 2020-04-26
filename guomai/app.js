//app.js
import Api from './request/api';
App({
	onLaunch: function() {
		// 清空缓存
		wx.removeStorageSync('order');
		wx.removeStorageSync('location');
		wx.removeStorageSync('ship');

		// 登录
		wx.login({
			success: (res) => {
				this.globalData.code = res.code;
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: async (res) => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo;
							await Api.login();
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res);
							}
						}
					});
				} else {
					if (this.userInfoFailCallback) {
						wx.navigateTo({
							url: '/pages/login/login'
						});
						this.userInfoFailCallback(res);
					}
				}
			}
		});
	},
	globalData: {
		imgURL: 'http://host/',
		userInfo: wx.getStorageSync('userInfo') || null,
		code: null,
		access_token: wx.getStorageSync('access_token') || ''
	}
});
