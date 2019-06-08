$(function () {

    $('#layer2').prepend("<div class='login'></div>");
    $('table').hide();
    $('#username').remove();
    $('#password').remove();
    $('.login').append("<div class='header'>Time reporting</div>");

    $('.login').append("<img class='logo' src='https://1337works.com/images/_tretton37_logo_green.png' width='100%'>");
    $('.login').append("<input type='text' id='username' name='username' placeholder='Ninja id'>");
    $('.login').append("<input type='password' id='password' name='password' placeholder='Secret password'>");
    $('.login').append("<div class='loginBtn' onclick='javascript:SubmitForm()'>Login</div>");
});
