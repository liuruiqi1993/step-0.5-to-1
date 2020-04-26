class MUtil {
    /* 发请求 */
    request (param) {
        return new Promise((resolve, reject) => {
            window.$.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success:(res) =>{
                    if (res.status===0){
                        typeof resolve === "function" && resolve(res.data, res.msg)
                    } else if (res.status === 10) {
                        this.login();
                    } else{
                        typeof resolve === "function" && reject(res.msg || res.data)
                    }
                },
                error:(err)=>{
                    typeof resolve === "function" && reject(err.statusText)
                }
            })
        })
    }

    /* 跳去登录页，并带上登录成功要跳回的地址 */
    login () {
        window.location.href = "/login?redirect="+encodeURIComponent(window.location.pathname)
    }

    /* 处理跳回地址 */
    getUrlParam(string){
        let queryString = window.location.search.split("?")[1] || ''
        // window.location.search 拿到?及?以后的部分
        // 搜索规则:    (^|&)——开头或以&开头
        //              ([^&]*)——零次或多次[^&]
        //              [^&]不含&—— ^在方括号表达式中使用，此时它表示不接受该字符集合
        //              (&|$)——结尾或以&结尾
        // 就是说 string前面一定有&，后面一定有等号，截取到下一个&为止
        let reg = new RegExp("(^|&)"+string+"=([^&]*)(&|$)")
        let result = queryString.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    }
    successTips(msg){
        alert(msg || '操作成功')
    }
    /* 错误提醒 */
    errorTips (msg) {
        alert(msg || '好像哪里不对')
    }

    /* localStorage */
    setStorage (name, data) {
        let dataType = typeof data
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        } else if (['number', 'string', 'boolean'].indexOf(dataType)) {
            window.localStorage.setItem(name, data)
        } else {
            alert('该类型不能用于本地存储')
        }
    }
    getStorage (name) {
        let data = window.localStorage.getItem(name)
        if (data) {
            return JSON.parse(data)
        } else {
            return ""
        }
    }
    removeStorage (name) {
        window.localStorage.removeItem(name)
    }
}
export const method = new MUtil()
