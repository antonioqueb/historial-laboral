/*
  Warnings:

  - A unique constraint covering the columns `[socialSecurityNumber]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CURP]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RFC]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clabeNumber]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CURP` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RFC` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAccountNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bonus` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clabeNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractType` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationLevel` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyPhone` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickDays` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialSecurityNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacationDays` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShift` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "CURP" TEXT NOT NULL,
ADD COLUMN     "RFC" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bankAccountNumber" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "bonus" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "clabeNumber" TEXT NOT NULL,
ADD COLUMN     "contractType" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "educationLevel" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emergencyContact" TEXT NOT NULL,
ADD COLUMN     "emergencyPhone" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sickDays" INTEGER NOT NULL,
ADD COLUMN     "socialSecurityNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vacationDays" INTEGER NOT NULL,
ADD COLUMN     "workShift" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_socialSecurityNumber_key" ON "Employee"("socialSecurityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_CURP_key" ON "Employee"("CURP");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_RFC_key" ON "Employee"("RFC");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_clabeNumber_key" ON "Employee"("clabeNumber");
