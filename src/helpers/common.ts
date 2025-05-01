import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { color } from "console-log-colors";

import config from "../config";

/**
 * ### Extract Route Paths
 * Extracts route paths from a router file.
 *
 * @param {string} filePath - Absolute or relative path to the router file.
 * @returns {string[]} - Array of route paths (e.g., ['/auth', '/user']).
 */
export const extractRoutePaths = (
  filePath: string,
  urlPrefix: string,
): void => {
  try {
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, "utf-8");

    const regex = new RegExp(/rootRouter\.use\(\s*["'`]([^"'`]+)["'`]/g);
    const matches = Array.from(content.matchAll(regex));

    console.log("\n========== Route List Start ==========");

    matches.forEach((route) => {
      const exactPath = `${urlPrefix}${route[1]}/`;
      console.info(color.blue(exactPath));
    });

    console.log("=========== Route List End ===========\n");
  } catch (err: any) {
    console.error(`Error reading or parsing file: ${err.message}`);
  }
};

/**
 * ### Random String Generator
 * Generates a random string of specified length.
 *
 * @param {number} length - Length of the random string to generate.
 * @returns {string} - Random string of specified length.
 */
export const randomString = (length: number = 40): string => {
  let result: string = "";
  const chars: string =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];

  return result;
};

export const generateToken = (email: string) => {
  const token = jwt.sign({ email }, config.jwtSecret, {
    expiresIn: "24h",
  });

  return token;
};
