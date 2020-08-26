import React from 'react'
import {Tooltip} from 'antd';

/**
 * TimeNodeSelector
 * source
 * onChange - callback (source, e)
 */
export default class TimeNodeSelector extends React.Component {
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
        let tempSource = deepCopy(this.props.source);
        if (this.findChoice(index, innerIndex)) {
            for (let i = 0; i < tempSource.length; i++) {
                if (tempSource[i][0] === index && tempSource[i][1] === innerIndex) {
                    tempSource.splice(i, 1);
                }
            }
        } else {
            tempSource.push([index, innerIndex]);
        }
        this.props.onChange(tempSource, e);
    };

    handleClear = () => {
        this.props.onChange([], null);
    };

    handleChoiceAll = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 48; j++) {
                temp.push([i, j]);
            }
        }
        this.props.onChange(temp, null);
    };

    findChoice = (index, innerIndex) => {
        const tempSource = deepCopy(this.props.source);
        for (let i = 0; i < tempSource.length; i++) {
            if (tempSource[i][0] === index && tempSource[i][1] === innerIndex) {
                return true;
            }
        }
        return false;
    };

    transformCN = () => {
        const tempSource = deepCopy(this.props.source);
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

    renderTimeNode = timeList => {
        let temp = [];
        let s, e, index;
        if (timeList.length === 1) {
            temp.push(`${this.getStr(timeList[0], 1)} ~ ${this.getStr(timeList[0], 0)}`);
        } else {
            for (let i = 0; i < timeList.length; i++) {
                if (typeof index === 'undefined') {
                    s = this.getStr(timeList[i], 1);
                    e = this.getStr(timeList[i], 0);
                    index = timeList[i];
                    continue;
                }

                if (index === timeList[i] - 1) {
                    e = this.getStr(timeList[i], 0);
                    index = timeList[i];
                } else {
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
            if (item % 2 === 0) {
                return `${~~(item / 2)}:00`;
            } else {
                return `${~~(item / 2)}:30`;
            }
        } else {
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
                                                    <td
                                                        data-week={index} data-time={innerIndex}
                                                        key={`${index}_${innerIndex}`}
                                                        onClick={e => this.handleClick(index, innerIndex, e)}
                                                        className={`calendar-td ${this.findChoice(index, innerIndex) ? 'hasChoice' : ''}`}
                                                    />
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
                <div style={{marginTop: 5}}>
                    <a onClick={this.handleChoiceAll}>全选</a>
                    <a onClick={this.handleClear}>清空</a>
                </div>
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

export function deepCopy(obj) {
    let result = void 0;
    if (typeof obj === 'object') {
        result = obj.constructor === Array ? [] : {};
        for (let i in obj) {
            typeof obj[i] === 'object' ? (result[i] = deepCopy(obj[i])) : obj.hasOwnProperty(i) ? (result[i] = obj[i]) : void 0;
        }
    } else {
        result = obj;
    }
    return result;
}
