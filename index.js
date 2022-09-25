const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  apiKey: 'AIzaSyCGZZvzZjJ7fWSI4J82I89eJEKi4Oc8p0E', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geoCoder = NodeGeocoder(options);



var fs = require('fs');

try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}

fs.writeFile('output.txt', data, function (err) {
  if (err) return console.log(err);
  console.log('Data > output.txt');
});

// geoCoder.geocode('Location')
//   .then((res)=> {
//     console.log(res);
//   })
//   .catch((err)=> {
//     console.log(err);
//   });

  
;
