import React, { Component } from 'react';
import './FARCodeRequiredFields.css'

import FARCodeSelector from './common/FARCodeSelector'
import FARCodeFieldsTable from './FARCodeFieldsTable/FARCodeFieldsTable'

class FARCodeRequiredFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            farCodes: [],
            farCode: '',
            currentFarCode: '', 
            isSubmitted: false
        };
        this.onChangeFarCode = this.onChangeFarCode.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            isSubmitted: false,
            farCode: event.target.value
        });
    }

    handleSubmit = (event) => {
        this.setState({
            isSubmitted: true,
            farCode: this.state.currentFarCode
        });
        // this.forceUpdate();
    } 

    onChangeFarCode(farCode) {
        this.setState({
            currentFarCode: farCode,
            isSubmitted: false
        });
    }

    // componentDidMount() {
    //     fetch("/api/farCode")
    //     .then(res => res.json())
    //     .then(res => this.setState({ 
    //         loading: false,
    //         farCodes: res
    //     }));
    // }

    render() {
        const { farCode, isSubmitted } = this.state;

        // const allFARCodes = farCodes.map((FARCodeType) => 
        //     <option key={FARCodeType.FAR_CODE_ID}>{FARCodeType.FAR_CODE_CD}</option>
        // );

        // if (loading) {
        //     return null;
        // }
        
        let screen
        if (farCode === '' || isSubmitted === false) {
            screen = (
                <div className='farCodeRequiredFields'>
                    <FARCodeSelector onChangeFarCode={this.onChangeFarCode} handleSubmit={this.handleSubmit} />
                </div>
            );
        } else {
            screen = (
                <div className='farCodeRequiredFields'>
                    <FARCodeSelector onChangeFarCode={this.onChangeFarCode} handleSubmit={this.handleSubmit} />
                    <FARCodeFieldsTable currentFarCode={this.state.currentFarCode} />
                </div>
            );
        }

        return (
            <React.Fragment>
                {screen}
            </React.Fragment>
        );


        // if (isSubmitted) {
        //     return (
        //         <div className='farCodeRequiredFields'>
        //             <form onSubmit={this.handleSubmit}>
        //                 <select name="farCode" value={this.state.farCode} onChange={this.handleChange}>
        //                     <option value="Blank" />
        //                     {allFARCodes}
        //                 </select>
        //                 <input type="submit" value="Submit" />
        //             </form>
        //             <div className="farCodeTable">
        //                 <FARCodeFieldsTable farCode={farCode}/>
        //             </div>
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div className='farCodeRequiredFields'>
        //             <form onSubmit={this.handleSubmit}>
        //                 <select name="farCode" value={this.state.farCode} onChange={this.handleChange}>
        //                     <option value="Blank" />
        //                     {allFARCodes}
        //                 </select>
        //                 <input type="submit" value="Submit" />
        //             </form>
        //         </div>
        //     );
        // }
    }
}

export default FARCodeRequiredFields