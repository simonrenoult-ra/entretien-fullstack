import { LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import pino from "pino";

import { Configuration } from "../configuration/configuration";
import { ContextService } from "../context";

type Dictionary = { [key: string]: unknown };

type LoggingContent = Dictionary & {
  correlationId: string;
  requestId: string;
};

type InfoLoggingContent = Dictionary & { event: string };

type ErrorLoggingContent = Dictionary & { error: Error };

export interface TortueLogger {
  debug(message: string, optionalParams?: Dictionary): void;

  info(message: string, optionalParams?: InfoLoggingContent): void;

  log(message: string, optionalParams?: Dictionary): void;

  warn(message: string, optionalParams?: Dictionary): void;

  error(message: string, optionalParams?: ErrorLoggingContent): void;

  fatal(message: string, optionalParams?: Dictionary): void;

  trace(message: string, optionalParams: Dictionary): void;
}

export class ImplTortueLogger implements LoggerService, TortueLogger {
  private logger: pino.Logger;

  constructor(
    private readonly configService: ConfigService<Configuration>,
    private readonly contextService: ContextService,
  ) {
    this.logger = pino(this.configure());
  }

  debug(message: string, optionalParams?: Dictionary): void {
    this.logFn("debug", message, optionalParams);
  }

  info(message: string, optionalParams?: Dictionary): void {
    this.logFn("info", message, optionalParams);
  }

  log(message: string, optionalParams?: InfoLoggingContent): void {
    this.logFn("debug", message, optionalParams);
  }

  warn(message: string, optionalParams?: Dictionary): void {
    this.logFn("warn", message, optionalParams);
  }

  error(message: string, optionalParams?: ErrorLoggingContent): void {
    this.logFn("error", message, optionalParams);
  }

  fatal(message: string, optionalParams?: Dictionary): void {
    this.logFn("fatal", message, optionalParams);
  }

  trace(message: string, optionalParams: Dictionary): void {
    this.logFn("trace", message, optionalParams);
  }

  private configure(): pino.LoggerOptions {
    type Configurations = {
      dev: pino.LoggerOptions;
      other: pino.LoggerOptions;
    };
    const configurations: Configurations = {
      dev: {
        level: "debug",
        transport: { target: "pino-pretty" },
      },
      other: {
        level: "info",
      },
    };

    return this.configService.get("env") === "dev"
      ? configurations.dev
      : configurations.other;
  }

  private logFn(fn: string, message: string, args?: unknown): void {
    const argsIsString = typeof args === "string" || args instanceof String;

    const argsIsObject =
      typeof args === "object" && !Array.isArray(args) && args !== null;

    this.logger[fn]<LoggingContent>(
      {
        correlationId: this.correlationId(),
        requestId: this.requestId(),
        ...(argsIsObject ? { ...args } : {}),
        ...(argsIsString ? { other: args } : {}),
      },
      message,
    );
  }

  private correlationId(): string {
    return this.contextService.get("correlationId");
  }

  private requestId(): string {
    return this.contextService.get("requestId");
  }
}
