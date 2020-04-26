import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './page/home/index.jsx'
import ProductRouter from "./page/product/router.jsx";
import OrderList from './page/order/index/index.jsx'
import OrderDetail from './page/order/index/detail.jsx'
import User from './page/user/index.jsx'
import LayOut from "./components/layout/index"
import Login from './page/login/index.jsx'
import ErrorPage from './page/error/index.jsx'
class App extends Component {
    render() {
        let LayoutRouter = (
            <LayOut>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRouter} />
                    <Route exact path="/order" component={OrderList} />
                    <Route path="/order/detail/:detail" component={OrderDetail} />
                    <Route path="/user" component={User} />
                    <Route path="/error" component={ErrorPage} />
                    <Redirect from="*" to="/error" />
                </Switch>
            </LayOut>
        )
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={
                            props => LayoutRouter
                        } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
