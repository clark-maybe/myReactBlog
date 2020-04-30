import React from 'react'
import {Row, Tooltip} from 'antd';
import {fromJS} from 'immutable';

/**
 * 时间节点选择器
 * source - immutable
 * onChange - callback 在节点更改时触发 (source_immutable, e)
 */
export default class CalendarTable extends React.Component {
    constructor(props) {
        super(props);
        let hourList = [];
        let timeList = [];
        for (let i = 0; i < 24; i++) {
            hourList.push(i);
        }
        for (let i = 0; i < 48; i++) {
            timeList.push(i);
        }
        this.state = {
            hourList: hourList,
            timeList: timeList,
            weekList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        };
    }

    handleClick = (index, innerIndex, e) => {
        let tempSource = this.props.source.toJS();
        if (this.findChoice(index, innerIndex)) {
            //已经选中
            for (let i = 0; i < tempSource.length; i++) {
                if (tempSource[i][0] === index && tempSource[i][1] === innerIndex) {
                    tempSource.splice(i, 1);
                }
            }
        } else {
            //未选中
            tempSource.push([index, innerIndex]);
        }
        this.props.onChange(fromJS(tempSource), e);
    };

    //清空
    handleClear = () => {
        this.props.onChange(fromJS([]), null);
    };

    //全选
    handleChoiceAll = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 48; j++) {
                temp.push([i, j]);
            }
        }
        this.props.onChange(fromJS(temp), null);
    };

    //查找源数据中是否已经选中
    findChoice = (index, innerIndex) => {
        const tempSource = this.props.source.toJS();
        for (let i = 0; i < tempSource.length; i++) {
            if (tempSource[i][0] === index && tempSource[i][1] === innerIndex) {
                return true;
            }
        }
        return false;
    };

    //源数据转换中文
    transformCN = () => {
        const tempSource = this.props.source.toJS();
        let temp = [];
        let tempArr = [];
        tempSource.map(item => temp.push(item[0]));
        temp = new Set(temp);
        temp = Array.from(temp);
        temp = temp.sort();
        for (let i = 0; i < temp.length; i++) {
            tempArr.push({day: temp[i], timeList: []});
        }
        for (let i = 0; i < tempSource.length; i++) {
            for (let j = 0; j < tempArr.length; j++) {
                if (tempSource[i][0] === tempArr[j].day) {
                    tempArr[j].timeList.push(tempSource[i][1]);
                }
            }
        }
        for (let i = 0; i < tempArr.length; i++) {
            tempArr[i].timeList = tempArr[i].timeList.sort((a, b) => a - b);
        }
        return tempArr;
    };

    //加载时间节点dom
    renderTimeNode = timeList => {
        let temp = [];
        let s, e, index;
        if (timeList.length === 1) {
            //只有一个节点
            temp.push(`${this.getStr(timeList[0], 1)} ~ ${this.getStr(timeList[0], 0)}`);
        } else {
            //多节点
            for (let i = 0; i < timeList.length; i++) {
                if (typeof index === 'undefined') {
                    //第一个节点
                    s = this.getStr(timeList[i], 1);
                    e = this.getStr(timeList[i], 0);
                    index = timeList[i];
                    continue;
                }

                if (index === timeList[i] - 1) {
                    //上下节点相同
                    e = this.getStr(timeList[i], 0);
                    index = timeList[i];
                } else {
                    //上下节点不同
                    temp.push(`${s} ~ ${e}`);
                    s = this.getStr(timeList[i], 1);
                    e = this.getStr(timeList[i], 0);
                    index = timeList[i];
                }
            }
            temp.push(`${s} ~ ${e}`);
        }
        return <span>{temp.join(' ')}</span>;
    };

    getStr = (item, isS) => {
        if (isS) {
            //开始
            if (item % 2 === 0) {
                return `${~~(item / 2)}:00`;
            } else {
                return `${~~(item / 2)}:30`;
            }
        } else {
            //结束
            if (item % 2 === 0) {
                return `${~~(item / 2)}:30`;
            } else {
                return `${~~(item / 2) + 1}:00`;
            }
        }
    };

    render() {
        return (
            <div className='container-calendar-table'>
                <table className='calendar-table'>
                    <thead className='calendar-head'>
                    <tr>
                        <th rowSpan="8" className="week-td">星期/时间</th>
                        <th colSpan="24">00:00 - 12:00</th>
                        <th colSpan="24">12:00 - 24:00</th>
                    </tr>
                    <tr>
                        {
                            this.state.hourList.map((item, index) => {
                                return (
                                    <td colSpan="2" key={`hour_${index}`}>{index}</td>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody className='calendar-body'>
                    {
                        this.state.weekList.map((item, index) => {
                            return (
                                <tr key={`week_${index}`}>
                                    <td className={'calendar-td-title'}>{item}</td>
                                    {
                                        this.state.timeList.map((innerItem, innerIndex) => {
                                            return (
                                                <Tooltip
                                                    placement="top"
                                                    mouseEnterDelay={0.5}
                                                    title={`${this.state.weekList[index]} - ${this.getStr(innerIndex, 1)} ~ ${this.getStr(innerIndex, 0)}`}
                                                >
                                                    <td data-week={index} data-time={innerIndex}
                                                        key={`${index}_${innerIndex}`}
                                                        onClick={e => this.handleClick(index, innerIndex, e)}
                                                        className={`calendar-td ${this.findChoice(index, innerIndex) ? 'hasChoice' : ''}`}/>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Row style={{marginTop: 5}}>
                    <a onClick={this.handleChoiceAll}>全选</a>
                    <a onClick={this.handleClear}>清空</a>
                </Row>
                <div style={{marginTop: 5, color: 'grey', fontSize: 12}}>
                    {
                        this.transformCN().map((item, index) => {
                            return (
                                <div style={{margin: 5}}>
                                    <span style={{marginRight: 10}}>{this.state.weekList[item.day]}:</span>
                                    <span>{this.renderTimeNode(item.timeList)}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
