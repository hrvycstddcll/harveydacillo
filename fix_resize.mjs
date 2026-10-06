import fs from "fs";
const p = "C:/Users/Acer/OneDrive/Desktop/Portfolio-Website-v1/src/components/Contact.jsx";
let s = fs.readFileSync(p, "utf8");
const old = `      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          buildHeadline();
          if (enteredRef.current) {
            settle();
          } else {
            buildIntro();
          }
          ScrollTrigger.refresh();
        }, 280);
      };`;
const nw = `      const onResize = () => {
        clearTimeout(resizeTimer);
        headTl?.scrollTrigger?.kill();
        headTl?.kill();
        driftTl?.scrollTrigger?.kill();
        driftTl?.kill();
        split?.revert();
        split = null;
        buildHeadline();
        if (enteredRef.current) {
          settle();
        } else {
          introTl?.scrollTrigger?.kill();
          introTl?.kill();
          buildIntro();
        }
        ScrollTrigger.refresh();
      };`;
if (s.includes(old)) { s = s.replace(old, nw); fs.writeFileSync(p, s); console.log("replaced"); } else { console.log("miss"); }
