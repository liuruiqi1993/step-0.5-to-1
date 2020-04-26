import React from "react"
import {Link} from 'react-router-dom'
import PageTitle from '../../components/page-title/index.jsx'

class Error extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="出错了!"/>
                <div className="col-md-12">
                    找不到路径，
                    <Link to="/">点我返回首页</Link>
                </div>
            </div>
        )
    }
}
export default Error