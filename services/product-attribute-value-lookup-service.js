import { log } from 'node:console';
import { prisma } from '../libs/prisma.ts'

export default {
    async getAllData(page = 1, per_page = 20, search, product_attribute_lookup_id = null) {
        let whereQuery = {
            value: {
                contains: search,
                mode: 'insensitive'
            },
        }
        if (product_attribute_lookup_id) {
            whereQuery.product_attribute_lookup_id = product_attribute_lookup_id;
        }
        const [product_attrs, total] = await Promise.all([
            prisma.product_attribute_value_lookups.findMany({
                where: whereQuery,
                skip: (page - 1) * per_page,
                take: per_page
            }),

            prisma.product_attribute_value_lookups.count({
                where: whereQuery,
            }),
        ])
        return { product_attrs, total };
    },

    async getData(id) {
        const brand = await prisma.product_attribute_value_lookups.findUnique({
            where: {
                id: id
            }
        });
        return brand;
    },

    async createData(data_insert) {
        const brand = await prisma.product_attribute_value_lookups.create({
            data: data_insert
        });
        return brand;
    },

    async updateData(data_update, id) {
        const brand = await prisma.product_attribute_value_lookups.update({
            where: {
                id: id
            },
            data: data_update
        });
        return brand;
    },

    async deleteData(id) {
        const deleted_brand = await prisma.product_attribute_value_lookups.delete({
            where: {
                id: id
            },
        });
        return deleted_brand;
    },

}