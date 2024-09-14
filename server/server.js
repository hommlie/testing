const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/connection');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/hommlieserver', express.static('public'));

// const corsOptions = {
//   origin: ['https://tmhecom.xyz', 'https://www.tmhecom.xyz'],
//   credentials: true,
//   optionsSuccessStatus: 204
// };

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/hommlieserver/api/', apiRoutes);

// Catch-all route for 404
app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Sync the Sequelize models
sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Unable to connect the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server connected at ${PORT}`);
});
