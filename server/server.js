import express  from 'express';
import connection from './db'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

var app = express()
app.use(express.json());
app.use(express.static('dist'));

const host = 'localhost';
const port = 3001;

app.use(cookieParser('secret key'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  const allowedOrigin = req.headers.origin || "http://localhost:5175";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


app.get('/admins', (req, res) => {
  const sql = 'SELECT * FROM admin';

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      res.send(results);
    }
  });
});

app.get('/workers', (req, res) => {
  const sql = 'SELECT * FROM worker';

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      res.send(results);
    }
  });
});

app.post('/set_adm_token', (req, res) => {
  const sql = `UPDATE admin SET token='${req.body.token}' WHERE name='${req.body.login}'`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      console.log(results);
      res.status(200).json({ success: true });
    }
  });
});

app.post('/setWorker', (req,res) => {
  const sql = `INSERT INTO \`worker\` (\`name\`, \`points\`, \`comments\`) VALUES ('${req.body.name}', 0, JSON_ARRAY())`

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      console.log(results);
      res.status(200).json({ success: true });
    }
  });
})

app.post('/delWorker', (req,res) => {
  const sql = `DELETE FROM \`worker\` WHERE \`name\` = '${req.body.name}'`

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      console.log(results);
      res.status(200).json({ success: true });
    }
  });
})

app.post('/addComment',(req,res) => {
  let sql = `UPDATE worker SET comments = JSON_INSERT(comments, '$[${req.body.i}]', JSON_OBJECT('adm', '${req.body.adminName}', 'status', ${req.body.status}, 'comment', '${req.body.textOfComment}', 'date', '${req.body.commentDate}', 'id', '${req.body.i}'))`;
  if (req.body.status === 1) {
    sql += ` , points = points + 1 WHERE name = '${req.body.workerName}'`;
  } else if (req.body.status === 0) {
    sql += ` , points = points - 1 WHERE name = '${req.body.workerName}'`;
  }
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
    } else {
      console.log(results);
      res.status(200).json({ success: true });
    }
  });
})

app.get('/get-cookie', (req, res) => {
  const final = req.cookies;
  res.send(final);
});

app.get('/set-cookie', (req, res) => {
  const token = req.query.token;
  res.cookie('token', `${token}`,{httpOnly: true});
  res.send('Set Cookie new');
});

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);


