const express = require('express');
const router = express.Router();

const { busStop } = require('./busStop');
const { generateUser, putCoord, deleteCoord, getBusDistance } = require('./user');

router.post('/user', generateUser);
router.put('/coord', putCoord);
router.delete('/coord', deleteCoord);

router.put('/bus-coord', getBusDistance);

router.get('/bus-stop', busStop);

module.exports = router;