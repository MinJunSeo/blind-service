const express = require('express');

const UserService = require('../services/user');
const userService = new UserService();

const generateUser = async (req, res) => {
  try {
    const user = await userService.generateUser();
    res.send(user);
  } catch (error) {
    res.json({
      message: error.message,
      line: error.lineNumber
    });
  }
};

const putCoord = async (req, res) => {
  try {
    const key = req.query.key;
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const coord = await userService.putCoord(key, lat, lon);
    res.send(coord);
  } catch (error) {
    res.json({
      message: error.message,
      line: error.lineNumber
    });
  }
};

const deleteCoord = async (req, res) => {
  try {
    const key = req.query.key;

    await userService.deleteCoord(key);
    res.send();
  } catch (error) {
    res.json({
      message: error.message,
      line: error.lineNumber
    });
  }
};

const getBusDistance = async (req, res) => {
  // try {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  const result = await userService.getBusDistance(lat, lon);

  result.nowPassenger = await userService.getNumOfPassenger(result.nowStationName);
  result.nextPassenger = await userService.getNumOfPassenger(result.nextStationName);
  res.send(result);
  // } catch (error) {
  //   res.json({
  //     message: error.message,
  //     line: error.lineNumber
  //   });
  // }
};

module.exports = {
  generateUser,
  putCoord,
  deleteCoord,
  getBusDistance
};