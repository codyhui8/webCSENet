import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './ExtractedCSENetTable.css';

import { titleCase } from './../common/stringHelpers';

class ExtractedCSENetTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: '',
            loading: true,
            extractedData: {}
        }
    }

    componentDidMount() {
        console.log(this.props.inputtedData)
        fetch("/api/extractCSENetData/" + this.props.inputtedData)
        .then(res => res.json())
        .then(res => this.setState({ 
            loading: false,
            extractedData: res
        }), () => {
            console.log(this.state.extractedData)
        });
    }

    createTabList(extractedData) {
        return Object.keys(extractedData).map( (value) => {
            const blockValue = this.cleanDataBlockName(value);
            return <Tab key={this.returnTabKey(value)}>{blockValue}</Tab>
        })
    }

    cleanDataBlockName(value) {
        return titleCase(value.split('DATA BLOCK')[0].replace(/[0-9]/g, ''))
    }

    returnTabKey(value) {
        const blockValue = this.cleanDataBlockName(value);
        const blockNumber = value.slice(-1);
        return blockValue + blockNumber
    }

    renderExtractedFields() {
        const { extractedData } = this.state;
        console.log(extractedData + 'hello')

        // return null
        return Object.keys(extractedData).map( (value) => {
            // const blockValue = this.cleanDataBlockName(value);
            console.log(extractedData[value])
            const extractedValues = this.renderExtractedFieldsTable(extractedData[value])
            return (
                <TabPanel>
                        <table>
                            <thead>
                                <tr className="extractedCSENetFieldsHeader">
                                    <th width='50%'>Field Name</th>
                                    <th>Extracted Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extractedValues}
                            </tbody>
                        </table>
                    </TabPanel>
            )
        })
    }

    renderExtractedFieldsTable(data) {
        return Object.keys(data).map( (value) => {
            return (
                <tr>
                    <td>{data[value].fieldName}</td>
                    <td>{data[value].substringValue}</td>
                </tr>
            )
        })
    }

    render() {
        const { loading, extractedData } = this.state;

        if (loading) {
            return null;
        }

        // console.log(extractedData)

        if(extractedData.status === 400) {
            return (
                <div>
                    Inputted record is not valid. There is an error in the file. 
                </div>
            )
        } 

        return (
            <React.Fragment>
                <h3>Extracted Data</h3>
                <Tabs>
                    <TabList>
                        {this.createTabList(extractedData)}
                        {/* {Object.keys(extractedData).map( (value) => {
                            const blockValue = this.cleanDataBlockName(value);
                            const blockNumber = value.slice(-1);
                            return <Tab key={blockValue + blockNumber}>{blockValue}</Tab>
                        })} */}
                    </TabList>
                    { this.renderExtractedFields() }
                </Tabs>
            </React.Fragment>
        )
        
    }
}

export default ExtractedCSENetTable