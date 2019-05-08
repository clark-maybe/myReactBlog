import React from 'react'

class AboutMe extends React.Component {
    render() {
        return (
            <div style={{fontWeight:'bold'}}>
                <p>I am very honored to be here to meet you!</p>
                <p>My name is <span style={{color:'red'}}>Clark</span>.</p>
                <p>Currently living in <span style={{color:'blue'}}>Beijing</span>.</p>
                <p>Is a <span style={{color:'green'}}>Web engineer</span>.</p>
                <p>Here, </p>
                <p>you can find relevant knowledge about the web front end,</p>
                <p>and some personal insights with me,</p>
                <p>I hope to help you.</p>
            </div>
        )
    }
}

export default AboutMe;