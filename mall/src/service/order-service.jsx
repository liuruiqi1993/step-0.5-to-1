import { method } from "../util";
class Order {
    getOrderList(type, data) {
        let url = type === 'list' ? '/manage/order/list.do' : '/manage/order/search.do'
        return method.request({
            type: 'post',
            url,
            data
        })
    }
    getOrderDetail(orderNo) {
        return method.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo
            }
        })
    }
    sendGoods(orderNo) {
        return method.request({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo
            }
        })
    }
}
export const order = new Order()