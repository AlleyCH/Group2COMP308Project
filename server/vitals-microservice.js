// vitals-microservice.js

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/vitals-service-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Vitals schema definition
const vitalSchema = new Schema({
  vitalName: String, // Adjusted from 'name' to 'vitalName'
  vitalValue: Number, // Adjusted from 'value' to 'vitalValue'
  vitalUnit: String, // Adjusted from 'unit' to 'vitalUnit'
});

const Vital = model('Vital', vitalSchema);

// GraphQL schema
const typeDefs = gql`
  type Vital {
    id: ID!
    vitalName: String! # Adjusted from 'name' to 'vitalName'
    vitalValue: Float! # Adjusted from 'value' to 'vitalValue'
    vitalUnit: String! # Adjusted from 'unit' to 'vitalUnit'
  }

  input VitalInput {
    vitalName: String!
    vitalValue: Float!
    vitalUnit: String!
  }

  type Query {
    vitals: [Vital]
  }

  type Mutation {
    addVital(vital: VitalInput!): Vital
    updateVital(id: ID!, vital: VitalInput!): Vital
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    vitals: async (_, __, { user }) => {
      if (!user) throw new Error('You must be logged in');
      return await Vital.find({});
    },
  },
  Mutation: {
    addVital: async (_, { vital }, { user }) => {
      //if (!user) throw new Error('You must be logged in');
      const newVital = new Vital(vital);
      await newVital.save();
      return newVital;
    },
    updateVital: async (_, { id, vital }, { user }) => {
      //if (!user) throw new Error('You must be logged in');
      const updatedVital = await Vital.findByIdAndUpdate(id, vital, { new: true });
      if (!updatedVital) throw new Error('Vital not found');
      return updatedVital;
    },
  },
};

// Initialize express and configure middleware
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true,
}));
app.use(cookieParser());

// Create and start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.cookies['token'];
    if (token) {
      try {
        const user = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        return { user };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
  app.listen({ port: 4002 }, () => console.log(`🚀 Server ready at http://localhost:4002${server.graphqlPath}`));
});
