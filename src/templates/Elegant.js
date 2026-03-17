import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { prime: '#374151', text: '#4b5563', link: '#6b7280' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Times-Roman', fontSize: 10, color: C.text, backgroundColor: '#fff', padding: '50 60' },
  header:   { textAlign: 'center', marginBottom: 25 },
  name:     { fontSize: 24, fontWeight: 700, color: C.prime, letterSpacing: 2, textTransform: 'uppercase' },
  title:    { fontSize: 12, color: C.text, marginTop: 4, letterSpacing: 1 },
  contact:  { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 12 },
  cTxt:     { fontSize: 9.5, color: '#6b7280' },
  link:     { color: '#6b7280', textDecoration: 'none' },

  secWrap:  { marginBottom: 18 },
  secTitle: { fontSize: 13, fontWeight: 700, color: C.prime, textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center', marginBottom: 15 },
  line:     { borderBottom: '1 solid #e5e7eb', marginBottom: 12, marginTop: -8 },

  summary:  { fontSize: 10, lineHeight: 1.8, textAlign: 'center', paddingHorizontal: 20 },

  expWrap:  { marginBottom: 14 },
  eTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  eRole:    { fontSize: 11, fontWeight: 700, color: C.prime },
  eDate:    { fontSize: 9.5, fontStyle: 'italic', color: '#6b7280' },
  eComp:    { fontSize: 10.5, fontStyle: 'italic', color: C.text, marginTop: 2, marginBottom: 6 },
  bullet:   { flexDirection: 'row', marginBottom: 3 },
  bDot:     { width: 12, fontSize: 10, textAlign: 'center' },
  bTxt:     { flex: 1, fontSize: 10, lineHeight: 1.6 },

  eduWrap:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 },
  
  skills:   { textAlign: 'center', fontSize: 10, lineHeight: 1.8 }
});

export default function Elegant({ data: d }) {
  return (
    <Document title={`${d.name} – CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contact}>
            <Text style={s.cTxt}>{d.location}</Text>
            <Text style={s.cTxt}>|</Text>
            <Text style={s.cTxt}>{d.phone}</Text>
            <Text style={s.cTxt}>|</Text>
            <Link src={`mailto:${d.email}`} style={[s.cTxt, s.link]}>{d.email}</Link>
          </View>
        </View>

        <View style={s.secWrap}>
          <Text style={s.summary}>{d.summary}</Text>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Professional Profile</Text>
          <View style={s.line} />
          {d.experience.map(e => (
            <View key={e.id} style={s.expWrap}>
              <View style={s.eTop}>
                <Text style={s.eRole}>{e.role}</Text>
                <Text style={s.eDate}>{e.dates}</Text>
              </View>
              <Text style={s.eComp}>{e.company}, {e.location}</Text>
              {e.bullets.map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bDot}>•</Text>
                  <Text style={s.bTxt}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Education</Text>
          <View style={s.line} />
          {d.education.map(e => (
            <View key={e.id} style={s.eduWrap}>
              <View>
                <Text style={{ fontSize: 10.5, fontWeight: 700, color: C.prime }}>{e.degree} in {e.sub}</Text>
                <Text style={{ fontSize: 10, fontStyle: 'italic', color: C.text, marginTop: 2 }}>{e.institution}</Text>
              </View>
              <Text style={s.eDate}>{e.dates}</Text>
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Expertise</Text>
          <View style={s.line} />
          <Text style={s.skills}>{([...(d.tagsLang||[]), ...(d.tagsTools||[]), ...(d.skills||[]).map(s=>s.name)]).join('  •  ')}</Text>
        </View>

      </Page>
    </Document>
  );
}
