import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { is } from 'immutable';
import { node } from 'prop-types';

const createForm = Form.create;
const FormItem = Form.Item;

/**
 * 流程图form
 */
class RobotFlowChartForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(this.props.selectEdge)
        // console.log(nextProps.selectEdge)
        if (nextProps.isShowRightControl && nextProps.selectNode.size && !is(nextProps.selectNode, this.props.selectNode)) {
            this.setState({
                type: 'node'
            });
            this.initForm(nextProps);
        } else if (nextProps.isShowRightControl && !is(nextProps.selectEdge, this.props.selectEdge)) {
            this.initEdge(nextProps);
            this.setState({
                type: 'edge'
            });
        }
    }

    initForm = props => {
        let tempNode = props.selectNode.toJS();
        let values = {
            label: tempNode.target._cfg.model.label
        };
        props.form.setFieldsValue(values);
    };
    initEdge = props => {
        let edge = props.selectEdge;
        let values = {
            label: edge.item._cfg.model.label
        };
        props.form.setFieldsValue(values);
    };
    handleSubmit = e => {
        e.preventDefault();
        const { updateNode, updateEdge, selectNode, selectEdge } = this.props;
        if (this.state.type == 'node') {
            this.props.form.validateFields((errors, values) => {
                if (!!errors) {
                    return void 0;
                }
                let tempNode = selectNode.toJS();
                tempNode.target._cfg.model.label = values.label;
                //计算容器宽度，防止文本溢出 -- 暂时存在修改位置画布假死问题，先不添加
                // if(values.label){
                //     if(values.label.length >= 15){
                //         tempNode.target._cfg.model.size[0] = values.label.length * 9
                //     }
                // }
                updateNode(tempNode);
            });
        }
        if (this.state.type == 'edge') {
            this.props.form.validateFields((errors, values) => {
                if (!!errors) {
                    return void 0;
                }
                let edge = selectEdge;
                edge.item._cfg.model.label = values.label;
                updateEdge(edge);
            });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        };
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="内容" {...formLayout}>
                        {getFieldDecorator('label')(<Input placeholder="请输入内容" />)}
                    </FormItem>
                </Form>
                <Row>
                    <Col sm={24} style={{ textAlign: 'right' }}>
                        <Button onClick={this.handleSubmit}>保存</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

RobotFlowChartForm = createForm({})(RobotFlowChartForm);
export default RobotFlowChartForm;
