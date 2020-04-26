import React from "react"
import PageTitle from "../../components/page-title";
import Pagination from "../../util/pagination";
import { user } from "../../service/user-service";
import { method } from "../../util";
import TableList from "../../util/table-list";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: []
        }
    }
    componentDidMount() {
        this.loadUserList()
    }
    loadUserList() {
        user.getUserList(this.state.pageNum)
            .then(res => {
                this.setState({
                    ...res
                })
            })
            .catch(err => {
                this.setState({
                    list: []
                })
                method.errorTips(err)
            })
    }
    onChange(current) {
        this.setState({
            pageNum: current
        }, () => {
            this.loadUserList()
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList tableHeads={['ID', '用户名', '邮箱', '邮箱', '注册时间']}>
                    {
                        this.state.list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.createTime).toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination {...this.state} onChange={current => this.onChange(current)} />
            </div>
        )
    }
}
export default User
