const fs = require('fs');
const path = require('path');

const PROFESSIONS = [
  {id:1,  title:'Software Engineer',             cat:'Tech'},
  {id:2,  title:'Data Scientist',                cat:'Tech'},
  {id:3,  title:'UI / UX Designer',              cat:'Tech'},
  {id:4,  title:'DevOps Engineer',               cat:'Tech'},
  {id:5,  title:'Cybersecurity Analyst',         cat:'Tech'},
  {id:6,  title:'Financial Analyst',             cat:'Finance'},
  {id:7,  title:'Accountant / Auditor',          cat:'Finance'},
  {id:8,  title:'Investment Banker',             cat:'Finance'},
  {id:9,  title:'Digital Marketing Manager',    cat:'Marketing'},
  {id:10, title:'Brand Manager',                 cat:'Marketing'},
  {id:11, title:'Medical Doctor',                cat:'Healthcare'},
  {id:12, title:'Registered Nurse',              cat:'Healthcare'},
  {id:13, title:'Pharmacist',                    cat:'Healthcare'},
  {id:14, title:'Civil / Structural Engineer',  cat:'Engineering'},
  {id:15, title:'Electrical Engineer',           cat:'Engineering'},
  {id:16, title:'Mechanical Engineer',           cat:'Engineering'},
  {id:17, title:'Lawyer / Legal Counsel',        cat:'Legal'},
  {id:18, title:'Compliance Officer',            cat:'Legal'},
  {id:19, title:'School Teacher',                cat:'Education'},
  {id:20, title:'University Lecturer',           cat:'Education'},
  {id:21, title:'Hotel Manager',                 cat:'Hospitality'},
  {id:22, title:'Chef / Head Chef',              cat:'Hospitality'},
  {id:23, title:'Sales Manager',                 cat:'Sales'},
  {id:24, title:'Real Estate Agent',             cat:'Sales'},
  {id:25, title:'HR Manager',                    cat:'HR'},
  {id:26, title:'Supply Chain Manager',          cat:'Logistics'},
  {id:27, title:'Graphic Designer',              cat:'Creative'},
  {id:28, title:'Content Creator',               cat:'Creative'},
  {id:29, title:'Executive Assistant',           cat:'Admin'},
  {id:30, title:'Project Manager',               cat:'Construction'},
];

function sanitize(str) { return str.replace(/[^a-zA-Z0-9]/g, ''); }

