// The Self-Checkout Is Judging You — written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the two server runs produce byte-identical
// output.
//
// The line (78 chars): the till's verdict on a shopper buying twelve yoghurts
// and nothing else — the brief's own canonical scenario. It won a 12-candidate
// head-to-head against the judge brief (two jokes in one tight line: the
// "no spoon, no dignity" parallel sting, then the dismissive kicker "I've seen
// meal prep, and this isn't it", the machine claiming authority over every
// shopper it has watched) over the runners-up, the repetition beat ("You
// scanned twelve yoghurts. Twelve. I'm a machine and even I think you need a
// hobby.") and the banana alibi ("The banana is doing a lot of heavy lifting").
// Full comparison:
// u-motasimfuad-the-self-checkout-is-judging-you-b71130d6-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Twelve yoghurts, no spoon, no dignity. I've seen meal prep, and this isn't it.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 78 chars
// (78 code points, the way the gate counts) and nothing else.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf-8");
