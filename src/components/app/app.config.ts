import config from 'config';

const port = config.get<number>('server.port');
const domain = config.get<string>('server.domain');

let allowedOrigins = [
  // 'https://www.yoursite.com',
  'https://morfi-react.vercel.app', // remote deploy frontend (react app)
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins = allowedOrigins.concat([
    // 'http://127.0.0.1:5500',
    // 'http://localhost:3500',
    'http://localhost:3000', // frontend (react app)
    `http://${domain}:${port}`, // this server (backend)
  ]);
}

export default allowedOrigins;
