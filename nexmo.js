var Nexmo = require('nexmo');
var options = {}
var nexmo = new Nexmo({
    apiKey: '6c2aecec',
    apiSecret: 'c27ca85785ce2cb1'
  }, options );

  nexmo.message.sendSms('Penis de chevre', '33633796962',"J'aime pas les licornes! Et j'ai hack ton tel ;)", options, ()=>{
    console.log('gg')
  });