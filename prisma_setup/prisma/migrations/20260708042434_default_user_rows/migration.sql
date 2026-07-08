/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experience` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT ' ',
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT ' ',
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT ' ',
ALTER COLUMN "experience" SET NOT NULL,
ALTER COLUMN "experience" SET DEFAULT ' ',
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT ' ';
