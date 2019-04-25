import React, { Component } from 'react'
import '../static/styles/content.scss'
import Header from './header'
import { Button, Icon} from 'semantic-ui-react'
import Router from 'next/router'

class MovieContent extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleClickToDetailspage = this.handleClickToDetailspage.bind(this)
    }

    handleClickToDetailspage() { 
        Router.push({ pathname: '/detailspage' })
    }

    render() {
        return (
            <div>
                {this.props.data.map((data, key) => (
                    <div className="listBG">
                        <div className="divImage">
                            <div className="borderImage">
                                <img className="listImage" src={data.image} alt=""/>
                                <span/><span/><span/><span/>
                            </div>
                        </div>
                        <div className="content">
                            <div className="name">{data.name}</div>
                            <div className="tagline">
                                <p>{data.tagline}</p>
                            </div>
                            <div className="priceNdate">
                                <p>Price:&nbsp;&nbsp;&nbsp;&nbsp;{data.price}&nbsp;&nbsp;&nbsp;Baht</p>
                                {/* <p>Available on:&nbsp;&nbsp;{this.props.obj.date}</p> */}
                            </div>
                        </div>
                        <div className="wrapBTN">
                            <div className="btn">
                                <Button className="ui right floated primary button" style={btn} onClick={this.handleClickToDetailspage}>
                                    <Icon className='cart' style={icon}/>
                                    Buy tickets
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const icon = {
    marginRight: "0.7vmin",
    marginBottom: "1vmin",
    width: "1vw",
    height: "auto"
}
const btn ={
    width: "10vw",
    height: "5.5vh",
    fontSize: "1.8vmin"
}

export default MovieContent