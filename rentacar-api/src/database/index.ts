import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'rentacar',
  username: 'docker',
  password: 'admin'
});
