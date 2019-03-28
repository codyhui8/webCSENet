'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const extractCSENetData = require('../../controllers/extractCSENetData.controller');
const dataBlockFieldsController = require('./../../controllers/dataBlockFields.controller');
const DATA_BLOCK_FIELDS = require('../../models/DATA_BLOCK_FIELDS');

router.get('/:dataToExtract', async (req, res, next) => {
    const dataBlockFields = await dataBlockFieldsController()
    // console.log(dataBlockFields)
    const test = extractCSENetData(res, dataBlockFields, req.params.dataToExtract)

    if(test instanceof Error) {
        // console.log(test)
        res.status(400).send({
            status: 400,
            error: test.message
        })
    } else {
        res.send(test)
    }
});

module.exports = router;