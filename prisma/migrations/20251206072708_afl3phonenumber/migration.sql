/*
  Warnings:

  - You are about to drop the column `phone_numebr` on the `customers` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "phone_numebr",
ADD COLUMN     "phone_number" VARCHAR(15) NOT NULL;
