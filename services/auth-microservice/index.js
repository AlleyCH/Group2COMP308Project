const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Use cors
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
