/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `trainees` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `trainers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "trainees" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "trainers" DROP COLUMN "isDeleted";
