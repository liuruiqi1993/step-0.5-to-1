export default {
	doubleDegital(num) {
		num = +num;
		return num < 10 ? '0' + num : num;
	}
};
