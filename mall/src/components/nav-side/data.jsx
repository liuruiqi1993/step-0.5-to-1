export const data_Sidebar = [
    {
        title: '首页',
        icon: 'home',
        to: ''
    },
    {
        title: '商品',
        icon: 'barcode',
        to: 'product',
        children: [{
            title: '商品管理',
            to: 'product/index'
        }, {
            title: '品类管理',
            to: 'product/category/index'
        }]
    },
    {
        title: '订单',
        icon: 'list',
        to: 'order',
        children: [{
            title: '订单管理',
            to: 'order'
        }]
    },
    {
        title: '用户',
        icon: 'user',
        to: 'user',
        children: [{
            title: '用户管理',
            to: 'user'
        }]
    },
]
