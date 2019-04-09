import React, { Component } from 'react';
import './InputCSENetData.css'

class InputCSENetData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputtedData: ''
        };
    }

    // handleChange = (event) => {
    //     this.setState({
    //         inputtedData: encodeURIComponent(event.target.value)
    //     })
    // }

    render() { 
        return (
            <form onSubmit={this.props.handleSubmit}>
                Input Data: <input type='text' name='inputtedData' value={this.props.inputtedData} onChange={this.props.handleChange}  />
                <input type="submit" value="Submit" />
            </form>
        )
    }

}

export default InputCSENetData