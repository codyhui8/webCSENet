'use strict';

var router = require('express').Router();
const { transaction } = require('objection');
const FAR_CODE = require('../../models/FAR_CODE');
const FAR_CODE_DATA_BLOCK = require('../../models/FAR_CODE_DATA_BLOCK');
const DATA_BLOCK = require('../../models/DATA_BLOCK');

router.get('/', async (req, res) => {
    const value = await FAR_CODE.query();

    res.send(value);
});

// router.get('/fullCode/:farcode', async (req, res) => {
//     const value = await FAR_CODE.query()
//         .where('FAR_CODE_CD', '=', req.params.farcode);

//     res.send(value);
// });

// router.get('/function/:function', async (req, res) => {
//     const value = await FAR_CODE.query()
//         .where('FUNCTION_CD', '=', req.params.function);

//     res.send(value);
// });

router.get('/functionAction/:function/:action', async (req, res) => {
    const value = await FAR_CODE.query()
        .where('FUNCTION_CD', '=', req.params.function)
        .where('ACTION_CD', '=', req.params.action);

    res.send(value);
});

router.get('/requiredFields/:farcode', async (req, res) => {
    const value = await FAR_CODE_DATA_BLOCK.query()
        .join('FAR_CODE', join => {
            join.on('FAR_CODE_DATA_BLOCK.FAR_CODE_ID', '=', 'FAR_CODE.FAR_CODE_ID')
        })
        .eager('DATA_BLOCK_FIELDS.[DATA_BLOCK]')
        .where('FAR_CODE.FAR_CODE_CD', '=', req.params.farcode);

    res.send(value);
});

router.get('/dataBlocks/:farcode/', async (req, res) => {
    const value = await DATA_BLOCK.query()
        .join('DATA_BLOCK_FIELDS', join => {
            join.on('DATA_BLOCK.DATA_BLOCK_ID', '=', 'DATA_BLOCK_FIELDS.DATA_BLOCK_ID')
        })
        .join('FAR_CODE_DATA_BLOCK', join => {
            join.on('DATA_BLOCK_FIELDS.DATA_BLOCK_FIELDS_ID', '=', 'FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS_ID')
        })
        .join('FAR_CODE', join => {
            join.on('FAR_CODE_DATA_BLOCK.FAR_CODE_ID', '=', 'FAR_CODE.FAR_CODE_ID')
        })
        .where('FAR_CODE.FAR_CODE_CD', '=', req.params.farcode)
        .distinct('BLOCK_NAME_CD', 'DATA_BLOCK.DATA_BLOCK_ID')
        .orderBy('DATA_BLOCK.DATA_BLOCK_ID', 'asc')

    res.send(value);
});

module.exports = router;