-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "data_id" INTEGER NOT NULL,
    "data_title" TEXT NOT NULL,
    "data_image" TEXT NOT NULL,
    "data_type" TEXT NOT NULL,
    "data_origin_country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_data_id_key" ON "Favorites"("data_id");
