document.getElementById("convert").addEventListener("click", convertSubtitle);

let arrayInputSubtitleCleaned = [];
let arrayOutputSubtitleHandled = [];
let stringOutputSubtitleHandled = "";
let formatSubtitleHaveIndex = false;
let firstValueOfTimeLine = "";
let secondValueOfTimeLine = "";
let oneRecordTimeline = "";
let oneRecordSubtitle = "";

function convertSubtitle() {
    let stringInputSubtitleNeededHandle = document.getElementById("inputSubtitleNeededHandle").value;
    let arrayInputSubtitleNeededHandle = stringInputSubtitleNeededHandle.split("\n");

    getHeaderAndFormatOfSubtitleNeedHandle(arrayInputSubtitleNeededHandle);

    arrayInputSubtitleNeededHandle.forEach(cleanArrayInputSubtitleNeededHandle);
    arrayInputSubtitleCleaned.forEach(createArrayOutptSubtitle);

    if (formatSubtitleHaveIndex) {
        arrayOutputSubtitleHandled.forEach(createStringOutptSubtitleHaveIndex);
    } else {
        arrayOutputSubtitleHandled.forEach(createStringOutptSubtitleHaveNotIndex);
    }

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
    if (valueTrimmed != "" && valueTrimmed.includes("WEBVTT") == false && valueTrimmed.length > 3) {
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

function createStringOutptSubtitleHaveNotIndex(value) {
    if (value.includes("-->")) {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value,"<br>");
    } else {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value,"<br><br>");
    }
}

function createStringOutptSubtitleHaveIndex(value, index) {
    if (value.includes("-->")) {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(index, "<br>", value,"<br>");
    } else {
        stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(value,"<br><br>");
    }
}

function getHeaderAndFormatOfSubtitleNeedHandle(arrayInputSubtitleNeededHandle){
    stringOutputSubtitleHandled = stringOutputSubtitleHandled.concat(arrayInputSubtitleNeededHandle[0],"<br><br>");
    if (arrayInputSubtitleNeededHandle[2] == 0) {
        formatSubtitleHaveIndex = true;
    }
}