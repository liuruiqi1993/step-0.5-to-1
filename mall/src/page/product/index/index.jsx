import React from "react"
import { Link } from "react-router-dom"
import { product } from "../../../service/product-service";
import { method } from "../../../util";
import './index.scss'
import PageTitle from "../../../components/page-title";
import Pagination from "../../../util/pagination";
import TableList from "../../../util/table-list";
import ListSearch from "./index-list-search";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
            listType: 'list'
        }
    }
    componentDidMount() {
        this.loadProductList()
    }
    loadProductList() {
        let params = {
            pageNum: this.state.pageNum
        }
        if (this.state.listType === 'search') {
            params[this.state.searchType] = this.state.searchKeyword
        }
        product.getProductList(this.state.listType, params)
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
            this.loadProductList()
        })
    }
    search(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType,
            pageNum: 1,
            searchType,
            searchKeyword
        }, () => {
            this.loadProductList()
        })
    }
    onSetProductStatus(e, productId, currentStatus) {
        let confirmTips = currentStatus === 1 ? '确定要下架该商品' : '确定要上架该商品'
        if (window.confirm(confirmTips)) {
            product.setProductStatus({
                productId,
                status: !currentStatus
            })
                .then(res => {
                    method.successTips(res)
                    this.loadProductList()
                })
                .catch(err => {
                    method.errorTips(err)
                })
        }
    }
    render() {
        let tableHeads = [
            { name: '商品ID', width: '10%' },
            { name: '商品信息', width: '50%' },
            { name: '价格', width: '10%' },
            { name: '状态', width: '15%' },
            { name: '操作', width: '15%' }
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch search={(searchType, searchKeyword) => this.search(searchType, searchKeyword)} />
                <TableList tableHeads={tableHeads}>
                    {this.state.list.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>￥{product.price}</td>
                                <td>
                                    <p>{product.status === 1 ? '在售' : '已下架'}</p>
                                    <button className={`btn btn-xs btn-${product.status === 1 ? 'warning' : 'success'}`}
                                        onClick={(e) => { this.onSetProductStatus(e, product.status) }}>
                                        {product.status === 1 ? '下架' : '上架'}
                                    </button>
                                </td>
                                <td>
                                    <Link className="opera" to={`/product/detail/${product.id}`}>详情</Link>
                                    <Link className="opera" to={`/product/save/${product.id}`}>编辑</Link>
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
export default ProductList
