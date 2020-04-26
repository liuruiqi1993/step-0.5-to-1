import {method} from "../util";

class User{
    checkLoginInfo (loginInfo) {
        let username = window.$.trim(loginInfo.username);
        let password = window.$.trim(loginInfo.password);
        if (typeof username !== 'string' || username.length===0) {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        if (typeof password !== 'string' || password.length===0) {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    login(params){
        return method.request({
            type: 'post',
            url: 'manage/user/login.do',
            data: params
        })
    }
    logout(){
        return method.request({
            type: 'post',
            url: 'user/logout.do',
        })
    }
    getUserList(pageNum){
        return method.request({
            type: 'post',
            url: 'manage/user/list.do',
            data: {
                pageNum
            }
        })
    }
}
export const user = new User()
