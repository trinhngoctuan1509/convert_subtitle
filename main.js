document.getElementById("convert").addEventListener("click", convertSubtitle);

let stringInputSubtitleNeededHandle = "";
let arrayInputSubtitleNeededHandle = [];
let arrayInputSubtitleCleaned = [];
let stringEntireSentencesOfSubtitle = "";
let arrayEntireSentencesOfSubtitle = [];
let arrayOutputSubtitleHandledTemporary = [];
let arrayOutputSubtitleHandled = [];
let first15CharactersOfTheSentence = "";
let last15CharactersOfTheSentence = "";
let index = "";
let stringOutputSubtitleHandled = "";

function convertSubtitle() {
    stringInputSubtitleNeededHandle = document.getElementById("inputSubtitleNeededHandle").value;
    arrayInputSubtitleNeededHandle = stringInputSubtitleNeededHandle.split("\n");

    arrayInputSubtitleNeededHandle.forEach(cleanArrayInputSubtitleNeededHandle);
    arrayInputSubtitleCleaned.forEach(createStringEntireSentencesOfSubtitle);
    
    arrayEntireSentencesOfSubtitle = stringEntireSentencesOfSubtitle.split(". ");

    arrayEntireSentencesOfSubtitle.forEach(addDotForSentencesOfSubtitle);

    arrayEntireSentencesOfSubtitle.forEach(createArrayOutputSubtitleHandledTemporary);
    
    arrayOutputSubtitleHandledTemporary.forEach(createArrayOutputSubtitleHandled);

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

function createStringEntireSentencesOfSubtitle(value) {
    if (!value.includes("-->")) {
        if (stringEntireSentencesOfSubtitle == "") {
            stringEntireSentencesOfSubtitle = value;
        } else {
            stringEntireSentencesOfSubtitle += " " + value;
        }
    }
}

function addDotForSentencesOfSubtitle(value, index){
    if(index != (arrayEntireSentencesOfSubtitle.length-1)) {
        value += ".";
        arrayEntireSentencesOfSubtitle[index] = value;
    }
}

function createArrayOutputSubtitleHandledTemporary(value, index){
    arrayOutputSubtitleHandledTemporary.push("00:00.000 --> 00:00.000");
    arrayOutputSubtitleHandledTemporary.push(value);
}

function createArrayOutputSubtitleHandled(value, index){
    if (!value.includes("-->")) {
        first15CharactersOfTheSentence = value.slice(0, 15);
        last15CharactersOfTheSentence = value.slice(value.length-10, value.length);
        timeForFirst15CharactersOfTheSentence = searchTimeForFirst15CharactersOfTheSentence(first15CharactersOfTheSentence, arrayInputSubtitleCleaned);
        timeForLast15CharactersOfTheSentence = searchTimeForLast15CharactersOfTheSentence(last15CharactersOfTheSentence, arrayInputSubtitleCleaned);

        time = timeForFirst15CharactersOfTheSentence + " --> " + timeForLast15CharactersOfTheSentence;
        arrayOutputSubtitleHandled.push(time);
        arrayOutputSubtitleHandled.push(value);
    }
}

// Mới chỉ cover cho trường hợp 15 ký tự đầu câu, luôn nằm ở đầu trong các row của subtitle gốc.
// Chưa cover được trường hợp 1 câu bị nằm ở chính giữa của 1 row trong subtitle gốc. 
// Ví dụ: 
// 00:00.600 --> 00:07.380
// abcxyz. 1 câu subtitle nào đó. abcxyz
function searchTimeForFirst15CharactersOfTheSentence(string, array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].includes("-->")) {
            index = array[i].indexOf(string);
            if (index != -1) {
                time = array[i-1];
                timeForFirst15CharactersOfTheSentence = time.slice(0, 10);
                return timeForFirst15CharactersOfTheSentence;
            } 
        }
    }
}

// Tương tự ở trên.
function searchTimeForLast15CharactersOfTheSentence(string, array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].includes("-->")) {
            index = array[i].indexOf(string);
            if (index != -1) {
                time = array[i-1];
                timeForLast15CharactersOfTheSentence = time.slice(time.length-10, time.length);
                return timeForLast15CharactersOfTheSentence;
            } 
        }
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
    stringEntireSentencesOfSubtitle = "";
    arrayEntireSentencesOfSubtitle = [];
    arrayOutputSubtitleHandledTemporary = [];
    arrayOutputSubtitleHandled = [];
    first15CharactersOfTheSentence = "";
    last15CharactersOfTheSentence = "";
    index = "";
    stringOutputSubtitleHandled = "";
}