import React from "react"
import {NavLink} from "react-router-dom";
class Heading2 extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <li>
                <NavLink to={`/${this.props.item.to}`} activeClassName="active-menu">
                    {this.props.item.title}
                </NavLink>
            </li>
        )
    }
}
export default Heading2
