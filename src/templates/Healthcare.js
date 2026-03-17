import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { prime: '#059669', dark: '#111827', text: '#374151', bg: '#f9fafb' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Helvetica', fontSize: 10, color: C.text, backgroundColor: '#fff', padding: '40 50' },
  header:   { backgroundColor: C.bg, padding: 25, borderRadius: 8, marginBottom: 20 },
  name:     { fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 4 },
  title:    { fontSize: 12, color: C.prime, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 },
  contact:  { flexDirection: 'row', gap: 12, marginTop: 10, flexWrap: 'wrap' },
  cItem:    { fontSize: 9, color: '#4b5563', flexDirection: 'row', alignItems: 'center' },
  link:     { color: C.prime, textDecoration: 'none' },

  secHead:  { fontSize: 13, fontWeight: 700, color: C.dark, borderBottom: `2 solid ${C.prime}`, paddingBottom: 4, marginBottom: 12, marginTop: 15 },
  text:     { fontSize: 10, lineHeight: 1.6 },

  grid:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  certRow:  { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottom: '1 solid #e5e7eb' },
  cName:    { fontSize: 10, fontWeight: 700, color: C.dark },
  cIss:     { fontSize: 9, color: '#6b7280' },
  cDate:    { fontSize: 9, color: C.prime, fontWeight: 700 },

  expWrap:  { marginBottom: 16 },
  eRole:    { fontSize: 11, fontWeight: 700, color: C.dark },
  eMeta:    { fontSize: 9.5, color: '#4b5563', marginTop: 2, marginBottom: 6 },
  bullet:   { flexDirection: 'row', marginBottom: 3 },
  bDot:     { width: 12, fontSize: 10, color: C.prime },
  bTxt:     { flex: 1, fontSize: 9.5, lineHeight: 1.5 },
});

export default function Healthcare({ data: d }) {
  return (
    <Document title={`${d.name} – Clinical CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contact}>
            <Text style={s.cItem}>📍 {d.location}</Text>
            <Text style={s.cItem}>📞 {d.phone}</Text>
            <Link src={`mailto:${d.email}`} style={[s.cItem, s.link]}>✉️ {d.email}</Link>
          </View>
        </View>

        <View>
          <Text style={s.secHead}>Professional Summary</Text>
          <Text style={s.text}>{d.summary}</Text>
        </View>

        {/* Certifications (Prominent for Healthcare) */}
        <View>
          <Text style={s.secHead}>Licenses &amp; Certifications</Text>
          {d.certs.map(c => (
            <View key={c.id} style={s.certRow}>
              <View>
                <Text style={s.cName}>{c.name}</Text>
                <Text style={s.cIss}>{c.issuer}</Text>
              </View>
              <Text style={s.cDate}>{c.date}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={s.secHead}>Clinical Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.expWrap}>
              <View style={s.grid}>
                <Text style={s.eRole}>{e.role}</Text>
                <Text style={{ fontSize: 9, fontWeight: 700 }}>{e.dates}</Text>
              </View>
              <Text style={s.eMeta}>{e.company} | {e.location}</Text>
              {e.bullets.map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bDot}>+</Text>
                  <Text style={s.bTxt}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View>
          <Text style={s.secHead}>Education</Text>
          {d.education.map(e => (
            <View key={e.id} style={{ marginBottom: 8 }}>
              <View style={s.grid}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: C.dark }}>{e.degree} in {e.sub}</Text>
                <Text style={{ fontSize: 9, fontWeight: 700 }}>{e.dates}</Text>
              </View>
              <Text style={{ fontSize: 9.5, color: '#4b5563' }}>{e.institution}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
