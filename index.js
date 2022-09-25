const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  apiKey: "API_KEY", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geoCoder = NodeGeocoder(options);



var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    var data_list = data.split(/\r?\n/);
    console.log(data_list);    
} catch(e) {
    console.log('Error:', e.stack);
}

var result ="";
for(var i = 0 ; i < data_list.length;i++){
  geoCoder.geocode(data_list[i])
  .then((res)=> {
    result+=res;
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });
}



fs.writeFile('output.txt', result, function (err) {
  if (err) return console.log(err);
  console.log('Data > output.txt');
});



  
;
