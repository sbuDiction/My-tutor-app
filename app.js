const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const PORT = process.env.PORT || 5000;
const exphbs = require('express-handlebars');
const pg = require('pg');

const { Pool } = pg;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://diction:19970823@localhost:5432/tutor_database';

const pool = new Pool({
  connectionString,
  ssl: useSSL,
});
// view engine setup
const bodyParser = require('body-parser');



app.use(cookieParser('secret'));
app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true,
    }),
);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handlebarSetup = exphbs({
  partialsDir: './views/partials',
  viewPath: './views',
  layoutsDir: './views/layouts',
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(flash());
const Routes = require('./routes/index');
const Function = require('./My-tutor-manager/my_tutor')
const instance_for_my_tutor = Function(pool)
const instance_for_routes = Routes(instance_for_my_tutor)

app.get('/', instance_for_routes.index_route);
app.post('/build', instance_for_routes.build);
app.get('/tutor_builder', instance_for_routes.tutor_builder);
app.get('/data', instance_for_routes.get)

app.listen(PORT, () => {
  console.log('App started at port:', PORT);
});