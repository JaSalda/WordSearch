// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

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
var myRebuild = [];

var mWords = new Object();
var myWords = new Array();
var getBtn = document.getElementById('myBtn');
var getBtn1 = document.getElementById('myBtn1');
var getBtn2 = document.getElementById('myBtn1');
var size = new Array();
var sizeInput = document.getElementById("userSize")
var some = document.getElementsByClassName("some");
var mR = document.getElementById("mR");

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
    if (some.length === 0)
        message.push("words Required")
    else {
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
var myCounter = 0;
function buildSize() {
    //size.splice(0, size.length);
    size.push(sizeInput.value);
    if (myCounter == 1) {
        console.log("you already have a game")
        //size.splice(0, size.length);
    }
    else {
        for (var i = 0; i <= (sizeInput.value); i++) {
            for (var j = 0; j <= (sizeInput.value); j++) {
                $("#letters").append("<div class=individual data-row=" + i + " data-column=" + j + "></div>");
            }
        }
        //size.splice(0, size.length);
        myCounter = myCounter + 1;
        console.log(myCounter);
    }
}
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
function randomLetter() {
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabets.charAt(Math.floor(Math.random() * 26));
}

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
