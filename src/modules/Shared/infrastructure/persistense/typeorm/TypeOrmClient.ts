import { Connection, createConnection } from 'typeorm';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { postgresConfig } from './typeOrmConfig';

export async function createTypeOrmClientConnection(): Promise<Connection> {
  const connection = await createConnection(getDataBaseConfig());
  return connection;
}

export function getDataBaseConfig() {
  if (process.env.NODE_ENV === 'production') {
    const productionConnection: PostgresConnectionOptions = {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
      ssl: {
        rejectUnauthorized: false
      }
      //synchronize: true,
      //logging: true
    };
    return productionConnection;
  }

  const devConnection: BetterSqlite3ConnectionOptions = {
    type: 'better-sqlite3',
    database: `${__dirname}/../../../../../../project.sql`,
    entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
    logging: true,
    synchronize: true
  };

  return devConnection;
}
