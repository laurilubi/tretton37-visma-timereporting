$(function () {
    $("#layer2 table table").each(function () {
        // var loginTable = $(this);
        $("select[name=selectLanguage]", this).each(function () {
            var t = $(this);
            if (t.val() == "ENG") return;
            t.val("ENG").change();
        });

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