// --------------------------------------------------------------------------------------
// DESIGN 0: MODERN SPLIT (Dark Sidebar, Main Timeline)
// --------------------------------------------------------------------------------------
const design0 = (name, cMain, cBg, cText) => `import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const s = StyleSheet.create({
  page:   { fontFamily:'Helvetica', fontSize:9, flexDirection:'row', backgroundColor:'#fff' },
  side:   { width:210, backgroundColor:'${cBg}', padding:'36 24', flexShrink:0, color:'${cText}' },
  main:   { flex:1, padding:'36 32 30 26' },
  photo:  { width:88, height:88, borderRadius:44, alignSelf:'center', marginBottom:18, border:'4px solid ${cMain}' },
  name:   { fontSize:16, fontWeight:700, color:'#fff', textAlign:'center', letterSpacing:1, marginBottom:4 },
  title:  { fontSize:9.5, color:'${cMain}', textAlign:'center', marginBottom:20, letterSpacing:0.5 },
  label:  { fontSize:8.5, fontWeight:700, textTransform:'uppercase', letterSpacing:1.5, marginBottom:8, marginTop:18, color:'${cMain}' },
  pText:  { fontSize:8.5, lineHeight:1.5, marginBottom:4 },
  barBg:  { height:4, backgroundColor:'rgba(255,255,255,0.15)', borderRadius:2, marginTop:3, marginBottom:8 },
  barFg:  { height:4, backgroundColor:'${cMain}', borderRadius:2 },
  mHead:  { fontSize:13, fontWeight:700, color:'#111', textTransform:'uppercase', letterSpacing:1.5, borderBottom:'2px solid ${cMain}', paddingBottom:4, marginBottom:12, marginTop:20 },
  mText:  { fontSize:9.5, lineHeight:1.6, color:'#444', textAlign:'justify', marginBottom:8 },
  expBlk: { marginLeft:10, borderLeft:'1px solid ${cMain}', paddingLeft:14, paddingBottom:12, position:'relative' },
  dot:    { position:'absolute', left:-18, top:2, width:7, height:7, borderRadius:3.5, backgroundColor:'${cMain}' },
  bold:   { fontWeight:700, fontSize:10.5, color:'#111' },
  dates:  { fontSize:9, color:'${cMain}', fontWeight:700, marginTop:1, marginBottom:2 },
  italic: { fontStyle:'italic', fontSize:9.5, color:'#555', marginBottom:4 },
  bullet: { flexDirection:'row', marginBottom:3 },
  bDot:   { width:12, fontSize:10, color:'${cMain}' },
  bText:  { flex:1, fontSize:9, lineHeight:1.5, color:'#444' }
});

export default function ${name}({ data, photoSrc }) {
  const d = (data && data.name) ? data : DEFAULT;
  return (
    <Document title={d.name + ' – CV'} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.side}>
          {photoSrc && <Image src={photoSrc} style={s.photo} />}
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <Text style={s.label}>Contact</Text>
          <Text style={s.pText}>{d.phone}</Text>
          <Text style={s.pText}>{d.email}</Text>
          <Text style={s.pText}>{d.location}</Text>
          {(d.skills||[]).length>0 && <><Text style={s.label}>Core Skills</Text>
          {d.skills.map((sk,i)=><View key={i}><View style={{flexDirection:'row',justifyContent:'space-between'}}><Text style={s.pText}>{sk.name}</Text><Text style={s.pText}>{sk.pct}%</Text></View><View style={s.barBg}><View style={[s.barFg,{width:sk.pct+'%'}]}/></View></View>)}</>}
          {(d.langs||[]).length>0 && <><Text style={s.label}>Languages</Text>
          {d.langs.map((l,i)=><View key={i}><Text style={s.pText}>{l.name} - {l.level}</Text><View style={s.barBg}><View style={[s.barFg,{width:l.pct+'%'}]}/></View></View>)}</>}
        </View>
        <View style={s.main}>
          {d.summary && <><Text style={[s.mHead, {marginTop:0}]}>Profile</Text><Text style={s.mText}>{d.summary}</Text></>}
          {(d.experience||[]).length>0 && <><Text style={s.mHead}>Professional Experience</Text>
          {d.experience.map((e,i)=>(
            <View key={i} style={[s.expBlk, i===d.experience.length-1?{borderLeftColor:'transparent',paddingBottom:0}:{}]}>
              <View style={s.dot} />
              <Text style={s.bold}>{e.role}</Text>
              <Text style={s.dates}>{e.dates}</Text>
              <Text style={s.italic}>{e.company}{e.location ? ' — '+e.location : ''}</Text>
              {(e.bullets||[]).map((b,j)=><View key={j} style={s.bullet}><Text style={s.bDot}>›</Text><Text style={s.bText}>{b}</Text></View>)}
            </View>
          ))}</>}
          {(d.education||[]).length>0 && <><Text style={s.mHead}>Education</Text>
          {d.education.map((e,i)=>(
            <View key={i} style={[s.expBlk, i===d.education.length-1?{borderLeftColor:'transparent',paddingBottom:0}:{}]}>
              <View style={s.dot} />
              <Text style={s.bold}>{e.degree}</Text>
              <Text style={s.dates}>{e.dates}</Text>
              <Text style={s.italic}>{e.institution}{e.sub ? ' | '+e.sub : ''}</Text>
            </View>
          ))}</>}
          {(d.certs||[]).length>0 && <><Text style={s.mHead}>Certifications</Text>
          {d.certs.map((c,i)=><View key={i} style={[s.bullet,{marginBottom:4}]}><Text style={s.bDot}>◈</Text><Text style={s.bText}><Text style={{fontWeight:700,color:'#111'}}>{c.name}</Text> — {c.issuer} ({c.date})</Text></View>)}</>}
        </View>
      </Page>
    </Document>
  );
}`;

