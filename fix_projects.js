const fs = require("fs");
let s = fs.readFileSync("C:/Users/Acer/OneDrive/Desktop/Portfolio-Website-v1/src/components/Projects.jsx", "utf8");
s = s.replace(/rel="noreferrer"/g, 'rel="noopener noreferrer"');
fs.writeFileSync("C:/Users/Acer/OneDrive/Desktop/Portfolio-Website-v1/src/components/Projects.jsx", s);
console.log("ok");
