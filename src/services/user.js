const dumyData = require('../config/dumy.json');

const user = [];
const coordData = new Map();
let nextDistance = 999999999;
const len = dumyData.length;
let lastIdx = null;
let busObj = new Object();

const getTwoStation = (lat, lon) => {
  const stations = [];

  let idx = 0;
  for (const data of dumyData) {
    const distance = getDistance(lat, lon, data.lat, data.lon);
    const obj = {
      name: data.name,
      lat: data.lat,
      lon: data.lon,
      distance: distance,
      idx: idx++
    };
    stations.push(obj);
  }

  stations.sort((data1, data2) => {
    return parseFloat(data1.distance) - parseFloat(data2.distance);
  });

  let sorter;

  sorter = new Array();

  if (lastIdx === null) {
    sorter.push(stations[0]);
    sorter.push(stations[1]);

    lastIdx = stations[0].idx;
  } else {
    sorter.push(stations.find(element => element.idx === lastIdx));
    sorter.push(stations.find(element => element.idx === ((lastIdx + 1) % len)));
  }

  sorter.sort((data1, data2) => {
    return parseInt(data1.idx) - parseInt(data2.idx);
  });

  if (Math.abs(sorter[0].idx - sorter[1].idx) !== 1) {
    const temp = sorter[0];
    sorter[0] = sorter[1];
    sorter[1] = temp;
  }

  const nearestIdx = sorter[0].idx;
  console.log(nearestIdx);

  const output = [
    stations.find(element => element.idx === nearestIdx),
    stations.find(element => element.idx === ((nearestIdx + 1) % len)),
    stations.find(element => element.idx === ((nearestIdx + 2) % len))
  ];
  return output;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)) * 1000
};

class User {
  async generateUser() {
    let key;
    while (true) {
      key = String(Math.random() * 9);
      if (!user.includes(key)) {
        user.push(key);
        break;
      }
    }

    const output = {
      key: key
    };
    console.log(output);
    return output;
  }

  async putCoord(userKey, lat, lon) {
    const obj = {
      lat: lat,
      lon: lon
    };

    let distance = 99999;
    let stationId = null;
    for (const data of dumyData) {
      const temp = Math.acos(Math.sin(lat) * Math.sin(data.lat) + Math.cos(lat) * Math.cos(data.lat) * Math.cos(lon - data.lon)) * 1000;
      if (temp < distance) {
        distance = temp;
        if (temp <= 50) {
          stationId = data.name;
        }
      }
    }
    obj.stationId = stationId;
    obj.distance = distance;
    obj.additionalData = busObj;

    console.log(obj);
    coordData.set(userKey, obj);
    return obj;
  }

  async deleteCoord(userKey) {
    if (coordData.has(userKey)) {
      console.log(userKey);
      coordData.delete(userKey);
    }
  }

  async getNumOfPassenger(stationId) {
    let count = 0;
    for (const [key, value] of coordData) {
      if (value.stationId === stationId) {
        count++;
      }
    }
    return count;
  }

  async getBusDistance(lat, lon) {
    console.log("getBusDistance");
    const arr = getTwoStation(lat, lon);
    let percent;

    const totalDistance = arr[0].distance + arr[1].distance;
    const random = (Math.random() * 1000 + 100) / totalDistance;

    const latDis = arr[1].lat - arr[0].lat;
    const lonDis = arr[1].lon - arr[0].lon;

    let movedLat = latDis / 100 * random;
    let movedLon = lonDis / 100 * random;

    nextDistance = arr[1].distance;

    percent = 100 - (nextDistance / totalDistance * 100);
    percent += random;

    if (percent >= 100) {
      percent = 100;
      lat = arr[1].lat;
      lon = arr[1].lon;
      movedLat = 0;
      movedLon = 0;
      lastIdx++;
      console.log("finished : false");
    }

    const output = {
      prevStationName: arr[0].name,
      nowStationName: arr[1].name,
      nextStationName: arr[2].name,
      percent: parseInt(percent),
      lat: lat + movedLat,
      lon: lon + movedLon
    };

    busObj = output;
    return output;
  }
}

module.exports = User;