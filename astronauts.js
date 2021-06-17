import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema }  from "@apollo/federation";

const port = 4001;

const typeDefs = gql`
  type Astronaut @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [ Astronaut ]
  }
`;

const resolvers = {
  Astronaut: {
    __resolveReference(ref) {
      return { id: '1111', name: 'Jaison' }
    }
  },
  Query:  {
    astronaut(_, { id }) {
      return { id: '1111', name: 'Jaison' }
    },
    astronauts() {
      return [ {id: '1111', name: 'Jaison' }, {id: '2222', name: 'Shenette'} ]
    }
  }
}

const server = new ApolloServer( {
  schema: buildFederatedSchema([{typeDefs, resolvers}])
})

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts Service ready at ${url}/graphql`);
});