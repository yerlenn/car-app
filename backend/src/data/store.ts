import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname);

function filePath(name: string): string {
  return path.join(DATA_DIR, name);
}

export function readJSON<T>(name: string): T[] {
  const fp = filePath(name);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, "[]", "utf-8");
  }
  const raw = fs.readFileSync(fp, "utf-8");
  return JSON.parse(raw) as T[];
}

export function writeJSON<T>(name: string, data: T[]): void {
  const fp = filePath(name);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf-8");
}
