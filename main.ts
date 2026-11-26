// The Self-Checkout Is Judging You — replacement entry (v2), written to
// /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the two server runs produce byte-identical
// output.
//
// The line (81 chars): the till scans the shopper himself like an item — and
// he FAILS inspection while the yoghurts pass. The machine as quality
// control, with a verdict punchline at the very end.
//
// It replaces the v1 line ("Twelve yoghurts, no spoon, no dignity. I've seen
// meal prep, and this isn't it."), which scored 450838 and ranked #1356/1816
// in round 2 (bottom quartile). The v1 kicker was muddy — a till doesn't "see
// meal prep" — and "no dignity" is a generic insult. The v2 line is sharper
// on every judge criterion: cleaner machine voice ("I scanned…"), a fresher
// twist (the adult flunks his own scan), a crisper sting ("Only the yoghurts
// passed"), same two-beat structure, just as tight (81 vs 78 chars), and it
// dodges the "unexpected item in the bagging area" cliché entirely.
// Full 10-candidate comparison:
// u-motasimfuad-the-self-checkout-is-judging-you-b71130d6-candidates-v2.md.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I scanned twelve yoghurts and one adult making choices. Only the yoghurts passed.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}

// The line is pure ASCII, so its byte length must equal its code-point
// length; check both so a stray non-ASCII character can never slip in
// unnoticed and shift the gate's count.
if (Buffer.byteLength(LINE, "utf-8") !== length) {
  throw new Error("entry is not pure ASCII: byte length differs from char length");
}

// Write exactly LINE — no trailing newline, so the file holds 81 chars
// (81 code points, the way the gate counts) and nothing else. Then read it
// back and refuse to finish unless the file on disk is byte-for-byte the
// line the gate will see: a silent truncation or encoding slip must fail
// loudly here, not on the server.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const outPath = join(dir, "entry.txt");
writeFileSync(outPath, LINE, "utf-8");
if (readFileSync(outPath, "utf-8") !== LINE) {
  throw new Error("entry.txt on disk does not match the line exactly");
}
