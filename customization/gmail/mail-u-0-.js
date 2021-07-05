// we want to inject CSS before page onload, therefore we handle loading manually

const applyCss = function () {
    if (isCssApplied) return;
    extension.addCss(`customization/gmail/tretton37.css`);
    isCssApplied = true;
}

const removeCss = function () {
    if (isCssApplied == false) return;
    $('head link[rel=stylesheet][href$="/customization/gmail/tretton37.css"]').remove();
    console.log('removed tretton37 CSS');
}

const detectManagedBy = function () {
    attemptCounter++;
    if (attemptCounter >= 100) {
        removeCss();
        rememberCurrentAccountNumber(false);
        return;
    }

    const managedBy = $('#gbpbt > span');
    if (managedBy.length == 0) {
        setTimeout(detectManagedBy, 100);
        return;
    }

    const managedByText = managedBy.text();
    if (managedByText != 'tretton37.com' && managedByText != '1337.tech') {
        removeCss();
        return;
    }

    if (isCssApplied == false) console.log('detected tretton37 account, adding CSS');
    applyCss();
    rememberCurrentAccountNumber(true);
}

const getCurrentAccountNumber = function () {
    const url = document.location.href;
    const parts = url.split('/');
    return parseInt(parts[5]);
}

const rememberCurrentAccountNumber = function (isManaged) {
    if (isManaged) {
        if (managedAccountNumbers.includes(currentAccountNumber)) return;
        managedAccountNumbers.push(currentAccountNumber);
    } else {
        if (managedAccountNumbers.includes(currentAccountNumber) == false) return;
        managedAccountNumbers = managedAccountNumbers.filter(value => value != currentAccountNumber);
    }

    window.localStorage.setItem('managedAccountNumbers', JSON.stringify(managedAccountNumbers));
}

const init = function () {
    attemptCounter++;
    if (attemptCounter >= 100) return;

    if ((typeof ($) == 'undefined')) {
        setTimeout(init, 100);
        return;
    }

    if (managedAccountNumbers.includes(currentAccountNumber)) {
        console.log('remembered tretton37 account, adding CSS');
        applyCss();
    }

    detectManagedBy();
}

let attemptCounter = 0;
let isCssApplied = false;
let managedAccountNumbers = JSON.parse(window.localStorage.getItem('managedAccountNumbers') || '[]');
const currentAccountNumber = getCurrentAccountNumber();
init();
