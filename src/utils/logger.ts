import { createLogger, format, transports } from "winston";
import * as sourceMapSupport from "source-map-support";
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import util from "util";
import envConfig from "../config/env.config";
import { ENV_MODE } from "../constants/constant";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { blue, red, yellow, green, magenta } from "colorette";

// Linking Trace support
sourceMapSupport.install();

const colorizeLevel = (level: string) => {
  switch (level) {
    case "ERROR":
      return red(level);
    case "INFO":
      return blue(level);
    case "WARN":
      return yellow(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimestamp = green(timestamp as string);
  const customMessage = message;

  let customLog = `${customLevel} [${customTimestamp}] ${customMessage}`;

  if (typeof meta === "object" && meta !== null && Object.keys(meta).length > 0) {
    const customMeta = util.inspect(meta, {
      showHidden: false,
      depth: null,
      colors: true,
    });
    customLog += `\n${magenta("META")} ${customMeta}\n`;
  }
  return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  return envConfig.NODE_ENV === ENV_MODE.DEVELOPMENT
    ? [
        new transports.Console({
          level: "info",
          format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleLogFormat),
        }),
      ]
    : [];
};

const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    for (const [key, value] of Object.entries(meta)) {
      if (value instanceof Error) {
        logMeta[key] = {
          name: value.name,
          message: value.message,
          trace: value.stack || "",
        };
      } else {
        logMeta[key] = value;
      }
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta,
  };

  return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return [
    new transports.File({
      filename: path.join(__dirname, "../", "../", "logs", `${envConfig.NODE_ENV}.log`),
      level: "info",
      format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), fileLogFormat),
    }),
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...fileTransport(), ...consoleTransport()],
});
