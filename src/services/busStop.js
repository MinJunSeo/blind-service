const request = require('request');
const { apiKey } = require('../config');
const xml2js = require('xml2js');

class BusStop {
  async getBusStop(xPos, yPos) {
    const busStop = [];

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(xPos);
    queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(yPos);

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      xml2js.parseString(body, function (err, result) {
        const arr = result.response.body[0].items[0].item;
        for (const item of arr) {
          const obj = {};
          obj.cityCode = item.citycode[0];
          obj.nodeId = item.nodeid[0];
          obj.nodeNo = item.nodeno[0];

          const distance = Math.acos(Math.sin(xPos) * Math.sin(item.gpslati[0]) + Math.cos(xPos) * Math.cos(item.gpslati[0]) * Math.cos(yPos - item.gpslong[0]));
          obj.distance = distance;

          busStop.push(obj);
        }
      });

      console.log(busStop);
      return busStop;
    });
  }

  async getBusArrivalList(cityCode, nodeId) {
    const busArrivalList = null;

    const url = 'http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(cityCode);
    queryParams += '&' + encodeURIComponent('nodeId') + '=' + encodeURIComponent(nodeId);

    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      console.log('Status', response.statusCode);
      console.log('Headers', JSON.stringify(response.headers));
      console.log('Reponse received', body);
    });
    return busArrivalList;
  }

  async getCityCodes() {
    const cityCodes = null;
    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCtyCodeList';
    const queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
  
    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      console.log('Status', response.statusCode);
      console.log('Headers', JSON.stringify(response.headers));
      console.log('Response received', body);
    });
    return cityCodes;
  }
}

module.exports = BusStop;