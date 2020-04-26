import React from "react"
import NavSide from "../../components/nav-side/index.jsx"
import NavTop from "../../components/nav-top/index.jsx"
import './index.css'
import './common.scss'
class Layout extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return (
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        )
    }
}
export default Layout
