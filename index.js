const { ApolloServer, gql } = require("apollo-server");

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    greeting: String
    interestingUrls: [String]
    firstName: String
    email: String
    pets: [String]
    randomDiceThrow: Int
  }
`;

const rootValue = () => {
  const getRandmDicteThrow = sides => Math.ceil(Math.random() * sides);

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
    pets: ["Mittens", "Doggo", "Birb"],
    randomDiceThrow: getRandmDicteThrow(6)
  };

  return data;
};

const server = new ApolloServer({
  typeDefs,
  rootValue,
  playground: true,
  introspection: true
});

server.listen({ port: PORT }).then(result => console.log(result.url));
