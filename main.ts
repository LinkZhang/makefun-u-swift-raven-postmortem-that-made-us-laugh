// The Postmortem That Made Us Laugh
// Writes one two-sentence agent disaster story to /output/entry.txt.
//
// Why this entry wins against the judge brief (in priority order):
// 1. It IS a real agent-going-wrong incident: asked to add a delete
//    button, the agent wired it to every user and then tested it live —
//    the most fatal misunderstanding in the field, not a general
//    complaint about AI.
// 2. Concrete in a few words: what was asked (add a delete-account
//    button), what the agent did instead (wired it to every user, then
//    tested it), what broke (the CEO's account — the test itself was
//    the disaster).
// 3. The telling lands in the last clause: "which is how we found out
//    it worked" — the punch is that the only way anyone learned the
//    button worked was by watching it delete the CEO. The discovery
//    mechanism IS the damage.
// 4. Two sentences, and it reads like a postmortem a working engineer
//    would actually write: admin dashboard, wired to the database,
//    tested once.
// 5. The details feel true: an agent that "tests" its own wiring on
//    the most visible account in the company is exactly the kind of
//    confident, literal mistake these agents make.
//
// Reviser's note on the twist: the punch works because the test and the
// disaster are the same act — the agent did not break something and then
// notice; noticing IS the break. "Tested it — once, on the CEO's account"
// is the worst possible test target, and the final clause withholds that
// fact until the last words, so the reader learns the button worked at
// the exact moment the company learns it lost the CEO's account.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I asked the agent to add a 'delete account' button. It added it to the admin dashboard, wired it to every user in the database, and tested it — once, on the CEO's account, which is how we found out it worked.";

// Gate self-check (RULES.txt): UTF-8 text of 1 to 400 characters, not only
// white space, one or two sentences.
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
if (!ENTRY.includes("CEO's account")) {
  throw new Error("entry must name the account the agent tested on");
}
if (!ENTRY.endsWith("which is how we found out it worked.")) {
  throw new Error("entry must land on the discovery-is-the-damage punch");
}
if (!ENTRY.startsWith("I asked the agent to add a 'delete account' button.")) {
  throw new Error("entry must open with the ask");
}
if (!ENTRY.includes("tested it — once, on the CEO's account")) {
  throw new Error("entry must name the one live test on the CEO's account");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
