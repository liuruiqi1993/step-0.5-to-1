import React from "react"
import { NavLink } from "react-router-dom";
import Heading2 from "./heading2.jsx"
class Heading1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            collapse: true
        }
    }
    toggle (e) {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    render(){
        return (
            <ul className="nav" id="main-menu">
                {this.props.item.children
                    ? (
                        <li>
                            <a onClick={ e => this.toggle(e)}>
                                <i className={`fa fa-${this.props.item.icon}`}></i>
                                <span>{this.props.item.title}</span>
                                <span className={`fa angle fa-angle-${this.state.collapse ? 'right' : 'down'}`}></span>
                            </a>
                            <ul className={`nav nav-second-level collapse${this.state.collapse ? '' : 'in'}`}>
                                {this.props.item.children.map((item, index) => {
                                    return <Heading2 item={item} key={index}/>
                                })}
                            </ul>
                        </li>
                    )
                    : <li>
                        <NavLink exact activeClassName="active-menu" to={`/${this.props.item.to}`}
                                 onClick={ e => this.toggle(e)}>
                            <i className={`fa fa-${this.props.item.icon}`}></i>
                            <span>{this.props.item.title}</span>
                        </NavLink>
                    </li>
                }
            </ul>
        )
    }
}
export default Heading1
