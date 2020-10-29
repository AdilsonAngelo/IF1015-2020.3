const $ = jQuery.noConflict()

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

const others_template = `<div class="alert alert-secondary"style="max-width: 75%;"><div class="row"><div class="col small">{0}</div></div><div class="row"><div class="col">{1}</div><div class="col-2 small d-flex align-items-end">{2}</div></div></div>`
const me_template = `<div class="alert alert-info offset-md-3" style="max-width: 75%;"><div class="row"><div class="col small">{0}</div></div><div class="row"><div class="col">{1}</div><div class="col-2 small d-flex align-items-end">{2}</div></div></div>`

const now = () => new Date().toLocaleTimeString().slice(0, 5)

var NAME = '';
while (!NAME.trim()) {
    NAME = prompt("Please enter your name", "Michael Jackson");
}



var connection = new WebSocket('ws://localhost:8080/chat');
connection.onopen = function () {
    connection.send(JSON.stringify({ name: NAME }))
}
connection.onclose = function () {
    console.log('Connection closed');
}
connection.onmessage = function (e) {
    var server_message = e.data;

    let msg = JSON.parse(server_message)

    $('#chatbox').append(others_template.format(msg.name, msg.msg, now()))
    scrollBottom()
}

$('#msg-form').submit(event => {
    event.preventDefault();
    let text = $('#msg-input').val()
    if (!!text.trim()) {
        let msg = {
            name: NAME,
            msg: text
        }
        connection.send(JSON.stringify(msg))

        $('#chatbox').append(me_template.format(msg.name, msg.msg, now()))
        $('#msg-input').val('')
        scrollBottom()
    }
})

var scrollBottom = () => {
    $("#chatbox").scrollTop($("#chatbox").prop("scrollHeight"))
}