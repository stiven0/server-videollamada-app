
  import { Socket, Server } from 'socket.io';


    let usuariosConectados : ModelUsuario[] = [];

    export const clienteConectado = (io:Server, cliente:Socket) => {

      cliente.on('usuario-conectado', (payload : {name : string, _id : string}) => {

        if( usuariosConectados.length < 2 ){
            usuariosConectados.unshift(payload);
            io.to(cliente.id).emit('permitir-ingreso', { ingreso : true });
        } else {
           io.to(cliente.id).emit('permitir-ingreso', { ingreso : false });
        }

        // desconexion del servidor
        cliente.on('disconnect', () => {
          console.log('Desconectado');
        });

      });
    };


    export const enviarUsuariosConectados = (io:Server, cliente:Socket) => {
      cliente.on('obtener-usuarios', payload => {
        io.emit('obtener-usuarios', usuariosConectados);
      });
    };

    export const salirUsuario = (io:Server, cliente:Socket) => {
      cliente.on('salir-videollamada', (nombre : string) => {

        for( let user in usuariosConectados){
              if( usuariosConectados[user].name === nombre ){
                  usuariosConectados.splice(Number(user), 1)
              }
        }

        cliente.broadcast.emit('obtener-usuarios', {users : usuariosConectados, userExit : nombre});
      });
    };

    export const streamData = (io:Server, cliente:Socket) => {
        cliente.on('stream-data', (payload:{imagen:string}) => {
          cliente.broadcast.emit('stream-usuario', payload.imagen);
        });
    };




    interface ModelUsuario {
      name : string;
      _id : string;
    };
