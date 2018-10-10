$(document).ready(function () {

    // trainInputs object has starter info for the train scheduler that will be converted and pushed to the trainInfom object below through the function trainScheduleInitialSetup and function listTrains 
    var trainInputs = [
        {name: "Thomas",
        destination: "Big City",
        hour: 4,
        minute: 00,
        ampm: "am",
        frequency: 5,
        },
        {name: "Percey",
        destination: "Florence",
        hour: 3,
        minute: 15,
        ampm: "am",
        frequency: 1,
        }
    ]

    var trainInfo = [];

    // This function setups the schedule with the predetermined object trainInputs
    function trainScheduleInitialSetup() {
        for (let i = 0; i < trainInputs.length; i++) {
            var nameInput = trainInputs[i].name;
            var destinationInput = trainInputs[i].destination;
            var hourInput = trainInputs[i].hour;
            var minuteInput = trainInputs[i].minute;
            var ampm = trainInputs[i].ampm;
            var frequencyInput = trainInputs[i].frequency;
            
            // Time concatenated from user input
            var timeRaw = hourInput + ":" + minuteInput + " " + ampm; 

            // Concatenated time put through moment.js
            var time = moment(timeRaw, "h:mm a")

            // Converting the time to minutes
            var timeMins = moment().diff(moment(time), "minutes");

            // The math to see how many minutes past the arrival has been ellapsed
            var minsPast = timeMins % frequencyInput;

            // Math displays how many minutes left for arrival
            var minsArrival = frequencyInput - minsPast;

            // Adds minutes left for arrival into current time to display arrival time
            // var nextTrain = moment().add(minsArrival, "minutes").format("hh:mm:ss a");
            var nextTrain;


            // THIS IS THE FUNCTION THAT ISN"T WORKING
            var runningClock = function () {
                nextTrain = moment().add(minsArrival, "minutes").format("hh:mm:ss a");
                console.log(nextTrain);  
            };

            setInterval(runningClock,1000);
            
            var trainInfoInput = {
                name: nameInput,
                destination: destinationInput,
                frequency: frequencyInput,
                nextArrival: nextTrain,
                minutesAway: minsArrival,
            };

            // Pushes all the above info to the trainInfo object so info can be displayed
            trainInfo.push(trainInfoInput);
            listTrains ()

        }
    }

    
    // This function displays the train schedule information inside the Train Schedule table
    function listTrains (){

        $("#trainBody").empty ()

        for (let i = 0; i < trainInfo.length; i++) {
            var trainName = trainInfo[i].name;
            var trainDestination = trainInfo[i].destination;
            var trainFrequency = trainInfo[i].frequency;
            var trainArrival = trainInfo[i].nextArrival;
            var trainAway = trainInfo[i].minutesAway;

            var trainBody = $("<tr>");
            trainBody.addClass("trainInfo");

            var name = $("<td>").addClass("trainName").text(trainName);
            var destination = $("<td>").addClass("destination").text(trainDestination);
            var frequency = $("<td>").addClass("frequency").text(trainFrequency);
            var arrivalTime = $("<td>").addClass("arrivalTime").text(trainArrival);
            var arrivalMins = $("<td>").addClass("arrivalMins").text(trainAway);

            trainBody.append(name).append(destination).append(frequency).append(arrivalTime).append(arrivalMins);
            $("#trainBody").append(trainBody);

        }
    

    }    

    
    // On click event occurs when someone submits new train info
    $("#submitButton").on("click",function(event) {
        event.preventDefault();
        
        var nameInput = $("#trainInput").val().trim();
        var destinationInput = $("#destinationInput").val().trim();
        var hourInput = $("#hourInput").val().trim();
        var minuteInput = $("#minuteInput").val().trim();
        var ampm = $("#ampm").val().trim();
        var frequencyInput = $("#frequencyInput").val().trim();
        
        // Time concatenated from user input
        var timeRaw = hourInput + ":" + minuteInput + " " + ampm; 

        // Concatenated time put through moment.js
        var time = moment(timeRaw, "hh:mm a")

        // Converting the time to minutes
        var timeMins = moment().diff(moment(time), "minutes");

        // The math to see how many minutes past the arrival has been ellapsed
        var minsPast = timeMins % frequencyInput;

        // Math displays how many minutes left for arrival
        var minsArrival = frequencyInput - minsPast;

        // Adds minutes left for arrival into current time to display arrival time
        var nextTrain = moment().add(minsArrival, "minutes");
        
        var trainInfoInput = {
            name: nameInput,
            destination: destinationInput,
            frequency: frequencyInput,
            nextArrival: moment(nextTrain).format("h:mm:ss a"),
            minutesAway: minsArrival,
        }

        // Pushes all the above info to the trainInfo object so info can be displayed
        trainInfo.push(trainInfoInput);
        listTrains ();
        
    })
    
    trainScheduleInitialSetup ()



})