import { prisma } from '../libs/prisma.ts'

export default {
    async getAllData(page = 1, per_page = 20, search, product_type_id = null, brand_id = null) {
        let whereQuery = {
            name: {
                contains: search,
                mode: 'insensitive'
            },
        }
        if (product_type_id) {
            whereQuery.product_type_id = product_type_id;
        }
        if (brand_id) {
            whereQuery.brand_id = brand_id;
        }
        const [products, total] = await Promise.all([
            prisma.products.findMany({
                where: whereQuery,
                include: {
                    brands: true,
                    product_types: true,
                    product_attributes: {
                        include: {
                            product_attribute_lookups: true
                        }
                    },
                },
                skip: (page - 1) * per_page,
                take: per_page
            }),

            prisma.products.count({
                where: whereQuery,
            }),
        ])
        return { products, total };
    },

    async getData(id) {
        const products = await prisma.products.findUnique({
            where: {
                id: id
            },
            include: {
                brands: true,
                product_types: true,
                product_attributes: {
                    include: {
                        product_attribute_lookups: true
                    }
                },
            }
        });
        return products;
    },

    async createData(data_insert) {
        console.log(data_insert);
        const products = await prisma.products.create({
            data: data_insert
        });
        return products;
    },

    async updateData(data_update, id) {
        const products = await prisma.products.update({
            where: {
                id: id
            },
            data: data_update
        });
        return products;
    },

    async deleteData(id) {
        const deleted_products = await prisma.products.delete({
            where: {
                id: id
            },
        });
        return deleted_products;
    },

}