'use strict';


const dataBlockNames = ['HEADER',
    'CASE DATA BLOCK', 
    'NONCUSTODIAL PARENT IDENTIFICATION (NCP-ID) DATA BLOCK', 
    'NONCUSTODIAL PARENT (NCP) LOCATE DATA BLOCK',
    'PARTICIPANT DATA BLOCK',
    'ORDER DATA BLOCK',
    'COLLECTION DATA BLOCK',
    'INFORMATION DATA BLOCK']

const dataBlockLength = [121, 351, 181, 1421, 341, 254, 70, 416]

module.exports = function(res, dataBlockFields, dataToExtract) {
    // console.log(dataToExtract)
    if(dataToExtract.length > 127) {
        const funct = dataToExtract.substring(34, 37);
        const action = dataToExtract.substring(33, 34);
        const reason = dataToExtract.substring(75, 80);

        const isValidHeader = validateHeader(dataBlockFields, dataToExtract.substring(0, 121), dataToExtract)

        if (isValidHeader instanceof Error) {
            return isValidHeader
        } else {
            return extractDataBlockValues(dataBlockFields, dataToExtract, isValidHeader)
        }
        // console.log(funct)
        // console.log(action)
        // console.log(reason)
        // console.log(isCaseDatInd + isNCPIdenInd + isNCPLocateInd + isPartDataInd + isOrdDatInd + isCollectionDataInd + isInformationDataInd)
        // return funct + action + reason + ' ' + isCaseDatInd + isNCPIdenInd + isNCPLocateInd + isPartDataInd + isOrdDatInd + isCollectionDataInd + isInformationDataInd
    } else {
        // console.log('hi')
        return Error('Header Data Block is not valid.')
        // res.statusMessage = 'Header Data Block is not valid';
        // res.status('400').end();
    }
}

function validateHeader(dataBlockFields, headerData, fullData) {
    const isCaseDatInd = parseInt(headerData.substring(89, 90))
    const isNCPIdenInd = parseInt(headerData.substring(90, 91))
    const isNCPLocateInd = parseInt(headerData.substring(91, 92))
    const isPartDataInd = parseInt(headerData.substring(92, 93))
    const isOrdDatInd = parseInt(headerData.substring(93, 94))
    const isCollectionDataInd = parseInt(headerData.substring(94, 95))
    const isInformationDataInd = parseInt(headerData.substring(95, 96))

    const dataBlockPresent = [1, isCaseDatInd, isNCPIdenInd, isNCPLocateInd, isPartDataInd, isOrdDatInd, isCollectionDataInd, isInformationDataInd]

    var totalLength = 0

    for (var i in dataBlockPresent) {
        totalLength += parseInt(dataBlockPresent[i]) * dataBlockLength[i]
    }

    if(fullData.replace(/\n/g, '').length !== totalLength) {
        return Error('Length of the record is not correct')
    } else {
        return dataBlockPresent
    }

    // var currentDataBlock = 0
    // var currentDataBlockName = dataBlockNames[currentDataBlock]
    // var alreadyVisitedDataBlock = []
    // var previousDataBlock = {}
    // for(var attribute in dataBlockFields) {
    //     if(parseInt(dataBlockPresent[currentDataBlock]) > 0 
    //         && !alreadyVisitedDataBlock.includes(currentDataBlockName)
    //         && dataBlockFields[attribute].DATA_BLOCK.BLOCK_NAME_CD === dataBlockNames[currentDataBlock]) {
    //         // console.log(attribute)
    //         // console.log(dataBlockFields[attribute])
    //         alreadyVisitedDataBlock.push(currentDataBlockName)
    //         currentDataBlockName = dataBlockNames[currentDataBlock + 1]
    //         currentDataBlock += 1
    //     }

        
    // }
    // return true
}


function extractDataBlockValues(dataBlockFields, dataToExtract, dataBlockPresent) {
    // console.log(dataBlockFields)
    var currentDataBlock = dataBlockNames[0]
    var currentPositionInString = 0
    var extractedValues = {}
    var currentDataBlockNumber = 0
    for(var currentDataBlockName in dataBlockNames) {
        var numberOfDataBlock = dataBlockPresent[currentDataBlockNumber]
        // console.log(dataBlockNames[currentDataBlockName])
        console.log(numberOfDataBlock)
        while (numberOfDataBlock > 0) {
            var currentCountInDataBlock = 0
            for(var i in dataBlockFields) {
                const dataBlockName = dataBlockFields[i].DATA_BLOCK.BLOCK_NAME_CD;
                const insertedDataBlockName = dataBlockName + numberOfDataBlock
                // const numberOfDataBlock = dataBlockPresent[currentDataBlockNumber]
                // console.log(dataBlockName)
                if(dataBlockName === dataBlockNames[currentDataBlockName]) {
                    //console.log(currentDataBlock + '1')
                    const fieldName = dataBlockFields[i].FIELD_NAME_CD;
                    const substringValue = dataToExtract.substring(currentPositionInString + dataBlockFields[i].LOCATION_START - 1, currentPositionInString + dataBlockFields[i].LOCATION_END)
                    if(!(dataBlockName + numberOfDataBlock in extractedValues)) {
                        extractedValues[dataBlockName + numberOfDataBlock] = {}
                        extractedValues[dataBlockName + numberOfDataBlock][0] = {fieldName, substringValue}
                        currentCountInDataBlock = 1
                    } else {
                        extractedValues[dataBlockName + numberOfDataBlock][currentCountInDataBlock] = {fieldName, substringValue}
                        currentCountInDataBlock += 1
                    }
                } 
                // else {
                //     currentDataBlock = dataBlockFields[i].DATA_BLOCK.BLOCK_NAME_CD
                //     currentDataBlockNumber += 1
                //     currentPositionInString += dataBlockLength[currentDataBlockNumber - 1]
                //     if (dataBlockPresent[currentDataBlockNumber] > 0) {
                //         const fieldName = dataBlockFields[i].FIELD_NAME_CD;
                //         const substringValue = dataToExtract.substring(currentPositionInString + dataBlockFields[i].LOCATION_START - 1, currentPositionInString + dataBlockFields[i].LOCATION_END)
                //         extractedValues[dataBlockName] = {}
                //         extractedValues[dataBlockName][0] = {fieldName, substringValue}
                //         currentCountInDataBlock = 1
                //     }
                // }
            }
            // extractedValues[dataBlockNames[currentDataBlockName]] = tempExtractedValues

            numberOfDataBlock -= 1
            // console.log(numberOfDataBlock)
            currentPositionInString += dataBlockLength[currentDataBlockNumber]
        }
        currentDataBlock = dataBlockFields[i].DATA_BLOCK.BLOCK_NAME_CD
        currentDataBlockNumber += 1
        // currentPositionInString += dataBlockLength[currentDataBlockNumber - 1]
    }
    // console.log(extractedValues)
    return extractedValues
}
