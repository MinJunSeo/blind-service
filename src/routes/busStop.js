const express = require('express');
const router = express.Router();

const BusStopService = require('../services/busStop');
const busStopService = new BusStopService();

const busStop = async (req, res) => {
  try {
    const xpos = parseFloat(req.query.xPos);
    const ypos = parseFloat(req.query.yPos);
  
    const busStop = await busStopService.getBusStop(xpos, ypos);
    console.log(busStop);
    res.send(busStop);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

module.exports = {
  busStop
};