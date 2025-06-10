/*
  Warnings:

  - You are about to drop the `flights` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_userId_fkey";

-- DropTable
DROP TABLE "flights";

-- CreateTable
CREATE TABLE "logbook" (
    "id" SERIAL NOT NULL,
    "unique" TEXT NOT NULL,
    "pilotId" INTEGER,
    "crewId" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3),
    "depAd" TEXT,
    "arrAd" TEXT,
    "offBlock" TIMESTAMP(3),
    "onBlock" TIMESTAMP(3),
    "aircraftType" TEXT,
    "aircraftRegistration" TEXT,
    "picName" TEXT,
    "total" INTEGER,
    "dayTime" INTEGER,
    "nightTime" INTEGER,
    "sepVfr" INTEGER,
    "sepIfr" INTEGER,
    "meVfr" INTEGER,
    "meIfr" INTEGER,
    "picTime" INTEGER,
    "copilotTime" INTEGER,
    "multiPilotTime" INTEGER,
    "instructorTime" INTEGER,
    "dualTime" INTEGER,
    "simTime" INTEGER,
    "simInstructorTime" INTEGER,
    "landDay" INTEGER,
    "landNight" INTEGER,
    "rmks" TEXT,
    "flightTrack" JSONB[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "logbook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logbook_unique_key" ON "logbook"("unique");

-- AddForeignKey
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
