let attemptCounter = 0;
let isCssApplied = false;

const applyCss = function () {
    if (isCssApplied) return;
    extension.addCss(`customization/gmail/tretton37.css`);
    isCssApplied = true;
}

const detectManagedBy = function () {
    attemptCounter++;
    if (attemptCounter >= 100) {
        // TODO remove site-id from cached list
        $('head link[rel=stylesheet][href$=/customization/gmail/tretton37.css]').remove();
        return;
    }

    const managedBy = $('#gbpbt > span');
    if (managedBy.length == 0) {
        setTimeout(detectManagedBy, 100);
        return;
    }

    const managedByText = managedBy.text();
    if (managedByText != 'tretton37.com' && managedByText != '1337.tech') return;

    applyCss();
    // TODO add site-id to cached list
}

const init = function () {
    attemptCounter++;
    if (attemptCounter >= 100) return;

    if ((typeof ($) == 'undefined')) {
        setTimeout(init, 100);
        return;
    }

    let siteIds = [0]; // TODO
    let siteId = 0; // TODO
    if (siteIds.includes(siteId))
        applyCss();
    detectManagedBy();
}

init();