// --------------------------------------------------------------------------------------
// DESIGN 1: GEOMETRIC BUBBLES (Boxed containers, heavy use of chip/pill tags)
// --------------------------------------------------------------------------------------
const design1 = (name, cAccent) => `import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '${cAccent}';
const s = StyleSheet.create({
  page:    { fontFamily:'Helvetica', fontSize:9, backgroundColor:'#f9f9fa', padding:32 },
  header:  { backgroundColor:'#fff', padding:24, borderRadius:12, flexDirection:'row', alignItems:'center', marginBottom:16, borderLeft:'6px solid '+A },
  photo:   { width:70, height:70, borderRadius:12, marginRight:20 },
  name:    { fontSize:22, fontWeight:700, color:'#222', marginBottom:4 },
  title:   { fontSize:11, color:A, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8 },
  contact: { flexDirection:'row', flexWrap:'wrap', gap:10 },
  chip:    { backgroundColor:'#f0f2f5', padding:'4 8', borderRadius:6, fontSize:8, color:'#555', marginBottom:4 },
  grid:    { flexDirection:'row', gap:16 },
  colL:    { flex:2 },
  colR:    { flex:1 },
  box:     { backgroundColor:'#fff', padding:18, borderRadius:12, marginBottom:16 },
  secHead: { fontSize:12, fontWeight:700, color:'#222', marginBottom:12, flexDirection:'row', alignItems:'center' },
  shLine:  { flex:1, height:1, backgroundColor:'#eee', marginLeft:10 },
  text:    { fontSize:9, lineHeight:1.5, color:'#444', textAlign:'justify' },
  bold:    { fontWeight:700, color:'#222', fontSize:10 },
  rSpace:  { flexDirection:'row', justifyContent:'space-between', marginBottom:2, alignItems:'flex-end' },
  dates:   { fontSize:8, backgroundColor:A, color:'#fff', padding:'3 8', borderRadius:10, overflow:'hidden' },
  sub:     { fontSize:9, color:A, marginBottom:6 },
  bullet:  { flexDirection:'row', marginBottom:3 },
  bDot:    { width:10, fontSize:12, color:'#ccc', marginTop:-2 },
  tags:    { flexDirection:'row', flexWrap:'wrap', gap:6 },
  tagPill: { backgroundColor:'rgba(${parseInt(cAccent.slice(1,3),16)},${parseInt(cAccent.slice(3,5),16)},${parseInt(cAccent.slice(5,7),16)},0.1)', color:A, padding:'4 10', borderRadius:14, fontSize:8, fontWeight:700 }
});

export default function ${name}({ data, photoSrc }) {
  const d = (data && data.name) ? data : DEFAULT;
  const allTags = [...(d.tagsLang||[]),...(d.tagsAI||[]),...(d.tagsData||[]),...(d.tagsTools||[])];
  return (
    <Document title={d.name + ' – CV'} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          {photoSrc && <Image src={photoSrc} style={s.photo} />}
          <View style={{flex:1}}>
            <Text style={s.name}>{d.name}</Text>
            <Text style={s.title}>{d.title}</Text>
            <View style={s.contact}>
              {d.phone && <Text style={s.chip}>📞 {d.phone}</Text>}
              {d.email && <Text style={s.chip}>✉ {d.email}</Text>}
              {d.location && <Text style={s.chip}>📍 {d.location}</Text>}
              {d.linkedin && <Text style={s.chip}>in/{d.linkedin.split('/').pop()}</Text>}
            </View>
          </View>
        </View>
        <View style={s.grid}>
          <View style={s.colL}>
            {d.summary && <View style={s.box}><View style={s.secHead}><Text>Profile</Text><View style={s.shLine}/></View><Text style={s.text}>{d.summary}</Text></View>}
            {(d.experience||[]).length>0 && <View style={s.box}><View style={s.secHead}><Text>Experience</Text><View style={s.shLine}/></View>
              {d.experience.map((e,i)=>(
                <View key={i} style={{marginBottom:12}}>
                  <View style={s.rSpace}><Text style={s.bold}>{e.role}</Text><Text style={s.dates}>{e.dates}</Text></View>
                  <Text style={s.sub}>{e.company}{e.location?', '+e.location:''}</Text>
                  {(e.bullets||[]).map((b,j)=><View key={j} style={s.bullet}><Text style={s.bDot}>•</Text><Text style={s.text}>{b}</Text></View>)}
                </View>
              ))}
            </View>}
            {(d.projects||[]).length>0 && <View style={s.box}><View style={s.secHead}><Text>Projects</Text><View style={s.shLine}/></View>
              {d.projects.map((p,i)=>(
                <View key={i} style={{marginBottom:10}}>
                  <View style={s.rSpace}><Text style={s.bold}>{p.name}</Text><Text style={s.text}>{p.year}</Text></View>
                  <Text style={[s.text,{marginBottom:4}]}>{p.desc}</Text>
                  {p.stack && <View style={s.tags}><Text style={s.tagPill}>{p.stack}</Text></View>}
                </View>
              ))}
            </View>}
          </View>
          <View style={s.colR}>
            {allTags.length>0 && <View style={s.box}><View style={s.secHead}><Text>Expertise</Text><View style={s.shLine}/></View><View style={s.tags}>{allTags.map((t,i)=><Text key={i} style={s.tagPill}>{t}</Text>)}</View></View>}
            {(d.education||[]).length>0 && <View style={s.box}><View style={s.secHead}><Text>Education</Text><View style={s.shLine}/></View>
              {d.education.map((e,i)=><View key={i} style={{marginBottom:10}}><Text style={s.bold}>{e.degree}</Text><Text style={s.sub}>{e.institution}</Text><Text style={[s.text,{fontSize:8}]}>{e.dates}</Text></View>)}
            </View>}
            {(d.certs||[]).length>0 && <View style={s.box}><View style={s.secHead}><Text>Certs</Text><View style={s.shLine}/></View>
              {d.certs.map((c,i)=><View key={i} style={{marginBottom:8}}><Text style={[s.bold,{fontSize:9}]}>{c.name}</Text><Text style={[s.text,{fontSize:8}]}>{c.issuer} | {c.date}</Text></View>)}
            </View>}
            {(d.langs||[]).length>0 && <View style={s.box}><View style={s.secHead}><Text>Languages</Text><View style={s.shLine}/></View>
              {d.langs.map((l,i)=><View key={i} style={{marginBottom:4,flexDirection:'row',justifyContent:'space-between'}}><Text style={s.text}>{l.name}</Text><Text style={[s.text,{color:A}]}>{l.level}</Text></View>)}
            </View>}
          </View>
        </View>
      </Page>
    </Document>
  );
}`;

