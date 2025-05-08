import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = parseInt(process.env.PORT) || 5000;

//We created this endpoint solely to test error handling on the frontend, so it randomly returns either success or an error.
const schema = buildSchema(`
    type Query {
        signup(email: String): Boolean
    }
`);

const root = {
    signup: ({ email }) => {
        return Math.random() > 0.3;
    }
};

const app = express();
app.use(cors());

app.use('/graphql', createHandler({ schema, rootValue: root }));

// app.listen(PORT, () => {
//     console.log(`GraphQL endpoint is running at http://localhost:${PORT}/graphql`);
// });
export default app;