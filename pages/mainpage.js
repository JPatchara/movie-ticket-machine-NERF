import React from 'react'
import '../static/styles/mainpage.scss'
import Header from '../components/header.js'
import MovieContent from '../components/content.js'
import { Dropdown } from 'semantic-ui-react'
import fireST from '../server/firestore.js'
import axios from 'axios'

class Mainpage extends React.Component {

    constructor(props) {
        super(props);
        this.ref = fireST.firestore().collection('MoviesDetails');
        this.unsubscribe = null;
        this.state = { 
            movieData: [],
            selection: false,
            list_count: 0
        }
    }

    onChangeSortby = (e, { value }) => {
        this.setState({ value: value })
        var selection_sortby = value

        if (selection_sortby === 'Price(Lower)') {
            this.unsubscribe = this.ref.orderBy('Price', 'asc').onSnapshot(this.onCollectionUpdate);
        } else if (selection_sortby === 'Price(Higher)') {
            this.unsubscribe = this.ref.orderBy('Price', 'desc').onSnapshot(this.onCollectionUpdate);
        } else if (selection_sortby === 'Date & Time(Older)') {
            this.unsubscribe = this.ref.orderBy('Date', 'desc').onSnapshot(this.onCollectionUpdate);
        } else if (selection_sortby === 'Date & Time(Newer)') {
            this.unsubscribe = this.ref.orderBy('Date', 'asc').onSnapshot(this.onCollectionUpdate);
        } else if (selection_sortby === 'none') {
            this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        } else { this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate); }
    }

    onChangeName = (e, { value }) => {
        this.setState({ value: value })
        var selection_name = value

        this.unsubscribe = this.ref.where("Name", "==", selection_name).onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const movieData = []
        var list_count = 1

        querySnapshot.forEach((doc) => {
            const Data = doc.data()
            movieData.push({
                id: list_count,
                name: Data.Name,
                price: Data.Price,
                tagline: Data.Tagline,
                image: Data.Image,
                date: Data.Date.toDate().toUTCString()
            });
            list_count = list_count+1
        });
        this.setState({ movieData })
        this.setState({ list_count })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    render() {
        const { value } = this.state

        return (
            <div className="mainpageBG">
                <Header/>
                    <header className="mainpageBar">
                        <ul>
                            <li>
                                <h3 className="movieIcon">MOVIES</h3>
                            </li>
                            <li>
                                <Dropdown
                                    style={dropdownSearch}
                                    placeholder="Search and select your movie"
                                    fluid
                                    search
                                    selection
                                    options={moviesName}
                                    value={value}
                                    onChange={this.onChangeName}
                                />
                            </li>
                            <li>
                                <Dropdown
                                    style={dropdownSort}
                                    placeholder="Sort by"
                                    fluid
                                    search
                                    selection
                                    options={sortOptions}
                                    value={value}
                                    onChange={this.onChangeSortby}
                                />
                            </li>
                        </ul>
                    </header>
                    <div className="moviesList">
                        <table className="listContainer">
                            <MovieContent data={this.state.movieData}/>
                        </table>
                    </div>
            </div>
        )
    }
}

var moviesName = []
const db = fireST.firestore()
const moviesRef = db.collection("MoviesDetails")

moviesRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        moviesName.push({text:doc.data().Name, value:doc.data().Name})
    })
})

const sortOptions = [{
    text: 'Date & Time(Older)',
    value: 'Date & Time(Older)'
},{
    text: 'Date & Time(Newer)',
    value: 'Date & Time(Newer)'
},{
    text: 'Price(Lower)',
    value: 'Price(Lower)'
},{
    text: 'Price(Higher)',
    value: 'Price(Higher)'
},{
    text: 'none',
    value: 'none'
}]

const dropdownSearch = {
    margin: "auto auto",
    width: "50vw",
    maxWidth: "70vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted",
    fontSize: "2vmin"
}
const dropdownSort = {
    margin: "auto auto",
    width: "25vw",
    maxWidth: "50vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted",
    fontSize: "2vmin"
}

export default Mainpage