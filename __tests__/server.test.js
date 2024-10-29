const request = require('supertest');
const app = require('../server.js');
const dbb = require('../data/database.js');

describe('Server and API Endpoints', () => {

    test('should respond with 404 for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: "Route not found" });
    });
});
