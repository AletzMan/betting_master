-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "predictionIds" TEXT[],
    "season" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "tournament" TEXT NOT NULL,
    "userInfoId" TEXT,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "matchDay" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not started',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchDay" (
    "id" SERIAL NOT NULL,
    "matches" TEXT[],
    "season" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isFinishGame" BOOLEAN NOT NULL DEFAULT false,
    "results" TEXT[] DEFAULT ARRAY['-', '-', '-', '-', '-', '-', '-', '-', '-']::TEXT[],

    CONSTRAINT "MatchDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bet_userInfoId_key" ON "Bet"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
