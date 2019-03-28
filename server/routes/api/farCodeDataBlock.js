'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const FAR_CODE_DATA_BLOCK = require('../../models/FAR_CODE_DATA_BLOCK');

router.get('/:farcode', async (req, res) => {
    const value = await FAR_CODE_DATA_BLOCK.query()
        .join('FAR_CODE', join => {
            join.on('FAR_CODE_DATA_BLOCK.FAR_CODE_ID', '=', 'FAR_CODE.FAR_CODE_ID')
        })
        .eager('DATA_BLOCK_FIELDS')
        .where('FAR_CODE.FAR_CODE_CD', '=', req.params.farcode);

    res.send(value);
});

module.exports = router;