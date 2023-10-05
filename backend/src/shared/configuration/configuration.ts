import * as Sentry from "@sentry/node";

export type Configuration = {
  server: { port: number };
  sentry: { dsn: string; release: string };
  redis: { url: string | undefined };
  env: string;
};

const defaults = {
  port: 3000,
  sentry: { release: "dev" },
  env: "dev",
};

export default (): Configuration => {
  return {
    server: { port: getPort() },
    sentry: { dsn: getSentryDsn(), release: getSentryRelease() },
    redis: { url: getRedisUrl() },
    env: process.env.NODE_ENV ?? defaults.env,
  };
};

function getPort(): number {
  const rawPort = process.env.PORT;
  if (!rawPort) return defaults.port;
  return parseInt(rawPort, 10);
}

function getSentryDsn(): string {
  const sentryDsn = process.env.SENTRY_DSN;
  if (!sentryDsn) throw new Error("No environment variable 'SENTRY_DSN' found");
  return sentryDsn;
}

function getSentryRelease(): string {
  const defaultSentryRelease = Sentry.getSentryRelease();
  if (!defaultSentryRelease) return defaults.sentry.release;
  return defaultSentryRelease;
}

function getRedisUrl() {
  return process.env.REDIS_URL;
}
