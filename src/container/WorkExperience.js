import React from 'react'
import {Timeline, Icon} from 'antd'

class WorkExperience extends React.Component {
    render() {
        return (
            <Timeline mode="alternate" style={{marginTop: '20px'}}>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} >Now...</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>report 2019-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>edu 2018-09-01</Timeline.Item>
                <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            </Timeline>
        )
    }
}

export default WorkExperience;