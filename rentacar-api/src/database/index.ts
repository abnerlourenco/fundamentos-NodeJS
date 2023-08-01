import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'rentacar',
  username: 'docker',
  password: 'admin',
  migrations: ['./src/database/migrations/*.ts']
});

connection.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
