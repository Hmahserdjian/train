var config = {
    apiKey: "AIzaSyCnyADpZ-3ehEcqhR1ubiM3B82dq-k5wd0",
    authDomain: "train-9d5ac.firebaseapp.com",
    databaseURL: "https://train-9d5ac.firebaseio.com",
    projectId: "train-9d5ac",
    storageBucket: "",
    messagingSenderId: "60042903659"
};
firebase.initializeApp(config);

var database = firebase.database();
$("#train-time").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var dEstination = $("#dEstination").val().trim();
    var firstTraintime = moment($("#firstTraintime").val().trim(), "HH.mm.ss").format("HH.mm.ss");
    var arrive1 = moment($("#arrive1").val().trim(), "HH.MM".format("HH.MM") )
    var fRequency = $("#fRequency").val().trim();
    var minutesAway = $("#minutesAway").val().trim();

    var newTrain = {
        name: trainName,
        destination: dEstination,
        arrival: firstTraintime,
        rate: fRequency,
        away: minutesAway,
    };
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.arrival);
    console.log(newTrain.rate);
    console.log(newTrain.away);

    database.ref().push(newTrain);



});

database.ref().on("child_added", function (childSnapshot) {
   var name = childSnapshot.val().name;
    console.log(name);
    var destination =childSnapshot.val().destination;
    console.log(destination);
    var arrival = childSnapshot.val().arrival;
    console.log(arrival);
    var rate = childSnapshot.val().rate;
    console.log(rate);
    var away = childSnapshot.val().away;
    console.log(away);
    var arrive1 = childSnapshot.val().arrive1;
    console.log(arrive1);

// to display times correctly in the table use logic below.
    var firstTraintimeConverted = moment(firstTraintime, "HH:mm").subtract(1, "years");
    console.log(firstTraintime);

    var realTime = moment();
    console.log("CURRENT TIME: " + moment(realTime).format("HH:mm"));

    var timeDifference = moment().diff(moment(realTime), "minutes");
    console.log("Difference in time: " + timeDifference);

    var minutesAway = fRequency - minutesAway;
    console.log("minutes till Train: " + minutesAway);

    
    var arrive1 = moment().add(minutesAway, 'minutes').format('hh:mm:ss');;
    console.log("arrive1: " + arrive1);



    var tillNext = timeDifference % fRequency;
    console.log(tillNext);
 
    var tillNext = fRequency - tillNext;
    console.log("MINUTES TILL TRAIN: " + tillNext);

    var nextTrain = moment().add(tillNext, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 

    $("#tBody").append(
        "<tr>" +
            "<td>" + name + "</td>" +
            "<td>" + destination + "</td>" +
            "<td>" + arrival + "</td>" +
            "<td>" + arrive1 + "</td>" +
            "<td>" + rate + "</td>" +
            "<td>" + away + "</td>" +
        "</tr>"
    )
});


// var firstTraintimeConverted = moment(firstTraintime, "HH:mm").subtract(1, "years");
// console.log(firstTraintime);

// var realTime = moment();
// console.log("CURRENT TIME: " + moment(realTime).format("HH:mm"));

// var timeDifference = moment().diff(moment(realTime), "minutes");
// console.log("Difference in time: " + timeDifference);

// var minutesAway = fRequency - minutesAway;
// console.log("minutes till Train: " + minutesAway);


// var tillNext = timeDifference % fRequency;
// console.log(tillNext);

// // Minute Until Train
// var tillNext = fRequency - tillNext;
// console.log("MINUTES TILL TRAIN: " + tillNext);

// // Next Train
// var nextTrain = moment().add(tillNext, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));