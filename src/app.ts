
  import express,{Application} from 'express';
  import { urlencoded, json } from 'body-parser';
  import helmet from 'helmet';

  const app : Application = express();

  // import rutas
  import routesPrincipal from './routes/routes-principal';

  // middlewares
  app.use(helmet());
  app.use(urlencoded({ extended : true }));
  app.use(json());

  // CORS
  app.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Authorization, Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  	next();
  });

  // rutas en si
  app.use('/api', routesPrincipal);

  export default app;
