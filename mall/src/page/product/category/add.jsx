import React from "react"
import PageTitle from "../../../components/page-title";
import { product } from "../../../service/product-service";
import { method } from "../../../util";

class ProductAddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    loadCategoryList() {
        product.getCategoryList().then(
            res => {
                this.setState({
                    categoryList: res
                })
            },
            errMsg => {
                this.setState({
                    categoryList: []
                })
                method.errorTips(errMsg)
            }
        )
    }
    onValueChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onSubmit(e) {
        let categoryName = this.state.categoryName.trim()
        // 品类名称不为空，提交数据
        if (categoryName) {
            product.saveCategory({
                parentId: this.state.parentId,
                categoryName
            }).then(res => {
                method.successTips(res)
                this.props.history.push('/product/category/index')
            }, err => {
                method.errorTips(err)
            })
        } else {
            method.errorTips('请输入品类名称')
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId" class="form-control"
                                        onChange={e => this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                        placeholder="请输入商品名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={e => this.onValueChange(e)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button ype="submit" className="btn btn-primary" onClick={(e) => { this.onSubmit(e) }}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductAddCategory
