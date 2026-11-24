const request = require('supertest');
const app = require('../index');

describe('Pruebas unitarias del Microservicio DevOps', () => {
    test('GET / debe responder con status 200 y mensaje esperado', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Microservicio activo en entorno Cloud simulado');
    });

    test('GET /health debe responder con status 200 y estado UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: 'UP' });
    });
});