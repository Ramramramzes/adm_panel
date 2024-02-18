import express  from 'express';
import { createConnection } from 'mysql';

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить доступ с любого источника
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешить различные методы запросов
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешить различные заголовки
  next();
});


const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'admin_panel'
});

connection.connect();

app.get('/admins', (req, res) => {
  const sql = 'SELECT * FROM admin';

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      res.json(results); // Отправляем данные в формате JSON
    }
  });
});



app.listen(3001, () => {
  console.log(`Сервер запущен на порту ${3001}`);
});
