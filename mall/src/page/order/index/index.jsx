import React from "react"
import { Link } from "react-router-dom"
import { order } from "../../../service/order-service";
import { method } from "../../../util";
import './index.scss'
import PageTitle from "../../../components/page-title";
import Pagination from "../../../util/pagination";
import TableList from "../../../util/table-list";
import ListSearch from "./index-list-search";

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
            listType: 'list', //list 或 search
            searchKeyword: ''
        }
    }
    componentDidMount() {
        this.loadOrderList()
    }
    loadOrderList() {
        let params = {}
        params.pageNum = this.state.pageNum
        params.listType = this.state.listType
        if (this.state.listType === 'search') {
            params.orderNo = this.state.orderNo
        }
        order.getOrderList(this.state.listType, params)
            .then(res => {
                this.setState({ ...res })
            })
            .catch(err => {
                method.errorTips(err)
            })
    }
    changePage(current) {
        this.setState({
            pageNum: current
        }, () => {
            this.loadOrderList()
        })
    }
    search(orderNumber) {
        let listType = orderNumber === '' ? 'list' : 'search'
        this.setState({
            listType,
            pageNum: 1,
            orderNo: orderNumber
        }, () => {
            this.loadOrderList()
        })
    }
    render() {
        let tableHeads = [
            { name: '订单号', width: '20%' },
            { name: '收件人', width: '25%' },
            { name: '订单状态', width: '15%' },
            { name: '订单总价', width: '15%' },
            { name: '创建时间', width: '15%' },
            { name: '操作', width: '10%' }
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <ListSearch search={(orderNumber) => this.search(orderNumber)} />
                <TableList tableHeads={tableHeads}>
                    {this.state.list.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                </td>
                                <td>{order.receiverName}</td>
                                <td>{order.statusDesc}</td>
                                <td> ¥{order.payment} </td>
                                <td>{order.creatTime} </td>
                                <td>
                                    <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                                </td>
                            </tr>
                        )
                    })}
                </TableList>
                <Pagination {...this.state} onChange={current => this.changePage(current)} />
            </div>
        )
    }
}
export default OrderList
