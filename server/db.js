import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'admin_panel'
});

export default connection;
