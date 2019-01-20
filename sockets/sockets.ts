import { Socket } from 'socket.io';
import { UsuariosLista } from '../clases/usuarios-list';
import { Usuario } from '../clases/usuario';
export const usuariosConectados = new UsuariosLista();

export const configurrCliente = (cliente : Socket , io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = ( cliente:Socket , io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        const usuario = usuariosConectados.deleteUser(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
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
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            'status': true,
            'message': `Usuario ${payload.nombre}, configurado`
        })
    })
}

export const obtenerUsuarios = ( cliente: Socket , io: SocketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}