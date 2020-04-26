import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "../../../components/page-title";
import Pagination from "../../../util/pagination";
import { product } from "../../../service/product-service";
import { method } from "../../../util";
import TableList from "../../../util/table-list";

class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0,
        }
    }
    componentDidMount() {
        this.loadCategoryList()
    }
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname
        let newPath = this.props.location.pathname
        let categoryId = this.props.match.params.categoryId || 0
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: categoryId
            }, () => {
                this.loadCategoryList()
            })
        }
    }
    loadCategoryList() {
        product.getCategoryList(this.state.parentCategoryId)
            .then(res => {
                this.setState({
                    list: res
                })
            })
            .catch(err => {
                method.errorTips(err)
            })
    }
    onChange(current) {
        this.setState({
            pageNum: current
        }, () => {
            this.loadCategoryList()
        })
    }
    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName)
        if (newName) {
            product.updateCategoryName({
                categoryId: categoryId,
                categoryName: categoryName
            }).then(res => {
                method.successTips(res)
            }).catch(err => {
                method.errorTips(err)
            })
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表" >
                    <div className="page-header-right">
                        <Link to="/product/category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {this.state.list.map((category, index) => {
                        return (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <a href="" className="opera"
                                        onClick={e => { this.onUpdateName(category.id, category.name) }}>
                                        修改名称</a>
                                    {
                                        category.parentId === 0
                                            ? <Link to={`/product/category/index/${category.id}`}>查看子品类</Link>
                                            : null
                                    }
                                </td>
                            </tr>
                        )
                    })
                    }
                </TableList>
                <Pagination {...this.state} onChange={current => this.onChange(current)} />
            </div>
        )
    }
}
export default ProductCategory
