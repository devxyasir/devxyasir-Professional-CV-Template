import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '#e11d48'; const D = '#171717';
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

export default function Pro16_MechanicalEngineer({ data, photoSrc }) {
  const d = (data && data.name) ? data : DEFAULT;
  return (
    <Document title={d.name + ' – CV'} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.colL}>
          {photoSrc && <View style={s.photoFrame}><Image src={photoSrc} style={s.photo} /></View>}
          <Text style={s.nameBlt}>{d.name.split(' ').map((n,i)=><Text key={i}>{n}{'\n'}</Text>)}</Text>
          <Text style={s.titleBlt}>{d.title}</Text>
          
          <Text style={s.headL}>Contact Details</Text>
          <Text style={s.textL}>{d.phone}</Text>
          <Text style={s.textL}>{d.email}</Text>
          <Text style={s.textL}>{d.location}</Text>
          {d.linkedin && <Text style={s.textL}>{d.linkedin.replace(/^https?:\/\/(www\.)?/,'')}</Text>}

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
}