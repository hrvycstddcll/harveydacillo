const fs = require("fs");
const p = "C:/Users/Acer/OneDrive/Desktop/Portfolio-Website-v1/src/components/Contact.jsx";
let s = fs.readFileSync(p, "utf8");
const re = /<a\s+[^>]*?Start a Conversation[\s\S]*?<\/a>/g;
const rep = `<a href={mailtoHref} rel="noopener noreferrer" aria-label="Start a project conversation by email" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                Start a Conversation
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>`;
s = s.replace(re, rep);
fs.writeFileSync(p, s);
console.log("ok");
