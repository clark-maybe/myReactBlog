import React from 'react'
import { Radio, Row, Col } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { fromJS } from 'immutable';

const RadioGroup = Radio.Group;

class Italy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eChartsDim: fromJS([])
        };
    }

    radioChange = item => {
        const { handleChangeRadio, queryECharts } = this.props;
        handleChangeRadio(item.target.value);
        queryECharts(item.target.value);
    };

    getChartOption = () => {
        const { eChartsData } = this.state;
        let tempData = eChartsData.toJS();
        let xAxisData = [];
        let firstSeriesData = [];
        let secondSeriesData = [];
        let thirdSeriesData = [];
        let fourthSeriesData = [];
        let tempLegendData = ['现存', '疑似', '确诊', '死亡'];

        //调整数据结构
        tempData.map(item => {
            xAxisData.push(item.key);
            firstSeriesData.push(item.m_chat_amount ? item.existing : 0);
            secondSeriesData.push(item.m_valid_chat_amount ? item.suspect : 0);
            thirdSeriesData.push((item.m_chat_pv * 100).toFixed(2) || 0);
            fourthSeriesData.push((item.m_valid_chat_rate * 100).toFixed(2) || 0);
            return void 0;
        });
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            color: ['#ee5218', '#dfcc1d', '#ff4b03', 'rgba(107,107,107,0.52)'],
            legend: {
                data: tempLegendData
            },
            grid: { left: '10%', bottom: '25%' },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        rotate: 60,
                        interval: 0
                    },
                    axisLine: { onZero: false },
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} 个'
                    }
                },
                {
                    type: 'value',
                    name: '百分比',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: '现存',
                    type: 'bar',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    yAxisIndex: 0,
                    areaStyle: { normal: {} },
                    data: firstSeriesData
                },
                {
                    name: '疑似',
                    type: 'bar',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    yAxisIndex: 0,
                    areaStyle: { normal: {} },
                    data: secondSeriesData
                },
                {
                    name: '确诊',
                    type: 'bar',
                    smooth: true,
                    yAxisIndex: 0,
                    data: thirdSeriesData
                },
                {
                    name: '死亡',
                    type: 'bar',
                    smooth: true,
                    yAxisIndex: 0,
                    data: fourthSeriesData
                }
            ]
        };
    };

    render() {
        const { eChartsDim } = this.state;
        let divHeight = 702 + 'px';
        return (
            <div
                style={{
                    height: divHeight,
                    paddingBottom: '30px',
                    marginTop: 5
                }}
            >
                <div
                    style={{
                        fontSize: 18,
                        fontWeight: 800,
                        height: 30,
                        margin: '0 0 50px 0',
                        padding: '0 24px 0 24px',
                        borderLeft: '5px solid #1890ff'
                    }}
                >
                    <Row>
                        <Col sm={4}>
                            <span>趋势图</span>
                        </Col>
                        <Col sm={20} style={{ textAlign: 'right' }}>
                            <RadioGroup onChange={this.radioChange} value={eChartsDim} style={{ marginLeft: '2px', marginTop: '2px' }} buttonStyle="solid">
                                <Radio.Button value="time">按时间</Radio.Button>
                                <Radio.Button value="date">按日期</Radio.Button>
                                <Radio.Button value="week">按周</Radio.Button>
                            </RadioGroup>
                        </Col>
                    </Row>
                </div>
                <ReactEcharts style={{ height: '480px', paddingRight: '24px' }} option={this.getChartOption()} />
            </div>
        )
    }
}

export default Italy;