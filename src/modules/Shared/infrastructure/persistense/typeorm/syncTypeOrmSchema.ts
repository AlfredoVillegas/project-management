import { createConnection } from 'typeorm';
import { getDataBaseConfig } from './TypeOrmClient';

async function syncTypeOrmSchema() {
  const config = getDataBaseConfig();

  const connection = await createConnection({
    ...config,
    synchronize: true
  });

  await connection.close();
}

(async () => {
  await syncTypeOrmSchema();
})();
