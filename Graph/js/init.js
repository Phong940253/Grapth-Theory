// surprise colour!
// Referenced to in  home.js and viz.js also
var colourArray = [
    "#52bc69",
    "#d65775" /*"#ed5a7d"*/,
    "#2ebbd1",
    "#d9513c",
    "#fec515",
    "#4b65ba",
    "#ff8a27",
    "#a7d41e",
]; // green, pink, blue, red, yellow, indigo, orange, lime

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, "g"), replace);
}

function getColours() {
    var generatedColours = new Array();
    while (generatedColours.length < 4) {
        var n = Math.floor(Math.random() * colourArray.length);
        if ($.inArray(n, generatedColours) == -1) generatedColours.push(n);
    }
    return generatedColours;
}
// lấy màu ngẫu nhiênnhiên

function isOn(value, position) {
    return (value >> position) & (1 === 1);
}

function customAlert(msg) {
    $("#custom-alert p").html(msg);
    var m = -1 * ($("#custom-alert").outerHeight() / 2);
    $("#custom-alert").css("margin-top", m + "px");
    $("#dark-overlay").fadeIn(function () {
        $("#custom-alert").fadeIn(function () {
            setTimeout(function () {
                $("#custom-alert").fadeOut(function () {
                    $("#dark-overlay").fadeOut();
                });
            }, 1000);
        });
    });
}
// Tùy chỉnh thông báo

function commonAction(retval, msg) {
    //setTimeout(function() {
    if (retval) {
        // mode == "exploration" && // now not only for exploration mode, but check if this opens other problems
        $("#current-action").show();
        $("#current-action").html(
            mode == "exploration"
                ? msg
                : "e-Lecture Example (auto play until done)<br>" + msg
        );
        $("#progress-bar").slider("option", "max", gw.getTotalIteration() - 1);
        triggerRightPanels();
        isPlaying = true;
    }
    //}, 500);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable)
            return decodeURIComponent(pair[1]);
    }
    return "";
}

var generatedColours = getColours();
var surpriseColour = colourArray[generatedColours[0]];
var colourTheSecond = colourArray[generatedColours[1]];
var colourTheThird = colourArray[generatedColours[2]];
var colourTheFourth = colourArray[generatedColours[3]];

$(function () {
    $(".colour").css("color", surpriseColour); // name
});
