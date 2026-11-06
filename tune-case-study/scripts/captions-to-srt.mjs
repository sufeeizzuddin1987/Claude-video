// Usage: node scripts/captions-to-srt.mjs [lang=en]  -> out/captions.<lang>.srt
import fs from "fs";
const lang = process.argv[2] ?? "en";
const cues = JSON.parse(fs.readFileSync(`src/captions/${lang}.json`, "utf8"));
const ts = (ms) => {
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${s},${String(Math.round(ms % 1000)).padStart(3, "0")}`;
};
const srt = cues.map((c, i) => `${i + 1}\n${ts(c.startMs)} --> ${ts(c.endMs)}\n${c.text}\n`).join("\n");
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync(`out/captions.${lang}.srt`, srt);
console.log(`wrote out/captions.${lang}.srt (${cues.length} cues)`);
