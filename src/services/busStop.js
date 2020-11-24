const request = require('request-promise-native');
const { apiKey } = require('../config');
const xml2js = require('xml2js');

class BusStop {
  async getBusArrivalList(cityCode, nodeId) {
    const busArrivalList = [];

    const url = 'http://openapi.tago.go.kr/openapi/service/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(cityCode);
    queryParams += '&' + encodeURIComponent('nodeId') + '=' + encodeURIComponent(nodeId);

    const xml = await request({
      url: url + queryParams,
      method: 'GET'
    });

    const parser = new xml2js.Parser();
    const result = await new Promise((resolve, reject) => {
      parser.parseString(xml, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const arr = result.response.body[0].items[0].item;
    for (const item of arr) {
      const busName = item.routeno[0];
      const leftTime = item.arrtime[0];
      const obj = {
        busName: busName,
        leftTime: leftTime
      };
      busArrivalList.push(obj);
    }

    busArrivalList.sort((data1, data2) => {
      return parseInt(data1.leftTime) - parseInt(data2.leftTime);
    });

    return busArrivalList;
  }

  async getBusStop(xPos, yPos) {
    const data = {};

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey;
    queryParams += '&' + encodeURIComponent('gpsLati') + '=' + encodeURIComponent(xPos);
    queryParams += '&' + encodeURIComponent('gpsLong') + '=' + encodeURIComponent(yPos);

    const xml = await request({
      url: url + queryParams,
      method: 'GET'
    });
    const parser = new xml2js.Parser();
    const result = await new Promise((resolve, reject) => {
      parser.parseString(xml, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const arr = result.response.body[0].items[0].item;
    const item = arr[0];

    const cityCode = item.citycode[0];
    const nodeId = item.nodeid[0];
    
    data.busArrivalList = await this.getBusArrivalList(cityCode, nodeId);
    return data;
  }
}

module.exports = BusStop;