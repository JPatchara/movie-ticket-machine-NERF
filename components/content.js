import React, { Component } from 'react'
import '../static/styles/content.scss'
import DetailsModal from './processModals.js'
import { Button, Icon } from 'semantic-ui-react'
import Router from 'next/router'

class MovieContent extends Component {

    state = {
        showModal: 0
    }

    getModalDT = value => {
        this.setState({ showModal: value });
    }
    
    hideModalDT = value => {
        this.setState({ showModal: 0 });
        console.log("Close!!!")
    }

    render() {
        return (
            <div>
                {this.props.data.map((data, key) => (
                    <div key={key} className="listBG">
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
                                <p>Available on:&nbsp;&nbsp;{data.date}</p>
                            </div>
                        </div>
                        <div className="wrapBTN">
                            <div className="btn">
                                <Button className="ui right floated primary button" style={btn} 
                                    onClick={() => this.getModalDT(data.id)}>
                                    <Icon className='cart' style={icon}/>
                                    Buy tickets
                                </Button>
                            </div>
                        </div>
                        <DetailsModal
                            show={this.state.showModal === data.id}
                            onHide={() => this.hideModalDT(data.id)}
                            name={data.name} image={data.image}
                            tagline={data.tagline}
                            price={data.price}
                        />
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