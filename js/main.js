let sliderTop = document.getElementById("top");
let sliderMid = document.getElementById("mid");
let sliderBot = document.getElementById("bot");
let inputNumber = document.getElementById("inputNumber");
let outputNumber = document.getElementById("outputNumber");
let currencyPrise = [];
let mainSlider = document.getElementById("body");

var tI = 0;
var mI = 1;
var bI = 2;


sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];





inputNumber.oninput = function textInput() {
    sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
    sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
    sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];

    slider();

}

function slider(eventObject) {

    let selectCurrensy;
    var scale = event.deltaY * -1;
    //console.log(scale);
    if (scale > 0) {
        selectCurrensy = scrollUp();
    } else {
        selectCurrensy = scrollDown();
    }

    calkSumInput(selectCurrensy);
}

function scrollUp() {

    length = getCurrencyArray().length;

    if (tI < length) {

        if (tI === (length - 1)) {
            tI = 0;
            sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
        } else {
            tI++;
            sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
        }
    }

    if (mI < length) {

        if (mI === (length - 1)) {
            mI = 0;
            sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
        } else {
            mI++;
            sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
        }
    }

    if (bI < length) {

        if (bI === (length - 1)) {
            bI = 0;
            sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];
        } else {
            bI++;
            sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];
        }
    }

    return getCurrencyArray()[mI];
}

function scrollDown() {
    length = getCurrencyArray().length;

    if (tI < length) {
        tI--;
        if (tI < 0) {
            tI = length - 1;
            sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
        } else {
            sliderTop.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[tI];
        }
    }

    if (mI < length) {
        mI--;
        if (mI < 0) {
            mI = length - 1;
            sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
        } else {

            sliderMid.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[mI];
        }
    }

    if (bI < length) {
        bI--;
        if (bI < 0) {
            bI = length - 1;
            sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];
        } else {
            sliderBot.innerHTML = inputNumber.value + ' ' + getCurrencyArray()[bI];
        }
    }

    return getCurrencyArray()[mI];
}

function getCurrencyArray() {
    let sliderValue = ['EUR', 'USD', 'TRY'];
    return sliderValue;
}

function calkSumInput(selectCurrensy) {
    httpGet();
    switch (selectCurrensy) {
        case getCurrencyArray()[0]:

            outputNumber.value = inputNumber.value * Math.round(httpGet()[0]);
            break;

        case getCurrencyArray()[1]:

            outputNumber.value = inputNumber.value * Math.round(httpGet()[1]);
            break;

        case getCurrencyArray()[2]:

            outputNumber.value = inputNumber.value * Math.round(httpGet()[2]);
            break;
    }

    Manime(outputNumber.value);

}

mainSlider.addEventListener('wheel', slider);

function httpGet() {
    i = 0;
    while (currencyPrise.length < getCurrencyArray().length) {
        let x = getCurrencyArray()[i]
        let y;
        theUrl = 'https://api.exchangeratesapi.io/latest?base=' + getCurrencyArray()[i];
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        currencyPrise.push(xmlHttp.responseText);
        currencyPrise[i] = (JSON.parse(currencyPrise[i]).rates.RUB);
        i++;
        console.log(httpGet)
    }

    return currencyPrise;
}


function Manime(outputNumber) {
    anime({
        targets: ".outputNumber",
        value: [0, outputNumber],
        round: 1,
        easing: 'easeInOutExpo'
    });
}

