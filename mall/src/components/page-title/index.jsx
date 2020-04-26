import React from "react"
class PageTitle extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentWillMount(){
        document.title = this.props.title + "-MALL"
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.title}
                    </h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default PageTitle
