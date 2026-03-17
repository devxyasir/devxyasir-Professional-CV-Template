import React, { useState } from 'react';

const N = '#1c2b3a';
const inp = { width:'100%', padding:'7px 10px', border:'1.5px solid #dde2e7', borderRadius:6, fontSize:12, fontFamily:'Lato,sans-serif', color:'#222', background:'#fff', outline:'none', boxSizing:'border-box' };
const ta  = { ...inp, resize:'vertical', minHeight:64, lineHeight:1.55 };
const lbl = { display:'block', fontSize:10, fontWeight:700, color:N, textTransform:'uppercase', letterSpacing:1, marginBottom:4 };
const fg  = { marginBottom:13 };
const card= { background:'#f6f8fa', border:'1px solid #e8ecf0', borderRadius:8, padding:'11px 13px', marginBottom:10 };
const addB= { width:'100%', padding:8, background:'#fff', border:'1.5px dashed #bdc9d4', borderRadius:6, fontSize:11, fontWeight:700, color:N, cursor:'pointer', marginTop:4, fontFamily:'Lato,sans-serif' };
const delB= { background:'none', border:'none', fontSize:12, color:'#c0392b', cursor:'pointer', padding:'2px 5px' };

function FG({ label, children }) {
  return <div style={fg}><label style={lbl}>{label}</label>{children}</div>;
}

function Card({ title, onDel, children }) {
  return (
    <div style={card}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontSize:11, fontWeight:700, color:N }}>{title}</span>
        <button style={delB} onClick={onDel}>✕ Remove</button>
      </div>
      {children}
    </div>
  );
}

