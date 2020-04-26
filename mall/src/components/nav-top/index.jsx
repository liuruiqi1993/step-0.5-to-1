/*eslint no-useless-constructor: "error"*/
import React from "react"
import { Link } from "react-router-dom"
import {method} from "../../util";
import {user} from "../../service/user-service";
class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: method.getStorage('userInfo').username
        }
    }
    logOut(){
        user.logout()
            .then(res => {
                method.removeStorage('userInfo')
                // this.props.history.push('/login')
                window.location.href = "/login"
            })
            .catch(err => {
                method.errorTips(err)
            })
    }
    render(){
        return (
            <nav className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>M</b>all</Link>
                </div>
                <ul className="nav navbar-right">
                    <li className="dropdown">
                        <a href="#">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                    ?<span>欢迎，{this.state.username}</span>
                                    :<span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.logOut()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                 </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default NavTop
