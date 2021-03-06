import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductList from './index/index.jsx'
import ProductSave from './index/save.jsx'
import ProductDetail from './index/detail.jsx'
import ProductCategory from './category/category.jsx'
import CategoryAdd from './category/add.jsx'

class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save/:pid?" component={ProductSave} />
                <Route path="/product/detail/:pid" component={ProductDetail} />
                <Route path="/product/category/index/:categoryId?" component={ProductCategory} />
                <Route path="/product/category/add" component={CategoryAdd} />
                <Redirect exact from="/product" to="/product/index" />
            </Switch>
        )
    }
}
export default ProductRouter
