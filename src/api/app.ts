import { config } from 'dotenv';
import { createTypeOrmClientConnection } from '../modules/Shared/infrastructure/persistense/typeorm/TypeOrmClient';
import { registerSubscribersEvents } from './registerSubscribersEvents';
import { Server } from './server';
import container from './shared/dependency-injection';

(async () => {
  config();

  console.log('compiling Container dependencys');
  await container.compile();

  console.log('starting connection of TypeOrm for api');
  await createTypeOrmClientConnection();

  console.log('register Subscribers Events...');
  registerSubscribersEvents();

  console.log('loading Server...');
  const server = new Server();
  server.listen();
})();
