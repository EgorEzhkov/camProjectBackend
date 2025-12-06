DROP INDEX IF EXISTS "Tariff_name_key";

CREATE UNIQUE INDEX "Tariff_name_ci_unique"
ON "Tariff"(LOWER("name"));