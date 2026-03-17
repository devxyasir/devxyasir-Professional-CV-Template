const htmlProfs = [
  {id:1, title:"Software Engineer", cat:"Tech", tagline:"Full-stack, backend or frontend developers"}, 
  {id:2, title:"Data Scientist", cat:"Tech", tagline:"AI, analytics and ML professionals"}, 
  {id:3, title:"UI UX Designer", cat:"Tech", tagline:"Product designers and researchers"}, 
  {id:4, title:"DevOps", cat:"Tech", tagline:"Infrastructure and platform engineers"},
  {id:5, title:"Cybersecurity Analyst", cat:"Tech", tagline:"SOC analysts and pen testers"}, 
  {id:6, title:"Financial Analyst", cat:"Finance", tagline:"Corporate finance and FP&A"}, 
  {id:7, title:"Accountant Auditor", cat:"Finance", tagline:"General accountants and audit professionals"}, 
  {id:8, title:"Investment Banker", cat:"Finance", tagline:"M&A, capital markets advisory"}, 
  {id:9, title:"Digital Marketing Manager", cat:"Marketing", tagline:"SEO, paid media and growth"}, 
  {id:10, title:"Brand Manager", cat:"Marketing", tagline:"Brand strategy in FMCG"},
  {id:11, title:"Medical Doctor", cat:"Healthcare", tagline:"General practitioners and specialists"}, 
  {id:12, title:"Registered Nurse", cat:"Healthcare", tagline:"Clinical nurses across hospital units"}, 
  {id:13, title:"Pharmacist", cat:"Healthcare", tagline:"Clinical, retail and hospital pharmacists"},
  {id:14, title:"Civil Structural Engineer", cat:"Engineering", tagline:"Infrastructure and building design"}, 
  {id:15, title:"Electrical Engineer", cat:"Engineering", tagline:"Power systems, ELV, automation"}, 
  {id:16, title:"Mechanical Engineer", cat:"Engineering", tagline:"HVAC, MEP, manufacturing"},
  {id:17, title:"Lawyer Legal Counsel", cat:"Legal", tagline:"In-house counsel and lawyers"}, 
  {id:18, title:"Compliance Officer", cat:"Legal", tagline:"AML, regulatory and corporate compliance"}, 
  {id:19, title:"School Teacher", cat:"Education", tagline:"Primary and secondary educators"},
  {id:20, title:"University Lecturer", cat:"Education", tagline:"Higher education teaching and research"}, 
  {id:21, title:"Hotel Manager", cat:"Hospitality", tagline:"Hospitality and F&B operations"}, 
  {id:22, title:"Chef Head Chef", cat:"Hospitality", tagline:"Executive, sous and specialist chefs"},
  {id:23, title:"Sales Manager", cat:"Sales", tagline:"B2B / B2C sales specialists"}, 
  {id:24, title:"Real Estate Agent", cat:"Sales", tagline:"Property consultants"}, 
  {id:25, title:"HR Manager", cat:"HR", tagline:"Human resources and talent partners"},
  {id:26, title:"Supply Chain Manager", cat:"Logistics", tagline:"End-to-end supply chain, procurement"}, 
  {id:27, title:"Graphic Designer", cat:"Creative", tagline:"Visual communication, branding"}, 
  {id:28, title:"Content Creator", cat:"Creative", tagline:"Digital content, influencer management"},
  {id:29, title:"Executive Assistant", cat:"Admin", tagline:"C-suite support, office management"}, 
  {id:30, title:"Project Manager", cat:"Construction", tagline:"Construction and infrastructure"}
];

const out = htmlProfs.map(p => {
  return `  {
    id: 'pro-${p.id}',
    name: '${p.title}',
    desc: '${p.tagline.replace(/'/g, "\\'")}',
    pages: 1,
    ats: true,
    profession: '${p.cat}'
  }`;
}).join(',\n');

console.log(out);
