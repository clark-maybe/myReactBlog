import React from 'react';
import {fromJS} from "immutable";
import {Icon} from 'antd';

/***
 * 标题编辑器
 * titleNum - 最大标题数(默认 8个)
 * onChange - callback
 * source - 数据源
 */
export default class TitleEditor extends React.Component {
    constructor(props) {
        super(props);
        document.onkeydown = event => {
            //监听回车键输入
            if (event && event.keyCode === 13) {
                //按下回车键，追加一行
                this.addItem(this.state.nowIndex)
            }
        };
        this.state = {
            rule: (text, index) => text ? (text.length >= 5 && text.length <= 30) : true,
            nowIndex: 0
        }
    }

    componentDidMount() {
        //默认新建一行
        let initSource = fromJS([{}]);
        this.props.onChange(initSource, null);
    }

    addItem = index => {
        //添加行
        if(this.props.source.size >= (this.props.titleNum || 8)){
            return void 0;
        }
        let temp = this.props.source.toJS();
        let tempItem = {key: new Date().getTime()};
        temp.splice(index + 1, 0, tempItem);
        this.props.onChange(fromJS(temp), null);
    };

    delItem = index => {
        //删除行
        let temp = this.props.source.toJS();
        temp.splice(index, 1);
        this.props.onChange(fromJS(temp), null);
    };

    clearAll = () => {
        let initSource = fromJS([{ key: new Date().getTime() }]);
        this.props.onChange(initSource, null);
    };

    itemChange = (e, index) => {
        let temp = this.props.source.toJS();
        //识别是否带有多行表头
        if(/ /.test(e.target.value)){
            //带有多行数据
            let strArr = e.target.value.split(/ /);
            for(let i = 0; i < strArr.length; i++){
                if(strArr[i] === ''){
                    strArr.splice(i, 1);
                }
            }
            strArr.reverse();
            for(let i = 0; i < strArr.length; i++){
                temp.splice(index, 0, {str: strArr[i], key: new Date().getTime() + i});
            }
            if(temp.length >= (this.props.titleNum || 8)){
                temp.length = this.props.titleNum || 8;
            }
            this.props.onChange(fromJS(temp), e);
        }else{
            //常规输入
            temp[index].str = e.target.value;
            this.props.onChange(fromJS(temp), e);
        }
    };

    render() {
        const {source, titleNum} = this.props;
        return (
            <div className={'title-editor'}>
                <div className={'title-editor-title'}>
                    <div>
                        批量添加标题({source.size || 0}/{titleNum || 8})
                        <a onClick={this.clearAll} className={'clear'}>清空</a>
                    </div>
                </div>
                <div className={'title-editor-body'}>
                    {
                        source.map((item, index) => {
                            return (
                                <div
                                    className={`title-editor-body-item`}>
                                    <div className={`title-editor-body-item-left`}>
                                        <span style={this.state.rule(item.get('str')) ? {} : {
                                            color: '#ff5959',
                                            fontWeight: 700
                                        }}>{index + 1}</span>
                                    </div>
                                    <div>
                                        <input style={this.state.nowIndex === index ? {backgroundColor: '#f6f6f6'} : {}}
                                               onClick={() => this.setState({nowIndex: index})}
                                               onChange={(e) => this.itemChange(e, index)}
                                               value={item.get('str')}
                                               key={item.get('key')}
                                               type="text" placeholder={'请输入或粘贴创意标题，每行一标题，敲击回车换行'}/>
                                    </div>
                                    <div className={'title-editor-body-item-del'}>
                                        {
                                            this.state.nowIndex === index ?
                                                (
                                                    <span>
                                                        <span
                                                            style={this.state.rule(item.get('str')) ? {} : {
                                                            color: '#ff5959'
                                                        }}>
                                                            {item.get('str') ? item.get('str').length : 0}
                                                        </span>
                                                        /30</span>
                                                ) :
                                                (
                                                    source.size > 1 &&
                                                    <Icon type="close" onClick={() => this.delItem(index)}/>
                                                )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'title-editor-footer'}>

                </div>
            </div>
        )
    }
}