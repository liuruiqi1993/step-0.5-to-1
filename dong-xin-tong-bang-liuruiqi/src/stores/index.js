import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/requests';
import url from '@/requests/url';
// import { Message } from 'element-ui';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		mediaType: []
	},
	getters: {
		mediaType: (state) => state.mediaType
	},
	mutations: {
		setState(state, { value, key }) {
			if (typeof key === 'string' && key) {
				state[key] = value;
			} else if (key instanceof Array && key.length) {
				let obj = state;
				key.map((item, index) => {
					index < key.length - 1 ? (obj = obj[item]) : (obj[item] = value);
				});
			}
		}
	},
	actions: {
		// 类别
		async getMediaTypeList({ commit }) {
			try {
				let { value } = await api.get({ api: url.getMediaTypeList, school_id: 1 });
				// todo
				value = [
					{
						media_type_id: '1',
						name: '测试修改',
						note: '修改过的类型',
						media_count: '1'
					},
					{
						media_type_id: '2',
						name: '测试类型1',
						note: 'test',
						media_count: '3'
					}
				];

				if (value instanceof Array) {
					value.unshift({
						media_type_id: 0,
						name: '所有类别',
						note: '',
						media_count: value.reduce((total, item) => (total += parseInt(item.media_count)), 0)
					});
					commit('setState', {
						key: 'mediaType',
						value
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
		async updateMediaTypeInfo(context, params) {
			try {
				let { value } = await api.post({ api: url.updateMediaTypeInfo }, params);
				return value;
			} catch (error) {
				console.error(error);
			}
		},
		async addMediaType({ state: { mediaType } }, params) {
			try {
				let result = await api.post({ api: url.addMediaType }, params);
				// todo
				result = {
					error: 'OK',
					value: mediaType.length
				};
				return result;
			} catch (error) {
				console.error(error);
			}
		},
		// 列表
		async getMediaInfoList(context, params) {
			try {
				let { value } = await api.post({ api: url.getMediaInfoList }, params);
				return value;
			} catch (error) {
				console.error(error);
			}
		},
		async updateMediaInfoDeleteStatus(context, params) {
			try {
				let { value } = await api.post({ api: url.updateMediaInfoDeleteStatus }, params);
				// todo
				value = true;
				return value;
			} catch (error) {
				console.error(error);
			}
		}
	}
});

export default store;
