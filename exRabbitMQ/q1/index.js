$('.list-group-item').click(function (a) {
    $('.list-group-item').removeClass('active')
    $(this).toggleClass('active')
})

// WS request to server