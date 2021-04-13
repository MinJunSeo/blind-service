const express = require('express');
const router = express.Router();

const BusStopService = require('../services/busStop');
const busStopService = new BusStopService();

const busStop = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const busStop = await busStopService.getBusStop(lat, lon);
    console.log("log : " + busStop);
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