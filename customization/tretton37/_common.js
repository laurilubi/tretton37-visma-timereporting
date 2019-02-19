// sometimes, eg frameset-pages, there is no jquery
if ((typeof ($) !== "undefined")) {
    $(function () {
        $("head title").text("Unicorn time reporting");
    });
}