var router = require('express').Router();

router.use('/farCode', require('./farCode'));
router.use('/dataBlockFields', require('./dataBlockFields'));
router.use('/dataBlock', require('./dataBlock'));
router.use('/farCodeDataBlock', require('./farCodeDataBlock'));
router.use('/extractCSENetData', require('./extractCSENetData'));

router.get('/', (req, res) => {
    res.send({msg: 'test'});
})

module.exports = router;