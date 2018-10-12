// Initialize Firebase
var config = {
    apiKey: "AIzaSyDijDxVIyFAGv3idi9ubFPIDeQtcIEKk1w",
    authDomain: "trainscheduler-d2091.firebaseapp.com",
    databaseURL: "https://trainscheduler-d2091.firebaseio.com",
    projectId: "trainscheduler-d2091",
    storageBucket: "",
    messagingSenderId: "47492394841"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

// Variables that will be pushed into Firebase
var name = "";
var destination = "";
var frequency = "";
var arrivalTime = "";
var minutesTill = "";
var childKey = "";
var minCountdown;

// Adds and updates day and date for train table heading
var date = moment().format("dddd, MMMM Do, YYYY")
$("#date").html(date);

$("#submitButton").on("click",function(event) {
    event.preventDefault();
    
    name = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    var hour = $("#hourInput").val().trim();
    var minute = $("#minuteInput").val().trim();
    var ampm = $("#ampm").val().trim();
   
    // Time concatenated from user input
    var timeRaw = hour + ":" + minute + " " + ampm; 

    // Concatenated time put through moment.js
    var time = moment(timeRaw, "hh:mm a")

    // Converting the time to minutes
    var timeMins = moment().diff(moment(time), "minutes");

    // The math to see how many minutes past the arrival time has been ellapsed
    var minsPast = timeMins % frequency;

    // Math finds how many minutes left for arrival
    minutesTill = frequency - minsPast;

    // Adds minutes left for arrival into current time to display arrival time
    arrivalTime = moment().add(minutesTill, "minutes").format("hh:mm a");
    
    // Pushing data into Firebase
    dataRef.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        arrivalTime: arrivalTime,
        minutesTill: minutesTill,
    });

})


// Grabs info from Firebase and adds it to the DOM
dataRef.ref().on("child_added", function(childSnapshot) {
    
    // Creates a new row for the table that holds the train info
    var trainBody = $("<tr>");
    trainBody.addClass("trainInfo");

    // Creates trash icon button to use when user wants train info deleted
    var button = $("<button>").addClass("btn").html("<img class='trash' src='https://useiconic.com//open-iconic/svg/trash.svg'>")

    // Creates various columns with it's perspective info using data from Firebase
    // Var name also captures the child ID key from Firebase and adds it to the element as an ID
    var name = $("<td>").addClass("trainName").attr("id",childSnapshot.key).text(childSnapshot.val().name).append(button);
    var destination = $("<td>").addClass("destination").text(childSnapshot.val().destination);
    var frequency = $("<td>").addClass("frequency").text(childSnapshot.val().frequency);
    var arrivalTime = $("<td>").addClass("arrivalTime").text(childSnapshot.val().arrivalTime);
    var arrivalMins = $("<td>").addClass("arrivalMins").text(childSnapshot.val().minutesTill);

    // Appends everything to the train scheduler table
    trainBody.append(name).append(destination).append(frequency).append(arrivalTime).append(arrivalMins);
    $("#trainBody").append(trainBody);

    // This function is used to delete entries in the train schedule table
    $(".trash").on("click", function (){
        
        // This block uses the element id which is the child ID key to delete the child from Firebase
        var removeTrainFirebase = $(event.target).parent().parent().attr("id")
        var removeChild = firebase.database().ref().child(removeTrainFirebase);
        removeChild.remove()
        
        // This line remves the entire row from the DOM 
        $(event.target).parent().parent().parent().remove();

    })

})


