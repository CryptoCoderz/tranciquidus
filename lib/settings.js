/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "Trancecoin TRANCE Explorer";

//The url it will be accessed from
exports.address = "trance.blockcrawlers.xyz";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Flatly";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 80;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "TRANCE";


//coin name, visible e.g. in the browser window
exports.coin = "Trance";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "tranciquidus",
  "password": "3xp!0reR",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 12502,
  "user" : "trancerpc",
  "pass" : "SomeOtherWorldlyPasswordGoesHere1"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": false,
  "twitter": false,
  "facebook": false,
  "googleplus": false,
  "youtube": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 0,
  "blockhash": "00000751752e64b04d56d3e5cf36a43407f5c31fb548de5f5ef90201c4547c8b",
  "txhash": "a0f74f4ad6ea44404eceff9a785da6b02737b4311781e05cefc2507c4ea2171f",
  "address": "TP1My8W1dYkpiZMqzJqZLCdzSLwUKA8uZf",
};

// markets
exports.markets = {
  "coin": "TRANCE",
  "exchange": "BTC",
  "enabled": ['bittrex'],
  "default": "bittrex"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 100,
  "low_flag": 1000,
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": true,
  "difficulty": "POS",
  "last_txs": 100
};

// twitter
exports.twitter = "tranciquidus";
exports.facebook = "yourfacebookpage";
exports.googleplus = "yourgooglepluspage";
exports.youtube = "youryoutubechannel";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "a0f74f4ad6ea44404eceff9a785da6b02737b4311781e05cefc2507c4ea2171f";
exports.genesis_block = "00000751752e64b04d56d3e5cf36a43407f5c31fb548de5f5ef90201c4547c8b";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "COINBASE";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "M";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
