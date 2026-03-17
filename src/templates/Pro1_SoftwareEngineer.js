import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const s = StyleSheet.create({
  page:   { fontFamily:'Helvetica', fontSize:9, flexDirection:'row', backgroundColor:'#fff' },
  side:   { width:210, backgroundColor:'#0f172a', padding:'36 24', flexShrink:0, color:'#cbd5e1' },
  main:   { flex:1, padding:'36 32 30 26' },
  photo:  { width:88, height:88, borderRadius:44, alignSelf:'center', marginBottom:18, border:'4px solid #0369a1' },
  name:   { fontSize:16, fontWeight:700, color:'#fff', textAlign:'center', letterSpacing:1, marginBottom:4 },
  title:  { fontSize:9.5, color:'#0369a1', textAlign:'center', marginBottom:20, letterSpacing:0.5 },
  label:  { fontSize:8.5, fontWeight:700, textTransform:'uppercase', letterSpacing:1.5, marginBottom:8, marginTop:18, color:'#0369a1' },
  pText:  { fontSize:8.5, lineHeight:1.5, marginBottom:4 },
  barBg:  { height:4, backgroundColor:'rgba(255,255,255,0.15)', borderRadius:2, marginTop:3, marginBottom:8 },
  barFg:  { height:4, backgroundColor:'#0369a1', borderRadius:2 },
  mHead:  { fontSize:13, fontWeight:700, color:'#111', textTransform:'uppercase', letterSpacing:1.5, borderBottom:'2px solid #0369a1', paddingBottom:4, marginBottom:12, marginTop:20 },
  mText:  { fontSize:9.5, lineHeight:1.6, color:'#444', textAlign:'justify', marginBottom:8 },
  expBlk: { marginLeft:10, borderLeft:'1px solid #0369a1', paddingLeft:14, paddingBottom:12, position:'relative' },
  dot:    { position:'absolute', left:-18, top:2, width:7, height:7, borderRadius:3.5, backgroundColor:'#0369a1' },
  bold:   { fontWeight:700, fontSize:10.5, color:'#111' },
  dates:  { fontSize:9, color:'#0369a1', fontWeight:700, marginTop:1, marginBottom:2 },
  italic: { fontStyle:'italic', fontSize:9.5, color:'#555', marginBottom:4 },
  bullet: { flexDirection:'row', marginBottom:3 },
  bDot:   { width:12, fontSize:10, color:'#0369a1' },
  bText:  { flex:1, fontSize:9, lineHeight:1.5, color:'#444' }
});

export default function Pro1_SoftwareEngineer({ data, photoSrc }) {
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
}