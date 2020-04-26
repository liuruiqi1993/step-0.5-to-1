const baseURL = 'https://host';
const http = ({ url, data, header, method = 'get' }) => {
	return new Promise((resolve, reject) => {
		const app = getApp();
		const token = app.globalData.access_token;
		wx.request({
			url: baseURL + '/api/minipro/' + url,
			data,
			method,
			header: {
				'content-type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				Authorization: token ? 'Bearer ' + token : '',
				...header
			},
			success(res) {
				let { statusCode, data } = res;
				if (statusCode === 200) {
					if (data.code == 422) {
						wx.navigateTo({
							url: '/pages/login/login'
						});
					} else {
						resolve(data);
					}
				} else {
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			}
		});
	});
};
export default {
	baseURL,
	get(url, data) {
		return http({ url, data });
	},
	post(url, data) {
		return http({ url, data, method: 'post' });
	}
};
