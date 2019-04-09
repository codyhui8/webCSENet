import React, { Component } from 'react';
import './ExtractCSENetData.css';

import ExtractedCSENetTable from './ExtractedCSENetTable/ExtractedCSENetTable';
import InputCSENetData from './InputCSENetData/InputCSENetData'

class ExtractCSENetData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputtedData: '',
            isSubmitted: false,
            submittedData: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            inputtedData: encodeURIComponent(event.target.value),
            submittedData: '',
            isSubmitted: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isSubmitted: true,
            submittedData: this.state.inputtedData
        })
    } 

    render() {
        const { isSubmitted, submittedData } = this.state

        let temp

        // console.log(this.state.inputtedData)

        if(submittedData !== '' && isSubmitted === true) {
            // console.log(this.state.inputtedData)
            temp = (
                <div className='extractedCSENetData'>
                    {/* <form onSubmit={this.handleSubmit}>
                        Input Data: <input type='text' name='inputtedData' value={this.state.inputtedData} onChange={this.handleChange}  />
                        <input type="submit" value="Submit" />
                    </form> */}
                    <InputCSENetData value={this.state.inputtedData} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                    <ExtractedCSENetTable inputtedData={submittedData}/>
                </div>
            )
        } else {
            temp = (
                <div className='extractedCSENetData'>
                    {/* <form onSubmit={this.handleSubmit}>
                        Input Data: <input type='text' name='inputtedData' value={this.state.inputtedData} onChange={this.handleChange}/>
                        <input type="submit" value="Submit" />
                    </form> */}
                    <InputCSENetData value={this.state.inputtedData} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                </div>
            )
        }

        return (
            <React.Fragment>
                {temp}
            </React.Fragment>
        )
        
    }
}

export default ExtractCSENetData