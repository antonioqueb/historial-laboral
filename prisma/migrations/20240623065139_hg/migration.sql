/*
  Warnings:

  - You are about to drop the column `bonus` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `sickDays` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `vacationDays` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "bonus",
DROP COLUMN "salary",
DROP COLUMN "sickDays",
DROP COLUMN "vacationDays";