// --------------------------------------------------------------------------------------
// DESIGN 2: CENTERED ELEGANCE (Traditional yet highly refined, single column, great for Execs/Finance)
// --------------------------------------------------------------------------------------
const design2 = (name, cAccent) => `import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '${cAccent}';
const s = StyleSheet.create({
  page:    { fontFamily:'Helvetica', fontSize:9.5, backgroundColor:'#fff', padding:'40 50' },
  topBord: { height:6, backgroundColor:A, position:'absolute', top:0, left:0, right:0 },
  header:  { alignItems:'center', marginBottom:20 },
  photo:   { width:80, height:80, borderRadius:40, marginBottom:12 },
  name:    { fontSize:24, fontWeight:700, color:'#111', textTransform:'uppercase', letterSpacing:2, marginBottom:4 },
  title:   { fontSize:11, color:A, letterSpacing:1, marginBottom:10 },
  contact: { flexDirection:'row', justifyContent:'center', flexWrap:'wrap', gap:8, fontSize:8.5, color:'#555' },
  vLine:   { width:1, height:10, backgroundColor:'#ccc', marginHorizontal:4 },
  sec:     { marginBottom:16 },
  sLabel:  { fontSize:11, fontWeight:700, color:'#111', textTransform:'uppercase', letterSpacing:1.5, textAlign:'center', marginBottom:12 },
  sLine:   { height:1, backgroundColor:'#eee', marginBottom:12, marginTop:-6 },
  text:    { fontSize:9.5, lineHeight:1.6, color:'#333', textAlign:'center', paddingHorizontal:20 },
  rowTop:  { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', marginBottom:2 },
  role:    { fontSize:11, fontWeight:700, color:'#111' },
  date:    { fontSize:9, color:'#666', fontStyle:'italic' },
  org:     { fontSize:10, color:A, fontWeight:700, marginBottom:4 },
  bullet:  { flexDirection:'row', marginBottom:3, paddingLeft:10 },
  bDot:    { width:12, fontSize:10, color:A },
  bText:   { flex:1, fontSize:9.5, lineHeight:1.5, color:'#333' }
});

export default function ${name}({ data, photoSrc }) {
  const d = (data && data.name) ? data : DEFAULT;
  return (
    <Document title={d.name + ' – CV'} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.topBord} />
        <View style={s.header}>
          {photoSrc && <Image src={photoSrc} style={s.photo} />}
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contact}>
            <Text>{d.phone}</Text><View style={s.vLine}/><Text>{d.email}</Text><View style={s.vLine}/><Text>{d.location}</Text>
            {d.linkedin&&<><View style={s.vLine}/><Text>{d.linkedin.split('/').pop()}</Text></>}
          </View>
        </View>
        
        {d.summary && <View style={s.sec}><Text style={s.sLabel}>Executive Summary</Text><View style={s.sLine}/><Text style={s.text}>{d.summary}</Text></View>}
        
        {(d.experience||[]).length>0 && <View style={s.sec}><Text style={s.sLabel}>Professional Experience</Text><View style={s.sLine}/>
          {d.experience.map((e,i)=>(
            <View key={i} style={{marginBottom:14}}>
              <View style={s.rowTop}><Text style={s.role}>{e.role}</Text><Text style={s.date}>{e.dates}</Text></View>
              <Text style={s.org}>{e.company}{e.location?', '+e.location:''}</Text>
              {(e.bullets||[]).map((b,j)=><View key={j} style={s.bullet}><Text style={s.bDot}>❖</Text><Text style={s.bText}>{b}</Text></View>)}
            </View>
          ))}
        </View>}
        
        {(d.education||[]).length>0 && <View style={s.sec}><Text style={s.sLabel}>Education & Credentials</Text><View style={s.sLine}/>
          {d.education.map((e,i)=>(
             <View key={i} style={{marginBottom:8, alignItems:'center'}}>
               <Text style={s.role}>{e.degree}</Text>
               <Text style={{fontSize:9.5, color:'#444', marginTop:2}}>{e.institution} • {e.dates}</Text>
             </View>
          ))}
        </View>}

        {((d.tagsLang||[]).length>0 || (d.skills||[]).length>0) && <View style={s.sec}><Text style={s.sLabel}>Core Competencies</Text><View style={s.sLine}/>
          <Text style={{textAlign:'center', fontSize:9.5, color:'#333', lineHeight:1.8}}>
            {[...(d.tagsLang||[]), ...(d.tagsTools||[]), ...(d.skills||[]).map(s=>s.name)].join('  |  ')}
          </Text>
        </View>}
      </Page>
    </Document>
  );
}`;

