'use strict'

const express = require('express'),
        router = express.Router(),
        bodyparser = require('body-parser');


router.use(bodyparser.json())

// router.get('/', (req, res, next)=> {
//     res.redirect('/api/docs')
// })

router.use('/docs', require('./docs'));
router.use('/orders', require('./order'));

module.exports = router