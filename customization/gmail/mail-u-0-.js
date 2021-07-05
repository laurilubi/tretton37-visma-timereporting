// we want to inject CSS before page onload, therefore we handle loading manually

let attemptCounter = 0;
let isCssApplied = false;

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
        // TODO remove site-id from cached list
        removeCss();
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
    // TODO add site-id to cached list
}

const getAccountId = function () {
    const url = document.location.href;
    const parts = url.split('/');
    return parseInt(parts[5]);
}

const init = function () {
    attemptCounter++;
    if (attemptCounter >= 100) return;

    if ((typeof ($) == 'undefined')) {
        setTimeout(init, 100);
        return;
    }

    let accountIds = []; // TODO
    let accountId = getAccountId();
    if (accountIds.includes(accountId)) {
        console.log('remembered tretton37 account, adding CSS');
        applyCss();
    }
    detectManagedBy();
}

init();
