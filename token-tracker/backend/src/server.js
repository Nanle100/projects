const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

app.post('/stream', (req, res) => {
  const event = req.body;
  console.log('Incoming Event:', event);

  // Emit the event to frontend
  io.emit('newTransaction', event);

  res.status(200).send('Event received');
});

io.on('connection', (socket) => {
  console.log('Frontend connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
