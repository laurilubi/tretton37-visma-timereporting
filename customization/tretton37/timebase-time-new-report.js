(function ($) {
    $(() => {
        function idifyRadios() {
            const $radios = $('td input[type=radio]');
            $radios.each(function () {
                const id = $(this).attr('value');
                $(this).attr('id', id);
                const $label = $(this)
                    .parent()
                    .next();
                const labelText = $label.html();
                const label = $(`<label for="${id}">${labelText}</label>`);
                $label.html(label);
            });
        }

        function defaultChoice() {
            $('td input[type=radio][value=copy]').click();
        }

        idifyRadios();
        setTimeout(defaultChoice, 0);
    });
})(jQuery);
