const app = getApp();
const formatTime = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return (
		[ year, month, day ].map(formatNumber).join('/') + ' ' + [ hour, minute, second ].map(formatNumber).join(':')
	);
};

const formatNumber = (n) => {
	n = n.toString();
	return n[1] ? n : '0' + n;
};
const share = (res) => {
	let { from: fromType, target: { dataset: { id, no } } } = res;
	let { nickName, id: from } = app.globalData.userInfo;
	if (fromType === 'button') {
		// 来自页面内转发按钮
		return {
			title: `好友${nickName}送您一份精美礼物，快填写收礼地址吧~`,
			path: `/pages/address/address?id=${id}&from=${from}&no=${no}`,
			imageUrl: '/images/bg-share.png'
		};
	}
};
module.exports = {
	formatTime,
	share
};
