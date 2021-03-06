// Firebase

var config = {
  apiKey:"AIzaSyC3bBwm9SqTEekb1q01n8QS5cTbp62rVcE",
  authDomain: "train-tracker-aaf1b.firebaseapp.com",
  databaseURL:"https://train-tracker-aaf1b.firebaseio.com",
  storageBucket: "train-tracker-aaf1b.appspot.com",
  // messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

//   variables
var database = firebase.database();

var trainName;
var destination;
var trainTime;
var frequency;

$("#submit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();


 

  database.ref().push({
    Name: trainName,
    Destination: destination,
    Time: trainTime,
    Frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })

  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot, prevChildKey) {
  var sv = snapshot.val();

  var trainTimeConvert = moment(sv.Time, 'HH:mm').subtract(1, "years");
  var currentTime = moment();
  var newTime = moment().diff(moment(trainTimeConvert), 'minutes');
  var tRemainder = newTime % sv.Frequency;
  var tMinutesTillTrain = sv.Frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  
$('.newTrain').append('<tr><td>' + sv.Name + '</td><td>' + sv.Destination + '</td><td>' + sv.Frequency + '</td><td>' + moment(nextTrain).format('hh:mm') + '</td><td>' + tMinutesTillTrain + '</td></tr>');






  
})
