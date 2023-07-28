import 'dotenv/config';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import {createRequestHandler} from '@remix-run/express';
import {broadcastDevReady} from '@remix-run/node';

const BUILD_DIR = path.join(process.cwd(), 'build');
const build = require(BUILD_DIR);
const isDev = process.env.NODE_ENV === 'development';

function createServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(morgan('tiny'));
  // Remix fingerprints its assets so we can cache forever.
  app.use(
    '/build',
    express.static('public/build', {immutable: true, maxAge: '1y'}),
  );
  app.use(express.static('public', {maxAge: '1h'}));

  app.all(
    '*',
    createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
      getLoadContext() {
        return {
          openaiApiKey: process.env.OPENAI_API_KEY,
        };
      },
    }),
  );

  app.listen(3000, () => {
    console.log('Server is listening on port 3000');

    if (isDev) {
      broadcastDevReady(build);
    }
  });
}

createServer();
