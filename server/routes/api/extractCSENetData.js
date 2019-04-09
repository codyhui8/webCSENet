'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const extractCSENetData = require('../../controllers/extractCSENetData.controller');
const dataBlockFieldsController = require('./../../controllers/dataBlockFields.controller');
const DATA_BLOCK_FIELDS = require('../../models/DATA_BLOCK_FIELDS');
const TRANSACTION_HISTORY = require('../../models/TRANSACTION_HISTORY')

router.get('/:dataToExtract', async (req, res, next) => {
    const dataBlockFields = await dataBlockFieldsController()
    // console.log(dataBlockFields)
    const extractedCSENetData = extractCSENetData(res, dataBlockFields, req.params.dataToExtract)

    if(extractedCSENetData instanceof Error) {
        const stringifyError = JSON.stringify(extractedCSENetData.message)
        await TRANSACTION_HISTORY
            .query()
            .insert({
                TRANS_TXT: req.params.dataToExtract,
                TRANS_BLOB: stringifyError
            });
        res.status(400).send({
            status: 400,
            error: extractedCSENetData.message
        })
    } else {
        const stringify = JSON.stringify(extractedCSENetData)
        await TRANSACTION_HISTORY
            .query()
            .insert({
                TRANS_TXT: req.params.dataToExtract,
                TRANS_BLOB: stringify
            });
        res.send(extractedCSENetData)
    }
});

module.exports = router;