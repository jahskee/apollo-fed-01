import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema }  from "@apollo/federation";

const port = 4002;

const typeDefs = gql`
  type Mission @key(fields: "id") {
    id: ID!
    crew: [Astronaut]
    designation: String!
    startDate: String
    endDate: String
  }

  extend type Astronaut @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    mission(id: ID!): Mission
    missions: [ Mission ]
  }
`;

const resolvers = {
  Mission: {
    crew(mission) {
      //return mission.crew.map(id => { __typename: "Astronaut", id })
      return [ {id: '1111', name: 'Jaison' }, {id: '2222', name: 'Shenette'} ]
    }
  },
  Query:  {
    mission (_, { id }) {
      return { id: '1111', designation: 'Mission1', startDate: "01/01/2020", endDate: "12/20/2020" }
    },
    missions() {
      return [ { id: '1111', designation: 'Mission1', startDate: "01/01/2020", endDate: "12/20/2020" }, 
               { id: '2222', designation: 'Mission2', startDate: "01/01/2020", endDate: "12/20/2020" }
     ]
    }
  }
}

const server = new ApolloServer( {
  schema: buildFederatedSchema([{typeDefs, resolvers}])
})

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts Service ready at ${url}/graphql`);
});