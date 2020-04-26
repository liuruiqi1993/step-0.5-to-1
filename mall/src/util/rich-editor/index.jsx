import React from "react"
import Simditor from "simditor"
import 'simditor/styles/simditor.css'
import './index.scss'
class RichEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.loadEditor()
    }
    componentWillReceiveProps(nextProps){
        if (this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail)
        }
    }
    loadEditor() {
        this.simditor = new Simditor({
            textarea: window.$('#texterea'),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                filekey: 'upload_file'
            }
        })
        this.bindEditorEvent()
    }
    // 初始化富文本编辑器
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onChange(this.simditor.getValue())
        })
    }
    render(){
        return (
            <div className="rich-editor">
                <textarea id="texterea"></textarea>
            </div>
        )
    }
}
export default RichEditor
