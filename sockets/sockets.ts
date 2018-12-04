import { Socket } from 'socket.io';

export const desconectar = ( cliente:Socket ) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');
        
    })
}

export const mensaje = ( cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje Recibido ' , payload);
        io.emit('mensaje-nuevo' , payload);
    })
}