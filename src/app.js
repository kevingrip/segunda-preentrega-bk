//instalar express : npm i express

import express from 'express';
import config from './config.js';
import {Server} from 'socket.io'
import router from './routes/users.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import mongoose from 'mongoose';

let messages = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter)
app.use('/api/users',router);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/static',express.static(`${config.DIRNAME}/public`));

const httpServer = app.listen(config.PORT, async ()=>{
    await mongoose.connect(config.mongoDB_Atlas);
    console.log(`Servidor activo en puerto ${config.PORT}`);
    console.log(config.DIRNAME)
});

const socketServer = new Server(httpServer);
// El método set() nos permite setear objetos globales para nuestra app.
// En este caso lo aprovechamos para socketServer, que luego recuperaremos
// desde los endpoints donde necesitemos publicar mensajes Websockets.
app.set('socketServer', socketServer);

socketServer.on('connection', client => {
    /**
     * Cada vez que un nuevo cliente se conecta, se publica en el tópico
     * chatLog la lista actual de mensajes del chat, SOLO para ese cliente.
     */
    client.emit('chatLog', messages);
    console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    /**
     * Cada vez que llega un nuevo mensaje desde algún cliente,
     * sea actualiza la lista de chats del servidor (solo un array
     * en memoria para este ejemplo), y se emite un contenido en el tópico
     * messageArrived, hacia TODOS los clientes conectados.
     */
    client.on('newMessage', data => {
        messages.push(data);
        console.log(`Mensaje recibido desde ${client.id}: ${data.user} ${data.message}`);

        socketServer.emit('messageArrived', data);
    });
});