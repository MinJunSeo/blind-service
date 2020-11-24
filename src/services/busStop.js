const request = require('request');
const { apiKey } = require('../config');

class BusStop {
  async getBusStop(xPos, yPos) {
    const busStop = null;

    const url = 'http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + apiKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(xPos); /* */
    queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(yPos); /* */
    queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent(100); /* */

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      console.log('Status', response.statusCode);
      console.log('Headers', JSON.stringify(response.headers));
      console.log('Reponse received', body);
    });

    return busStop;
  }

  async getBusArrivalList(stationId) {
    const busArrivalList = null;

    var url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=f%2BgH2HxZMaIPz54Y%2BU6j7qlKPAhzvBMP1%2FxNEFdh6EedEDuHMIDrXbw27Cp3Cz%2BRBeGEoTyPBu4dbbuQ7GoIvg%3D%3D';
    queryParams += '&' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent('1234567890');
    queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('200000078');

    request({
      url: url + queryParams,
      method: 'GET'
    }, function (error, response, body) {
      console.log('Status', response.statusCode);
      console.log('Headers', JSON.stringify(response.headers));
      console.log('Reponse received', body);
    });

    return busArrivalList;
  }
}

module.exports = BusStop;