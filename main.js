document.getElementById("convert").addEventListener("click", convertSubtitle);

let arrayInputSubtitleCleaned = [];
let arrayOutputSubtitleHandled = [];
let stringOutputSubtitleHandled = "";
let firstValueOfTimeLine = "";
let secondValueOfTimeLine = "";
let oneRecordTimeline = "";
let oneRecordSubtitle = "";

function convertSubtitle() {
    let stringInputSubtitleNeededHandle = document.getElementById("inputSubtitleNeededHandle").value;
    let arrayInputSubtitleNeededHandle = stringInputSubtitleNeededHandle.split("\n");

    arrayInputSubtitleNeededHandle.forEach(cleanArrayInputSubtitleNeededHandle);
    arrayInputSubtitleCleaned.forEach(createArrayOutptSubtitle);
    arrayOutputSubtitleHandled.forEach(createStringOutptSubtitle);

    console.log(stringOutputSubtitleHandled);

    document.getElementById("outputSubtitleHandled").innerHTML = stringOutputSubtitleHandled;

    arrayInputSubtitleCleaned = [];
    arrayOutputSubtitleHandled = [];
    stringOutputSubtitleHandled = "";
    formatSubtitleHaveIndex = false;
    firstValueOfTimeLine = "";
    secondValueOfTimeLine = "";
}

function cleanArrayInputSubtitleNeededHandle(value) {
    let valueTrimmed = value.replace(/^\s+|\s+$/gm, "");
    if (valueTrimmed != "" && valueTrimmed != "WEBVTT" && valueTrimmed.length > 3) {
        arrayInputSubtitleCleaned.push(valueTrimmed);
    }
}

function createArrayOutptSubtitle(value) {
    if (value.includes("-->")) {
        firstValueOfTimeLine = value.substring(0, 9);
        secondValueOfTimeLine = value.substring(14, 26);
        if (oneRecordTimeline == "") {
        oneRecordTimeline = firstValueOfTimeLine;
        }
    } else if (value.includes(".") || value.includes("?")) {
        oneRecordSubtitle = oneRecordSubtitle == "" ? (oneRecordSubtitle = value) : oneRecordSubtitle.concat(" ", value);
        oneRecordTimeline = oneRecordTimeline.concat(" --> ",secondValueOfTimeLine);
        arrayOutputSubtitleHandled.push(oneRecordTimeline);
        arrayOutputSubtitleHandled.push(oneRecordSubtitle);
        oneRecordTimeline = "";
        oneRecordSubtitle = "";
    } else {
        oneRecordSubtitle = oneRecordSubtitle == "" ? (oneRecordSubtitle = value) : oneRecordSubtitle.concat(" ", value);
    }
}

function createStringOutptSubtitle(value, index) {
    if (value.includes("-->")) {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value,"<br>");
    } else if (index != arrayOutputSubtitleHandled.length-1) {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value,"<br><br>");
    } else {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value);
    }
}