/*
  Warnings:

  - You are about to drop the column `product_attribute_value_lookup_id` on the `product_attributes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_product_attribute_value_lookup_id_fkey";

-- AlterTable
ALTER TABLE "product_attributes" DROP COLUMN "product_attribute_value_lookup_id",
ADD COLUMN     "product_attribute_value" TEXT;
