'use strict';

var LRU = require('lru-cache'),
    options = {  
        max : 100,                   // The maximum number of items allowed in the cache
        max_age : 1000 * 60 * 60 * 24 * 180    // The maximum life of a cached item in milliseconds
    },
    cache = new LRU(options)

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
    var cache_key = "requiredFields:" + req.params.farcode
    var value = cache.get(cache_key)
    if (!value) {
        value = await FAR_CODE_DATA_BLOCK.query()
            .join('FAR_CODE', join => {
                join.on('FAR_CODE_DATA_BLOCK.FAR_CODE_ID', '=', 'FAR_CODE.FAR_CODE_ID')
            })
            .eager('DATA_BLOCK_FIELDS.[DATA_BLOCK]')
            .where('FAR_CODE.FAR_CODE_CD', '=', req.params.farcode);
        cache.set(cache_key, value)
    }
    res.send(value);
});

router.get('/dataBlocks/:farcode/', async (req, res) => {
    var cache_key = "dataBlocks:" + req.params.farcode
    var value = cache.get(cache_key)
    if (!value) {
        value = await DATA_BLOCK.query()
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
        cache.set(cache_key, value)
    }
    res.send(value);
});

module.exports = router;