import { createConnection } from 'typeorm';
import { Server } from './server';
import container from './shared/dependency-injection';

(async () => {
  await container.compile();

  console.log('starting connection of TypeOrm for api');
  await createConnection();

  console.log('loading Server...');
  const server = new Server();
  server.listen();
})();
