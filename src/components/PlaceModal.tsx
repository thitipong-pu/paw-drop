import { useState, useEffect } from 'react';
import { Place } from '../types';

const badgeColors: Record<string, { bg: string; text: string }> = {
  shelter:    { bg: '#FFF3ED', text: '#E8621A' },
  clinic:     { bg: '#F0FDF4', text: '#2E7D32' },
  foundation: { bg: '#FEFCE8', text: '#B45309' },
  rescue:     { bg: '#FDF2F8', text: '#9D174D' },
};

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
}

export function PlaceModal({ place, onClose }: PlaceModalProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (place) {
      // Delay to trigger CSS transition
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
  }, [place]);

  if (!place) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(place.addr);
    } catch {
      const el = document.createElement('textarea');
      el.value = place.addr;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const needChipColors: Record<string, string> = {
    shelter: '#E8621A',
    clinic: '#2E7D32',
    foundation: '#B45309',
    rescue: '#9D174D',
  };
  const chipColor = needChipColors[place.typeKey] ?? '#E8621A';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          background: '#FFFBF7',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          maxHeight: '85vh',
          overflowY: 'auto',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          fontFamily: 'Sarabun, sans-serif',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 40, height: 4, background: '#DDD', borderRadius: 99 }} />
        </div>

        {/* Header */}
        <div className="px-5 pt-3 pb-4" style={{ borderBottom: '1px solid #FFE5D5' }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 40 }}>{place.emoji}</span>
            <div>
              <div
                className="font-bold text-lg leading-tight"
                style={{ color: '#3B1A0E', fontFamily: 'Prompt, sans-serif' }}
              >
                {place.name}
              </div>
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                style={{ background: badgeColors[place.typeKey].bg, color: badgeColors[place.typeKey].text }}
              >
                {place.type}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Address */}
          <div className="rounded-2xl p-4" style={{ background: '#FFF3ED', border: '1px solid #FFD8C0' }}>
            <p className="text-sm mb-3" style={{ color: '#3B1A0E', lineHeight: 1.8 }}>
              📍 {place.addr}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#2E7D32' : '#E8621A',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  fontFamily: 'Sarabun, sans-serif',
                }}
              >
                {copied ? '✅ คัดลอกแล้ว!' : '📋 คัดลอกที่อยู่'}
              </button>
              <a
                href={place.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#2E7D32',
                  color: 'white',
                  borderRadius: 12,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: 'Sarabun, sans-serif',
                }}
              >
                🗺️ เปิดใน Google Maps
              </a>
            </div>
          </div>

          {/* Phone & Hours */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-2xl p-3 text-center"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
            >
              <div style={{ fontSize: 22 }}>📞</div>
              <div className="text-sm font-semibold mt-1" style={{ color: '#2E7D32' }}>
                {place.tel}
              </div>
            </div>
            <div
              className="rounded-2xl p-3 text-center"
              style={{ background: '#FEFCE8', border: '1px solid #FDE68A' }}
            >
              <div style={{ fontSize: 22 }}>⏰</div>
              <div className="text-xs font-semibold mt-1" style={{ color: '#B45309' }}>
                {place.hours}
              </div>
            </div>
          </div>

          {/* Needs */}
          <div>
            <p className="text-sm font-bold mb-2" style={{ color: '#3B1A0E' }}>
              🧡 สิ่งที่ต้องการ
            </p>
            <div className="flex flex-wrap gap-2">
              {place.needs.map((need) => (
                <span
                  key={need}
                  style={{
                    background: `${chipColor}18`,
                    color: chipColor,
                    border: `1px solid ${chipColor}40`,
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontFamily: 'Sarabun, sans-serif',
                  }}
                >
                  {need}
                </span>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: '1px solid #FFD8C0',
              borderRadius: 16,
              color: '#8B6151',
              fontSize: 15,
              cursor: 'pointer',
              fontFamily: 'Sarabun, sans-serif',
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            ปิด
          </button>
        </div>
      </div>
    </>
  );
}
