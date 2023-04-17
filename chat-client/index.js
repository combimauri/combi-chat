const webSocket = new WebSocket('ws://localhost:443/');

webSocket.addEventListener('message', (event) => {
  console.log(event);
  document.getElementById('messages').innerHTML +=
    'Message from server: ' + event.data + '<br>';
});

webSocket.addEventListener('open', () => {
  console.log('We are connected');
});

sendMessage = (event) => {
  let inputMessage = document.getElementById('message');
  webSocket.send(inputMessage.value);
  inputMessage.value = '';
  event.preventDefault();
};

document.getElementById('input-form').addEventListener('submit', sendMessage);
