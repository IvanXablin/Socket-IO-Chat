const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const socket = io();
let userName = prompt('Как вас зовут?');
let idRoom = prompt('Введите название комнаты, к которой нужно подключиться')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!userName){
        userName = 'Аноним';
    } else {
        if (input.value) {
            const obj = {Message: input.value, UserName: userName, IdRoom: idRoom};
            socket.emit('chat message', obj);
            input.value = '';
        }
    }
});

socket.on('chat message', function(msg, name) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    li.textContent ='Сообщение: ' + msg;
    span.textContent ='Пользователь: ' + name;
    messages.appendChild(span);
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});

