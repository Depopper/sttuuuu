const request = require('request-promise')

const auth = 'YXhlbC5zY2hhZmVycy40MkBnbWFpbC5jb206Y2hvdWJpODE0NA'
const uri = 'https://stuart.staffomaticapp.com/v3/stuart/'

var send = (params) => {
    let options = {  
        method: params.method,
        uri: uri + params.uri_params,
        headers: {
            'User-Agent': 'Depopper',
            'Authorization': 'Basic ' + auth
        }
    }
    return request(options)
}

function check_full(arg){
  if (arg.desired_coverage > 0 && arg.full == false)
    console.log('OK')
  return (arg.desired_coverage > 0 && arg.full == false)
}

exports.send = send