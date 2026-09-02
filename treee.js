const fs = require("fs");
const path = require("path");

const IGNORE = new Set([
  "node_modules",
  ".next",
  ".git",
  ".turbo",
  ".vercel",
  "dist",
  "build",
  "coverage",
]);

let output = [];

function walk(dir, prefix = "") {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !IGNORE.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  entries.forEach((entry, index) => {
    const last = index === entries.length - 1;
    const line = prefix + (last ? "└── " : "├── ") + entry.name;

    output.push(line);

    if (entry.isDirectory()) {
      walk(
        path.join(dir, entry.name),
        prefix + (last ? "    " : "│   ")
      );
    }
  });
}

output.push(path.basename(process.cwd()));
walk(process.cwd());

fs.writeFileSync("project-tree.txt", output.join("\n"));

console.log("Saved to project-tree.txt");