import {createBrowserHistory}  from 'history'
import {Modal} from 'antd'

export default createBrowserHistory({
    getUserConfirmation(message, callback) {
        Modal.confirm({
            title: '确认要离开吗',
            content: message,
            onOk() {
                callback(true);
            },
            onCancel() {
                callback(false);
            }
        })
    }
})