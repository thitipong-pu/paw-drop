import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { PlaceCard } from './components/PlaceCard';
import { PlaceModal } from './components/PlaceModal';
import { ProductSection } from './components/ProductSection';
import { CTABanner } from './components/CTABanner';
import { places } from './data/places';
import { Place } from './types';

function App() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: '#FFFBF7', minHeight: '100vh' }}>
      {/* Hero */}
      <HeroSection />

      {/* Places Section */}
      <section className="py-12 px-4" style={{ background: '#FFF3ED' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: '#E8621A', fontFamily: 'Prompt, sans-serif' }}
          >
            📍 สถานที่รับบริจาค
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} onClick={handlePlaceClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductSection />

      {/* CTA Banner */}
      <CTABanner />

      {/* Place Detail Modal */}
      <PlaceModal place={selectedPlace} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
