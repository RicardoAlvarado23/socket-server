import { Socket } from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-list';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuariosLista();

export const configurrCliente = (cliente : Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = ( cliente:Socket ) => {
    cliente.on('disconnect', () => {
        const usuario = usuariosConectados.deleteUser(cliente.id);
        console.log('cliente desconectado' , usuario);
    })
}

export const mensaje = ( cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje Recibido ' , payload);
        io.emit('mensaje-nuevo' , payload);
    })
}

export const configurarUsuario = ( cliente: Socket , io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            'status': true,
            'message': `Usuario ${payload.nombre}, configurado`
        })
    })
}