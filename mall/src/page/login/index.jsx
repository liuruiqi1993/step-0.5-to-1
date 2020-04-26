import React from "react"
import "./index.scss"
import {user} from '../../service/user-service'
import {method} from "../../util";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            redirect: method.getUrlParam('redirect') || ''
        }
    }
    onUserChange (key, e){
        this.setState({
            [key]: e.target.value
        })
    }
    submit (e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        let result = user.checkLoginInfo(loginInfo)
        if (!result.status) return method.errorTips(result.msg);
        user.login(loginInfo).then(res => {
            this.props.history.push(this.state.redirect)
            method.setStorage('userInfo', res)
        }).catch(err => {
            method.errorTips(err)
        })
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-4 col-sm-4 col-md-offset-4 col-sm-offset-4">
                    <div className="login panel panel-default">
                        <div className="panel-heading">欢迎登录管理系统</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="请输入用户名"
                                    onChange={e => this.onUserChange("username", e)}/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="请输入密码"
                                    onChange={e => this.onUserChange("password", e)}/>
                                </div>
                                <button type="submit" className="btn btn-large btn-primary"
                                onClick={e => this.submit(e)}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
