import express from 'express';
import { WebSocketServer } from 'ws';

express()
  .use((_req, res) =>
    res.sendFile('/websocket-client.html', { root: __dirname }),
  )
  .listen(3000, () => console.log(`Listening on ${3000}`));
const socketServer = new WebSocketServer({ port: 443 });

socketServer.on('connection', (ws) => {
  console.log('New client connected!');
  ws.send('connection established');
  ws.on('close', () => console.log('Client has disconnected!'));
  ws.on('message', (data) => {
    socketServer.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = () => console.log('websocket error');
});
