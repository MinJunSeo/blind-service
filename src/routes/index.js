const express = require('express');
const router = express.Router();

const { busStop, busArrivalList, cityCodes } = require('./busStop');

router.get('/bus-stop', busStop);
router.get('/bus-arrival-list', busArrivalList);
router.get('/citycode', cityCodes);

module.exports = router;