import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { main: '#0f172a', accent: '#2563eb', border: '#cbd5e1', text: '#334155' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Helvetica', fontSize: 9.5, color: C.text, backgroundColor: '#fff', padding: '35 40' },
  header:   { flexDirection: 'row', justifyContent: 'space-between', borderBottom: `1 solid ${C.border}`, paddingBottom: 15, marginBottom: 15 },
  name:     { fontSize: 24, fontWeight: 700, color: C.main, letterSpacing: -0.5 },
  title:    { fontSize: 11, color: C.accent, fontWeight: 700, marginTop: 4 },
  contact:  { alignItems: 'flex-end', gap: 4, justifyContent: 'center' },
  link:     { color: C.accent, textDecoration: 'none' },

  secHead:  { fontSize: 11, fontWeight: 700, color: C.main, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 15 },
  
  grid:     { flexDirection: 'row', flexWrap: 'wrap', gap: '8 20' },
  skillGrp: { width: '45%', marginBottom: 8 },
  skLbl:    { fontSize: 8.5, fontWeight: 700, color: C.main, marginBottom: 2 },
  skTxt:    { fontSize: 9, lineHeight: 1.4 },

  expWrap:  { marginBottom: 14 },
  eTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  eRole:    { fontSize: 11, fontWeight: 700, color: C.main },
  eDate:    { fontSize: 9, color: '#64748b' },
  eComp:    { fontSize: 9.5, fontWeight: 700, color: C.accent, marginTop: 2, marginBottom: 4 },
  bullet:   { flexDirection: 'row', marginBottom: 2.5 },
  bDot:     { width: 10, fontSize: 12, color: C.accent, lineHeight: 0.8 },
  bTxt:     { flex: 1, fontSize: 9.5, lineHeight: 1.5 },

  eduWrap:  { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottom: '1 solid #f1f5f9' },
});

export default function Engineer({ data: d }) {
  return (
    <Document title={`${d.name} – Engineering CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <View>
            <Text style={s.name}>{d.name}</Text>
            <Text style={s.title}>{d.title}</Text>
          </View>
          <View style={s.contact}>
            <Text>{d.location} ❘ {d.phone}</Text>
            <Link src={`mailto:${d.email}`} style={s.link}>{d.email}</Link>
            <Link src={d.github} style={s.link}>{d.github.replace(/^https?:\/\/(www\.)?/, '')}</Link>
          </View>
        </View>

        <View>
          <Text style={s.secHead}>Technical Arsenal</Text>
          <View style={s.grid}>
            <View style={s.skillGrp}>
              <Text style={s.skLbl}>Languages &amp; Core</Text>
              <Text style={s.skTxt}>{(d.tagsLang||[]).join(', ')}</Text>
            </View>
            <View style={s.skillGrp}>
              <Text style={s.skLbl}>Infrastructure &amp; Tools</Text>
              <Text style={s.skTxt}>{(d.tagsTools||[]).join(', ')}</Text>
            </View>
            <View style={s.skillGrp}>
              <Text style={s.skLbl}>Data / ML / Cloud</Text>
              <Text style={s.skTxt}>{(d.tagsData||[]).concat(d.tagsAI||[]).join(', ')}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={s.secHead}>Engineering Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.expWrap}>
              <View style={s.eTop}>
                <Text style={s.eRole}>{e.role}</Text>
                <Text style={s.eDate}>{e.dates}</Text>
              </View>
              <Text style={s.eComp}>{e.company}</Text>
              {e.bullets.map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bDot}>.</Text>
                  <Text style={s.bTxt}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View>
          <Text style={s.secHead}>Education</Text>
          {d.education.map(e => (
            <View key={e.id} style={s.eduWrap}>
              <View>
                <Text style={{ fontWeight: 700, color: C.main }}>{e.degree} in {e.sub}</Text>
                <Text style={{ color: '#64748b', marginTop: 2 }}>{e.institution}</Text>
              </View>
              <Text style={{ fontWeight: 700 }}>{e.dates}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
}
