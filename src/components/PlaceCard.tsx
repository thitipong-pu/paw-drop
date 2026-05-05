import { Place } from '../types';

const badgeColors: Record<string, { bg: string; text: string }> = {
  shelter:    { bg: '#FFF3ED', text: '#E8621A' },
  clinic:     { bg: '#F0FDF4', text: '#2E7D32' },
  foundation: { bg: '#FEFCE8', text: '#B45309' },
  rescue:     { bg: '#FDF2F8', text: '#9D174D' },
};

interface PlaceCardProps {
  place: Place;
  onClick: (place: Place) => void;
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  const badge = badgeColors[place.typeKey];

  return (
    <button
      onClick={() => onClick(place)}
      className="text-left w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white"
      style={{ border: '1px solid #FFE5D5' }}
    >
      {/* Emoji Banner */}
      <div
        className="flex items-center justify-center text-5xl py-6"
        style={{ background: 'linear-gradient(135deg, #FFF3ED, #FFE5D5)' }}
      >
        {place.emoji}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type Badge */}
        <span
          className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2"
          style={{ backgroundColor: badge.bg, color: badge.text, fontFamily: 'Sarabun, sans-serif' }}
        >
          {place.type}
        </span>

        {/* Name */}
        <h3
          className="font-bold text-base mb-1 leading-snug"
          style={{ color: '#3B1A0E', fontFamily: 'Prompt, sans-serif' }}
        >
          {place.name}
        </h3>

        {/* Address truncated */}
        <p
          className="text-xs leading-relaxed"
          style={{
            color: '#8B6151',
            fontFamily: 'Sarabun, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          📍 {place.addr}
        </p>
      </div>
    </button>
  );
}
