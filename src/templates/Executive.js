import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { dark: '#2c3e50', line: '#34495e', highlight: '#2980b9' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Helvetica', fontSize: 10, color: '#333', backgroundColor: '#fff', padding: '40 45', borderTop: `6 solid ${C.dark}` },
  header:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 15, borderBottom: `2 solid ${C.line}`, marginBottom: 20 },
  name:     { fontSize: 26, fontWeight: 700, color: C.dark, textTransform: 'uppercase', letterSpacing: 1 },
  title:    { fontSize: 13, color: C.highlight, fontWeight: 700, marginTop: 4 },
  contact:  { alignItems: 'flex-end', gap: 3 },
  cText:    { fontSize: 9, color: '#555' },
  link:     { color: C.highlight, textDecoration: 'none' },

  secWrap:  { marginBottom: 18 },
  secTitle: { fontSize: 12, fontWeight: 700, color: C.dark, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  summary:  { fontSize: 10, lineHeight: 1.6, color: '#444' },

  jobWrap:  { marginBottom: 12 },
  jobHead:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  role:     { fontSize: 11, fontWeight: 700, color: C.dark },
  company:  { fontSize: 10, fontWeight: 700, color: C.highlight, marginTop: 2 },
  dates:    { fontSize: 9, color: '#7f8c8d', fontWeight: 700 },
  bullets:  { marginTop: 6 },
  bullet:   { flexDirection: 'row', marginBottom: 3 },
  bDot:     { width: 12, fontSize: 10, color: C.highlight },
  bTxt:     { flex: 1, fontSize: 9.5, lineHeight: 1.5 },

  grid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  tag:      { backgroundColor: '#ecf0f1', color: C.dark, padding: '4 8', borderRadius: 2, fontSize: 8.5, fontWeight: 700 },
});

export default function Executive({ data: d }) {
  return (
    <Document title={`${d.name} – Executive CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <View>
            <Text style={s.name}>{d.name}</Text>
            <Text style={s.title}>{d.title}</Text>
          </View>
          <View style={s.contact}>
            <Text style={s.cText}>{d.location}</Text>
            <Text style={s.cText}>{d.phone}</Text>
            <Link src={`mailto:${d.email}`} style={[s.cText, s.link]}>{d.email}</Link>
            <Link src={d.linkedin} style={[s.cText, s.link]}>{d.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</Link>
          </View>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Executive Summary</Text>
          <Text style={s.summary}>{d.summary}</Text>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Professional Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.jobWrap}>
              <View style={s.jobHead}>
                <Text style={s.role}>{e.role}</Text>
                <Text style={s.dates}>{e.dates}</Text>
              </View>
              <Text style={s.company}>{e.company} | {e.location}</Text>
              <View style={s.bullets}>
                {e.bullets.map((b, i) => (
                  <View key={i} style={s.bullet}>
                    <Text style={s.bDot}>▸</Text>
                    <Text style={s.bTxt}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Core Competencies</Text>
          <View style={s.grid}>
            {[...(d.tagsLang||[]), ...(d.tagsAI||[]), ...(d.tagsTools||[])].map((t, i) => (
              <Text key={i} style={s.tag}>{t}</Text>
            ))}
          </View>
        </View>

        <View style={s.secWrap}>
          <Text style={s.secTitle}>Education &amp; Credentials</Text>
          {d.education.map(e => (
            <View key={e.id} style={{ marginBottom: 6 }}>
              <View style={s.jobHead}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: C.dark }}>{e.degree} in {e.sub}</Text>
                <Text style={s.dates}>{e.dates}</Text>
              </View>
              <Text style={{ fontSize: 9.5, color: '#555', marginTop: 1 }}>{e.institution}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
}
