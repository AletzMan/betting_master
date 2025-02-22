-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "matches" TEXT[],
    "season" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "tournament" TEXT NOT NULL,
    "userInfoId" TEXT,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "home" TEXT NOT NULL,
    "away" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "seasson" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "betId" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "account" INTEGER NOT NULL,
    "total_bets" INTEGER NOT NULL,
    "bets_won" INTEGER NOT NULL,
    "finals_won" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,
    "notifications" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bet_userInfoId_key" ON "Bet"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
