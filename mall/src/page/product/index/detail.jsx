import React from "react"
import PageTitle from "../../../components/page-title";
import CategorySelector from "./category-selector";
import {method} from "../../../util";
import './save.scss'
import {product} from "../../../service/product-service";

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            parentCategoryId: 0,
            categoryId: 0,
            price: '',
            stock: '',
            subImages: [],
            detail: '',
            status: 1 // 待售
        }
    }
    componentDidMount() {
        this.loadProduct()
    }
    loadProduct(){
        if(this.state.id){
            product.getProduct({
                productId: this.state.id || 0
            })
                .then(res => {
                    res.subImages = res.subImages.split(',').map(img => {
                        return {
                            uri: img,
                            url: res.imageHost + img
                        }
                    })
                    res.defaultDetail = res.detail
                    this.setState(res)
                })
                .catch(err => method.errorTips(err))
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={'商品详情'}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.name}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">{this.state.subtitle}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <CategorySelector
                                    readonly={true}
                                    categoryId={this.state.categoryId}
                                    parentCategoryId={this.state.parentCategoryId}/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group ">
                                        <input type="number"
                                               className="form-control"
                                               value={this.state.price}
                                               readOnly/>
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number"
                                               className="form-control"
                                               value={this.state.stock}
                                               readOnly/>
                                        <span className="input-group-addon">件</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品图片</label>
                                <div className="col-md-10">
                                    {
                                        this.state.subImages.length
                                            ? this.state.subImages.map(
                                            (image, index) => (
                                                <div key={index} className="img-con">
                                                    <img src={image.url} alt=""/>
                                                </div>
                                            )
                                            )
                                            : <div>暂无图片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail
