// AUTHOR:    Jakob Saldana
// FILENAME: WordSearchWeb.sln
// SPECIFICATION: Develop a Word Search generator that extracts all the client word list and places them
// inside the given grid size
// FOR: URComp Project Phase 2


// Write your JavaScript code.
//var myWords = new Object();
//myWords = [];
//var myWords = ["EGG", "MILK", "BUTTER", "JAM", "OATS", "SUGAR", "BREAD", "RUSK"];

//var $whatIsClicked = $('#whatIsClicked');

//$whatIsClicked.live('click', function () {
//    //grab the information needed to update
//    var theSize = $('#whatever-the-size-is').val();

//    $.ajax({
//        type: "POST",
//        url: "Home/Rebuild",
//        contentType: "application/json; charset=utf-8",
//        data: { msize: theSize },
//        dataType: "json",
//        success: function (result) {
//            alert('yay it worked');

//        },
//        error: function (result) {
//            alert('oh no : (');
//        }
//    });
//});
var tempWords = [];
var selectedWord = "";
var myWords = new Array();
var getBtn = document.getElementById('myBtn');
var getBtn1 = document.getElementById('myBtn1');
var size = new Array();
var sizeInput = document.getElementById("userSize")
var some = document.getElementsByClassName("some");

const form = document.getElementById('form');
const errorElement = document.getElementById('error');
let messages = [];



form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorElement.innerText = messages.join(', ');
})
getBtn.onclick = function () {
    
    if (sizeInput.value == '' || sizeInput.value == null || sizeInput.value >= 13)
        messages.push("Your size must be between 8-13, for demo purposes only 12 works...");
    else
        buildSize();
    //arrangeGame();
    //getTheData();
}
getBtn1.onclick = function () {
    arrangeGame();
    $.ajax({
        type: "POST",
        url: '/Home/MakeWordSearch',
        data: '{ value: "Word Search Successfully Created!"}',
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (r) {
            alert('Word Search Has Been Created');
        }
    });
}

//$(document).ready(function () {
    //arrangeGame();
    //$(".individual").click(function(){
    //    $(this).addClass("colorPurple");
    //    selectedWord += $(this).html();
    //    console.log(selectedWord);
    //});
    //$(document).keydown(function(){
    //    selectedWord = "";
    //    $(".individual").removeClass("colorPurple");
    //}).keyup(function(){
    //    if(myWords.indexOf(selectedWord) >= 0)
    //    {
    //        $("#hint p").each(function(key, item){
    //            if(selectedWord == $(item).html())
    //            {
    //                $(this).addClass("done");
    //            }
    //        });
    //    }
    //});
//});


// NAME:    buildSize
// PARAMETERS: none
// PURPOSE: Enables me to just build the size of the grid without running the client words at first
// PRECONDITION: Input size is a valid size 
// POSTCONDITION: Size input builds valid grid

function buildSize() {
    //size.splice(0, size.length);
    size.push(sizeInput.value);

    for (var i = 0; i <= (sizeInput.value); i++) {
        for (var j = 0; j <= (sizeInput.value); j++) {
            $("#letters").append("<div class=individual data-row=" + i + " data-column=" + j + "></div>");
        }
    }
}

// NAME:    arrangeGame
// PARAMETERS: none
// PURPOSE: Able to place words in our given CSS box to arrange words to place into grid
// PRECONDITION: Size meet the given grid arrangements and length size
// POSTCONDITION: Words are placed in our #hint view and modeled next to the grid

function arrangeGame() {
    //placing each of mywords to append to hint
    //var inputValues = new Array();
    for (i in some) {
        var singleVal = some[i].value;
        if (singleVal !== "" && singleVal !== undefined) {
            myWords.push(singleVal);
        }
    }
    $.each(myWords, function (key, item) {
        $("#hint").append("<p>" + item + "</p>");
    });
    placeCorrectLetters(myWords);
    console.log("end of first array \n");
    placeCorrectLetters(tempWords);
    $.each($(".individual"), function (key, item) {
        if ($(item).attr("data-word") == undefined)
            $(this).html(randomLetter());
    });

}

// NAME:    randomLetter
// PARAMETERS: none
// PURPOSE: Generates my random letters to be placed around clients key words input
// PRECONDITION: must have a given grid of empty nodes "individual"
// POSTCONDITION: Words are placed around the client key words input
function randomLetter() {
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabets.charAt(Math.floor(Math.random() * 26));
}

// NAME:    checkOccupied
// PARAMETERS: word, starting where we start in the grid, orientation:whether we want to move row column or diagonal
// PURPOSE: Checks if an node within our grid is taken by a letter or not ( our client input word)
// PRECONDITION: Place increment values based on our row column or diagonal
// POSTCONDITION: places a status value to the current node
function checkOccupied(word, starting, orientation) {
    var status = "";
    var incrementBy = 0;
    if (orientation == "row")
        incrementBy = 1;
    else if (orientation == "column")
        incrementBy = 13;
    else if (orientation == "diagonal")
        incrementBy = 14;
    for (var p = starting, q = 0; q < word.length; q++) {
        if ($(".individual:eq(" + p + ")").attr("data-word") == undefined)
            status = "empty";
        else {
            status = "occupied";
            break;
        }
        p += incrementBy;
    }
    return status;
}

// NAME:    placeCorrectLetters
// PARAMETERS: myArr which is the array of letters placed from the client
// PURPOSE: For the size of myarr.length we continue to place words till we reach the end of the array
// PRECONDITION: inputs the Individual nodes with the length of the current word so it allows space on the grid to input word
// POSTCONDITION: generate word with the allocated space on the grid 
function placeCorrectLetters(myArr) {
    var positions = ["row", "column", "diagonal"];
    var nextLetter = 0;
    var newStart = 0;
    for (var i = 0; i < myArr.length; i++) {
        var orientation = positions[Math.floor(Math.random() * positions.length)];
        var start = Math.floor(Math.random() * $(".individual").length);
        var myRow = $(".individual:eq(" + start + ")").data("row");
        var myColumn = $(".individual:eq(" + start + ")").data("column");
        console.log(myArr[i] + " : " + orientation + " : " + start + " : " + myRow + " : " + myColumn);

        if (orientation == "row") {
            nextLetter = 1;
            if ((myColumn * 1) + myArr[i].length <= 12) {
                newStart = start;
                console.log("space in row: " + myArr[i] + " : " + start + " : " + myColumn);
            }
            else {
                var newColumn = 12 - myArr[i].length;
                newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
                console.log("no space in row: " + myArr[i] + " : " + start + " : " + myColumn + " : " + newStart);
            }

        }
        else if (orientation == "column") {
            nextLetter = 13;
            if ((myRow * 1) + myArr[i].length <= 12) {
                newStart = start;
                console.log("space in column:" + myArr[i] + " : " + start + " : " + myRow);
            }
            else {
                var newRow = 12 - myArr[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
                console.log("no space in column:" + myArr[i] + " : " + start + " : " + myRow + " : " + newStart);
            }
        }
        else if (orientation == "diagonal") {
            nextLetter = 14;
            if (((myColumn * 1) + myArr[i].length <= (sizeInput.value))  && ((myRow * 1) + myArr[i].length <= (sizeInput.value)) )
                newStart = start;
            if ((myColumn * 1) + myArr[i].length > (sizeInput.value)) {
                var newColumn = (sizeInput.value) - myArr[i].length;
                newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
            }
            if ((myRow * 1) + myArr[i].length > (sizeInput.value)) {
                var newRow = (sizeInput.value) - myArr[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
            }
            if (((myColumn * 1) + myArr[i].length > (sizeInput.value)) && ((myRow * 1) + myArr[i].length > (sizeInput.value))) {
                var newColumn = (sizeInput.value) - myArr[i].length;
                var newRow = (sizeInput.value) - myArr[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + newColumn + "]").index();
            }
        }
        var characters = myArr[i].split("");
        var nextPosition = 0;
        var occupied = checkOccupied(myArr[i], newStart, orientation);
        if (occupied == "empty") {
            $.each(characters, function (key, item) {
                console.log(item);
                $(".individual:eq(" + (newStart + nextPosition) + ")").html(item);
                $(".individual:eq(" + (newStart + nextPosition) + ")").attr("data-word", myArr[i]);
                $(".individual:eq(" + (newStart + nextPosition) + ")").css("background", "pink");
                nextPosition += nextLetter;
            })
        }
        else {
            tempWords.push(myArr[i]);
        }
        console.log(tempWords);
    }
}
