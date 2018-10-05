$(function () {
    $("#layer2 table table").each(function () {
        $("tr:has(input[name=server])", this).each(function () {
            $("input", this).val("px");
            $(this).hide();
        });

        $("tr:has(input[name=database])", this).each(function () {
            $("input", this).val("tretton37");
            $(this).hide();
        });

        $("tr:has(select[name=selectLanguage])", this).each(function () {
            var t = $(this);
            t.hide();

            $("select",this).each(function(){
                var t = $(this);
                if (t.val() == "ENG") return;

                t.val("ENG").change();
            });
        });
    })
});
