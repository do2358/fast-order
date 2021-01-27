const config = {
  production: {
    type: 'pg',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['migration/*.js'],
    synchronize: true,
  },

  development: {
    type: 'pg',
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '123456',
    database: process.env.PG_DATABASE || 'fast-order',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['migration/*.js'],
    synchronize: true,
  },
};
const env = process.env.NODE_ENV || 'development';
export = config[env];
