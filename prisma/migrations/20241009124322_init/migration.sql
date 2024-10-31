-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "expiresAt" SET DEFAULT (now() AT TIME ZONE 'utc') + INTERVAL '365 days';
