import React from "react"
import ReactFileupload from './react-fileupload'
class FileUploader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options: {
                baseUrl: '/manage/product/upload.do',
                fileFieldName: 'upload_file',
                chooseAndUpload: true,
                uploadSuccess: this.props.onSuccess,
                UploadError: this.props.onError
            }
        }
    }
    render(){
        /*set properties*/
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <ReactFileupload options={this.state.options} baseUrl={this.state.options.baseUrl}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </ReactFileupload>
        )
    }
}
export default FileUploader
