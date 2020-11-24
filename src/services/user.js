const request = require('request');
const xml2js = require('xml2js');
const { apiKey } = require('../config');

const user = [];
const coordData = new Map();

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

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
		queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(lat); /* 3x */
		queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(lon); /* 12x */  
  
    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      xml2js.parseString(body, (error, result) => {
        try {
          const item = result.response.body[0].items[0].item[0];
          const distance = Math.acos(Math.sin(lat) * Math.sin(item.gpslati[0]) + Math.cos(lat) * Math.cos(item.gpslati[0]) * Math.cos(lon - item.gpslong[0])) * 1000;
          if (distance <= 50) {
            obj.stationId = item.nodeid[0];
          } else {
            obj.stationId = null;
          }
        } catch (error) {
          console.log('failed');
          console.log('result: ' + JSON.stringify(result));
          return 'failed';
        }
      });
      console.log(obj);
      coordData.set(userKey, obj);
      return obj;
    });
  }

  async deleteCoord(userKey) {
    if (coordData.has(userKey)) {
      console.log(userKey);
      coordData.delete(userKey);
    }
  }
}

module.exports = User;