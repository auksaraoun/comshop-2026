/*
  Warnings:

  - You are about to drop the column `detail_lookup_id` on the `product_attribute_value_lookups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_attribute_value_lookups" DROP COLUMN "detail_lookup_id";
