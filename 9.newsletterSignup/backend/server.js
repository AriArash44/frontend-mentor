import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();
const PORT = parseInt(process.env.PORT) || 5000;

//We created this endpoint solely to test error handling on the frontend, so it randomly returns either success or an error.
const schema = buildSchema(`
    type Query {
        signup(email: String): String
    }
`);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const root = {
    signup: async ({ email }) => {
        const isSuccess = Math.random() < 0.7;
        if (isSuccess) {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Signup Confirmation',
                text: 'This is just a sample email for challenge newsletteer-signup from frontend-mentor'
            };
            try {
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${email}`);
            } catch (error) {
                console.error(`Error sending email to ${email}:`, error);
            }
            return `A confirmation email has been sent to ${email}. Please open it and click the button inside to confirm your subscription.`;
        } else {
            throw new Error("Signup failed: A random error occurred during signup. Please try again later.");
        }
    }
};

const app = express();
app.use(cors());

app.use('/graphql', createHandler({
    schema,
    rootValue: root
}));

// app.listen(PORT, () => {
//     console.log(`GraphQL endpoint is running at http://localhost:${PORT}/graphql`);
// });
export default app;
