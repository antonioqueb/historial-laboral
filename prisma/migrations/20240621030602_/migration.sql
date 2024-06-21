/*
  Warnings:

  - A unique constraint covering the columns `[rfc]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "capitalSocial" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "certificaciones" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "domicilioFiscalCalle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domicilioFiscalCodigoPostal" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domicilioFiscalColonia" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domicilioFiscalEstado" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domicilioFiscalMunicipio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "domicilioFiscalNumero" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "giroActividadEconomica" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nombreComercial" TEXT DEFAULT '',
ADD COLUMN     "objetoSocial" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "razonSocial" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "registrosImss" TEXT DEFAULT '',
ADD COLUMN     "registrosInfonavit" TEXT DEFAULT '',
ADD COLUMN     "representanteLegalCurp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "representanteLegalNombre" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "rfc" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Company_rfc_key" ON "Company"("rfc");
