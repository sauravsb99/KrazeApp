//Importing Necessary Packages
const NodeGeocoder = require('node-geocoder'); 
const NodeCache = require("node-cache");
const fs = require('fs');

const cache = new NodeCache({ stdTTL: 15 }); //Setting up the cache

const options = {
  provider: 'google',

  apiKey: "API_KEY", // API KEY for Google/positionstack
  formatter: null // 'gpx', 'string'
};

const geoCoder = NodeGeocoder(options);//setting up the geocoder

/*
  Function to verify if cache is present or not
*/
function verifyCache(data_list){ 
  try {
    const id = data_list;
    if (cache.has(id)) {
      return true;
    }
    else{
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
}

/*
  Function to read the input file
*/
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

/*
  Function to get the Langitudes and Longitudes by calling the geoCoder.
*/
function getLatLong(arg) {
  return new Promise(resolve => {
    // resolve("lat 25 long 36");
    geoCoder.geocode(arg)
    .then((res)=> {
      resolve(res);
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
      throw err;
    });
    });
}

/*
  Function to write the output into a txt file.
*/
function writeOutputFile(result) {
  return new Promise(resolve => {
    fs.writeFile('output.txt', result, function (err) {
      if (err) return console.log(err);
      console.log('Data > output.txt');
      resolve("OK");
      });
  });
}

/*
  Acts as a main function which calls the respective functions in order.
*/
async function getGeoCodes(){
  if (process.argv.length < 3) {                                      //Checks if the input file is present or not
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  try{
    const data_list = await readInputFile();                          // Reads the input from the input file
  }
  catch{
    console.log("Exception Caught while reading the input File");
  }
  var result = "";
  for(let i = 0 ; i < data_list.length;i++){
    try{
      if(verifyCache(data_list[i])){                                  // Checks if it is present in Cache or not
        result += cache.get(data_list[i]);
        result+="\n";
        continue;
      }
      
      else{
        
        var lat_long = await getLatLong(data_list[i]);                // If it's not present in the cache call google api and store in the cache
        console.log(lat_long,data_list[i]);
        const id = data_list[i];
        const data = lat_long;
        try{
          cache.set(id, data);
        }
        catch(err){
          console.log("Exception Caught while setting the cache",err);
        }
        result += lat_long;
        result+="\n";
      }
      
    }
    catch{
      console.log("Exception Caught while converting data into geocodes");
    }
  }
  try{
    const isWriteOK = await writeOutputFile(result);                  // Write the changes in the output file
    console.log(isWriteOK);
  }
  catch{
    console.log("Exception caught while writing the geocodes");
  }

}

getGeoCodes();
