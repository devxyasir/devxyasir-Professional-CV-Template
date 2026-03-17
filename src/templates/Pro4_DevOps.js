import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link, Image } from '@react-pdf/renderer';

const C = { main: '#000', link: '#111' };
const s = StyleSheet.create({
  page:     { fontFamily: 'Times-Roman', fontSize: 10, color: C.main, backgroundColor: '#fff', padding: '36 48' },
  header:   { textAlign: 'center', marginBottom: 15, borderBottom: '1px solid #000', paddingBottom: 10 },
  name:     { fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  title:    { fontSize: 12, marginBottom: 4 },
  contact:  { fontSize: 9.5, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  link:     { color: C.link, textDecoration: 'none' },
  secHead:  { fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', marginTop: 14, marginBottom: 6, borderBottom: '1px solid #000', paddingBottom: 2 },
  text:     { fontSize: 10, lineHeight: 1.5, textAlign: 'justify' },
  block:    { marginBottom: 8 },
  row:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bold:     { fontWeight: 700 },
  italic:   { fontStyle: 'italic' },
  bulletWrap:{ flexDirection: 'row', marginBottom: 2 },
  bullet:   { width: 10, fontSize: 10 },
  bText:    { flex: 1, fontSize: 10, lineHeight: 1.4 }
});

export const Pro4_DevOps_Data = {
  "name": "Casey Cloud",
  "title": "DevOps Engineer",
  "summary": "Infra specialist on AWS/K8s.",
  "contact": {
    "phone": "123",
    "email": "c@ops.com",
    "location": "Dubai",
    "linkedin": "",
    "github": ""
  },
  "experience": [
    {
      "role": "Cloud Eng",
      "company": "SaaS Co",
      "location": "Dubai",
      "dates": "2020-Present",
      "bullets": [
        "Migrated to K8s"
      ]
    }
  ],
  "education": [
    {
      "degree": "B.Sc.",
      "institution": "Tech Uni",
      "sub": "",
      "dates": "2016-2020"
    }
  ],
  "projects": [],
  "certs": [
    {
      "name": "CKA",
      "issuer": "CNCF",
      "date": "2021"
    }
  ],
  "tagsLang": [
    "Bash"
  ],
  "tagsTools": [
    "AWS",
    "Docker",
    "Terraform"
  ]
};

export default function Pro4_DevOps({ data, photoSrc }) {
  const d = data && data.name ? data : Pro4_DevOps_Data;
  return (
    <Document title={`${d.name} – CV`} author={d.name}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          {photoSrc && <Image src={photoSrc} style={{ width: 70, height: 70, borderRadius: 35, alignSelf: 'center', marginBottom: 10, objectFit: 'cover' }} />}
          <Text style={s.name}>{d.name}</Text>
          <Text style={s.title}>{d.title}</Text>
          <View style={s.contact}>
            <Text>{d.location || (d.contact && d.contact.location) || ''} | {d.phone || (d.contact && d.contact.phone) || ''} | {d.email || (d.contact && d.contact.email) || ''}</Text>
          </View>
        </View>
        <View>
          <Text style={s.secHead}>Professional Summary</Text>
          <Text style={s.text}>{d.summary}</Text>
        </View>
        <View>
          <Text style={s.secHead}>Work Experience</Text>
          {(d.experience || []).map((e, i) => (
            <View key={i} style={s.block}>
              <View style={s.row}><Text style={s.bold}>{e.role}</Text><Text style={s.bold}>{e.dates}</Text></View>
              <View style={[s.row, { marginBottom: 3 }]}><Text style={s.italic}>{e.company}, {e.location}</Text></View>
              {(e.bullets || []).map((b, j) => (<View key={j} style={s.bulletWrap}><Text style={s.bullet}>•</Text><Text style={s.bText}>{b}</Text></View>))}
            </View>
          ))}
        </View>
        <View>
          <Text style={s.secHead}>Education</Text>
          {(d.education || []).map((e, i) => (
             <View key={i} style={{ marginBottom: 4 }}><View style={s.row}><Text style={s.bold}>{e.degree}</Text><Text style={s.bold}>{e.dates}</Text></View><Text>{e.institution} {e.sub ? `| ${e.sub}` : ''}</Text></View>
          ))}
        </View>
        {(d.projects && d.projects.length > 0) && (
          <View>
            <Text style={s.secHead}>Projects</Text>
            {d.projects.map((p, i) => (<View key={i} style={[s.row, { marginBottom: 3 }]}><View style={{ flex: 1 }}><Text style={s.bold}>{p.name}</Text><Text style={s.text}>{p.desc}</Text></View><Text style={{ width: 40, textAlign: 'right' }}>{p.year}</Text></View>))}
          </View>
        )}
        <View>
          <Text style={s.secHead}>Core Skills</Text>
          <Text style={s.text}>{(d.tagsLang || []).concat(d.tagsTools || []).join(' • ')}</Text>
        </View>
        {(d.certs && d.certs.length > 0) && (
          <View>
            <Text style={s.secHead}>Certifications</Text>
            {d.certs.map((c, i) => (<View key={i} style={s.row}><Text><Text style={s.bold}>{c.name}</Text> – {c.issuer}</Text><Text>{c.date}</Text></View>))}
          </View>
        )}
      </Page>
    </Document>
  );
}
