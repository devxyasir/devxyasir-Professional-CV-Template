import React from 'react';
import { Document, Page, View, Text, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';

// ── FONTS — Using built-in standard fonts to guarantee PDF generation
// Helvetica and Times-Roman are intrinsically supported by react-pdf.

// ── PALETTE
const C = { navy: '#1c2b3a', blue: '#1a5fa0', lg: '#e6eaee', txt: '#3d3d3d', muted: '#777' };

const s = StyleSheet.create({
  page:        { fontFamily: 'Helvetica', fontSize: 8.5, color: '#222', backgroundColor: '#fff' },
  accentBar:   { height: 3, backgroundColor: C.navy },

  // Header
  header:      { flexDirection: 'row', padding: '20 30 16 30', borderBottomWidth: 0.5, borderBottomColor: '#e2e6ea', alignItems: 'flex-start' },
  photoCircle: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#dce4ec', border: '1.5 solid #bdc9d4', flexShrink: 0, alignItems: 'center', justifyContent: 'center', marginRight: 18 },
  photoImg:    { width: 58, height: 58, borderRadius: 29 },
  initials:    { fontFamily: 'Times-Roman', fontSize: 17, fontWeight: 700, color: C.navy },
  nameBlock:   { flex: 1 },
  cvName:      { fontFamily: 'Times-Roman', fontSize: 19, fontWeight: 700, color: '#0d1c2b', letterSpacing: 0.2, lineHeight: 1.15 },
  cvTitle:     { fontSize: 7, fontWeight: 900, color: C.navy, textTransform: 'uppercase', letterSpacing: 2.2, marginTop: 4 },
  contacts:    { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  ctItem:      { fontSize: 7, color: '#444', marginRight: 12, marginBottom: 2 },
  ctLink:      { fontSize: 7, color: C.blue, textDecoration: 'none', marginRight: 12, marginBottom: 2 },
  metaCol:     { flexShrink: 0, alignItems: 'flex-end', gap: 3, paddingTop: 2, marginLeft: 12 },
  pillD:       { backgroundColor: C.navy, color: '#fff', fontSize: 6, fontWeight: 900, paddingHorizontal: 7, paddingVertical: 2.5, borderRadius: 1.5, textTransform: 'uppercase', letterSpacing: 1 },
  pillL:       { backgroundColor: C.lg, color: C.navy, fontSize: 6, fontWeight: 900, paddingHorizontal: 7, paddingVertical: 2.5, borderRadius: 1.5, textTransform: 'uppercase', letterSpacing: 1 },

  // Body layout
  body:        { flexDirection: 'row', flex: 1 },
  main:        { flex: 1, padding: '14 20 28 30', borderRightWidth: 0.5, borderRightColor: '#eaecee' },
  side:        { width: 150, padding: '14 14 28 14', flexShrink: 0 },

  // Section
  secWrap:     { marginBottom: 13 },
  secHead:     { fontFamily: 'Times-Roman', fontSize: 7, fontWeight: 700, color: '#0d1c2b', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: C.navy, paddingBottom: 3, marginBottom: 7 },

  // Summary
  summary:     { fontSize: 7.5, color: C.txt, lineHeight: 1.75 },

  // Jobs
  job:         { marginBottom: 11 },
  jobRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  jobL:        { flex: 1 },
  jobRole:     { fontSize: 8, fontWeight: 700, color: '#0d1c2b', lineHeight: 1.3 },
  jobCo:       { fontSize: 7, fontWeight: 700, color: C.blue, marginTop: 1 },
  jobLoc:      { fontSize: 6.5, color: C.muted, marginTop: 1 },
  badge:       { fontSize: 6.5, fontWeight: 700, color: C.navy, backgroundColor: C.lg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 1.5, flexShrink: 0, marginTop: 1 },
  bullets:     { paddingLeft: 10, marginTop: 4 },
  bullet:      { flexDirection: 'row', marginBottom: 2.5 },
  dot:         { fontSize: 8, color: C.navy, marginRight: 4, lineHeight: 1.5, marginTop: 0.5 },
  bulletTxt:   { fontSize: 7, color: C.txt, lineHeight: 1.68, flex: 1 },

  // Education
  eduRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eduDeg:      { fontSize: 8, fontWeight: 700, color: '#0d1c2b' },
  eduUni:      { fontSize: 7, fontWeight: 700, color: C.blue, marginTop: 1 },
  eduSub:      { fontSize: 6.5, color: C.muted, marginTop: 1 },
  thesis:      { fontSize: 6.5, color: '#555', fontStyle: 'italic', marginTop: 4, borderLeftWidth: 1.5, borderLeftColor: '#bdc9d4', paddingLeft: 6, lineHeight: 1.6 },

  // Certs
  certRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  certName:    { fontSize: 7.5, fontWeight: 700, color: '#0d1c2b', flex: 1 },
  certIss:     { fontSize: 6.5, color: '#888', marginTop: 1 },
  certDate:    { fontSize: 6.5, color: '#888' },

  // Sidebar
  sbSec:       { marginBottom: 14 },
  sbHead:      { fontSize: 6.5, fontWeight: 900, color: '#0d1c2b', textTransform: 'uppercase', letterSpacing: 1.8, borderBottomWidth: 1, borderBottomColor: C.navy, paddingBottom: 3, marginBottom: 7 },
  sbRow:       { marginBottom: 4 },
  sbTxt:       { fontSize: 7, color: C.txt, lineHeight: 1.55 },
  sbLink:      { fontSize: 7, color: C.blue, textDecoration: 'none' },
  kvWrap:      { marginBottom: 5 },
  kvLabel:     { fontSize: 6, color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 },
  kvVal:       { fontSize: 7.5, color: C.navy, fontWeight: 700, marginTop: 1 },
  kvSub:       { fontSize: 6.5, color: '#888' },
  skillWrap:   { marginBottom: 6 },
  skillLabel:  { fontSize: 7, color: C.navy, fontWeight: 700, marginBottom: 2 },
  track:       { height: 2.5, backgroundColor: '#dde2e7', borderRadius: 2 },
  fill:        { height: 2.5, backgroundColor: C.navy, borderRadius: 2 },
  langWrap:    { marginBottom: 6 },
  langRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  langName:    { fontSize: 7, color: C.navy, fontWeight: 700 },
  langLevel:   { fontSize: 6.5, color: '#999' },

  // Page 2
  p2bar:       { backgroundColor: '#f6f8fa', borderBottomWidth: 0.5, borderBottomColor: '#e2e6ea', padding: '10 30', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  p2name:      { fontFamily: 'Times-Roman', fontSize: 10, fontWeight: 700, color: '#0d1c2b' },
  p2role:      { fontSize: 6, color: '#888', textTransform: 'uppercase', letterSpacing: 1.8, marginTop: 2 },
  p2pg:        { fontSize: 7, color: '#bbb' },
  p2body:      { padding: '16 30 30 30' },

  // Projects
  projCols:    { flexDirection: 'row', gap: 22 },
  projCol:     { flex: 1 },
  projWrap:    { marginBottom: 9 },
  projNameRow: { flexDirection: 'row', alignItems: 'baseline' },
  projName:    { fontSize: 7.5, fontWeight: 700, color: '#0d1c2b' },
  projYear:    { fontSize: 6.5, color: '#999', marginLeft: 4 },
  projDesc:    { fontSize: 7, color: '#4a4a4a', lineHeight: 1.65, marginTop: 2 },
  projStack:   { fontSize: 6.5, color: C.blue, fontWeight: 700, marginTop: 2.5, textTransform: 'uppercase', letterSpacing: 0.3 },
  divider:     { borderTopWidth: 0.5, borderTopColor: '#f0f0f0', marginVertical: 7 },

  // Tags
  tagGroups:   { flexDirection: 'row', flexWrap: 'wrap' },
  tagGroup:    { marginBottom: 10, marginRight: 22 },
  tagGroupLbl: { fontSize: 6.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: '#999', marginBottom: 4 },
  tagsRow:     { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag:         { backgroundColor: C.lg, color: C.navy, fontSize: 6.5, fontWeight: 700, paddingHorizontal: 6, paddingVertical: 2.5, borderRadius: 1.5, textTransform: 'uppercase', letterSpacing: 0.3 },
  tagLg:       { backgroundColor: C.lg, color: C.navy, fontSize: 7, fontWeight: 700, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 1.5, textTransform: 'uppercase', letterSpacing: 0.3 },

  // Achievements
  achRow:      { flexDirection: 'row', gap: 6, marginBottom: 5 },
  achArrow:    { fontSize: 8, color: C.navy, fontWeight: 900, marginTop: 1 },
  achText:     { fontSize: 7.5, color: C.txt, lineHeight: 1.7, flex: 1 },
});

const short = (u) => (u || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export default function CVDocument({ data: d, photoSrc }) {
  const half = Math.ceil(d.projects.length / 2);
  const pLeft = d.projects.slice(0, half);
  const pRight = d.projects.slice(half);

  return (
    <Document title={`${d.name} – CV`} author={d.name}>

      {/* ══════════ PAGE 1 ══════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />

        {/* Header */}
        <View style={s.header}>
          <View style={s.photoCircle}>
            {photoSrc
              ? <Image src={photoSrc} style={s.photoImg} />
              : <Text style={s.initials}>{d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text>
            }
          </View>
          <View style={s.nameBlock}>
            <Text style={s.cvName}>{d.name}</Text>
            <Text style={s.cvTitle}>{d.title}</Text>
            <View style={s.contacts}>
              <Text style={s.ctItem}>{d.phone}</Text>
              <Link src={`mailto:${d.email}`} style={s.ctLink}>{d.email}</Link>
              <Link src={d.linkedin} style={s.ctLink}>{short(d.linkedin)}</Link>
              <Link src={d.github} style={s.ctLink}>{short(d.github)}</Link>
              <Text style={s.ctItem}>{d.location}</Text>
            </View>
          </View>
          <View style={s.metaCol}>
            <Text style={s.pillD}>{d.avail}</Text>
            <Text style={s.pillL}>{d.nationality}</Text>
            <Text style={s.pillL}>{d.visa} · {d.visaexp}</Text>
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>

          {/* Main column */}
          <View style={s.main}>

            <View style={s.secWrap}>
              <Text style={s.secHead}>Professional Summary</Text>
              <Text style={s.summary}>{d.summary}</Text>
            </View>

            <View style={s.secWrap}>
              <Text style={s.secHead}>Work Experience</Text>
              {d.experience.map(e => (
                <View key={e.id} style={s.job}>
                  <View style={s.jobRow}>
                    <View style={s.jobL}>
                      <Text style={s.jobRole}>{e.role}</Text>
                      <Text style={s.jobCo}>{e.company}</Text>
                      <Text style={s.jobLoc}>{e.location}</Text>
                    </View>
                    <Text style={s.badge}>{e.dates}</Text>
                  </View>
                  <View style={s.bullets}>
                    {e.bullets.map((b, i) => (
                      <View key={i} style={s.bullet}>
                        <Text style={s.dot}>•</Text>
                        <Text style={s.bulletTxt}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View style={s.secWrap}>
              <Text style={s.secHead}>Education</Text>
              {d.education.map(e => (
                <View key={e.id} style={s.eduRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.eduDeg}>{e.degree}</Text>
                    <Text style={s.eduUni}>{e.institution}</Text>
                    <Text style={s.eduSub}>{e.sub}</Text>
                    {e.thesis ? <Text style={s.thesis}>{e.thesis}</Text> : null}
                  </View>
                  <Text style={s.badge}>{e.dates}</Text>
                </View>
              ))}
            </View>

            <View style={s.secWrap}>
              <Text style={s.secHead}>Certifications &amp; Training</Text>
              {d.certs.map(c => (
                <View key={c.id} style={s.certRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.certName}>{c.name}</Text>
                    <Text style={s.certIss}>{c.issuer}</Text>
                  </View>
                  <Text style={s.certDate}>{c.date}</Text>
                </View>
              ))}
            </View>

          </View>

          {/* Sidebar */}
          <View style={s.side}>

            <View style={s.sbSec}>
              <Text style={s.sbHead}>Contact</Text>
              <View style={s.sbRow}><Text style={s.sbTxt}>{d.location}</Text></View>
              <View style={s.sbRow}><Text style={s.sbTxt}>{d.phone}</Text></View>
              <View style={s.sbRow}><Link src={`mailto:${d.email}`} style={s.sbLink}>{d.email}</Link></View>
              <View style={s.sbRow}><Link src={d.linkedin} style={s.sbLink}>{short(d.linkedin)}</Link></View>
              <View style={s.sbRow}><Link src={d.github} style={s.sbLink}>{short(d.github)}</Link></View>
            </View>

            <View style={s.sbSec}>
              <Text style={s.sbHead}>Personal Details</Text>
              <View style={s.kvWrap}>
                <Text style={s.kvLabel}>Nationality</Text>
                <Text style={s.kvVal}>{d.nationality}</Text>
              </View>
              <View style={s.kvWrap}>
                <Text style={s.kvLabel}>Visa Type</Text>
                <Text style={s.kvVal}>{d.visa}</Text>
                <Text style={s.kvSub}>Valid until {d.visaexp}</Text>
              </View>
              <View style={s.kvWrap}>
                <Text style={s.kvLabel}>Availability</Text>
                <Text style={s.kvVal}>{d.avail}</Text>
              </View>
            </View>

            <View style={s.sbSec}>
              <Text style={s.sbHead}>Core Skills</Text>
              {d.skills.map((sk, i) => (
                <View key={i} style={s.skillWrap}>
                  <Text style={s.skillLabel}>{sk.name}</Text>
                  <View style={s.track}><View style={[s.fill, { width: `${sk.pct}%` }]} /></View>
                </View>
              ))}
            </View>

            <View style={s.sbSec}>
              <Text style={s.sbHead}>Languages</Text>
              {d.langs.map((l, i) => (
                <View key={i} style={s.langWrap}>
                  <View style={s.langRow}>
                    <Text style={s.langName}>{l.name}</Text>
                    <Text style={s.langLevel}>{l.level}</Text>
                  </View>
                  <View style={s.track}><View style={[s.fill, { width: `${l.pct}%` }]} /></View>
                </View>
              ))}
            </View>

          </View>
        </View>
      </Page>

      {/* ══════════ PAGE 2 ══════════ */}
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />
        <View style={s.p2bar}>
          <View>
            <Text style={s.p2name}>{d.name}</Text>
            <Text style={s.p2role}>{d.title}</Text>
          </View>
          <Text style={s.p2pg}>Page 2 of 2</Text>
        </View>

        <View style={s.p2body}>

          <View style={s.secWrap}>
            <Text style={s.secHead}>Projects</Text>
            <View style={s.projCols}>
              {[pLeft, pRight].map((col, ci) => (
                <View key={ci} style={s.projCol}>
                  {col.map((p, i) => (
                    <View key={p.id}>
                      {i > 0 && <View style={s.divider} />}
                      <View style={s.projWrap}>
                        <View style={s.projNameRow}>
                          <Text style={s.projName}>{p.name}</Text>
                          <Text style={s.projYear}>{p.year}</Text>
                        </View>
                        <Text style={s.projDesc}>{p.desc}</Text>
                        <Text style={s.projStack}>{p.stack}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View style={s.secWrap}>
            <Text style={s.secHead}>Technical Skills</Text>
            <View style={s.tagGroups}>
              {[
                { lbl: 'Languages',        tags: d.tagsLang },
                { lbl: 'AI / ML',          tags: d.tagsAI   },
                { lbl: 'Data & Automation',tags: d.tagsData  },
                { lbl: 'Tools',            tags: d.tagsTools },
              ].map(g => (
                <View key={g.lbl} style={s.tagGroup}>
                  <Text style={s.tagGroupLbl}>{g.lbl}</Text>
                  <View style={s.tagsRow}>
                    {g.tags.map((t, i) => <Text key={i} style={s.tag}>{t}</Text>)}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={s.secWrap}>
            <Text style={s.secHead}>Research Interests</Text>
            <View style={[s.tagsRow, { gap: 5 }]}>
              {d.interests.map((t, i) => <Text key={i} style={s.tagLg}>{t}</Text>)}
            </View>
          </View>

          <View style={s.secWrap}>
            <Text style={s.secHead}>Achievements &amp; Activities</Text>
            {d.achievements.map((a, i) => (
              <View key={i} style={s.achRow}>
                <Text style={s.achArrow}>▸</Text>
                <Text style={s.achText}>{a}</Text>
              </View>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  );
}
