const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy(
            '/manage',
            {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true
            }
        ),
        proxy(
            '/user/logout.do',
            {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true
            }
        )
    );
};
