var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'gTeeLaZt5sU3DbjD';

window.onload = function() {
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyAPX8UFwLI5AoGNjzp6EyCIzQ_U395uEGQ",
    authDomain: "helloworld-b7e91.firebaseapp.com",
    databaseURL: "https://helloworld-b7e91.firebaseio.com",
    storageBucket: "gs://helloworld-b7e91.appspot.com"
  };
  firebase.initializeApp(config);
};

document.getElementById("submit").addEventListener("click", writeData);

function encrypt(data){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(data,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(data){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(data,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function writeData() {
  // reference path
  var dbrf= firebase.database().ref("contents/");

  var safe_data = encrypt("HelloWorld");
  //set to specific path
  dbrf.set ({
    title: safe_data
  }).then(success => {
      console.log('success',success);
    },
    error => {
      console.log('error',error);
    }
  );

  // create unique key
  dbrf.push(password);
  
  dbrf.on("value", function(snapshot) {
    var t = decrypt(snapshot.val().title);
    document.getElementById("demo").innerHTML = t;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}
