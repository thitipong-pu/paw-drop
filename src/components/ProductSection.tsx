import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { Product } from '../types';

type Category = 'all' | 'dog' | 'cat' | 'other' | 'urgent';

const tabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'dog', label: '🐕 สุนัข' },
  { key: 'cat', label: '🐈 แมว' },
  { key: 'other', label: '🐾 อื่นๆ' },
  { key: 'urgent', label: '🔴 ด่วน!' },
];

const API_URL = import.meta.env.VITE_API_URL;

function ProductCard({ product }: { product: Product }) {
  return (
    <button
      onClick={() => {
        window.open(product.shopeeUrl, '_blank');

        // Track Item CLICK
        fetch(`${API_URL}/tracking/event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            target_id: product.id.toString(),
            target_type: 'ITEM',
            event_type: 'CLICK'
          })
        }).catch(err => console.error("Error tracking click:", err));
      }}
      style={{
        textAlign: 'left',
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
        border: '1px solid #F1F5F9',
        background: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'Sarabun, sans-serif',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(3, 136, 196, 0.15)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = '#0388C420';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#F1F5F9';
      }}
    >
      {/* Icon banner */}
      <div
        style={{
          background: product.imageUrl ? `url(${product.imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #FFF3ED, #FFE5D5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          height: 120, // fixed height for banner
          position: 'relative',
        }}
      >
        {!product.imageUrl && product.emoji}
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
            background: '#0388C4',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'Prompt, sans-serif',
            boxShadow: '0 4px 12px rgba(3, 136, 196, 0.2)',
          }}
        >
          สั่งซื้อเลย
        </div>
      </div>
    </button>
  );
}

export function ProductSection() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [productsData, setProductsData] = useState<Product[]>(initialProducts);

  useEffect(() => {
    fetch(`${API_URL}/public/items`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const mappedItems: Product[] = data.data.map((item: any) => ({
            id: item.id,
            cat: item.animal_types && item.animal_types.includes('dog') ? 'dog' : (item.animal_types?.includes('cat') ? 'cat' : 'other'),
            name: item.name,
            brand: '🐾 สำหรับสัตว์เลี้ยง',
            emoji: item.image_url ? '📦' : '🍖',
            imageUrl: item.image_url || undefined,
            urgent: item.tags?.includes('ด่วน') || false,
            shopeeUrl: item.product_url || '#'
          }));
          setProductsData(mappedItems);
        }
      })
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  const filtered: Product[] =
    activeTab === 'all'
      ? productsData
      : activeTab === 'urgent'
        ? productsData.filter((p) => p.urgent)
        : productsData.filter((p) => p.cat === activeTab);

  return (
    <section style={{ background: '#F8FAFC', padding: '80px 16px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            color: '#0388C4',
            fontFamily: 'Prompt, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          🛍️ สิ่งของที่เปิดรับบริจาค
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
                padding: '10px 24px',
                borderRadius: 999,
                border: activeTab === tab.key ? '2px solid #0388C4' : '2px solid #E2E8F0',
                background: activeTab === tab.key ? '#0388C4' : 'white',
                color: activeTab === tab.key ? 'white' : '#64748B',
                fontFamily: 'Prompt, sans-serif',
                fontSize: 14,
                fontWeight: activeTab === tab.key ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.key ? '0 8px 16px rgba(3, 136, 196, 0.2)' : 'none',
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
              ไม่พบของบริจากในหมวดนี้
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
