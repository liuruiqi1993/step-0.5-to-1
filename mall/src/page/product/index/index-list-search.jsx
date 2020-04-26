import React from "react"
class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchType: 'productId', // productId || productName
            searchKeyword: ''
        }
    }
    onValueChange(e){
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                    name="searchType"
                                    onChange={(e) => this.onValueChange(e)}>
                                <option value="productId">按ID查询</option>
                                <option value="productName">按名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="关键词"
                                   name="searchKeyword"
                                   onChange={(e) => this.onValueChange(e)}
                                   onKeyUp={(e) => {
                                       if (e.keyCode === 13) {
                                           this.props.search(this.state.searchType, this.state.searchKeyword)
                                       }
                                   }}/>
                        </div>
                        <button className="btn btn-primary"
                                onClick={() => this.props.search(this.state.searchType, this.state.searchKeyword)}
                        >搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListSearch
