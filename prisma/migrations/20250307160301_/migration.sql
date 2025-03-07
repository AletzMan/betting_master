-- CreateTable
CREATE TABLE "bets" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "predictionIds" TEXT[],
    "season" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "tournament" TEXT NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "matchDay" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchdays" (
    "id" SERIAL NOT NULL,
    "matches" TEXT[],
    "season" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isFinishGame" BOOLEAN NOT NULL DEFAULT false,
    "results" TEXT[] DEFAULT ARRAY['-', '-', '-', '-', '-', '-', '-', '-', '-']::TEXT[],

    CONSTRAINT "matchdays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "matchNumber" INTEGER NOT NULL,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "color" TEXT,
    "account" TEXT,
    "total_bets" INTEGER NOT NULL DEFAULT 0,
    "bets_won" INTEGER NOT NULL DEFAULT 0,
    "finals_won" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notifications" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bets_predictionIds_key" ON "bets"("predictionIds");

-- CreateIndex
CREATE UNIQUE INDEX "matchdays_day_key" ON "matchdays"("day");

-- CreateIndex
CREATE UNIQUE INDEX "predictions_id_key" ON "predictions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_day_fkey" FOREIGN KEY ("day") REFERENCES "matchdays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_matchDay_fkey" FOREIGN KEY ("matchDay") REFERENCES "matchdays"("day") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_id_fkey" FOREIGN KEY ("id") REFERENCES "bets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
