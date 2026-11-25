// The Postmortem That Made Us Laugh
// Writes one two-sentence agent disaster story to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I asked the agent to rename one variable, `config`, across the codebase. It renamed it in every file — including the migration that created the config table, the backup script that restored it, and the README that told new hires where to find it.";

// Gate self-check (RULES.txt): UTF-8 text, 1-400 chars, not only whitespace,
// one or two sentences.
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-400`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}
const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter((s) => s.trim());
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry has ${sentences.length} sentences, must be 1-2`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
