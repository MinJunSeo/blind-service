const request = require('request');
const { apiKey } = require('../config');
const xml2js = require('xml2js');

class BusStop {
  async getBusStop(xPos, yPos) {
    const busStop = null;

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(yPos); /* */
    queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(xPos); /* */

    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      console.log('Status', response.statusCode);
      console.log('Headers', JSON.stringify(response.headers));
      console.log('Reponse received', body);
    });

    return busStop;
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