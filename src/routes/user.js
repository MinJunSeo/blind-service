const express = require('express');

const UserService = require('../services/user');
const userService = new UserService();

const generateUser = async (req, res) => {
  try {
    const user = await userService.generateUser();
    res.send(user);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

const putCoord = async (req, res) => {
  try {
    const key = req.query.key;
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    await userService.putCoord(key, lat, lon);
    res.send();
  } catch (error) {
    res.json({
      message: error.message
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
      message: error.message
    });
  }
};

const getBusDistance = async (req, res) => {
  try {
    const xPos = parseFloat(req.query.xPos);
    const yPos = parseFloat(req.query.yPos);

    const result = await userService.getBusDistance(xPos, yPos);
    
    result.nowPassenger = await userService.getNumOfPassenger(result.nowStationName);
    result.nextPassenger = await userService.getNumOfPassenger(result.nextStationName);
    res.send(result);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

module.exports = {
  generateUser,
  putCoord,
  deleteCoord,
  getBusDistance
};