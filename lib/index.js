// Initial imports & requires
require('dotenv').config();
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import playersRouter from './routes/players.route';
import boardsRouter from './routes/boards.route';

// Set up the express app
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.UI_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/', (req, res) => res.send('Welcome to the DraftMean API!'));
app.use('/api/players', playersRouter);
app.use('/api/boards', boardsRouter);

// Set up Mongoose
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true });

const db = mongoose.connection;
if (!db) {
    console.log('Error connecting to the db');
} else {
    console.log('Successfully connected to the db');
}

// Initialize the server
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log('DraftMean API started on port ' + port));

// Initialize WebSockets
const ws = new WebSocket.Server({ server });
ws.on('connection', (wss) => {
    console.info('Total connected clients: ' + ws.clients.size);
    app.locals.clients = ws.clients;
});