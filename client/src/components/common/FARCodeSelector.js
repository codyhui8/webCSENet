import React, { Component } from 'react';
import './FARCodeSelector.css'

class FARCodeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            functionCode: '',
            actionCode: '',
            farCode: '',
            selectedFarCodes: [],
            farCodes: {},
            isSelected: false
        };
    }

    handleChangeFunctionCode = (event) => {
        this.setState({
            functionCode: event.target.value,
            actionCode: '',
            farCode: '',
            isSelected: false
        }, () => {
            this.getFarCodes();
        });
    }

    handleChangeActionCode = (event) => {
        this.setState({
            actionCode: event.target.value
        }, () => {
            this.getFarCodes();
        });
    }

    handleChangeFarCode = (event) => {
        this.setState({
            farCode: event.target.value
        }, () => {
            this.props.onChangeFarCode(this.state.farCode)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit();
    }

    getUniqueFunctionCode = (allFarCode) => {
        const uniqueFunctionCode = [];
        let tempUniqueFunctionCode = [];
        tempUniqueFunctionCode = allFarCode.map((singleFarCode) => {
            if (tempUniqueFunctionCode.indexOf(singleFarCode.FUNCTION_CD) === -1 ) {
                uniqueFunctionCode.push(
                    <option key={singleFarCode.FUNCTION_CD}>{singleFarCode.FUNCTION_CD}</option>
                )
                tempUniqueFunctionCode.push(singleFarCode.FUNCTION_CD)
            }
            return tempUniqueFunctionCode
        });
        return uniqueFunctionCode
    }

    renderUniqueActionCode() { 
        return (
            <select name="actionCode" value={this.state.actionCode} onChange={this.handleChangeActionCode}>
                <option key='Blank'>-</option>
                <option key='R'>R</option>
                <option key='U'>U</option>
                <option key='P'>P</option>
            </select>
        )
    }

    getFarCodes() {
        const { functionCode, actionCode } = this.state;
        if ( functionCode !== '' && actionCode !== '' ) {
            this.setState({
                isSelected: true
            })
            fetch("/api/farCode/functionAction/" + functionCode + "/" + actionCode)
                .then(res => res.json())
                .then(res => this.setState({
                    selectedFarCodes: res
                }))
        }
    }

    componentDidMount() {
        fetch("/api/farCode")
        .then(res => res.json())
        .then(res => this.setState({ 
            loading: false,
            farCodes: res
        }));
    }

    render() {
        const {loading, farCodes, farCode, selectedFarCodes, isSelected} = this.state;

        if (loading) {
            return null;
        }

        const allFunctionCodeSelection = this.getUniqueFunctionCode(farCodes)
        const allActionCodeSelection = this.renderUniqueActionCode()
        const allFARCodes = selectedFarCodes.map((FARCodeType) => 
            <option key={FARCodeType.FAR_CODE_CD}>{FARCodeType.FAR_CODE_CD}</option>
        );
        
        return(
            <div>
                <h2>FAR Code Search</h2>
                <form onSubmit={this.handleSubmit}>
                    Function Code: <select name="functionCode" defaultValue={this.state.functionCode} onChange={this.handleChangeFunctionCode}>
                        <option key="Blank" >-</option>
                        {allFunctionCodeSelection}
                    </select>
                    Action Code: {allActionCodeSelection}
                    { isSelected && 
                        <React.Fragment>
                            Combined FAR Code: <select name="farCode" value={farCode} onChange={this.handleChangeFarCode}>
                                <option key="" >-</option>
                                {allFARCodes}
                            </select>
                            <input type="submit" value="Submit" />
                        </React.Fragment>
                    }
                </form>
            </div>
        );
    }
}

export default FARCodeSelector