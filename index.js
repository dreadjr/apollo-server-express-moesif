const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => {
      console.log("resolvers:hello");
      return 'Hello world!';
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const moesifExpress = require('moesif-express');

const options = {
  debug: true,
  applicationId: "<applicationId>",
};

const moesifMiddleware = moesifExpress(options);
moesifMiddleware.startCaptureOutgoing();
app.use(moesifMiddleware);

const cors = {
  origin: '*'
};
const path = '/';

server.applyMiddleware({ app, path, cors });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);