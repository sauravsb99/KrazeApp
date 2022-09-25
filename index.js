const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  apiKey: 'AIzaSyCGZZvzZjJ7fWSI4J82I89eJEKi4Oc8p0E', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geoCoder = NodeGeocoder(options);


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter the Location', Location =>{

geoCoder.geocode('Location')
  .then((res)=> {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });

  
  readline.close();
});
