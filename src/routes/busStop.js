const express = require('express');
const router = express.Router();

const BusStopService = require('../services/busStop');
const busStopService = new BusStopService();

const busStop = async (req, res) => {
  try {
    const xpos = parseFloat(req.query.xPos);
    const ypos = parseFloat(req.query.yPos);
  
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
    const cityCode = parseInt(req.query.cityCode);
    const nodeId = req.query.nodeId;
    
    const busArrivalList = busStopService.getBusArrivalList(cityCode, nodeId);
    res.send();
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

const cityCodes = async (req, res) => {
  try {
    busStopService.getCityCodes();
    res.send();
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

module.exports = {
  busStop,
  busArrivalList,
  cityCodes
};