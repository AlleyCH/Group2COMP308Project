// schema.js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Define UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

// Placeholder RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve(parent, args) {
        return 'Hello world!';
      }
    },
  }
});

// Define RootMutation
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const userExists = await User.findOne({ username: args.username });
        if (userExists) {
          throw new Error('Username already taken');
        }

        const user = new User({
          username: args.username,
          password: args.password,
        });

        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });

        return { ...user._doc, id: user.id, token };
      },
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          throw new Error('User does not exist');
        }

        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect');
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });

        return { ...user._doc, id: user.id, token };
      },
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
