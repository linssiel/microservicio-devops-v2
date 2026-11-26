'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('API HTTP', () => {
  describe('GET /health', () => {
    it('responde 200 con estado UP y versión', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body).toHaveProperty('version');
    });
  });

  describe('POST /api/discount', () => {
    it('calcula el descuento de una compra válida', async () => {
      const res = await request(app)
        .post('/api/discount')
        .send({ amount: 100, tier: 'PREMIUM' });
      expect(res.status).toBe(200);
      expect(res.body.finalAmount).toBe(95);
    });

    it('devuelve 400 si el monto no es número', async () => {
      const res = await request(app)
        .post('/api/discount')
        .send({ amount: 'abc', tier: 'VIP' });
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/amount/);
    });

    it('devuelve 400 si el tier es desconocido', async () => {
      const res = await request(app)
        .post('/api/discount')
        .send({ amount: 100, tier: 'GOLD' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/validate-order', () => {
    it('acepta una orden válida', async () => {
      const res = await request(app)
        .post('/api/validate-order')
        .send({
          customerEmail: 'cliente@duoc.cl',
          items: [{ sku: 'ABC-1', quantity: 1, price: 10 }],
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ valid: true, errors: [] });
    });

    it('reporta errores en una orden inválida', async () => {
      const res = await request(app).post('/api/validate-order').send({});
      expect(res.status).toBe(200);
      expect(res.body.valid).toBe(false);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
});
