const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
//acts like massive to run graphql instance
const graphqlHTTP = require("express-graphql");
//root resolver.. function that collects data
const { schema, root } = require(`${__dirname}/graphql/schema`);

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema, // pass schema
    rootValue: root, // pass root
    graphiql: true // testing
  })
);

app.post(
  "/graphql",
  graphqlHTTP({
    schema, // pass schema
    rootValue: root, // pass root
    graphiql: false // testing
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
