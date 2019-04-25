import React from 'react'
import '../static/styles/homepage.scss'
import logo from '../static/images/CinemaLogo.png'
import Header from '../components/header.js'
import Router from 'next/router'

class Homepage extends React.Component {

    handleClickToMainpage() { 
        Router.push({ pathname: '/mainpage' })
    }

    render() {

        return (
            <div className="homepageBG">
                <Header/>
                <div className="homepageCT">
                    <h1>Movie Ticket Machine</h1>
                    <img className="homepageLG" src={logo} alt="" />
                    <button className="homepageBTN" onClick={this.handleClickToMainpage}>
                        Buy ticket
                    </button>
                </div>
            </div>
        )
    }
}

export default Homepage