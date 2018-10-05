/* best javascript */

$(function () {
    $("#layer2 table table").each(function () {
        //        var loginTable = $(this);
        $("tr:has(input[name=server])", this).each(function () {
            $("input[name=server]", this).val("px");
            $(this).hide();
        });

        $("tr:has(input[name=database])", this).each(function () {
            $("input[name=database]", this).val("tretton37");
            $(this).hide();
        });
    })
});
