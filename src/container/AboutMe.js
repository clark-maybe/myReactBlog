import React from 'react'

class AboutMe extends React.Component {
    render() {
        return (
            <div style={{fontWeight: 'bold'}}>
                <p>I am very honored to be here to meet you!</p>
                <p>My name is <span style={{color: 'red'}}>Clark</span>.</p>
                <p>Currently living in <span style={{color: 'rgb(43, 126, 255)'}}>Beijing</span>.</p>
                <p>Is a <span style={{color: 'green'}}>Web engineer</span>.</p>
                <p>Here, </p>
                <p>you can find relevant knowledge about the web front end,</p>
                <p>and some personal insights with me,</p>
                <p>I hope to help you.</p>
                <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                <p style={{color: 'rgb(43, 126, 255)', fontSize: '16px', marginBottom: 0}}>How to contact me ?</p>
                <br/>
                <p style={{opacity: 0.9}}>tel: <span style={{color: 'green'}}>15702455610</span></p>
                <p style={{opacity: 0.9}}>Email: <span style={{color: '#4a4a4a'}}>15702455610@163.com</span></p>
                <p style={{opacity: 0.9}}>blog: <a href="https://fanliang8023.github.io"
                                                   target='_blank'>https://fanliang8023.github.io</a></p>
                <p style={{opacity: 0.9}}>wChat: <span style={{color: 'grey'}}>fanliang8023</span></p>
            </div>
        )
    }
}

export default AboutMe;