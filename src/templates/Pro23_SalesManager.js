import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { DEFAULT } from '../defaultData';

const A = '#0284c7';
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

export default function Pro23_SalesManager({ data, photoSrc }) {
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
}