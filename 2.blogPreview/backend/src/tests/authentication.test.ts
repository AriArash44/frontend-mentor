// import express from 'express';
// import request from 'supertest';
// import dotenv from 'dotenv';
// import router from '../routes/userAuthentication.js';
// import https from 'https';
// import fs from 'fs';
// import cookieParser from 'cookie-parser';

// dotenv.config();
// process.env.ACCESS_SECRET_KEY = 'test_access';
// process.env.REFRESH_SECRET_KEY = 'test_refresh';

// jest.mock('../utils/envValidator.js', () => ({
//     __esModule: true,
//     default: jest.fn(),
// }));

// jest.mock('../utils/tokenChecker.js', () => ({
//     __esModule: true,
//     default: jest.fn(),
// }));

// jest.mock('../utils/tokenGenerator.js', () => ({
//     __esModule: true,
//     default: jest.fn(),
// }));

// import envValidator from '../utils/envValidator.js';
// import tokenChecker from '../utils/tokenChecker.js';
// import tokenGenerator from '../utils/tokenGenerator.js';

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use('/api/authentication', router);

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const server = https.createServer(
//     {
//         key: fs.readFileSync('../localhost-key.pem'),
//         cert: fs.readFileSync('../localhost-cert.pem'),
//     },
//     app
// );

// let serverInstance: any;
// let baseUrl: string;

// beforeAll(async () => {
//     await new Promise((resolve) => {
//         serverInstance = server.listen(3000, () => {
//             baseUrl = `https://localhost:3000`;
//             console.log(`HTTPS server running on ${baseUrl}`);
//             resolve(true);
//         });
//     });
// });

// afterAll(async () => {
//     await serverInstance.close();
// });

// beforeEach(() => {
//     jest.resetAllMocks();
// });
  
// describe('Authentication routes', () => {
//     test('should return access and refresh token cookies on success', async () => {
//         (envValidator as jest.Mock).mockImplementation(() => {});
//         (tokenGenerator as jest.Mock)
//             .mockImplementationOnce(() => 'access123')
//             .mockImplementationOnce(() => 'refresh123');
//         const response = await request(baseUrl).get(
//             '/api/authentication/login/john'
//         );
//         expect(response.status).toBe(200);
//         expect(response.headers['set-cookie']).toEqual(
//             expect.arrayContaining([
//                 expect.stringContaining('access-token=access123'),
//                 expect.stringContaining('refresh-token=refresh123'),
//             ])
//         );
//     });

//     test('should return 500 if envValidator throws an error', async () => {
//         (envValidator as jest.Mock).mockImplementation(() => {
//             throw new Error('Env Error');
//         });
//         const response = await request(baseUrl).get(
//             '/api/authentication/login/john'
//         );
//         expect(response.status).toBe(500);
//         expect(response.body).toEqual({ message: 'Env Error' });
//     });

//     test('should return 401 if username doesnt exist in access-token cookie', async () => {
//         (tokenChecker as jest.Mock).mockReturnValue({});
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['access-token=some_valid_token_without_username']);
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: 'Username not found in token',
//         });
//     });

//     test('should return 401 if access-token is Invalid', async () => {
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['access-token=Invalid_access_token']);
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: 'Invalid or expired token',
//         });
//     });

//     test('should return 500 if envValidator throws an error', async () => {
//         (envValidator as jest.Mock).mockImplementation(() => {
//             throw new Error('Env Error');
//         });
//         const response = await request(baseUrl).get(
//             '/api/authentication/username'
//         );
//         expect(response.status).toBe(500);
//         expect(response.body).toEqual({ message: 'Env Error' });
//     });

//     test('should return 200 with the username when access token is valid', async () => {
//         (tokenChecker as jest.Mock).mockReturnValue({ username: 'john' });
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['access-token=some-valid-token']);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ username: 'john' });
//     });

//     test('should return 401 if access token is not provided and refresh token is invalid', async () => {
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['refresh-token=Invalid-refresh-token']);
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: 'Invalid or expired token',
//         });
//     });

//     test('should return 401 if access token is not provided and username doesnt exist in refresh-token', async () => {
//         (tokenChecker as jest.Mock).mockReturnValue({});
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['refresh-token=some-valid-token']);
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: 'Username not found in token',
//         });
//     });

//     test('should return 200 with the username and new access-token when access token id not provided but refresh token is valid', async () => {
//         (tokenChecker as jest.Mock).mockReturnValue({ username: 'john' });
//         (tokenGenerator as jest.Mock).mockReturnValue('newAccess123');
//         const response = await request(baseUrl)
//             .get('/api/authentication/username')
//             .set('Cookie', ['access-token=some-valid-token']);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ username: 'john' });
//         expect(response.headers['set-cookie']).toEqual(
//             expect.arrayContaining([
//                 expect.stringContaining('access-token=newAccess123'),
//             ])
//         );
//     });

//     test('should return 401 if no access token and refresh token waas provided', async () => {
//         const response = await request(baseUrl).get(
//             '/api/authentication/username'
//         );
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual('Invalid or expired token');
//     });

//     test('should clear cookies and return 200 on logout', async () => {
//         const response = await request(baseUrl)
//             .get('/api/authentication/logout')
//             .set('Cookie', [
//                 'access-token=anyValue',
//                 'refresh-token=anyValue',
//             ]);
//         expect(response.status).toBe(200);
//         expect(response.body).toBe('ok');
//         expect(response.headers['set-cookie']).toEqual(
//             expect.arrayContaining([
//                 expect.stringContaining('access-token='),
//                 expect.stringContaining('refresh-token='),
//                 expect.stringContaining('Max-Age=0'),
//             ])
//         );
//     });
// });