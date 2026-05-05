import { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../types';

type Category = 'all' | 'dog' | 'cat' | 'other' | 'urgent';

const tabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'dog', label: '🐕 สุนัข' },
  { key: 'cat', label: '🐈 แมว' },
  { key: 'other', label: '🐾 อื่นๆ' },
  { key: 'urgent', label: '🔴 ด่วน!' },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <button
      onClick={() => window.open(product.shopeeUrl, '_blank')}
      style={{
        textAlign: 'left',
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        border: '1px solid #FFE5D5',
        background: 'white',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        fontFamily: 'Sarabun, sans-serif',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,98,26,0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Icon banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFF3ED, #FFE5D5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          padding: '20px 0',
          position: 'relative',
        }}
      >
        {product.emoji}
        {product.urgent && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#EE4D2D',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 999,
              fontFamily: 'Sarabun, sans-serif',
            }}
          >
            🔴 ด่วน!
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px 12px' }}>
        <p
          style={{
            color: '#3B1A0E',
            fontFamily: 'Prompt, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: 4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </p>
        <p style={{ color: '#8B6151', fontSize: 11, marginBottom: 10 }}>{product.brand}</p>
        <div
          style={{
            background: '#EE4D2D',
            color: 'white',
            textAlign: 'center',
            padding: '7px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          🛍️ ซื้อใน Shopee
        </div>
      </div>
    </button>
  );
}

export function ProductSection() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filtered: Product[] =
    activeTab === 'all'
      ? products
      : activeTab === 'urgent'
      ? products.filter((p) => p.urgent)
      : products.filter((p) => p.cat === activeTab);

  return (
    <section style={{ background: '#FFFBF7', padding: '48px 16px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h2
          style={{
            color: '#E8621A',
            fontFamily: 'Prompt, sans-serif',
            fontSize: 24,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          🛍️ สินค้าที่ต้องการบริจาค
        </h2>

        {/* Custom Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: activeTab === tab.key ? '2px solid #E8621A' : '2px solid #FFD8C0',
                background: activeTab === tab.key ? '#E8621A' : 'white',
                color: activeTab === tab.key ? 'white' : '#8B6151',
                fontFamily: 'Sarabun, sans-serif',
                fontSize: 14,
                fontWeight: activeTab === tab.key ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: '1/-1',
                textAlign: 'center',
                padding: '48px 0',
                color: '#8B6151',
                fontFamily: 'Sarabun, sans-serif',
              }}
            >
              ไม่พบสินค้าในหมวดนี้
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
