import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const s = StyleSheet.create({
  page:     { fontFamily: 'Times-Roman', fontSize: 10, color: '#000', backgroundColor: '#fff', padding: '36 48' },
  header:   { textAlign: 'center', marginBottom: 12 },
  name:     { fontSize: 16, fontWeight: 700, textTransform: 'uppercase' },
  contact:  { fontSize: 9, marginTop: 4 },
  
  secTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 1, marginBottom: 6, marginTop: 12 },
  
  expBlock: { marginBottom: 8 },
  eHead:    { flexDirection: 'row', justifyContent: 'space-between' },
  bold:     { fontWeight: 700 },
  italic:   { fontStyle: 'italic' },
  eCompLoc: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  
  bulletRow:{ flexDirection: 'row', marginBottom: 1 },
  bDot:     { width: 10, fontSize: 10 },
  bTxt:     { flex: 1, fontSize: 9.5, lineHeight: 1.3 },

  eduBlock: { marginBottom: 6 },
  eTop:     { flexDirection: 'row', justifyContent: 'space-between' },
  eBot:     { flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 },
  
  skills:   { fontSize: 9.5, lineHeight: 1.5 }
});

export default function FinancePro({ data: d }) {
  return (
    <Document title={`${d.name} – CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        {/* Header (No links, strictly text for finance ATS parsers) */}
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.contact}>{d.location} | {d.phone} | {d.email} | {d.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</Text>
        </View>

        {/* Education (Often first in Finance) */}
        <View>
          <Text style={s.secTitle}>Education</Text>
          {d.education.map(e => (
            <View key={e.id} style={s.eduBlock}>
              <View style={s.eTop}>
                <Text style={s.bold}>{e.institution}</Text>
                <Text>{e.location || ''}</Text>
              </View>
              <View style={s.eBot}>
                <Text style={s.italic}>{e.degree} in {e.sub}</Text>
                <Text>{e.dates}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View>
          <Text style={s.secTitle}>Professional Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.expBlock}>
              <View style={s.eHead}>
                <Text style={s.bold}>{e.company}</Text>
                <Text>{e.location}</Text>
              </View>
              <View style={s.eCompLoc}>
                <Text style={s.italic}>{e.role}</Text>
                <Text>{e.dates}</Text>
              </View>
              {e.bullets.map((b, i) => (
                <View key={i} style={s.bulletRow}>
                  <Text style={s.bDot}>-</Text>
                  <Text style={s.bTxt}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Additional Info / Skills */}
        <View>
          <Text style={s.secTitle}>Skills, Certifications &amp; Other Information</Text>
          <Text style={s.skills}><Text style={s.bold}>Certifications:</Text> {d.certs.map(c => `${c.name} (${c.date})`).join(', ')}</Text>
          <Text style={s.skills}><Text style={s.bold}>Technical Skills:</Text> {[...(d.tagsLang||[]), ...(d.tagsTools||[]), ...(d.tagsData||[])].join(', ')}</Text>
          <Text style={s.skills}><Text style={s.bold}>Languages:</Text> {d.langs.map(l => `${l.name} (${l.level})`).join(', ')}</Text>
          <Text style={s.skills}><Text style={s.bold}>Interests:</Text> {d.interests.join(', ')}</Text>
          <Text style={s.skills}><Text style={s.bold}>Work Authorization:</Text> {d.visa} ({d.visaexp})</Text>
        </View>
      </Page>
    </Document>
  );
}
