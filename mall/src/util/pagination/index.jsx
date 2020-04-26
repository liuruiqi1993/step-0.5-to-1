import React from "react"
import RCPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.css'

class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <RCPagination
                        {...this.props}
                        current={this.props.pageNum}
                        hideOnSinglePage
                        showQuickJumper
                        onChange={(current) => this.props.onChange(current)}/>
                </div>
            </div>
        )
    }
}
export default Pagination
