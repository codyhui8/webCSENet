'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const DATA_BLOCK = require('../../models/DATA_BLOCK');

router.get('/', async (req, res) => {
    const value = await DATA_BLOCK.query()
        
    res.send(value);
});

module.exports = router;