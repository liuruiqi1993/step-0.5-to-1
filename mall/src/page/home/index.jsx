import React from 'react'
import { Link } from "react-router-dom"
import {method} from "../../util";
import PageTitle from "../../components/page-title/index"
import "./index.scss"
import {statistic} from "../../service/statistic-service";
class Home extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            userCount: 0,
            productCount: 0,
            orderCount: 0
        }
    }
    loadCount(){
        statistic.getHomeCount().then(res => {
            this.setState(res);
        }).catch(err => {
            method.errorTips(err)
        })
    }
    componentDidMount(){
        this.loadCount()
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box blue">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>产品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box red">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home
