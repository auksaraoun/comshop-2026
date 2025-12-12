import { validationResult } from 'express-validator';
import { prisma } from '../libs/prisma.ts'

export const validProductType = async (product_type_id) => {

    const product_types = await prisma.product_types.findMany({
        select: { id: true },
    })

    const product_type_ids = product_types.map(p => p.id)

    if (!product_type_ids.includes(product_type_id)) {
        throw new Error('Incorrect Product type ID');
    }

    return true
}

export const validBrand = async (product_type_id) => {

    const brands = await prisma.brands.findMany({
        select: { id: true },
    })

    const product_type_ids = brands.map(p => p.id)

    if (!product_type_ids.includes(product_type_id)) {
        throw new Error('Incorrect brand ID');
    }

    return true
}

export const validProductAttrLookup = async (product_attr_value_id) => {

    const product_attr_value = await prisma.product_attribute_lookups.findMany({
        select: { id: true },
    })

    const product_attr_value_ids = product_attr_value.map(p => p.id)

    if (!product_attr_value_ids.includes(product_attr_value_id)) {
        throw new Error('Incorrect Product attr ID');
    }

    return true
}

export const validStoreProductAttr = async (product_attrs, { req }) => {
    const product_type_id = parseInt(req.body.product_type_id);

    const product_attr_values = await prisma.product_attribute_lookups.findMany({
        select: { id: true },
        where: {
            product_type_id: product_type_id
        }
    });

    const product_attr_value_id = product_attr_values.map(p => p.id);

    let not_found_attr_ids = [];

    product_attrs.forEach(product_attr => {
        if (!product_attr_value_id.includes(product_attr.product_attribute_lookup_id)) {
            not_found_attr_ids.push(product_attr.product_attribute_lookup_id);
        }
    });

    if (not_found_attr_ids.length > 0) {
        throw new Error(`not found product_attribute_lookup_id: ${not_found_attr_ids.join(', ')}`);
    }

    return true
}

export const validUpdateProductAttr = async (product_attrs, { req }) => {
    if (Array.isArray(product_attrs.upsert) && product_attrs.upsert.length > 0) {
        const product_id = parseInt(req.params.id);
        const product_type_id = parseInt(req.body.product_type_id);

        const [db_product_attr_ids, db_product_attr_lookup_ids] = await Promise.all([
            (async () => {
                const db_product_attrs = await prisma.product_attributes.findMany({
                    select: { id: true },
                    where: {
                        product_id: product_id,
                    }
                })
                const db_product_attr_ids = db_product_attrs.map(db_product_attr => db_product_attr.id);
                return db_product_attr_ids;
            })(),
            (async () => {
                const db_product_attr_lookups = await prisma.product_attribute_lookups.findMany({
                    select: { id: true },
                    where: {
                        product_type_id: product_type_id,
                    }

                })
                const db_product_attr_lookup_ids = db_product_attr_lookups.map(db_product_attr => db_product_attr.id);
                return db_product_attr_lookup_ids;
            })()
        ]);

        let not_found_attr_ids = [];
        let not_found_attr_lookups_ids = [];

        product_attrs.upsert.forEach(product_attr => {
            if (!product_attr.id) {
                return;
            }
            if (!db_product_attr_ids.includes(product_attr.id)) {
                not_found_attr_ids.push(product_attr.id);
            }
            if (!db_product_attr_lookup_ids.includes(product_attr.product_attribute_lookup_id)) {
                not_found_attr_lookups_ids.push(product_attr.product_attribute_lookup_id);
            }
        });

        if (not_found_attr_ids.length > 0) {
            throw new Error(`not found product_attribute_id: ${not_found_attr_ids.join(', ')}`);
        }

        if (not_found_attr_lookups_ids.length > 0) {
            throw new Error(`not found product_attribute_lookup_id: ${not_found_attr_lookups_ids.join(', ')}`);
        }

    }

    return true
}

export const handleValidateErrors = (req, res, next) => {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
        const messages = validate.errors.reduce((msgs, error) => {
            msgs.push(`${error.path} ${error.msg}`);
            return msgs;
        }, []);
        return res.status(400).json({
            success: false,
            messages: messages
        });
    }
    next();
}