/*
  Warnings:

  - The values [indent,hot] on the enum `Badge` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `admin_user_id` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `bathrooms` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `building_area` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `floors` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `land_area` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `house_types` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `units` table. All the data in the column will be lost.
  - You are about to drop the column `facing` on the `units` table. All the data in the column will be lost.
  - The `status` column on the `units` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `house_facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wall_colors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `audit_logs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `payment_method` on the `leads` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Badge_new" AS ENUM ('ready', 'on_progress', 'out_of_stock');
ALTER TABLE "house_types" ALTER COLUMN "badge" TYPE "Badge_new" USING ("badge"::text::"Badge_new");
ALTER TYPE "Badge" RENAME TO "Badge_old";
ALTER TYPE "Badge_new" RENAME TO "Badge";
DROP TYPE "public"."Badge_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "house_facilities" DROP CONSTRAINT "house_facilities_house_type_id_fkey";

-- DropForeignKey
ALTER TABLE "house_facilities" DROP CONSTRAINT "house_facilities_icon_media_id_fkey";

-- DropForeignKey
ALTER TABLE "media_library" DROP CONSTRAINT "media_library_uploaded_by_id_fkey";

-- DropForeignKey
ALTER TABLE "wall_colors" DROP CONSTRAINT "wall_colors_house_type_id_fkey";

-- DropIndex
DROP INDEX "audit_logs_admin_user_id_idx";

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "admin_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "entity_id" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "house_types" DROP COLUMN "bathrooms",
DROP COLUMN "bedrooms",
DROP COLUMN "building_area",
DROP COLUMN "floors",
DROP COLUMN "land_area",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "house_type_variant_id" INTEGER,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "media_library" ALTER COLUMN "uploaded_by_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "units" DROP COLUMN "block",
DROP COLUMN "facing",
ADD COLUMN     "bathrooms" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bedrooms" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "floors" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "house_type_variant_id" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'available';

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "admin_users";

-- DropTable
DROP TABLE "house_facilities";

-- DropTable
DROP TABLE "wall_colors";

-- DropEnum
DROP TYPE "AdminRole";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "UnitStatus";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_type_variants" (
    "id" SERIAL NOT NULL,
    "house_type_id" INTEGER NOT NULL,
    "building_area" INTEGER NOT NULL,
    "land_area" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "house_type_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_status_options" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "unit_status_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_images" (
    "id" SERIAL NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "media_id" INTEGER,
    "url" VARCHAR(500) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "unit_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_options" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "payment_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "house_type_variants_house_type_id_idx" ON "house_type_variants"("house_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "house_type_variants_house_type_id_building_area_land_area_key" ON "house_type_variants"("house_type_id", "building_area", "land_area");

-- CreateIndex
CREATE UNIQUE INDEX "unit_status_options_label_key" ON "unit_status_options"("label");

-- CreateIndex
CREATE INDEX "unit_images_unit_id_idx" ON "unit_images"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_options_label_key" ON "payment_options"("label");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "units_house_type_variant_id_idx" ON "units"("house_type_variant_id");

-- CreateIndex
CREATE INDEX "units_status_idx" ON "units"("status");

-- AddForeignKey
ALTER TABLE "media_library" ADD CONSTRAINT "media_library_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_type_variants" ADD CONSTRAINT "house_type_variants_house_type_id_fkey" FOREIGN KEY ("house_type_id") REFERENCES "house_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_house_type_variant_id_fkey" FOREIGN KEY ("house_type_variant_id") REFERENCES "house_type_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_images" ADD CONSTRAINT "unit_images_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_images" ADD CONSTRAINT "unit_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_house_type_variant_id_fkey" FOREIGN KEY ("house_type_variant_id") REFERENCES "house_type_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
