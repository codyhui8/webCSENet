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
        var styles = {
            bmBurgerButton: {
              position: 'fixed',
              width: '36px',
              height: '30px',
              left: '36px',
              top: '36px'
            },
            bmBurgerBars: {
              background: '#373a47'
            },
            bmCrossButton: {
              height: '24px',
              width: '24px'
            },
            bmCross: {
              background: '#bdc3c7'
            },
            bmMenu: {
              background: '#878890',
              padding: '2.5em 1.5em 0',
              fontSize: '1.15em'
            },
            bmMorphShape: {
              fill: '#373a47'
            },
            bmItemList: {
              color: '#b8b7ad',
              padding: '0.8em'
            },
            bmItem: {
              display: 'inline-block'
            },
            bmOverlay: {
              background: 'rgba(0, 0, 0, 0.3)'
            }
          }
        return (
            <div id="outer-container">
                {/* <Sidebar
                    sidebar={
                        <React.Fragment>
                            <b>Sidebar content</b>
                            <li onClick={this.handleMenuClick} value='FARCodeRequiredFields'>CSENet Reference Data</li>
                            <li onClick={this.handleMenuClick} value='ExtractCSENetData'>CSENet Data Extraction</li>
                        </React.Fragment>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white" } }}
                    className='sideBar'
                >
                    <button onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
                    </button>
                </Sidebar> */}
                
                <Menu noOverlay width={ "15%" } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } styles={ styles }>
                    <a id="FARCodeRequiredFields" className="menu-item" href="/reference"><Link to="/reference">Reference</Link></a>
                    <a id="ExtractCSENetData" className="menu-item" href="/extractor"><Link to="/extractor">Extractor</Link></a>
                    {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
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