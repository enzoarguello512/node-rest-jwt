import app from './app';
import config from 'config';
import sourceMapSupport from 'source-map-support';
import debug from 'debug';

// Enable stack traces translation to typescript
sourceMapSupport.install();

const debugLog: debug.IDebugger = debug('server');
const port = config.get<number>('server.port');
const domain = config.get<string>('server.domain');
const startMessage = `Server running at http://${domain}:${port}`;

app.listen(port, () => {
  debugLog(startMessage);
  console.log(startMessage);
});
