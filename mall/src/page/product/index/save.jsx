import React from "react"
import PageTitle from "../../../components/page-title";
import CategorySelector from "./category-selector";
import FileUploader from "../../../util/file-uploader";
import {method} from "../../../util";
import './save.scss'
import RichEditor from "../../../util/rich-editor";
import {product} from "../../../service/product-service";
class Save extends React.Component{
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
    onChange(e){
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    changeType(first, second){
        this.setState({
            categoryId: second || 0,
            parentCategoryId: first || 0
        })
    }
    uploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res.data);
        this.setState({
            subImages
        })
    }
    uploadError(err){
        method.errorTips(err.message || '上传失败')
    }
    imageDelete(e){
        let index = parseInt(e.target.getAttribute('index'))
        let subImages = this.state.subImages
        subImages.splice(index,1)
        this.setState({
            subImages
        })
    }
    changeDetail(detail){
        this.setState({
            detail
        })
    }
    getSubImagesString(){
        return this.state.subImages.map(image => image.uri).join(',')
    }
    submit(){
        let good = {
            name: this.state.name.trim(),
            subtitle: this.state.subtitle.trim(),
            // parentCategoryId: this.state.parentCategoryId,
            categoryId: parseInt(this.state.categoryId),
            price: parseInt(this.state.price),
            stock: parseInt(this.state.stock),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            status: this.state.status
        }
        let productCheckResult = product.checkProduct(good)
        if (productCheckResult.status) {
            product.saveProduct(good)
                .then(res => method.successTips(res.data))
                .catch(err => method.errorTips(err))
        } else {
            method.errorTips(productCheckResult.msg)
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="name"
                                           value={this.state.name}
                                           onChange={e => this.onChange(e)}
                                           placeholder="请输入商品名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="subtitle"
                                           value={this.state.subtitle}
                                           onChange={e => this.onChange(e)}
                                           placeholder="请输入商品描述"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <CategorySelector
                                    categoryId={this.state.categoryId}
                                    parentCategoryId={this.state.parentCategoryId}
                                    onChange={(first, second) => this.changeType(first, second)}/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group ">
                                        <input type="number"
                                               className="form-control"
                                               name="price"
                                               value={this.state.price}
                                               onChange={e => this.onChange(e)}
                                               placeholder="价格"/>
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
                                               name="stock"
                                               value={this.state.stock}
                                               onChange={e => this.onChange(e)}
                                               placeholder="库存"/>
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
                                                        <i className="fa fa-close" index={index} onClick={value => this.imageDelete(value)}></i>
                                                    </div>
                                                )
                                            )
                                            : <div>请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-10 col-md-offset-2">
                                    <FileUploader
                                        onSuccess={res => this.uploadSuccess(res)}
                                        onError={err => this.uploadSuccess(err)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <RichEditor
                                        defaultDetail={this.state.defaultDetail}
                                        detail={this.state.detail}
                                        onChange={e => this.changeDetail(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button className="btn btn-primary" onClick={e => this.submit()}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Save
