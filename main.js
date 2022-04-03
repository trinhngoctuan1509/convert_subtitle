document.getElementById("convert").addEventListener("click", convertSubtitle);

let stringInputSubtitleNeededHandle = "";
let arrayInputSubtitleNeededHandle = [];
let arrayInputSubtitleCleaned = [];
let arrayOutputSubtitleHandled = [];
let stringOutputSubtitleHandled = "";
let firstValueOfTimeLine = "";
let secondValueOfTimeLine = "";
let oneRecordTimeline = "";
let oneRecordSubtitle = "";

function convertSubtitle() {
    stringInputSubtitleNeededHandle = document.getElementById("inputSubtitleNeededHandle").value;
    arrayInputSubtitleNeededHandle = stringInputSubtitleNeededHandle.split("\n");

    arrayInputSubtitleNeededHandle.forEach(cleanArrayInputSubtitleNeededHandle);
    arrayInputSubtitleCleaned.forEach(createArrayOutptSubtitle);
    arrayOutputSubtitleHandled.forEach(createStringOutptSubtitle);

    document.getElementById("outputSubtitleHandled").innerHTML = stringOutputSubtitleHandled;
    resetAllVariablesToDefaultValue();
}

function cleanArrayInputSubtitleNeededHandle(value, index) {
    if (value.includes("-->")) {
        let time = value.replace(/^\s+|\s+$/gm, "");
        let sentence = arrayInputSubtitleNeededHandle[index+1].replace(/^\s+|\s+$/gm, "");
        arrayInputSubtitleCleaned.push(time);
        arrayInputSubtitleCleaned.push(sentence);
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

function resetAllVariablesToDefaultValue(){
    stringInputSubtitleNeededHandle = "";
    arrayInputSubtitleNeededHandle = [];
    arrayInputSubtitleCleaned = [];
    arrayOutputSubtitleHandled = [];
    stringOutputSubtitleHandled = "";
    firstValueOfTimeLine = "";
    secondValueOfTimeLine = "";
    oneRecordTimeline = "";
    oneRecordSubtitle = "";
}