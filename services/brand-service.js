import { prisma } from '../libs/prisma.ts'

export default {
    async getAllData(page = 1, per_page = 20, search) {
        const [brands, total] = await Promise.all([
            prisma.brands.findMany({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                skip: (page - 1) * per_page,
                take: per_page
            }),
            prisma.brands.count({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
            }),
        ])
        return { brands, total };
    },

    async getData(id) {
        const brand = await prisma.brands.findUnique({
            where: {
                id: id
            }
        });
        return brand;
    },

    async createData(data_insert) {
        const brand = await prisma.brands.create({
            data: data_insert
        });
        return brand;
    },

    async updateData(data_update, id) {
        const brand = await prisma.brands.update({
            where: {
                id: id
            },
            data: data_update
        });
        return brand;
    },

    async deleteData(id) {
        const deleted_brand = await prisma.brands.delete({
            where: {
                id: id
            },
        });
        return deleted_brand;
    },

}