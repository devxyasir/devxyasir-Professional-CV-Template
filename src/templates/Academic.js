import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { hdr: '#1b263b', txt: '#000', link: '#415a77', line: '#778da9' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Times-Roman', fontSize: 11, color: C.txt, backgroundColor: '#fff', padding: '50 60' },
  header:   { textAlign: 'center', marginBottom: 25 },
  name:     { fontSize: 22, fontWeight: 700, color: C.hdr, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  contact:  { fontSize: 10, color: '#333' },
  link:     { color: C.link, textDecoration: 'none' },

  secWrap:  { marginBottom: 20 },
  secTitle: { fontSize: 13, fontWeight: 700, color: C.hdr, borderBottom: `1 solid ${C.line}`, paddingBottom: 4, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  
  eduWrap:  { marginBottom: 14 },
  eHead:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  eDeg:     { fontSize: 11.5, fontWeight: 700 },
  eDate:    { fontSize: 10, fontStyle: 'italic' },
  eInst:    { fontSize: 11, fontStyle: 'italic', marginBottom: 4 },
  eThesis:  { fontSize: 10.5, lineHeight: 1.5 },

  summary:  { fontSize: 11, lineHeight: 1.7, textAlign: 'justify' },

  expWrap:  { marginBottom: 14 },
  expRole:  { fontSize: 11.5, fontWeight: 700 },
  expComp:  { fontSize: 11, fontStyle: 'italic' },
  bullets:  { marginTop: 6, paddingLeft: 10 },
  bull:     { flexDirection: 'row', marginBottom: 3 },
  bDot:     { width: 12, fontSize: 11 },
  bTxt:     { flex: 1, fontSize: 10.5, lineHeight: 1.6 },

  achWrap:  { flexDirection: 'row', marginBottom: 6 },
  aTxt:     { flex: 1, fontSize: 11, lineHeight: 1.6 },
});

export default function Academic({ data: d }) {
  return (
    <Document title={`${d.name} – Curriculum Vitae`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.contact}>{d.location} • {d.phone}</Text>
          <Text style={[s.contact, { marginTop: 3 }]}>
            <Link src={`mailto:${d.email}`} style={s.link}>{d.email}</Link> • <Link src={d.linkedin} style={s.link}>LinkedIn</Link>
          </Text>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Research Interests &amp; Summary</Text>
          <Text style={s.summary}>{d.summary}</Text>
          <Text style={[s.summary, { marginTop: 8, fontStyle: 'italic' }]}>Focus Areas: {d.interests.join(' • ')}</Text>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Education</Text>
          {d.education.map((e, i) => (
            <View key={e.id || i} style={s.eduWrap}>
              <View style={s.eHead}>
                <Text style={s.eDeg}>{e.degree} in {e.sub}</Text>
                <Text style={s.eDate}>{e.dates}</Text>
              </View>
              <Text style={s.eInst}>{e.institution}</Text>
              {e.thesis && <Text style={s.eThesis}><Text style={{ fontWeight: 700 }}>Thesis/Dissertation:</Text> "{e.thesis}"</Text>}
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Academic &amp; Professional Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.expWrap}>
              <View style={s.eHead}>
                <Text style={s.expRole}>{e.role}</Text>
                <Text style={s.eDate}>{e.dates}</Text>
              </View>
              <Text style={s.expComp}>{e.company}, {e.location}</Text>
              <View style={s.bullets}>
                {e.bullets.map((b, i) => (
                  <View key={i} style={s.bull}>
                    <Text style={s.bDot}>-</Text>
                    <Text style={s.bTxt}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Publications, Awards &amp; Activities</Text>
          {d.achievements.map((a, i) => (
            <View key={i} style={s.achWrap}>
              <Text style={s.bDot}>[+]</Text>
              <Text style={s.aTxt}>{a}</Text>
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Languages</Text>
          {d.langs.map((l, i) => (
             <Text key={i} style={{ fontSize: 11, marginBottom: 4 }}><Text style={{ fontWeight: 700 }}>{l.name}: </Text>{l.level}</Text>
          ))}
        </View>

      </Page>
    </Document>
  );
}
