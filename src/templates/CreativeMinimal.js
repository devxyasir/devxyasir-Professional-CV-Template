import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { main: '#111827', accent: '#4f46e5', light: '#f3f4f6', text: '#4b5563' };

const s = StyleSheet.create({
  page:     { fontFamily: 'Helvetica', fontSize: 10, color: C.text, backgroundColor: '#fff', padding: '40 50' },
  header:   { marginBottom: 30 },
  name:     { fontSize: 32, fontWeight: 700, color: C.main, letterSpacing: -1, marginBottom: 4 },
  title:    { fontSize: 14, color: C.accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' },
  contactArea: { flexDirection: 'row', marginTop: 15, gap: 15, flexWrap: 'wrap' },
  contactPill: { backgroundColor: C.light, padding: '4 10', borderRadius: 4, fontSize: 8.5, color: '#374151', fontWeight: 700 },
  link:     { color: '#374151', textDecoration: 'none' },
  
  cols:     { flexDirection: 'row', gap: 30 },
  colMain:  { flex: 2 },
  colSide:  { flex: 1 },

  secHead:  { fontSize: 11, fontWeight: 700, color: C.main, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, marginTop: 15 },
  text:     { fontSize: 9.5, lineHeight: 1.6 },
  
  expBlock: { marginBottom: 16 },
  expRole:  { fontSize: 11, fontWeight: 700, color: C.main },
  expMeta:  { fontSize: 8.5, color: '#6b7280', marginTop: 2, marginBottom: 6 },
  bullet:   { flexDirection: 'row', marginBottom: 3 },
  bDot:     { width: 10, fontSize: 10, color: C.accent },
  bTxt:     { flex: 1, fontSize: 9.5, lineHeight: 1.5 },

  skillBadge: { backgroundColor: C.main, color: '#fff', padding: '4 8', borderRadius: 3, fontSize: 8, fontWeight: 700, marginBottom: 6, marginRight: 6 },
  skillWrap:  { flexDirection: 'row', flexWrap: 'wrap' }
});

export default function CreativeMinimal({ data: d }) {
  return (
    <Document title={`${d.name} – Creative CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contactArea}>
            <Text style={s.contactPill}>{d.location}</Text>
            <Text style={s.contactPill}>{d.phone}</Text>
            <Link src={`mailto:${d.email}`} style={[s.contactPill, s.link]}>{d.email}</Link>
            <Link src={d.linkedin} style={[s.contactPill, s.link]}>LinkedIn</Link>
          </View>
        </View>

        <View style={s.cols}>
          {/* Main Column */}
          <View style={s.colMain}>
            <Text style={s.secHead}>About Me</Text>
            <Text style={s.text}>{d.summary}</Text>

            <Text style={[s.secHead, { marginTop: 25 }]}>Experience</Text>
            {d.experience.map(e => (
              <View key={e.id} style={s.expBlock}>
                <Text style={s.expRole}>{e.role} @ {e.company}</Text>
                <Text style={s.expMeta}>{e.dates}  ·  {e.location}</Text>
                {e.bullets.map((b, i) => (
                  <View key={i} style={s.bullet}>
                    <Text style={s.bDot}>→</Text>
                    <Text style={s.bTxt}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Side Column */}
          <View style={s.colSide}>
            <Text style={s.secHead}>Expertise</Text>
            <View style={s.skillWrap}>
              {[...(d.tagsLang || []), ...(d.tagsTools || []), ...(d.tagsDesign || ['UX/UI', 'Figma', 'Prototyping'])].map((t, idx) => (
                 <Text key={idx} style={s.skillBadge}>{t}</Text>
              ))}
            </View>

            <Text style={[s.secHead, { marginTop: 25 }]}>Education</Text>
            {d.education.map(e => (
              <View key={e.id} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 700, color: C.main }}>{e.degree}</Text>
                <Text style={{ fontSize: 8.5, color: '#6b7280', marginTop: 2 }}>{e.institution}</Text>
                <Text style={{ fontSize: 8.5, color: '#6b7280' }}>{e.dates}</Text>
              </View>
            ))}

            <Text style={[s.secHead, { marginTop: 25 }]}>Languages</Text>
            {d.langs.map((l, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 9.5, fontWeight: 700, color: C.main }}>{l.name}</Text>
                <Text style={{ fontSize: 8.5, color: '#6b7280' }}>{l.level}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
