import { prisma } from '../libs/prisma.ts'

export default {
    async getAllData(page = 1, per_page = 20, search) {
        const [product_types, total] = await Promise.all([
            prisma.product_types.findMany({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                skip: (page - 1) * per_page,
                take: per_page
            }),
            prisma.product_types.count({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
            }),
        ])
        return { product_types, total };
    },

    async getData(id) {
        const product_type = await prisma.product_types.findUnique({
            where: {
                id: id
            }
        });
        return product_type;
    },

    async createData(data_insert) {
        const product_type = await prisma.product_types.create({
            data: data_insert
        });
        return product_type;
    },

    async updateData(data_update, id) {
        const product_type = await prisma.product_types.update({
            where: {
                id: id
            },
            data: data_update
        });
        return product_type;
    },

    async deleteData(id) {
        const deleted_product_type = await prisma.product_types.delete({
            where: {
                id: id
            },
        });
        return deleted_product_type;
    },

}