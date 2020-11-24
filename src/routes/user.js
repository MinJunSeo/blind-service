const express = require('express');

const UserService = require('../services/user');
const userService = new UserService();

const generateUser = async (req, res) => {
  try {
    const user = userService.generateUser();
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

    const putCoord = userService.putCoord(key, lat, lon);
    res.send(putCoord);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

const deleteCoord = async (req, res) => {
  try {
    const key = req.query.key;

    const deleteCoord = userService.deleteCoord(key);
    res.send(deleteCoord);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

module.exports = {
  generateUser,
  putCoord,
  deleteCoord
};