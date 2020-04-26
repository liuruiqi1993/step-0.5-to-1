/*eslint no-useless-constructor: "error"*/
import React from "react"
import { data_Sidebar } from "./data";
import Heading1 from "./heading1.jsx"

class NavSide extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <nav className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    {data_Sidebar.map((item,index) => {
                        return <Heading1 item={item} key={index}/>
                    })}
                </div>
            </nav>
        )
    }
}
export default NavSide
