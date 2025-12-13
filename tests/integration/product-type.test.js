import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../app.js';


describe('Product Type Tests', () => {

    describe('Product Type -> index', async () => {

        it('Case ไม่มี params', async () => {

            const response = await request(app)
                .get('/api/product-types')
                .expect(200);

            const { data, meta, success } = response.body;

            expect(Array.isArray(data)).toBe(true);
            data.forEach(d => {
                expect(d).toMatchObject({
                    "id": expect.any(Number),
                    "name": expect.any(String),
                    "created_at": expect.toBeISOTimestamp(),
                    "updated_at": expect.toBeISOTimestamp()
                })
            });

            expect(success).toBe(true);

            expect(typeof meta === 'object' && meta !== null).toBe(true);
            expect(meta).toMatchObject({
                "page": 1,
                "per_page": 30,
                "total": expect.any(Number),
                "total_page": expect.any(Number),
            })

        });

        it('Case มี page และ page = 2', async () => {

            const response = await request(app)
                .get('/api/product-types')
                .query({ "page": 2 })
                .expect(200);

            const { data, meta, success } = response.body;

            expect(Array.isArray(data)).toBe(true);
            data.forEach(d => {
                expect(d).toMatchObject({
                    "id": expect.any(Number),
                    "name": expect.any(String),
                    "created_at": expect.toBeISOTimestamp(),
                    "updated_at": expect.toBeISOTimestamp()
                })
            });

            expect(success).toBe(true);

            expect(typeof meta === 'object' && meta !== null).toBe(true);
            expect(meta).toMatchObject({
                "page": 2,
                "per_page": 30,
                "total": expect.any(Number),
                "total_page": expect.any(Number),
            })

        });

        it('Case มี per_page และ per_page = 40', async () => {

            const response = await request(app)
                .get('/api/product-types')
                .query({ "per_page": 40 })
                .expect(200);

            const { data, meta, success } = response.body;

            expect(Array.isArray(data)).toBe(true);
            data.forEach(d => {
                expect(d).toMatchObject({
                    "id": expect.any(Number),
                    "name": expect.any(String),
                    "created_at": expect.toBeISOTimestamp(),
                    "updated_at": expect.toBeISOTimestamp()
                })
            });

            expect(success).toBe(true);

            expect(typeof meta === 'object' && meta !== null).toBe(true);
            expect(meta).toMatchObject({
                "page": 1,
                "per_page": 40,
                "total": expect.any(Number),
                "total_page": expect.any(Number),
            })

        });

        it('Case มี s และ s = cpu', async () => {

            const response = await request(app)
                .get('/api/product-types')
                .query({ "s": 'cpu' })
                .expect(200);

            const { data, meta, success } = response.body;

            expect(Array.isArray(data)).toBe(true);
            data.forEach(d => {
                expect(d).toMatchObject({
                    "id": expect.any(Number),
                    "name": expect.containStringInsensitive('cpu'),
                    "created_at": expect.toBeISOTimestamp(),
                    "updated_at": expect.toBeISOTimestamp()
                })
            });

            expect(success).toBe(true);

            expect(typeof meta === 'object' && meta !== null).toBe(true);
            expect(meta).toMatchObject({
                "page": 1,
                "per_page": 30,
                "total": expect.any(Number),
                "total_page": expect.any(Number),
            })

        });

    });

});