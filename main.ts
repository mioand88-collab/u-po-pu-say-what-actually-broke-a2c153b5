// Say What Actually Broke — one line of honest, funny error copy.
// Writes a single line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (defaults to /output when the variable is absent).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Save failed: the disk filled up mid-write and your last paragraph is now homeless. Free up some space and try again.";

// The sealed gate wants 1–200 characters, one line, not only whitespace.
if (line.length < 1 || line.length > 200 || line.includes("\n") || line.trim() === "") {
  throw new Error(`entry line is invalid (${line.length} chars)`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
console.log(`Wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
