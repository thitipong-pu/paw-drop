import { Place } from '../types';



interface PlaceCardProps {
  place: Place;
  onClick: (place: Place) => void;
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <div
      className="text-left w-full rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 bg-white flex flex-col border border-slate-100"
    >
      {/* Image / Emoji Banner */}
      <div
        className="relative flex items-center justify-center text-5xl shrink-0"
        style={{ 
          background: place.imageUrl ? `url(${place.imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
          height: 180 // increased height as per image
        }}
      >
        {!place.imageUrl && place.emoji}
        
        {/* Type Badge on Top Left */}
        <div 
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
          style={{ backgroundColor: '#0388C4', fontFamily: 'Prompt, sans-serif' }}
        >
          {place.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name */}
        <h3
          className="font-bold text-lg mb-3 leading-tight"
          style={{ color: '#0F172A', fontFamily: 'Prompt, sans-serif' }}
        >
          {place.name}
        </h3>

        {/* Address truncated */}
        <div className="flex gap-2 mb-6">
          <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0388C4' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          <p
            className="text-xs leading-relaxed text-slate-500 font-medium"
            style={{
              fontFamily: 'Sarabun, sans-serif',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {place.addr}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => onClick(place)}
          className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110 active:scale-95 mt-auto shadow-md"
          style={{ backgroundColor: '#0388C4', fontFamily: 'Prompt, sans-serif' }}
        >
          รายละเอียดและช่องทางบริจาค
        </button>
      </div>
    </div>
  );
}
