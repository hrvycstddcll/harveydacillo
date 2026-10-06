import fs from "fs";
const p = "C:/Users/Acer/OneDrive/Desktop/Portfolio-Website-v1/src/components/Contact.jsx";
let s = fs.readFileSync(p, "utf8");
const idx = s.indexOf("Start a Conversation");
if(idx> -1){
  const aStart = s.lastIndexOf("<a", idx);
  const aEnd = s.indexOf("</a>", idx);
  if(aStart>-1 && aEnd>aStart){
    const rep = `<a href={mailtoHref} rel="noopener noreferrer" aria-label="Start a project conversation by email" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">\n                Start a Conversation\n                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />\n              </a>`;
    s = s.slice(0,aStart)+rep+s.slice(aEnd+4);
    fs.writeFileSync(p,s);
  }
}
