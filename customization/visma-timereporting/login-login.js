$(function () {

    $('#layer2').prepend("<div class='login'></div>");
    $('table').hide();
    $('#username').remove();
    $('#password').remove();
    $('.login').append("<div class='header'>Time reporting</div>");

    const logoUrl = url('images/tretton37-logo-green.png');
    $('.login').append(`<img class='logo' src='${logoUrl}' width='100%'>`);
    $('.login').append("<input type='text' id='username' name='username' placeholder='Ninja id'>");
    $('.login').append("<input type='password' id='password' name='password' placeholder='Secret password'>");
    $('.login').append("<div class='loginBtn' onclick='javascript:SubmitForm()'>Login</div>");
});
