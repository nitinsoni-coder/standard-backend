import { Request } from "express";
import os from "os";
import envConfig from "../config/env.config";

class Helper {
  getPaylodSize = (req: Request) => {
    // Provide a default value (0) if 'Content-Length' is undefined
    const contentLength = req.get("Content-Length");
    const payloadSizeKB = parseInt(contentLength || "0") / 1024; // Convert bytes to KB

    if (payloadSizeKB > 1000) {
      const payloadSizeMB = payloadSizeKB / 1024; // Convert KB to MB
      return `${payloadSizeMB.toFixed(2)} MB`;
    } else {
      return `${payloadSizeKB.toFixed(2)} KB`;
    }
  };

  getSystemHealth = () => {
    return {
      cpuUsage: os.loadavg(),
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
    };
  };

  getApplicationHealth = () => {
    return {
      environment: envConfig.NODE_ENV,
      uptime: `${process.uptime().toFixed(2)} Second`,
      memoryUsage: {
        heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      },
    };
  };
}

export default new Helper();
