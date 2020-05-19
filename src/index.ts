
  require('dotenv').config();
  import app from './app';
  import chalk from 'chalk';
  import socketIO from 'socket.io';
  import { createServer } from 'http';
  import * as socket from './sockets/sockets-metodos';

  const httpServer = createServer(app);
  const io = socketIO(httpServer);

  function serverInit(){
    httpServer.listen(process.env.PORT || 3000, () => {
      console.log(chalk.bgBlueBright(`Servidor corriendo en el puerto : ${ process.env.PORT || 3000 }`));
    });

    // sockets
    io.on('connection', cliente => {

      console.log('Cliente conectado');

      socket.clienteConectado(io, cliente);
      socket.enviarUsuariosConectados(io, cliente);
      socket.salirUsuario(io, cliente);
      socket.streamData(io, cliente);


      cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
      });

    });

  };

  serverInit();
