import React from 'react';
import { Button, Modal, Row, Col, Drawer, Radio, Icon, Tooltip } from 'antd';
import G6 from '@antv/g6';
import { fromJS } from 'immutable';

import './RobotFlowChart.less';
import RobotFlowChartForm from './RobotFlowChartForm';

/**
 * 机器人流程图
 */
class FlowChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {}, //图形实例
            selectNode: fromJS({}), //选中节点,
            selectEdge: {},
            isShowLeftControl: true, //左侧面板
            isShowRightControl: false //右侧控制区开关
        };
    }

    container = React.createRef();

    componentDidMount() {
        setTimeout(() => {
            this.initG6(this.props);
        }, 100);
    }

    //初始化G6实例
    initG6 = props => {
        const { sourceData } = props;

        const graph = new G6.Graph({
            container: this.container.current || <div />,
            width: window.innerWidth,
            height: window.innerHeight,
            defaultNode: {
                size: [200, 80],
                type: 'rect',
                style: {
                    fill: '#DEE9FF',
                    stroke: '#5B8FF9',
                    cursor: 'move'
                },

                anchorPoints: [
                    [0, 0.5],
                    [1, 0.5],
                    [0.5, 0],
                    [0.5, 1]
                ],
                linkPoints: {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    size: 10,
                    fill: '#ffffff',
                    lineWidth: 5,
                    stroke: '#1890FF',
                    cursor: 'crosshair'
                }
            },
            defaultEdge: {
                type: 'polyline',
                style: {
                    lineWidth: 3,
                    stroke: '#bae7ff',
                    endArrow: {
                        path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),
                        d: 25
                    }
                }
            },
            // 交互模式集合
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'double-click-add-node', 'click-select'],
                addEdge: ['click-add-edge', 'zoom-canvas', 'drag-canvas']
            },

            // 节点在不同状态下的样式集合
            nodeStateStyles: {
                // 节点在 selected 状态下的样式，对应内置的 click-select 行为
                selected: {
                    stroke: '#666',
                    lineWidth: 4,
                    fill: 'steelblue'
                }
            }
        });

        this.setState({ graph: graph });
        this.initBehavior(graph);
        this.handleEventListener();

        graph.data(sourceData.toJS());
        graph.setMode('default');
        graph.render();
    };

    //事件监听
    handleEventListener = () => {
        //监听节点选中
        this.state.graph.on('nodeselectchange', e => {
            this.setState({ isShowRightControl: e.select, selectNode: (e.select && fromJS(e)) || fromJS({}) });
        });
    };

    //行为初始化
    initBehavior = graph => {
        const _this = this;
        //双击创建节点
        G6.registerBehavior('double-click-add-node', {
            getEvents() {
                return {
                    'canvas:dblclick': 'dblclick',
                    mousedown: 'onMousedown',
                    'edge:click': 'onClick'
                };
            },
            onClick(e) {
                _this.setState({ isShowRightControl: true, selectEdge: e });
            },
            onMousedown(ev) {
                // 鼠标的当前位置

                if (ev.item && ev.item._cfg.type == 'node') {
                    let x = ev.canvasX;
                    let y = ev.canvasY;
                    // X为轴的锚点
                    const anchorLeftOne = ev.item && ev.item.getLinkPointByAnchor(0);
                    const anchorRight = ev.item && ev.item.getLinkPointByAnchor(1);
                    const anchorTop = ev.item && ev.item.getLinkPointByAnchor(2);
                    const anchorDown = ev.item && ev.item.getLinkPointByAnchor(3);

                    let pointXRight = anchorRight && parseInt(anchorRight.x);
                    let pointXRightRangeUp = pointXRight + 15;
                    let pointXRightRangeDown = pointXRight - 15;

                    //纵轴
                    let pointTopX = anchorTop.x;
                    let pointTopXRangeUp = pointTopX + 15;
                    let pointTopXRangedDowm = pointTopX - 15;
                    let pointTopY = anchorTop.y;
                    let pointTopYRangeUp = pointTopY + 15;
                    let pointTopYRangedDowm = pointTopY - 15;
                    let pointYDown = anchorDown.y;
                    let pointYDownRangeUp = pointYDown + 15;
                    let pointYDownRangeDown = pointYDown - 15;
                    //横轴

                    let pointx = anchorLeftOne && parseInt(anchorLeftOne.x);
                    let pointy = anchorLeftOne && parseInt(anchorLeftOne.y);

                    let pointxup = pointx + 15;
                    let pointxdown = pointx - 15;

                    let pointyup = pointy + 15;
                    let pointydown = pointy - 15;

                    if (x <= pointxup && x >= pointxdown && y >= pointydown && y <= pointyup) {
                        console.log('连线模式');
                        this.graph.setMode('addEdge');
                    } else if (x <= pointXRightRangeUp && x >= pointXRightRangeDown && y >= pointydown && y <= pointyup) {
                        this.graph.setMode('addEdge');
                    } else if (x <= pointTopXRangeUp && x >= pointTopXRangedDowm && y >= pointTopYRangedDowm && y <= pointTopYRangeUp) {
                        this.graph.setMode('addEdge');
                    } else if (x <= pointTopXRangeUp && x >= pointTopXRangedDowm && y >= pointYDownRangeDown && y <= pointYDownRangeUp) {
                        this.graph.setMode('addEdge');
                    } else {
                        this.graph.setMode('default');
                    }
                }
            },

            // 双击添加节点
            dblclick(ev) {
                graph.addItem('node', {
                    x: ev.x,
                    y: ev.y,
                    id: `node-${new Date().getTime()}`,
                    label: '',
                    type: 'rect'
                });
            }
        });

        //点击锚点进行连线
        G6.registerBehavior('click-add-edge', {
            // 设定该自定义行为需要监听的事件及其响应函数
            getEvents() {
                return {
                    mousedown: 'onMousedown',
                    'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
                    mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
                    'edge:click': 'onEdgeClick' // 监听事件 edge:click，响应函数是 onEdgeClick
                    // 'node:mousedown':'onMousedown',
                    // "node:dragstart":'onDragstart'
                };
            },
            // getEvents 中定义的 'node:click' 的响应函数
            onClick(ev) {
                const node = ev.item;
                const graph = _this.state.graph;
                // 鼠标当前点击的节点的位置
                const point = { x: ev.x, y: ev.y };
                const model = node.getModel();
                if (this.addingEdge && this.edge) {
                    graph.updateItem(this.edge, {
                        target: model.id
                    });
                    this.edge = null;
                    this.addingEdge = false;
                    this.graph.setMode('default');
                } else {
                    // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
                    this.edge = graph.addItem('edge', {
                        type: 'line-dash',
                        source: model.id,
                        target: point,
                        label: `${model.id}`,
                        style: {
                            lineWidth: 4
                        }
                    });
                    this.addingEdge = true;
                }
            },
            onMousedown(ev) {
                if (!ev.item) {
                    this.graph.setMode('default');
                }
            },
            // getEvents 中定义的 mousemove 的响应函数
            onMousemove(ev) {
                // 鼠标的当前位置
                const point = { x: ev.x, y: ev.y };
                if (this.addingEdge && this.edge) {
                    // 更新边的结束点位置为当前鼠标位置
                    this.graph.updateItem(this.edge, {
                        target: point
                    });
                }
            },
            // getEvents 中定义的 'edge:click' 的响应函数
            onEdgeClick(ev) {
                const currentEdge = ev.item;
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge == currentEdge) {
                    graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            }
        });
    };

    //更新节点
    updateNode = updateNode => {
        const item = this.state.graph.findById(updateNode.target._cfg.id);
        item.update(updateNode.target);
        this.state.graph.paint();
        item.refresh();
        item.clearCache();
        this.setState({ isShowRightControl: false });
        //graph.save() 获取当前所有节点数据
    };

    //更新线
    updateEdge = edge => {
        const item = this.state.graph.findById(edge.item._cfg.id);
        item.update(edge.item);
        this.state.graph.paint();
        item.refresh();
        item.clearCache();
        this.setState({ isShowRightControl: false });
    };

    renderLeftControl = () => {
        return (
            <Drawer
                placement="left"
                closable={false}
                width={100}
                onClose={() => this.setState({ isShowLeftControl: false })}
                visible={this.state.isShowLeftControl}
                getContainer={false}
                mask={false}
                style={{ position: 'absolute' }}
                drawerStyle={{ background: '#e1e1e1' }}
                title={'左侧操作区域'}
            >
                拖拽节点
            </Drawer>
        );
    };

    renderRightControl = () => {
        return (
            <Drawer
                placement="right"
                title={'右侧操作区域'}
                closable={false}
                width={500}
                onClose={() => this.setState({ isShowRightControl: false })}
                visible={this.state.isShowRightControl}
                getContainer={false}
                mask={false}
                style={{ position: 'absolute' }}
                drawerStyle={{ background: '#e1e1e1' }}
            >
                <RobotFlowChartForm {...this.state} {...this.props} updateNode={this.updateNode} updateEdge={this.updateEdge} />
            </Drawer>
        );
    };

    renderTopControl = () => {
        const { flowChartCancel } = this.props;
        const iconSty = {
            fontSize: '20px',
            color: '#b6b6b6',
            marginLeft: 20,
            cursor: 'pointer'
        };
        return (
            <Row style={{ padding: '15px 15px 15px 115px' }}>
                <Col sm={20}>
                    <Radio.Group defaultValue="default" buttonStyle="solid">
                        <Radio.Button value="default">默认</Radio.Button>
                        <Radio.Button value="add">新增</Radio.Button>
                        <Radio.Button value="edit">编辑</Radio.Button>
                        <Radio.Button value="del">删除</Radio.Button>
                    </Radio.Group>
                    <Tooltip title={'放大'} mouseEnterDelay={0.5}>
                        <Icon type="zoom-in" style={iconSty} onClick={() => this.changeZoom('zoom-in')} />
                    </Tooltip>
                    <Tooltip title={'缩小'} mouseEnterDelay={0.5}>
                        <Icon type="zoom-out" style={iconSty} onClick={() => this.changeZoom('zoom-out')} />
                    </Tooltip>
                    <Tooltip title={'重置'} mouseEnterDelay={0.5}>
                        <Icon type="undo" style={iconSty} onClick={() => this.changeZoom('zoom-reset')} />
                    </Tooltip>
                </Col>
                <Col sm={4} style={{ textAlign: 'right' }}>
                    <Button type="primary">保存</Button>
                    <Button onClick={flowChartCancel}>关闭</Button>
                </Col>
            </Row>
        );
    };

    changeZoom = flag => {
        let nowZoom = this.state.graph.getZoom();
        let nextZoom = 1;
        if (flag === 'zoom-in') {
            //放大
            nextZoom = nowZoom + 0.1;
            this.state.graph.zoomTo(nextZoom);
        }
        if (flag === 'zoom-out') {
            //缩小
            nextZoom = nowZoom - 0.1;
            this.state.graph.zoomTo(nextZoom);
        }
        if (flag === 'zoom-reset') {
            //复原
            this.state.graph.zoomTo(1);
        }
    };

    render() {
        const { isFlowChart } = this.props;
        return (
            <Modal title={null} className={'flow-chart-Modal'} visible={isFlowChart} maskClosable={false} mask={false} footer={null} width={window.innerWidth} closable={false}>
                <div className="flow-chart" style={{ height: window.innerHeight }}>
                    <div className="flow-chart-control-area-top">{this.renderTopControl()}</div>
                    {this.renderLeftControl()}
                    <div ref={this.container} className="flow-chart-container" />
                    {this.renderRightControl()}
                </div>
            </Modal>
        );
    }
}

export default FlowChart;
