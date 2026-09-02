const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const outputFile = path.join(rootDir, "codebase.txt");

const ignoreFolders = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".vercel",
  ".turbo",
  ".idea",
  ".vscode",
]);

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".scss",
  ".html",
  ".md",
  ".txt",
  ".sql",
  ".env.example",
  ".mjs",
  ".cjs",
  ".yml",
  ".yaml",
]);

const ignoredFiles = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

let output = "";

function shouldInclude(file) {
  if (ignoredFiles.has(path.basename(file))) return false;

  const ext = path.extname(file);

  if (allowedExtensions.has(ext)) return true;

  if (file.endsWith(".env.example")) return true;

  return false;
}

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (ignoreFolders.has(item.name)) continue;
      walk(fullPath);
    } else {
      if (!shouldInclude(fullPath)) continue;

      const relative = path.relative(rootDir, fullPath);

      output += "\n";
      output += "============================================================\n";
      output += `FILE: ${relative}\n`;
      output += "============================================================\n\n";

      try {
        output += fs.readFileSync(fullPath, "utf8");
      } catch (err) {
        output += "[Unable to read file]";
      }

      output += "\n\n";
    }
  }
}

walk(rootDir);

fs.writeFileSync(outputFile, output);

console.log("\n✅ Done!");
console.log("Saved to:");
console.log(outputFile);