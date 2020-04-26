import axios from 'axios';
import URL from '@/requests/url';
import { Message } from 'element-ui';

const request = ({ method = 'get', data, params, url = 'bmd/jsonApi.php' }) => {
	// const storageToken = sessionStorage.getItem('token');
	return axios.request({
		baseURL: process.env.NODE_ENV !== 'production' ? '/api' : URL.baseURL,
		headers: {
			'Content-Type': 'application/json;application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest'
		},
		url,
		method,
		data,
		params
	});
};
axios.interceptors.response.use(
	async (response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	async (response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		return response.data;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		if (error.message.indexOf('timeout') > -1) {
			Message({ type: 'error', message: '请求超时' });
		} else if (error.message.indexOf('network') > -1) {
			Message({ type: 'error', message: '请检查网络' });
		} else if (error.response.status == 500) {
			Message({ type: 'error', message: '服务器错误' });
		}
		return Promise.reject(error);
	}
);
export default {
	get(params) {
		return request({ params });
	},
	post(params, data) {
		return request({ data, method: 'post', params });
	},
	upload(data) {
		return request({ data, method: 'post', url: 'ms/upload.php' });
	}
};
