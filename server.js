const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(
    express.json({
      extended: false,
    })
  );
  if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
  }

//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   });
  app.get('/', (req, res) => res.send('api running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/findbarber', require('./routes/api/findbarber'));
app.use('/api/scheduler', require('./routes/api/scheduler'));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
