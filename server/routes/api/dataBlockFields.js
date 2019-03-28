'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const DATA_BLOCK_FIELDS = require('../../models/DATA_BLOCK_FIELDS');
const dataBlockFieldsController = require('./../../controllers/dataBlockFields.controller');

router.get('/', async (req, res) => {
    res.send(await dataBlockFieldsController());
});

router.get('/:blockName', async (req, res) => {
    const value = await DATA_BLOCK_FIELDS.query()
        .join('DATA_BLOCK', join => {
            join.on('DATA_BLOCK_FIELDS.DATA_BLOCK_ID', '=', 'DATA_BLOCK.DATA_BLOCK_ID')
        })
        .where('BLOCK_NAME_CD', '=', req.params.blockName);

    res.send(value);
});

module.exports = router;