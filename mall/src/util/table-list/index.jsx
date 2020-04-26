import React from "react"
class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps() {
        // 列表只有在第一次挂载时为true
        this.setState({
            isFirstLoading: false
        })
    }
    render() {
        let tableheader = this.props.tableHeads.map((head, index) => {
            if (typeof head === 'object') {
                return <th key={index} width={head.width}>{head.name}</th>
            } else {
                return <th key={index}>{head}</th>
            }
        });
        let listBody = this.props.children;
        let listError = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载中…' : "没有找到相关结果"}
                </td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listError
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableheader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TableList
