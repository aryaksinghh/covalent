/*
  Warnings:

  - You are about to drop the column `tech` on the `grounds` table. All the data in the column will be lost.
  - Added the required column `category` to the `grounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stack` to the `grounds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grounds" DROP COLUMN "tech",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "stack" TEXT NOT NULL;
