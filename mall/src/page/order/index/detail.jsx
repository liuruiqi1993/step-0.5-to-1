import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "../../../components/page-title";
import TableList from "../../../util/table-list";
import { method } from "../../../util";
import './detail.scss'
import { order } from "../../../service/order-service";

class orderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.match.params.detail,
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrder()
    }
    loadOrder() {
        if (this.state.orderNumber) {
            order.getOrderDetail(this.state.orderNumber)
                .then(res => {
                    this.setState({
                        orderInfo: res
                    })
                })
                .catch(err => method.errorTips(err))
        }
    }
    onSendGoods(e) {
        if (window.confirm('是否确认该订单已经发货？')) {
            order.sendGoods(this.state.orderNumber).then(res => {
                method.successTips('发货成功')
                this.loadOrderDetail();
            }, (errMsg) => {
                method.successTips(errMsg)
            })
        }
    }
    render() {
        let productList = this.state.orderInfo.orderItemVoList || []
        let tableHeads = [
            { name: '商品图片', width: '20%' },
            { name: '商品信息', width: '50%' },
            { name: '单价', width: '10%' },
            { name: '数量', width: '10%' },
            { name: '合计', width: '10%' }
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title={'订单详情'} />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单号</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">创建时间</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">收件人</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.orderInfo.receiverName}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单状态</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">
                                        {this.state.orderInfo.statusDesc}
                                        {
                                            this.state.orderInfo.status !== 20
                                                ? <button
                                                    className="btn btn-default btn-sm btn-send-goods"
                                                    onClick={e => { this.onSendGoods(e) }}
                                                >立即发货</button>
                                                : null
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">支付方式</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品列表</label>
                                <div className="col-md-10">
                                    <TableList tableHeads={tableHeads}>
                                        {productList.map((product, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName} />
                                                    </td>
                                                    <td>
                                                        <Link to={`/product/detail/${product.productId}`}>{product.productName}</Link>
                                                    </td>
                                                    <td>¥{product.currentUnitPrice}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>¥{product.totalPrice}</td>
                                                </tr>
                                            )
                                        })}
                                    </TableList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default orderDetail
