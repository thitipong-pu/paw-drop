import { useState, useEffect } from 'react';
import { Place, Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL;


const badgeColors: Record<string, { bg: string; text: string }> = {
  shelter: { bg: '#F0F9FF', text: '#0388C4' },
  clinic: { bg: '#F0FDF4', text: '#2E7D32' },
  foundation: { bg: '#F8FAFC', text: '#64748B' },
  rescue: { bg: '#FDF2F8', text: '#9D174D' },
};

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
}

function MiniProductCard({ product }: { product: Product }) {
  return (
    <button
      onClick={() => window.open(product.shopeeUrl, '_blank')}
      style={{
        width: '130px',
        minWidth: '130px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #F1F5F9',
        background: 'white',
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        flexShrink: 0,
        padding: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(3, 136, 196, 0.12)';
        e.currentTarget.style.borderColor = '#0388C440';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.05)';
        e.currentTarget.style.borderColor = '#F1F5F9';
      }}
    >
      {/* Image / Emoji Banner */}
      <div style={{
        height: '100px',
        position: 'relative',
        background: 'linear-gradient(135deg, #FFF3ED, #FFE5D5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const parent = (e.currentTarget as HTMLImageElement).parentElement;
              if (parent) parent.dataset.fallback = 'true';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <span style={{ fontSize: '36px' }}>{product.emoji}</span>
        )}
        {product.urgent && (
          <span style={{
            position: 'absolute', top: 5, right: 5,
            background: '#EE4D2D', color: 'white', fontSize: '9px',
            fontWeight: 700, padding: '2px 5px', borderRadius: 999,
          }}>🔴 ด่วน</span>
        )}
      </div>
      <div style={{ padding: '8px 10px' }}>
        <p style={{
          fontSize: '12px', fontWeight: 700, color: '#3B1A0E',
          fontFamily: 'Sarabun, sans-serif', lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '6px'
        }}>
          {product.name}
        </p>
        <div style={{
          background: '#0388C4', color: 'white', textAlign: 'center',
          padding: '8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700,
          fontFamily: 'Prompt, sans-serif',
          boxShadow: '0 4px 8px rgba(3, 136, 196, 0.2)'
        }}>
          🛒 สั่งซื้อเลย
        </div>
      </div>
    </button>
  );
}

