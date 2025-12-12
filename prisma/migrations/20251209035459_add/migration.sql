-- AlterTable
ALTER TABLE "product_attribute_lookups" ADD COLUMN     "product_type_id" INTEGER;

-- AddForeignKey
ALTER TABLE "product_attribute_lookups" ADD CONSTRAINT "product_attribute_lookups_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
