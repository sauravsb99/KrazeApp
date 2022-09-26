const NodeGeocoder = require('node-geocoder');
const fs = require('fs');

const options = {
  provider: 'google',

  apiKey: "API_KEY", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geoCoder = NodeGeocoder(options);

function readInputFile() {
  return new Promise(resolve => {
    var filename = process.argv[2];
    fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    data_list = data.split(/\r?\n/);
    resolve(data_list);
    });
  });
}

function getLatLong(arg) {
  return new Promise(resolve => {
    resolve("lat 25 long 36");
    // geoCoder.geocode(arg)
    // .then((res)=> {
    //   resolve(res);
    //   console.log(res);
    // })
    // .catch((err)=> {
    //   console.log(err);
    //   throw err;
    // });
    });
}

function writeOutputFile(result) {
  return new Promise(resolve => {
    fs.writeFile('output.txt', result, function (err) {
      if (err) return console.log(err);
      console.log('Data > output.txt');
      resolve("OK");
      });
  });
}

async function getGeoCodes(){
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  try{
    const data_list = await readInputFile(); 
  }
  catch{
    console.log("Exception Caught while reading the input File");
  }
  var result = "";
  for(let i = 0 ; i < data_list.length;i++){
    try{
      result += await getLatLong(data_list[i]);
      result+="\n";
    }
    catch{
      console.log("Exception Caught while converting data into geocodes");
    }
  }

  const isWriteOK = await writeOutputFile(result);

  console.log(isWriteOK);


}

getGeoCodes();

  
;
