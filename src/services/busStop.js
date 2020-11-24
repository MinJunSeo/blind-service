const request = require('request');
const { apiKey } = require('../config');
const xml2js = require('xml2js');

class BusStop {
  async getBusArrivalList(cityCode, nodeId) {
    // const busArrivalList = null;

    const url = 'http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(cityCode);
    queryParams += '&' + encodeURIComponent('nodeId') + '=' + encodeURIComponent(nodeId);

    request({
      url: url + queryParams,
      method: 'GET'
    }, (error, response, body) => {
      xml2js.parseString(body, function (err, result) {
        console.log(JSON.stringify(result));
      })
    });
    // return busArrivalList;
  }

  async getBusStop(xPos, yPos) {
    let cityCode = null;
    let nodeId = null;

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(xPos);
    queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(yPos);

    request({
      url: url + queryParams,
      method: 'GET'
    }, async (error, response, body) => {
      xml2js.parseString(body, (error, result) => {
        const arr = result.response.body[0].items[0].item;
        const item = arr[0];
        cityCode = item.citycode[0];
        nodeId = item.nodeid[0];
        
        this.getBusArrivalList(cityCode, nodeId);
      });
    });
  }
}

module.exports = BusStop;