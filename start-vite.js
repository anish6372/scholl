import { createServer } from 'vite';

createServer().then((server) => {
  return server.listen();
}).then((server) => {
  console.log('Vite server is running at:', server.config.server.host);
}).catch((err) => {
  console.error('Failed to start Vite server:', err);
});