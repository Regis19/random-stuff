const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    greeting: String
    interestingUrls: [String]
    firstName: String
    email: String
    pets: [String]
  }
`;

const data = {
  greeting: "Hello world",
  interestingUrls: [
    "https://kursreacta.pl",
    "https://64bites.com",
    "https://www.hltv.org/",
    "https://liquipedia.net/counterstrike/S-Tier_Tournaments"
  ],
  firstName: "John",
  email: "john@example.com",
  pets: ["Mittens", "Doggo", "Birb"]
};

const server = new ApolloServer({ typeDefs, rootValue: data });

server.listen({ port: 4000 }).then(result => console.log(result.url));