export function PlaceModal({ place, onClose }: PlaceModalProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  // Fetch products when modal opens
  useEffect(() => {
    if (!place) return;
    setLoadingProducts(true);
    fetch(`${API_URL}/public/items`)
      .then(res => res.json())
      .then(data => {
        if (data?.data?.length > 0) {
          const mapped: Product[] = data.data.map((item: any) => ({
            id: item.id,
            cat: item.animal_types?.includes('dog') ? 'dog' : item.animal_types?.includes('cat') ? 'cat' : 'other',
            name: item.name,
            brand: '🐾 สำหรับสัตว์เลี้ยง',
            emoji: '🍖',
            imageUrl: item.image_url || undefined,
            urgent: item.tags?.includes('ด่วน') || false,
            shopeeUrl: item.product_url || '#',
            tags: item.tags || [],
          }));
          setAllProducts(mapped);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingProducts(false));
  }, [place?.id]);

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
    shelter: '#0388C4', clinic: '#2E7D32', foundation: '#64748B', rescue: '#9D174D',
  };
  const chipColor = needChipColors[place.typeKey] ?? '#0388C4';
  const badge = badgeColors[place.typeKey] || badgeColors.shelter;

  // Match products by tag to the place's needs
  const recommendedProducts = allProducts.filter(p => {
    const pTags: string[] = (p as any).tags || [];
    return place.needs.some(need =>
      pTags.some(tag => tag.toLowerCase().includes(need.toLowerCase()) || need.toLowerCase().includes(tag.toLowerCase()))
    );
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 999, opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease',
        }}
      />

      {/* Centered Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '90%',
          maxWidth: '800px', // Increased width as requested
          zIndex: 1000,
          background: 'white',
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
          transform: visible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -45%) scale(0.95)',
          opacity: visible ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          fontFamily: 'Sarabun, sans-serif',
          scrollbarWidth: 'none',
        }}
      >
        <div className="pt-2" />

        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="flex items-center gap-4">
            <span style={{ fontSize: 40 }}>{place.emoji}</span>
            <div>
              <div className="font-bold text-2xl leading-tight" style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}>
                {place.name}
              </div>
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                style={{ background: badge.bg, color: badge.text }}
              >
                {place.type}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Address */}
          <div className="rounded-2xl p-6" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
            <p className="text-base mb-5" style={{ color: '#1E293B', lineHeight: 1.8 }}>
              📍 {place.addr}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#059669' : '#0388C4', color: 'white',
                  border: 'none', borderRadius: 12, padding: '10px 24px',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'Prompt, sans-serif',
                  boxShadow: '0 4px 12px rgba(3, 136, 196, 0.2)'
                }}
              >
                {copied ? '✅ คัดลอกแล้ว!' : '📋 คัดลอกที่อยู่'}
              </button>
              <a
                href={place.mapUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#059669', color: 'white', borderRadius: 12,
                  padding: '10px 24px', fontSize: 14, fontWeight: 700,
                  textDecoration: 'none', fontFamily: 'Prompt, sans-serif',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
                }}
              >
                🗺️ เปิดใน Google Maps
              </a>
            </div>
          </div>

          {/* Phone & Hours */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-3 text-center" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div style={{ fontSize: 22 }}>📞</div>
              <div className="text-sm font-semibold mt-1" style={{ color: '#2E7D32' }}>{place.tel || '-'}</div>
            </div>
            <div className="rounded-2xl p-3 text-center" style={{ background: '#FEFCE8', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: 22 }}>⏰</div>
              <div className="text-xs font-semibold mt-1" style={{ color: '#B45309' }}>{place.hours || '-'}</div>
            </div>
          </div>

          {/* Facebook Link */}
          {(place.facebookPage || place.facebookUrl) && (
            <a
              href={place.facebookUrl || '#'}
              target={place.facebookUrl ? '_blank' : '_self'}
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #1877F2, #0C5ECA)',
                borderRadius: '20px', padding: '14px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                textDecoration: 'none', boxShadow: '0 6px 20px rgba(24,119,242,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              <div className="flex items-center gap-3">
                <div style={{
                  width: '38px', height: '38px', background: 'white', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                }}>📘</div>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Sarabun, sans-serif' }}>Facebook Page</div>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold', fontFamily: 'Prompt, sans-serif' }}>
                    {place.facebookPage || 'ดูเพจอย่างเป็นทางการ'}
                  </div>
                </div>
              </div>
              <div style={{
                width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'white', fontSize: '16px',
              }}>→</div>
            </a>
          )}

          {/* Needs */}
          {place.needs?.length > 0 && (
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: '#3B1A0E' }}>🧡 สิ่งที่ต้องการ</p>
              <div className="flex flex-wrap gap-2">
                {place.needs.map((need, i) => (
                  <span key={i} style={{
                    background: `${chipColor}18`, color: chipColor,
                    border: `1px solid ${chipColor}40`, borderRadius: 999,
                    padding: '4px 12px', fontSize: 13, fontFamily: 'Sarabun, sans-serif',
                  }}>
                    {need}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── RECOMMENDED PRODUCTS ─────────────────────────── */}
          {!loadingProducts && recommendedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span style={{ fontSize: '20px' }}>⭐</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}>
                  สินค้าแนะนำสำหรับที่นี่
                </p>
              </div>
              <div style={{
                display: 'flex', gap: '12px', overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                marginLeft: '-2px', paddingLeft: '2px',
                marginRight: '-2px', paddingRight: '2px',
              }}>
                {recommendedProducts.map(p => <MiniProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}

          {/* ─── ALL PRODUCTS ─────────────────────────────────── */}
          <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '24px' }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: '20px' }}>🛍️</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', fontFamily: 'Prompt, sans-serif' }}>
                สินค้าบริจาคทั้งหมด
              </p>
            </div>
            {loadingProducts ? (
              <p style={{ textAlign: 'center', color: '#8B6151', fontSize: '14px', padding: '16px 0' }}>กำลังโหลดสินค้า...</p>
            ) : allProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#8B6151', fontSize: '14px', padding: '16px 0' }}>ไม่พบสินค้า</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
              }}>
                {allProducts.map(p => <MiniProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: '14px', background: 'transparent',
              border: '2px solid #F1F5F9', borderRadius: 16, color: '#64748B',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Prompt, sans-serif',
              marginTop: 12, marginBottom: 8,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </>
  );
}
