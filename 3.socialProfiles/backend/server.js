import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';
import profileLinks from './profileLinks.json' with { type: "json" };

dotenv.config();
const PORT = parseInt(process.env.PORT) || 5000;

const schema = buildSchema(`
    type Query {
        link(name: String): String
    }
`);

const root = {
    link: ({ name }) => {
        return profileLinks[name] ? profileLinks[name] : '';
    },
};

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log(`GraphQL endpoint is running at http://localhost:${PORT}/graphql`);
});
// export default app;