const express = require('express');
const router = express.Router();

const BusStopService = require('../services/busStop');
const busStopService = new BusStopService();

const busStop = async (req, res) => {
  try {
    const xpos = req.query.xpos;
    const ypos = req.query.ypos;
  
    const busStop = busStopService.getBusStop(xpos, ypos);
    res.send();
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

const busArrivalList = async (req, res) => {
  try {
    const stationId = parseInt(req.query.stationId);
    
    const busArrivalList = busStopService.getBusArrivalList(stationId);
    res.send();
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

module.exports = {
  busStop,
  busArrivalList
};