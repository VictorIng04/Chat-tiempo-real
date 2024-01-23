import express from "express"
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from "socket.io"
const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server,)



io.on('connection', (socket) => {
    console.log('un usuario se ha conectado!')

    socket.on('disconnect', () => {
        console.log('un usuario se ha desconectado!')
    })


    socket.on('mensaje del chat', (data) => {
        console.log('mensaje de ' + data.username + ': ' + data.mensaje);
    
        // Utiliza el ID del socket para emitir el mensaje solo al cliente que lo envió
        io.to(socket.id).emit('mensaje del chat', data);
    
        // Emite el mensaje a todos los demás clientes
        socket.broadcast.emit('mensaje del chat', data);
    });
    


})


app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})