import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '#d97706';
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
  tagPill: { backgroundColor:'rgba(217,119,6,0.1)', color:A, padding:'4 10', borderRadius:14, fontSize:8, fontWeight:700 }
});

export default function Pro6_FinancialAnalyst({ data, photoSrc }) {
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
}