export default function EditorPanel({ data, onChange, isOpen, onClose }) {
  const [tab, setTab] = useState('basics');
  const set = (k, v) => onChange({ ...data, [k]: v });
  const setN = (k, i, f, v) => { const a=[...data[k]]; a[i]={...a[i],[f]:v}; onChange({...data,[k]:a}); };
  const del  = (k, i) => onChange({ ...data, [k]: data[k].filter((_,j)=>j!==i) });
  const add  = (k, blank) => onChange({ ...data, [k]: [...data[k], { id: Date.now(), ...blank }] });

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.38)', zIndex:998, opacity:isOpen?1:0, pointerEvents:isOpen?'all':'none', transition:'opacity .25s' }} />
      <div style={{ position:'fixed', top:0, right:0, width:360, height:'100vh', background:'#fff', zIndex:999, boxShadow:'-6px 0 32px rgba(0,0,0,.2)', display:'flex', flexDirection:'column', transform:isOpen?'translateX(0)':'translateX(100%)', transition:'transform .28s cubic-bezier(.4,0,.2,1)', fontFamily:'Lato,sans-serif' }}>

        {/* Header */}
        <div style={{ background:N, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Edit CV</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,.45)', marginTop:2 }}>Changes save automatically</div>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, background:'rgba(255,255,255,.12)', border:'none', borderRadius:6, color:'#fff', fontSize:16, cursor:'pointer' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid #e8ecf0', flexShrink:0, overflowX:'auto', background:'#f6f8fa' }}>
          {['basics','experience','education','skills','projects','other'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flexShrink:0, padding:'9px 12px', fontSize:11, fontWeight:700, color:tab===t?N:'#888', border:'none', borderBottom:`2px solid ${tab===t?N:'transparent'}`, background:'none', cursor:'pointer', whiteSpace:'nowrap', textTransform:'capitalize' }}>{t}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 18px 24px' }}>

          {tab === 'basics' && <>
            <FG label="Full Name"><input style={inp} value={data.name} onChange={e=>set('name',e.target.value)} /></FG>
            <FG label="Job Title"><input style={inp} value={data.title} onChange={e=>set('title',e.target.value)} /></FG>
            <FG label="Summary"><textarea style={ta} value={data.summary} onChange={e=>set('summary',e.target.value)} /></FG>
            <FG label="Phone"><input style={inp} value={data.phone} onChange={e=>set('phone',e.target.value)} /></FG>
            <FG label="Email"><input style={inp} value={data.email} onChange={e=>set('email',e.target.value)} /></FG>
            <FG label="Location"><input style={inp} value={data.location} onChange={e=>set('location',e.target.value)} /></FG>
            <FG label="LinkedIn URL"><input style={inp} value={data.linkedin} onChange={e=>set('linkedin',e.target.value)} /></FG>
            <FG label="GitHub URL"><input style={inp} value={data.github} onChange={e=>set('github',e.target.value)} /></FG>
            <FG label="Nationality"><input style={inp} value={data.nationality} onChange={e=>set('nationality',e.target.value)} /></FG>
            <FG label="Visa Type"><input style={inp} value={data.visa} onChange={e=>set('visa',e.target.value)} /></FG>
            <FG label="Visa Valid Until"><input style={inp} value={data.visaexp} onChange={e=>set('visaexp',e.target.value)} /></FG>
            <FG label="Availability"><input style={inp} value={data.avail} onChange={e=>set('avail',e.target.value)} /></FG>
          </>}

          {tab === 'experience' && <>
            {data.experience.map((e,i) => (
              <Card key={e.id} title={e.role||`Position ${i+1}`} onDel={()=>del('experience',i)}>
                <FG label="Job Title"><input style={inp} value={e.role} onChange={ev=>setN('experience',i,'role',ev.target.value)} /></FG>
                <FG label="Company"><input style={inp} value={e.company} onChange={ev=>setN('experience',i,'company',ev.target.value)} /></FG>
                <FG label="Location"><input style={inp} value={e.location} onChange={ev=>setN('experience',i,'location',ev.target.value)} /></FG>
                <FG label="Dates"><input style={inp} value={e.dates} onChange={ev=>setN('experience',i,'dates',ev.target.value)} /></FG>
                <FG label="Bullets (one per line)"><textarea style={ta} value={e.bullets.join('\n')} onChange={ev=>setN('experience',i,'bullets',ev.target.value.split('\n'))} /></FG>
              </Card>
            ))}
            <button style={addB} onClick={()=>add('experience',{role:'',company:'',location:'',dates:'',bullets:['']})}>+ Add Position</button>
          </>}

          {tab === 'education' && <>
            {data.education.map((e,i) => (
              <Card key={e.id} title={e.degree||`Degree ${i+1}`} onDel={()=>del('education',i)}>
                <FG label="Degree"><input style={inp} value={e.degree} onChange={ev=>setN('education',i,'degree',ev.target.value)} /></FG>
                <FG label="Institution"><input style={inp} value={e.institution} onChange={ev=>setN('education',i,'institution',ev.target.value)} /></FG>
                <FG label="Details (CGPA etc)"><input style={inp} value={e.sub} onChange={ev=>setN('education',i,'sub',ev.target.value)} /></FG>
                <FG label="Dates"><input style={inp} value={e.dates} onChange={ev=>setN('education',i,'dates',ev.target.value)} /></FG>
                <FG label="Thesis / Research"><input style={inp} value={e.thesis} onChange={ev=>setN('education',i,'thesis',ev.target.value)} /></FG>
              </Card>
            ))}
            <button style={addB} onClick={()=>add('education',{degree:'',institution:'',sub:'',dates:'',thesis:''})}>+ Add Education</button>
            <div style={{ marginTop:16, borderTop:'1px solid #e8ecf0', paddingTop:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:N, marginBottom:8 }}>Certifications</div>
              {data.certs.map((c,i) => (
                <Card key={c.id} title={c.name||`Cert ${i+1}`} onDel={()=>del('certs',i)}>
                  <FG label="Name"><input style={inp} value={c.name} onChange={ev=>setN('certs',i,'name',ev.target.value)} /></FG>
                  <FG label="Issuer"><input style={inp} value={c.issuer} onChange={ev=>setN('certs',i,'issuer',ev.target.value)} /></FG>
                  <FG label="Date"><input style={inp} value={c.date} onChange={ev=>setN('certs',i,'date',ev.target.value)} /></FG>
                </Card>
              ))}
              <button style={addB} onClick={()=>add('certs',{name:'',issuer:'',date:''})}>+ Add Cert</button>
            </div>
          </>}

          {tab === 'skills' && <>
            <div style={{ fontSize:11, fontWeight:700, color:N, marginBottom:8 }}>Sidebar Skill Bars</div>
            {data.skills.map((sk,i) => (
              <div key={i} style={{ display:'flex', gap:7, alignItems:'center', marginBottom:8 }}>
                <input style={{ ...inp, flex:'1.2' }} value={sk.name} onChange={e=>setN('skills',i,'name',e.target.value)} placeholder="Skill" />
                <input type="range" min={10} max={100} step={5} value={sk.pct} style={{ flex:1, accentColor:N }} onChange={e=>setN('skills',i,'pct',+e.target.value)} />
                <span style={{ fontSize:10, color:'#888', minWidth:28, textAlign:'right' }}>{sk.pct}%</span>
                <button style={{ background:'none', border:'none', color:'#c0392b', cursor:'pointer', fontSize:13 }} onClick={()=>del('skills',i)}>✕</button>
              </div>
            ))}
            <button style={addB} onClick={()=>onChange({...data,skills:[...data.skills,{name:'New Skill',pct:70}]})}>+ Add Skill</button>

            <div style={{ marginTop:16, borderTop:'1px solid #e8ecf0', paddingTop:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:N, marginBottom:8 }}>Languages</div>
              {data.langs.map((l,i) => (
                <div key={i} style={{ ...card, padding:'9px 11px', marginBottom:8 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:N }}>{l.name||`Language ${i+1}`}</span>
                    <button style={delB} onClick={()=>del('langs',i)}>✕</button>
                  </div>
                  <FG label="Language"><input style={inp} value={l.name} onChange={e=>setN('langs',i,'name',e.target.value)} /></FG>
                  <FG label="Level"><input style={inp} value={l.level} onChange={e=>setN('langs',i,'level',e.target.value)} /></FG>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <input type="range" min={10} max={100} step={5} value={l.pct} style={{ flex:1, accentColor:N }} onChange={e=>setN('langs',i,'pct',+e.target.value)} />
                    <span style={{ fontSize:10, color:'#888', minWidth:28 }}>{l.pct}%</span>
                  </div>
                </div>
              ))}
              <button style={addB} onClick={()=>onChange({...data,langs:[...data.langs,{name:'',level:'',pct:70}]})}>+ Add Language</button>
            </div>

            <div style={{ marginTop:16, borderTop:'1px solid #e8ecf0', paddingTop:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:N, marginBottom:8 }}>Tech Stack Tags</div>
              {[['tagsLang','Languages'],['tagsAI','AI / ML'],['tagsData','Data & Automation'],['tagsTools','Tools']].map(([k,lbl_])=>(
                <FG key={k} label={lbl_}><input style={inp} value={data[k].join(', ')} onChange={e=>set(k, e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} placeholder="Comma separated" /></FG>
              ))}
            </div>
          </>}

          {tab === 'projects' && <>
            {data.projects.map((p,i) => (
              <Card key={p.id} title={p.name||`Project ${i+1}`} onDel={()=>del('projects',i)}>
                <FG label="Name"><input style={inp} value={p.name} onChange={e=>setN('projects',i,'name',e.target.value)} /></FG>
                <FG label="Year"><input style={inp} value={p.year} onChange={e=>setN('projects',i,'year',e.target.value)} /></FG>
                <FG label="Description"><textarea style={ta} value={p.desc} onChange={e=>setN('projects',i,'desc',e.target.value)} /></FG>
                <FG label="Tech Stack"><input style={inp} value={p.stack} onChange={e=>setN('projects',i,'stack',e.target.value)} /></FG>
              </Card>
            ))}
            <button style={addB} onClick={()=>add('projects',{name:'',year:'',desc:'',stack:''})}>+ Add Project</button>
          </>}

          {tab === 'other' && <>
            <FG label="Research Interests (comma separated)"><textarea style={ta} value={data.interests.join(', ')} onChange={e=>set('interests', e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} /></FG>
            <FG label="Achievements (one per line)"><textarea style={{ ...ta, minHeight:100 }} value={data.achievements.join('\n')} onChange={e=>set('achievements', e.target.value.split('\n').filter(Boolean))} /></FG>
          </>}

        </div>

        <div style={{ flexShrink:0, padding:'7px 18px', background:'#f6f8fa', borderTop:'1px solid #e8ecf0', fontSize:10, color:'#aaa', textAlign:'center' }}>
          Auto-saved to browser storage
        </div>
      </div>
    </>
  );
}
