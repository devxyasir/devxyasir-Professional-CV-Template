import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const C = { bg: '#fafafa', primary: '#ff4757', text: '#2f3542', muted: '#747d8c', light: '#dfe4ea' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Helvetica', fontSize: 9, color: C.text, backgroundColor: C.bg, padding: 30 },
  header:   { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  hLeft:    { flex: 1 },
  hRight:   { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 },
  name:     { fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: '#2f3542' },
  title:    { fontSize: 11, fontWeight: 700, color: C.primary, textTransform: 'uppercase', letterSpacing: 1 },
  pill:     { backgroundColor: '#fff', border: `1 solid ${C.light}`, padding: '4 8', borderRadius: 12, fontSize: 7.5, color: C.text },
  link:     { color: C.text, textDecoration: 'none' },

  cols:     { flexDirection: 'row', gap: 20 },
  main:     { flex: 2 },
  side:     { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 8, border: `1 solid ${C.light}` },

  secTitle: { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: '#2f3542', marginBottom: 10 },
  summary:  { fontSize: 9, lineHeight: 1.6, color: C.text, marginBottom: 15 },

  expCard:  { backgroundColor: '#fff', padding: 12, borderRadius: 6, border: `1 solid ${C.light}`, marginBottom: 10 },
  eHead:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eRole:    { fontSize: 10, fontWeight: 700, color: '#2f3542' },
  eComp:    { fontSize: 8.5, color: C.primary, fontWeight: 700, marginTop: 2 },
  eDate:    { fontSize: 7.5, color: C.muted, fontWeight: 700, backgroundColor: C.light, padding: '3 6', borderRadius: 4 },
  eBullets: { marginTop: 6, paddingLeft: 8 },
  eBull:    { flexDirection: 'row', marginBottom: 2 },
  eDot:     { width: 8, fontSize: 8, color: C.primary },
  eTxt:     { flex: 1, fontSize: 8.5, lineHeight: 1.5, color: C.text },

  sBlock:   { marginBottom: 15 },
  sLabel:   { fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  tagGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag:      { backgroundColor: '#f1f2f6', color: C.text, padding: '3 6', borderRadius: 3, fontSize: 7.5, fontWeight: 700 }
});

export default function Startup({ data: d }) {
  const short = (u) => (u || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return (
    <Document title={`${d.name} – Startup CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        
        <View style={s.header}>
          <View style={s.hLeft}>
            <Text style={s.name}>{d.name}</Text>
            <Text style={s.title}>{d.title}</Text>
          </View>
          <View style={s.hRight}>
            <Text style={s.pill}>{d.location}</Text>
            <Text style={s.pill}>{d.phone}</Text>
            <Link src={`mailto:${d.email}`} style={[s.pill, s.link]}>{d.email}</Link>
            <Link src={d.github} style={[s.pill, s.link]}>GH: {short(d.github)}</Link>
          </View>
        </View>

        <View style={s.cols}>
          {/* Main Content */}
          <View style={s.main}>
            <Text style={s.secTitle}>About</Text>
            <Text style={s.summary}>{d.summary}</Text>

            <Text style={s.secTitle}>Experience</Text>
            {d.experience.map(e => (
              <View key={e.id} style={s.expCard}>
                <View style={s.eHead}>
                  <View>
                    <Text style={s.eRole}>{e.role}</Text>
                    <Text style={s.eComp}>{e.company}</Text>
                  </View>
                  <Text style={s.eDate}>{e.dates}</Text>
                </View>
                <View style={s.eBullets}>
                  {e.bullets.map((b, i) => (
                    <View key={i} style={s.eBull}>
                      <Text style={s.eDot}>•</Text>
                      <Text style={s.eTxt}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Sidebar */}
          <View style={s.side}>
            <Text style={s.secTitle}>Tech Stack</Text>
            <View style={s.sBlock}>
              <Text style={s.sLabel}>Languages</Text>
              <View style={s.tagGrid}>
                {d.tagsLang.map((t, i) => <Text key={i} style={s.tag}>{t}</Text>)}
              </View>
            </View>
            <View style={s.sBlock}>
              <Text style={s.sLabel}>Infrastructure &amp; Tools</Text>
              <View style={s.tagGrid}>
                {d.tagsTools.map((t, i) => <Text key={i} style={s.tag}>{t}</Text>)}
              </View>
            </View>

            <Text style={[s.secTitle, { marginTop: 10 }]}>Education</Text>
            {d.education.map(e => (
              <View key={e.id} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 8.5, fontWeight: 700 }}>{e.degree}</Text>
                <Text style={{ fontSize: 7.5, color: C.muted, marginTop: 2 }}>{e.institution}</Text>
                <Text style={{ fontSize: 7.5, color: C.primary, fontWeight: 700, marginTop: 2 }}>{e.dates}</Text>
              </View>
            ))}

            <Text style={[s.secTitle, { marginTop: 10 }]}>Logistics</Text>
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 8 }}>Availability: <Text style={{ fontWeight: 700 }}>{d.avail}</Text></Text>
              <Text style={{ fontSize: 8 }}>Visa: <Text style={{ fontWeight: 700 }}>{d.visa}</Text></Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
}
