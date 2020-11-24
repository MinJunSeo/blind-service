const express = require('express');
const router = express.Router();

const { busStop, busArrivalList } = require('./busStop');

router.get('/bus-stop', busStop);
router.get('/bus-arrival-list', busArrivalList);

module.exports = router;