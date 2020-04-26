module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://host/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};
