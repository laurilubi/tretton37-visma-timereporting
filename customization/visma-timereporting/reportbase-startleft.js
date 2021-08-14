$(function () {
    $("form").each(function () {
        $("table:eq(0)", this).each(function () {
            $("tr.groupline", this).hide();
        });

        $("table:eq(1)", this).each(function () {
            $("tr:eq(1)", this).each(function () {
                $("td").css("font-size", "24px");
            });

            $("tr:eq(2)", this).each(function () {
                var newTr = $("<tr><td/></tr>");
                var newTd = $("<td/>")
                    .attr("colspan", 2)
                    .css("padding-bottom", "50px");

                $("select option", this).each(function () {
                    var t = $(this);
                    if (t.text().trim() == "") return;

                    var div = $("<div/>");
                    var button = $("<button/>")
                        .attr("val", t.val())
                        .css("margin-top", "20px");
                    var text = t.text();
                    if (text.startsWith() == "Not complete ")
                        text = text.substr(13) + " (not complete)";
                    if (text.startsWith("New time "))
                        button.css({ fontWeight: "bold", padding: "10px" });
                    button.text(text);
                    button.click(selectReport);
                    div.append(button);
                    newTd.append(div);
                });

                newTr.append(newTd);
                newTr.insertAfter(this);
                $(this).hide();
            });
        });
    })

    function selectReport(elm) {
        var t = $(this);
        var scope = t.closest("table");
        var select = $("select", scope);
        select.val(t.attr("val"));
        timereport();

        return false;
    }
});
