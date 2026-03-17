import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const s = StyleSheet.create({
  page:     { fontFamily: 'Times-Roman', fontSize: 10, color: '#000', backgroundColor: '#fff', padding: '36 48' },
  header:   { textAlign: 'center', marginBottom: 15, borderBottom: '1px solid #000', paddingBottom: 10 },
  name:     { fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 },
  title:    { fontSize: 12, marginBottom: 4 },
  contact:  { fontSize: 9, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8 },
  link:     { color: '#000', textDecoration: 'none' },
  secHead:  { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6, borderBottom: '1px solid #000', paddingBottom: 2, marginTop: 12 },
  secBody:  { marginBottom: 8 },
  row:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bold:     { fontWeight: 700 },
  italic:   { fontStyle: 'italic' },
  bulletWrap: { flexDirection: 'row', marginBottom: 2 },
  bullet:   { width: 12, fontSize: 10 },
  bText:    { flex: 1, fontSize: 10, lineHeight: 1.4 },
  text:     { fontSize: 10, lineHeight: 1.4 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
});

const short = (u) => (u || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export default function AtsClassic({ data: d }) {
  return (
    <Document title={`${d.name} – ATS CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contact}>
            <Text>{d.location} | {d.phone} | <Link src={`mailto:${d.email}`} style={s.link}>{d.email}</Link> | <Link src={d.linkedin} style={s.link}>{short(d.linkedin)}</Link></Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View>
          <Text style={s.secHead}>Professional Summary</Text>
          <Text style={s.text}>{d.summary}</Text>
        </View>

        {/* Experience */}
        <View>
          <Text style={s.secHead}>Professional Experience</Text>
          {d.experience.map(e => (
            <View key={e.id} style={s.secBody}>
              <View style={s.row}>
                <Text style={s.bold}>{e.role}</Text>
                <Text style={s.bold}>{e.dates}</Text>
              </View>
              <View style={[s.row, { marginBottom: 4 }]}>
                <Text style={s.italic}>{e.company}, {e.location}</Text>
              </View>
              {e.bullets.map((b, i) => (
                <View key={i} style={s.bulletWrap}>
                  <Text style={s.bullet}>•</Text>
                  <Text style={s.bText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View>
          <Text style={s.secHead}>Education</Text>
          {d.education.map(e => (
            <View key={e.id} style={s.secBody}>
              <View style={s.row}>
                <Text style={s.bold}>{e.degree} in {e.sub}</Text>
                <Text style={s.bold}>{e.dates}</Text>
              </View>
              <Text>{e.institution}</Text>
              {e.thesis && <Text style={[s.italic, { marginTop: 2 }]}>Thesis: {e.thesis}</Text>}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View>
          <Text style={s.secHead}>Technical Skills</Text>
          <Text style={s.text}><Text style={s.bold}>Languages/Frameworks:</Text> {(d.tagsLang || []).join(', ')}</Text>
          <Text style={s.text}><Text style={s.bold}>Data/AI:</Text> {((d.tagsData || []).concat(d.tagsAI || [])).join(', ')}</Text>
          <Text style={s.text}><Text style={s.bold}>Tools/Platforms:</Text> {(d.tagsTools || []).join(', ')}</Text>
        </View>

        {/* Certifications (if fit on page 1) */}
        {d.certs && d.certs.length > 0 && (
          <View>
            <Text style={s.secHead}>Certifications</Text>
            {d.certs.map(c => (
              <View key={c.id} style={s.row}>
                <Text><Text style={s.bold}>{c.name}</Text>, {c.issuer}</Text>
                <Text>{c.date}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
