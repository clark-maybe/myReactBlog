import React from 'react'
import {Affix, Button, Carousel} from 'antd'
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";

class HomeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.hiddenBanner = this.hiddenBanner.bind(this);
        this.state = {
            bannerFlag: 'block'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.siderFlag !== this.props.siderFlag) {
            return false;
        }
    }

    hiddenBanner() {
        this.setState({
            bannerFlag: 'none'
        })
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '1080px',
                marginTop: '1px',
                marginBottom: '15px',
                display: this.state.bannerFlag,
                overflow: 'hidden'
            }}>
                <Affix offsetTop={10} style={{position: 'absolute', zIndex: 1}}>
                    <Button
                        type="primary"
                        onClick={() => {
                            this.hiddenBanner()
                        }}
                    >
                        hidden Banner
                    </Button>
                </Affix>
                <Carousel autoplay>
                    <div>
                        <img src={banner1} style={{width: '100%'}}
                             alt="banner"/>
                    </div>
                    <div>
                        <img src={banner2} style={{width: '100%'}}
                             alt="banner"/>
                    </div>
                    <div>
                        <img src={banner3} style={{width: '100%'}}
                             alt="banner"/>
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default HomeBanner;