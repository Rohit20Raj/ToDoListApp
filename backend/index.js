const express = require('express')
const app = express()
const connectToMongo = require('./db');
const cors = require('cors');
const port = process.env.PORT || 5000;

connectToMongo();

app.use(cors());
app.use(express.json());
// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  if (port === 5000) {
    console.log(`Done'n'Dusted listening on: http://localhost:${port}`)
  } else{
    console.log(`Done'n'Dusted listening on port ${port}`)
  }
})