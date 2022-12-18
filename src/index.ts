import app from './app';
import config from 'config';
import sourceMapSupport from 'source-map-support';
import debug from 'debug';
import cluster from 'cluster';
import os from 'os';

// Enable stack traces translation to typescript
sourceMapSupport.install();

const numCpu = os.cpus().length;

const debugLog: debug.IDebugger = debug('server');
const port = config.get<number>('server.port');
const domain = config.get<string>('server.domain');
const mode = config.get<string>('server.mode');
const startMessage = `🚀 Server running at http://${domain}:${port}`;
const docsMessage = `📄 Docs available at http://${domain}:${port}/docs`;

if (cluster.isPrimary && mode === 'cluster') {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    debugLog(startMessage);
    console.log(startMessage);
    console.log(docsMessage);
  });
}
