import { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { PlaceCard } from '../components/PlaceCard';
import { PlaceModal } from '../components/PlaceModal';
import { ProductSection } from '../components/ProductSection';
import { CTABanner } from '../components/CTABanner';
import { places } from '../data/places';
import { Place } from '../types';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [placesData, setPlacesData] = useState<Place[]>(places); // Start with mock or empty
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/public/places`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const mappedPlaces: Place[] = data.data.map((p: any) => ({
            id: p.id,
            emoji: p.image_url ? '📍' : '🏢', // Using placeholder emoji if no image
            imageUrl: p.image_url || undefined,
            name: p.name,
            type: p.place_type || 'Shelter',
            typeKey: 'shelter',
            addr: p.address || '',
            tel: p.phone || '',
            hours: p.operating_hours || '',
            needs: p.needed_items || [],
            mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}`,
            facebookPage: p.facebook_page || undefined,
            facebookUrl: p.facebook_url || undefined
          }));
          setPlacesData(mappedPlaces);
        }
      })
      .catch(err => console.error("Error fetching places:", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    
    // Track Place VIEW
    fetch(`${API_URL}/tracking/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_id: place.id.toString(),
        target_type: 'PLACE',
        event_type: 'VIEW'
      })
    }).catch(err => console.error("Error tracking view:", err));
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero */}
      <HeroSection />

      {/* Places Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <svg className="w-8 h-8" style={{ color: '#0388C4' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <h2
              className="text-3xl font-bold text-center"
              style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}
            >
              สถานที่รับบริจาค
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-20 text-slate-400 font-medium">กำลังโหลดข้อมูลสถานที่...</div>
            ) : (
              placesData.map((place) => (
                <PlaceCard key={place.id} place={place} onClick={handlePlaceClick} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductSection />

      {/* CTA Banner */}
      <CTABanner />

      <Footer />

      {/* Place Detail Modal */}
      <PlaceModal place={selectedPlace} onClose={handleCloseModal} />
    </div>
  );
}
