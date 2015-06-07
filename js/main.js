$(document).ready(function() {
    $('.comb').click(function () {
        var url = $(this).attr('href');
        if(url !== undefined)
            window.location.href = url;
    });
});