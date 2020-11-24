const request = require('request');
const { apiKey } = require('../config');
const xml2js = require('xml2js');

class BusStop {
  async getBusStop(xpos, ypos) {
    const busStop = [];

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(xpos); /* */
    queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(ypos); /* */

    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      xml2js.parseString(body, (err, result) => {
        const arr = result.response.body[0].items[0].item;
        for (var item of arr) {
          const obj = {};
          obj.cityCode = item.citycode[0];
          obj.nodeId = item.nodeid[0];
          obj.nodeNo = item.nodeno[0];

          const distance = Math.acos(Math.sin(xpos) * Math.sin(item.gpslati[0]) + Math.cos(xpos) * Math.cos(item.gpslati[0]) * Math.cos(ypos - item.gpslong[0]));
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