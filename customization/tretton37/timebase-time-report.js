$(function () {
    $("form[name=report_form]").each(function () {
        $("#timeTable", this).each(function () {
            $("#day_1_1", this).focus();
        });

        $("a.normalbutton:contains('Favourits')", this).each(function () {
            $(this).text("Favourites");
        });
    });

    $("#tblFormIcons td:has(input[name=finished])").each(function () {
        var $td = $(this);
        $td.css("padding-right", "50px");

        const html = $td.html();
        const label = `<label>${html}</label>`;
        $td.html(label);

        $("input", $td).css("margin-right", "3px");

        var $save = $td.next().next().next();
        $save.each(function () {
            $save.css("padding-right", "50px");
            $save.insertAfter($td);

            $save.nextAll().css("opacity", 0.2);
        });
    });
});