// --------------------------------------------------------------------------------------
// DESIGN 3: CREATIVE ASYMMETRY (Heavy left block with photo, light right main content)
// --------------------------------------------------------------------------------------
const design3 = (name, cAccent, cDark) => `import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '${cAccent}'; const D = '${cDark}';
const s = StyleSheet.create({
  page:   { fontFamily:'Helvetica', fontSize:9, flexDirection:'row', backgroundColor:'#fff' },
  colL:   { width:'35%', padding:'40 20 40 30', backgroundColor:D, color:'#fff' },
  colR:   { width:'65%', padding:'40 35 40 25' },
  photoFrame:{ width:110, height:110, marginBottom:20, backgroundColor:A, padding:4, transform:'rotate(-3deg)' },
  photo:  { width:'100%', height:'100%', transform:'rotate(3deg)' },
  nameBlt:{ fontSize:28, fontWeight:700, letterSpacing:1, marginBottom:4, lineHeight:1.1 },
  titleBlt:{ fontSize:12, color:A, textTransform:'uppercase', letterSpacing:2, marginBottom:30 },
  headL:  { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1.5, marginBottom:10, borderBottom:'1px solid rgba(255,255,255,0.2)', paddingBottom:4, color:A },
  textL:  { fontSize:9, color:'rgba(255,255,255,0.8)', marginBottom:6, lineHeight:1.4 },
  headR:  { fontSize:16, fontWeight:700, color:D, textTransform:'uppercase', letterSpacing:1, marginBottom:12, marginTop:20 },
  textR:  { fontSize:9.5, color:'#444', lineHeight:1.6, textAlign:'justify' },
  itemGrp:{ marginBottom:14 },
  hRow:   { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:2 },
  jRole:  { fontSize:11, fontWeight:700, color:A },
  jDates: { fontSize:8.5, backgroundColor:D, color:'#fff', padding:'2 6', borderRadius:4 },
  jComp:  { fontSize:10, color:'#222', fontStyle:'italic', marginBottom:4 },
  bullet: { flexDirection:'row', marginBottom:3 },
  bDot:   { width:12, fontSize:10, color:A },
  bText:  { flex:1, fontSize:9, lineHeight:1.5, color:'#444' }
});

export default function ${name}({ data, photoSrc }) {
  const d = (data && data.name) ? data : DEFAULT;
  return (
    <Document title={d.name + ' – CV'} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.colL}>
          {photoSrc && <View style={s.photoFrame}><Image src={photoSrc} style={s.photo} /></View>}
          <Text style={s.nameBlt}>{d.name.split(' ').map((n,i)=><Text key={i}>{n}{'\\n'}</Text>)}</Text>
          <Text style={s.titleBlt}>{d.title}</Text>
          
          <Text style={s.headL}>Contact Details</Text>
          <Text style={s.textL}>{d.phone}</Text>
          <Text style={s.textL}>{d.email}</Text>
          <Text style={s.textL}>{d.location}</Text>
          {d.linkedin && <Text style={s.textL}>{d.linkedin.replace(/^https?:\\/\\/(www\\.)?/,'')}</Text>}

          <Text style={[s.headL, {marginTop:24}]}>Education</Text>
          {(d.education||[]).map((e,i)=>(
             <View key={i} style={{marginBottom:10}}>
               <Text style={[s.textL,{fontWeight:700, color:'#fff', marginBottom:1}]}>{e.degree}</Text>
               <Text style={[s.textL,{fontSize:8, marginBottom:1}]}>{e.institution}</Text>
               <Text style={[s.textL,{fontSize:8, color:A}]}>{e.dates}</Text>
             </View>
          ))}

          <Text style={[s.headL, {marginTop:14}]}>Expertise</Text>
          {([...(d.tagsLang||[]), ...(d.tagsTools||[])]).slice(0,8).map((t,i)=><Text key={i} style={s.textL}>◾ {t}</Text>)}
        </View>

        <View style={s.colR}>
          {d.summary && <><Text style={[s.headR,{marginTop:0}]}>About Me</Text><Text style={s.textR}>{d.summary}</Text></>}
          
          {(d.experience||[]).length>0 && <><Text style={s.headR}>Experience</Text>
          {d.experience.map((e,i)=>(
            <View key={i} style={s.itemGrp}>
              <View style={s.hRow}><Text style={s.jRole}>{e.role}</Text><Text style={s.jDates}>{e.dates}</Text></View>
              <Text style={s.jComp}>{e.company}{e.location?', '+e.location:''}</Text>
              {(e.bullets||[]).map((b,j)=><View key={j} style={s.bullet}><Text style={s.bDot}>›</Text><Text style={s.bText}>{b}</Text></View>)}
            </View>
          ))}</>}

          {(d.projects||[]).length>0 && <><Text style={s.headR}>Key Projects</Text>
          {d.projects.map((p,i)=>(
            <View key={i} style={s.itemGrp}>
              <View style={s.hRow}><Text style={[s.jRole,{color:D}]}>{p.name}</Text><Text style={[s.jDates,{backgroundColor:A}]}>{p.year}</Text></View>
              <Text style={s.textR}>{p.desc}</Text>
            </View>
          ))}</>}
        </View>
      </Page>
    </Document>
  );
}`;

