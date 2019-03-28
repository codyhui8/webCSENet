import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './FARCodeFieldsTable.css';

import { titleCase } from './../common/stringHelpers';

class FARCodeFieldsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, 
            farCodeFields: [],
            farCodeFieldsDataBlock: [],
            dataBlocks: [],
            farCodeDataBlocks: []
        }
    }

    componentDidMount() {
        Promise.all([
            fetch('/api/farCode/requiredFields/' + this.props.currentFarCode),
            fetch('/api/farCode/dataBlocks/' + this.props.currentFarCode)
        ])
        .then( ([res1, res3]) => Promise.all([res1.json(), res3.json()]))
        .then( ([data1, data3]) => {
            // console.log(data1)
            // console.log(data2)

            this.setState({
                farCodeFields: data1,
                farCodeDataBlocks: data3,
                loading: false
            }, () => {
                console.log(this.state.farCodeDataBlocks)
            });
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentFarCode !== prevProps.currentFarCode && this.props.isSubmitted === true) {
            fetch('/api/farCode/requiredFields/' + this.props.currentFarCode)
            .then(res => res.json())
            .then(res => this.setState({
                loading: false, 
                farCodeFields: res,
            }));
        }
    }

    // titleCase(str) {
    //     var splitStr = str.toLowerCase().split(' ');

    //     for (var i = 0; i < splitStr.length; i++) {
    //         // You do not need to check if i is larger than splitStr length, as your for does that for you
    //         // Assign it back to the array

    //         if (splitStr[i].charAt(0) !== '(') {
    //             splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    //         } else {
    //             splitStr[i] = splitStr[i].toUpperCase();
    //         }

    //     }
    //     // Directly return the joined string
    //     return splitStr.join(' '); 
    // }

    multiLine = (commentTxt) => {
        return commentTxt.replace(/[\u0100-\uFFFF-]/g, '')
            .replace(/[\u00E2]/g, '-')
            .split("\\n").map((i,key) => {
            return <div key={key}>{i}</div>;
        })
    }

    createTabs(dataBlocks) {

        return (
            dataBlocks.map( (values) => {
                const currentValues = this.checkDataBlockNameExist(values.BLOCK_NAME_CD)

                return (
                    <TabPanel>
                        <table>
                            <thead>
                                <tr className="requiredFieldsTableHeader">
                                    <th width='10%'>Block Name</th>
                                    <th width='15%'>Field Name</th>
                                    {/* <th>Start Position</th>
                                    <th>End Position</th> */}
                                    <th width='40%'>Comment Text</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentValues}
                            </tbody>
                        </table>
                    </TabPanel>
                )
            })
        )
        // for (var i = 0; i < dataBlocks.length; i++) {
        //     elements.push(
        //         <React.Fragment>
        //             { this.checkDataBlockNameExist(dataBlocks[i].BLOCK_NAME_CD) !== null ?
        //                 <div value={dataBlocks[i].BLOCK_NAME_CD}>
        //                     this.checkDataBlockNameExist()
        //                 </div>
        //                 : null
        //             }
        //         </React.Fragment>
        //     )
        // }
    }

    checkDataBlockNameExist(dataBlockName) {
        let presentDataBlocks = this.state.farCodeFields.map( (value) => {
            return this.renderDataBlockFields(value, dataBlockName)
        })

        return presentDataBlocks
    }

    renderDataBlockFields = (FAR_CODE_DATA_BLOCK, value) => {
        return (
            <React.Fragment>
                { FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.DATA_BLOCK.BLOCK_NAME_CD === value ?
                    <tr key={FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS_ID}>
                        <td key='blockName'>{ titleCase(FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.DATA_BLOCK.BLOCK_NAME_CD) }</td>
                        <td key='fieldName'>{ FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.FIELD_NAME_CD}</td>
                        {/* <td key='startPos'>{ FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.LOCATION_START}</td>
                        <td key='endPos'>{ FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.LOCATION_END}</td> */}
                        <td key='commentTxt'>{ 
                            this.multiLine(FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS.COMMENT_TXT)
                        }</td>
                        <td key='valueTxt'>{ FAR_CODE_DATA_BLOCK.VALUE_TXT }</td>
                    </tr>
                    : null
                }
            </React.Fragment>
        );
    }

    render() {
        const { loading, farCodeFields, farCodeDataBlocks } = this.state;

        if (loading) {
            return null;
        }

        if (Object.keys(farCodeFields).length === 0) {
            return (
                <div>
                    <div>This FAR Code does not have specified 'Required' data fields.</div>
                </div>
            );
        }


        return (
            <React.Fragment>
                <h3>{this.props.currentFarCode} Required Fields</h3>
                <Tabs>
                    <TabList>
                        {farCodeDataBlocks.map( (value) => {
                            return <Tab>{titleCase(value.BLOCK_NAME_CD.replace('DATA BLOCK', ''))}</Tab>
                        })}
                    </TabList>
                    {this.createTabs(farCodeDataBlocks)}
                </Tabs>
            </React.Fragment>
        );
    }
}

export default FARCodeFieldsTable