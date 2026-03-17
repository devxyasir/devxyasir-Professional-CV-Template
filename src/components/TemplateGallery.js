import React, { useState } from 'react';
import { templates } from '../templates/templateMeta';

const N = '#1c2b3a';
const BL = '#1a5fa0';

export default function TemplateGallery({ onSelect }) {
  const [filterCat, setFilterCat] = useState('All');
  const [filterPages, setFilterPages] = useState('All');
  const [filterAts, setFilterAts] = useState(false);

  const categories = ['All', ...new Set(templates.map(t => t.profession))];

  const filtered = templates.filter(t => {
    if (filterCat !== 'All' && t.profession !== filterCat) return false;
    if (filterPages !== 'All' && t.pages.toString() !== filterPages) return false;
    if (filterAts && !t.ats) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '40px 40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ color: N, fontSize: 36, fontWeight: 900, marginBottom: 12 }}>CV Generator Pro</h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
          Choose from 10+ premium templates ranging from minimalist ATS-friendly formats to beautiful multi-page portfolio layouts.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            style={{
              padding: '8px 18px',
              borderRadius: 24,
              border: filterCat === c ? `2px solid ${N}` : '1px solid #ddd',
              background: filterCat === c ? N : '#fff',
              color: filterCat === c ? '#fff' : '#444',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: filterCat === c ? '0 4px 12px rgba(28,43,58,0.2)' : '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <div style={{ background: '#fff', padding: '12px 24px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, color: N, fontSize: 14 }}>Pages:</span>
            <select value={filterPages} onChange={e => setFilterPages(e.target.value)} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ddd', fontSize: 14 }}>
              <option value="All">All Sizes</option>
              <option value="1">1 Page</option>
              <option value="2">2 Pages</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, color: N, fontSize: 14 }}>
            <input type="checkbox" checked={filterAts} onChange={e => setFilterAts(e.target.checked)} style={{ transform: 'scale(1.2)' }} />
            Strict ATS Friendly Only
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {filtered.map(t => (
          <div key={t.id} onClick={() => onSelect(t.id)} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.2s', border: '2px solid transparent' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ height: 180, background: '#e9ecef', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #efefef' }}>
              <div style={{ fontSize: 40, opacity: 0.1 }}>📄</div>
              {t.ats && <span style={{ position: 'absolute', top: 10, right: 10, background: '#10b981', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>✓ ATS SYNC</span>}
              <span style={{ position: 'absolute', bottom: 10, left: 10, background: N, color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{t.pages} Page{t.pages > 1 ? 's' : ''}</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ color: BL, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{t.profession}</div>
              <h3 style={{ margin: '0 0 8px 0', color: N, fontSize: 18 }}>{t.name}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#666', lineHeight: 1.5 }}>{t.desc}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, color: '#888' }}>
            No templates match your exact filters.
          </div>
        )}
      </div>
    </div>
  );
}
