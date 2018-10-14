$(function () {
    $("form[name=report_form]").each(function () {
        $("#timeTable", this).each(function () {
            $("#day_1_1", this).focus();
        });
    });
});
