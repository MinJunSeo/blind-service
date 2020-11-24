const express = require('express');
const router = express.Router();

const { busStop } = require('./busStop');
const { generateUser, putCoord, deleteCoord } = require('./user');

router.post('/user', generateUser);
router.put('/coord', putCoord);
router.delete('/coord', deleteCoord);
router.get('/bus-stop', busStop);

module.exports = router;