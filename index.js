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
    counter: Int
    pi: Float
    isTodayFriday: Boolean
    randomCoinTossesUntilTrue: [Boolean]
    e: Float
    eulersSeries: [Float]
  }
`;

let counter = 0;
const counterIncrement = () => ++counter;

const rootValue = () => {
  const getRandmDicteThrow = (sides) => Math.ceil(Math.random() * sides);
  const today = new Date();
  const randomCoinTosses = () => Math.random() > 0.5;
  const getRandomCoinTossesUntilTrue = () => {
    const result = [];
    do {
      result.push(randomCoinTosses());
    } while (!result[result.length - 1]);

    return result;
  };
  const getElementEulersSeries = (n) => {
    n = n - 1;
    return Math.pow(1 + 1 / n, 2);
  };
  const getEulersSeries = (count = 1002) => {
    const result = [];
    for (let i = 2; i < count; i++) {
      result.push(getElementEulersSeries(i));
    }
    return result;
  };

  const data = {
    greeting: "Hello world",
    interestingUrls: [
      "https://kursreacta.pl",
      "https://64bites.com",
      "https://www.hltv.org/",
      "https://liquipedia.net/counterstrike/S-Tier_Tournaments",
    ],
    firstName: "John",
    email: "john@example.com",
    pets: ["Mittens", "Doggo", "Birb"],
    randomDiceThrow: getRandmDicteThrow(6),
    counter,
    pi: Math.PI,
    isTodayFriday: today.getDay() === 5,
    randomCoinTossesUntilTrue: getRandomCoinTossesUntilTrue(),
    e: Math.E,
    eulersSeries: getEulersSeries(),
  };

  return data;
};

const counterIncrementPlugin = {
  requestDidStart(requestContext) {
    return {
      executionDidStart() {
        if (requestContext.operationName !== "IntrospectionQuery") {
          counterIncrement();
        }
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  rootValue,
  playground: true,
  introspection: true,
  plugins: [counterIncrementPlugin],
});

server.listen({ port: PORT }).then((result) => console.log(result.url));
