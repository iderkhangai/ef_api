import createError from 'http-errors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { ErrorHandler, handleError } from './helpers/ErrorHandler';
import httpLogger from './middlewares/httpLogger';
import router from './routes/programRoutes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
dotenv.config({ path: path.join(__dirname, '../.env') });
export const app: express.Application = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EF Program API v1',
      version: '1.0.0',
      description: 'EF Program API v1 documentation',
    },
  },
  apis: [
    `${__dirname}/routes/programRoutes.ts`
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());
// app.use(helmet());
app.use(express.static(__dirname + '/public'))
//api program's context url
app.use('/api/v1/programs', router);
// Serve index.html as the root page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// catch-all route handler for handling 404 errors.
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err: ErrorHandler, req: express.Request, res: express.Response) => {
  handleError(req, res, err);
});

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);