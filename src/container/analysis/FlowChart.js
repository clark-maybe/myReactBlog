import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

export default function FlowCart() {
    const ref = React.useRef(null);
    let graph = null;

    //初始化G6实例
    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width: window.innerWidth - 300,
                height: window.innerHeight - 200,
                animate: true,
                fitView: false, //图是否自适应画布
                fitCenter: true, //是否平移图使其中心对齐到画布中心 v3.5.1 后支持.
                nodeStateStyles: {
                  hover: {
                      style: {
                          background: 'red'
                      }
                  }
                },
                modes: {
                    default: ['drag-canvas', 'drag-node', 'zoom-canvas', 'click-select', 'activate-relations'],
                },
                defaultNode: {
                    type: 'rect',
                    size: [100, 60],
                    style: {
                        radius: 5
                    }
                },
                defaultEdge: {
                    type: 'polyline',
                    color: 'blue',
                        style: {
                            radius: 5,
                            endArrow: {
                                path: G6.Arrow.triangle(3,  3, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
                                d: 0,
                                fill: '#f00',
                                stroke: '#0f0',
                                lineWidth: 5
                                // ...
                            },
                        }
                }
            });
        }
        graph.data(data);
        graph.render();
    }, []);

    return <div ref={ref} style={{ background: 'grey' }}/>
}

const data = {
    nodes: [
        {
            id: '1',
            label: '测试节点1',
            x: 100,
            y: 100
        },
        {
            id: '2',
            label: '测试节点2',
            x: 200,
            y: 200
        },
        {
            id: '3',
            label: '测试节点3',
            x: 300,
            y: 300
        }
    ],
    edges: [
        {
            source: '1',
            target: '2'
        },
        {
            source: '2',
            target: '3'
        }
    ]
};