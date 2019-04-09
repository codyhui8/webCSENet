import React, { Component } from 'react';
// import './../App.css';
import Header from './../components/common/Header';
import FARCodeRequiredFields from './../components/FARCodeRequiredFields';
import ExtractCSENetData from './../components/ExtractCSENetData.js';
import { slide as Menu } from 'react-burger-menu';
import { Route, Link } from "react-router-dom";

import './Home.css'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'FARCodeRequiredFields'
        }
    }

    showSettings (event) {
        event.preventDefault();
    }

    setPage (event) {
        event.preventDefault();
        this.setState({
            currentPage: event.target.id
        })
    }

    // renderCurrentPage () {
    //     if(this.state.currentPage === 'FARCodeRequiredFields') {
    //         return <FARCodeRequiredFields />
    //     } else if (this.state.currentPage === 'ExtractCSENetData') {
    //         return <ExtractCSENetData />
    //     } 
    // }

    render() {
        return (
            <div id="outer-container">
                
                <Menu width={ "300px" } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                    <a id="FARCodeRequiredFields" className="menu-item" href="/reference">
                        <Link to="/reference">Reference</Link>
                    </a>
                    <a id="ExtractCSENetData" className="menu-item" href="/extractor">
                        <Link to="/extractor">Extractor</Link>
                    </a>
                </Menu>

                <main id="page-wrap">
                  <div className='homePage'>
                      <Header />
                      {/* {this.renderCurrentPage} */}
                      <Route path="/reference" component={FARCodeRequiredFields}/>
                      <Route path="/extractor" component={ExtractCSENetData}/>
                  </div>
                </main>
                
            </div>
        );
    }
}

export default Home;