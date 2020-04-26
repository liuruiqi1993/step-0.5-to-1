import React from "react"
import './category-selector.scss'
import {product} from "../../../service/product-service";
import {method} from "../../../util";
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }

    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        // 没有变化不做处理
        if (!categoryIdChange && !parentCategoryIdChange){
            return
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: 0
            })
        }
        // 有两级品类
        else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, ()=>{
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }
    }
    /*  加载一级分类 */
    loadFirstCategory(){
        product.getCategoryList()
            .then(res => this.setState({
                firstCategoryList: res
            }))
            .catch(err => method.errorTips(err))
    }
    onFirstCategoryChange(e){
        let newValue = e.target.value || 0;
        if(this.props.readonly) return
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: [],
        }, () => {
            this.loadSecondCategory();
            // 传给父组件
            this.onPropsCategoryChange()
        })
    }
    loadSecondCategory(){
        product.getCategoryList(this.state.firstCategoryId)
            .then(res => this.setState({
                secondCategoryList: res
            }))
            .catch(err => {})
    }
    onSecondCategoryChange(e){
        let newValue = e.target.value || 0;
        if(this.props.readonly) return
        this.setState({
            secondCategoryId: newValue,
        }, () => this.onPropsCategoryChange())
    }
    onPropsCategoryChange(){
        if (this.state.secondCategoryId) {
            this.props.onChange(this.state.firstCategoryId, this.state.secondCategoryId)
        } else {
            this.props.onChange(this.state.firstCategoryId)
        }
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                        readOnly={this.props.readonly}
                        value={this.state.firstCategoryId}
                        onChange={e => this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(category => <option key={category.id} value={category.id}>
                            {category.name}
                        </option>)
                    }
                </select>
                <select className="form-control cate-select"
                        readOnly={this.props.readonly}
                        value={this.state.secondCategoryId}
                        onChange={e => this.onSecondCategoryChange(e)}>
                    <option value="">请选择二级分类</option>
                    {
                        this.state.secondCategoryList.map(category => <option key={category.id} value={category.id}>
                            {category.name}
                        </option>)
                    }
                </select>
            </div>
        )
    }
}
export default CategorySelector
