import React, { useState, useCallback } from 'react';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import EditorPanel from './EditorPanel';
import { load, save } from './defaultData';
import TemplateGallery from './components/TemplateGallery';

import ModernTech from './templates/ModernTech';
import AtsClassic from './templates/AtsClassic';
import CreativeMinimal from './templates/CreativeMinimal';
import Executive from './templates/Executive';
import Startup from './templates/Startup';
import Academic from './templates/Academic';
import FinancePro from './templates/FinancePro';
import Healthcare from './templates/Healthcare';
import Engineer from './templates/Engineer';
import Elegant from './templates/Elegant';
import { ProfessionTemplates } from './templates/ProfessionTemplates';

const N = '#1c2b3a';
const BL = '#1a5fa0';

// ── Main App ──────────────────────────────────────────────────────

export default function App() {
  const [currentView, setView] = useState('gallery');
  const [showCredit, setShowCredit] = useState(true);
  const [selectedTpl, setTpl] = useState(null);

  const [data, setData] = useState(load);
  const [panelOpen, setPanel] = useState(false);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photoSrc, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((d) => {
    setData(d); save(d);
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const T = 400, c = document.createElement('canvas');
        c.width = T; c.height = T;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.beginPath(); ctx.arc(T / 2, T / 2, T / 2, 0, Math.PI * 2); ctx.clip();
        const sc = Math.max(T / img.naturalWidth, T / img.naturalHeight);
        ctx.drawImage(img, (T - img.naturalWidth * sc) / 2, (T - img.naturalHeight * sc) / 2, img.naturalWidth * sc, img.naturalHeight * sc);
        setPhoto(c.toDataURL('image/png', 1));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleExportJSON = () => {
    // Generate a blank schema based on the current data structure
    const blankData = { ...data };
    for (const key in blankData) {
      if (typeof blankData[key] === 'string') blankData[key] = '';
      else if (Array.isArray(blankData[key])) {
        if (blankData[key].length > 0 && typeof blankData[key][0] === 'string') {
          blankData[key] = [];
        } else if (blankData[key].length > 0 && typeof blankData[key][0] === 'object') {
          // Keep one empty object as a template
          const emptyObj = { ...blankData[key][0] };
          for (const k in emptyObj) {
            emptyObj[k] = typeof emptyObj[k] === 'number' ? 0 : '';
          }
          blankData[key] = [emptyObj];
        }
      }
    }
    const blob = new Blob([JSON.stringify(blankData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTpl}_blank_schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const importedData = JSON.parse(ev.target.result);
        setData({ ...data, ...importedData });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const getTemplate = () => {
    if (selectedTpl && selectedTpl.startsWith('pro-')) {
      return ProfessionTemplates[selectedTpl].component;
    }
    switch (selectedTpl) {
      case 'modern-tech': return ModernTech;
      case 'ats-classic': return AtsClassic;
      case 'creative-minimal': return CreativeMinimal;
      case 'executive': return Executive;
      case 'startup': return Startup;
      case 'academic': return Academic;
      case 'finance-pro': return FinancePro;
      case 'healthcare': return Healthcare;
      case 'engineer': return Engineer;
      case 'elegant': return Elegant;
      default: return ModernTech;
    }
  };

  const downloadPDF = async () => {
    setBusy(true);
    try {
      const Tpl = getTemplate();
      const blob = await pdf(<Tpl data={data} photoSrc={includePhoto ? photoSrc : null} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${data.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('PDF error: ' + err.message);
    } finally { setBusy(false); }
  };

  return (
    <>
      {/* Global Credit Overlay Popup */}
      {showCredit && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: 16, maxWidth: 400, width: '90%', textAlign: 'center', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setShowCredit(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'transparent', border: 'none', fontSize: 24, color: '#aaa', cursor: 'pointer' }}>×</button>
            <div style={{ background: '#1a5fa0', width: 64, height: 64, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h2 style={{ margin: '0 0 8px', color: '#111', fontSize: 22 }}>Welcome to CV Builder Pro</h2>
            <p style={{ margin: '0 0 24px', color: '#555', fontSize: 14, lineHeight: 1.5 }}>
              Developed & Designed with ❤️ by <strong>Muhammad Yasir (@devxyasir)</strong>.<br />
              <span style={{ color: '#1a5fa0', fontWeight: 600 }}>Follow me to keep updated with our new content!</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
              <a href="https://github.com/devxyasir" target="_blank" rel="noopener noreferrer" style={{ color: '#333' }} title="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="https://linkedin.com/in/devxyasir" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }} title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://facebook.com/devxyasir" target="_blank" rel="noopener noreferrer" style={{ color: '#1877f2' }} title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://tiktok.com/@devxyasir_0" target="_blank" rel="noopener noreferrer" style={{ color: '#000' }} title="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
              </a>
            </div>
            <button onClick={() => setShowCredit(false)} style={{ width: '100%', padding: '12px', background: '#1c2b3a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'gallery' ? (
        <div style={{ background: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <TemplateGallery onSelect={(id) => {
            setData(load());
            setTpl(id);
            setView('editor');
            window.scrollTo(0, 0);
          }} />
        </div>
      ) : (
        <div style={{ background: '#c9cfd6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 12px 28px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          
          {/* Toolbar */}
          <div style={{ width: '100%', maxWidth: 850, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setView('gallery')} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #cdd4dc', borderRadius: 6, fontSize: 13, fontWeight: 700, color: N, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Back to Templates
            </button>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: N, marginLeft: 16, cursor: 'pointer' }}>
              <input type="checkbox" checked={includePhoto} onChange={e => setIncludePhoto(e.target.checked)} style={{ transform: 'scale(1.2)' }} />
              Include Profile Photo
            </label>

            {/* JSON Tools */}
            <div style={{ display: 'flex', gap: 8, marginLeft: 16, borderLeft: '1px solid #ccc', paddingLeft: 16 }}>
              <button onClick={handleExportJSON} style={{ padding: '6px 12px', background: '#f0f2f5', border: '1px solid #cdd4dc', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Blank JSON
              </button>
              <label style={{ padding: '6px 12px', background: '#f0f2f5', border: '1px solid #cdd4dc', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Import JSON
                <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportJSON} />
              </label>
            </div>
            
            {includePhoto && (
              <>
                <label style={{ padding: '8px 16px', background: '#fff', border: '1.5px dashed #9aaab8', borderRadius: 6, fontSize: 13, color: '#444', cursor: 'pointer' }}>
                  Choose file…<input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
                </label>
                {photoSrc && <span style={{ fontSize: 12, color: '#1c7a3a', fontWeight: 700 }}>✓ Attached</span>}
              </>
            )}
            {saved && <span style={{ fontSize: 12, color: '#1c7a3a', fontWeight: 700 }}>✓ Saved</span>}

            <button onClick={downloadPDF} disabled={busy} style={{ marginLeft: 'auto', padding: '10px 24px', background: busy ? '#4a6a85' : N, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 4px 12px rgba(28,43,58,0.2)' }}>
              {busy ? '⏳ Generating PDF…' : <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3m0 12l-4-4m4 4l4-4" /><rect x="3" y="17" width="18" height="4" rx="2" /></svg>
                Download {selectedTpl.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} CV
              </>}
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setPanel(o => !o)} style={{ position: 'fixed', top: 22, right: 22, zIndex: 1000, width: 44, height: 44, background: panelOpen ? '#253d52' : N, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 4px 16px rgba(0,0,0,.3)' }}>
            {panelOpen
              ? <span style={{ color: '#fff', fontSize: 18 }}>✕</span>
              : <>{['', '', ''].map((_, i) => <span key={i} style={{ width: 20, height: 2, background: '#fff', borderRadius: 2 }} />)}</>
            }
          </button>

          <EditorPanel data={data} onChange={handleChange} isOpen={panelOpen} onClose={() => setPanel(false)} />

          {/* Native PDF Live Viewer */}
          <div style={{ width: '100%', maxWidth: 850, height: 1150, marginBottom: 40 }}>
            <PDFViewer showToolbar={false} width="100%" height="100%" style={{ border: 'none', borderRadius: 8, boxShadow: '0 12px 40px rgba(0,0,0,.2)', backgroundColor: '#fff' }}>
              {React.createElement(getTemplate(), { data, photoSrc: includePhoto ? photoSrc : null })}
            </PDFViewer>
          </div>

        </div>
      )}
    </>
  );
}