// --------------------------------------------------------------------------------------
// Generate all 30
// --------------------------------------------------------------------------------------
function run() {
  const tplDir = path.join(__dirname, 'src', 'templates');
  const imports = [];
  const mapCode = [];

  // Theme Palettes
  const palettes = [
    { cMain:'#0369a1', cBg:'#0f172a', cText:'#cbd5e1' }, // 0: Dark Blue / Slate
    { cMain:'#059669', cBg:'#18181b', cText:'#d4d4d8' }, // 1: Emerald / Zinc
    { cMain:'#7c3aed', cBg:'#1e1b4b', cText:'#ddd6fe' }, // 2: Violet / Deep Purple
    { cMain:'#e11d48', cBg:'#171717', cText:'#e5e5e5' }, // 3: Rose / Neutral
    { cMain:'#0284c7', cBg:'#082f49', cText:'#bae6fd' }, // 4: Sky / Deep Blue
    { cMain:'#d97706', cBg:'#27272a', cText:'#e4e4e7' }  // 5: Amber / Zinc
  ];

  for (let i = 0; i < 30; i++) {
    const prof = PROFESSIONS[i];
    const ComponentName = `Pro${prof.id}_${sanitize(prof.title)}`;
    
    // Cycle through the 4 distinct structural designs
    const designType = i % 4; 
    // Cycle through the 6 color palettes independently
    const pal = palettes[i % palettes.length]; 

    let code = '';
    if (designType === 0) code = design0(ComponentName, pal.cMain, pal.cBg, pal.cText);
    else if (designType === 1) code = design1(ComponentName, pal.cMain);
    else if (designType === 2) code = design2(ComponentName, pal.cMain);
    else if (designType === 3) code = design3(ComponentName, pal.cMain, pal.cBg);

    fs.writeFileSync(path.join(tplDir, ComponentName + '.js'), code);
    console.log(`  ✓ ${ComponentName} (Design ${designType})`);

    imports.push(`import ${ComponentName} from './${ComponentName}';`);
    mapCode.push(`  'pro-${prof.id}': { component: ${ComponentName}, title: '${prof.title}' },`);
  }

  const masterFile = imports.join('\n') +
    '\n\nexport const ProfessionTemplates = {\n' +
    mapCode.join('\n') +
    '\n};\n';

  fs.writeFileSync(path.join(tplDir, 'ProfessionTemplates.js'), masterFile);
  console.log('\n✅ All 30 templates generated with distinct UI structures!');
}

run();
