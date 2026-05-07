import { Button } from '@heroui/react';
import logoUrl from '../img/logo.png';

export function CTABanner() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'ศูนย์บริจาคอาหารสัตว์',
        text: 'รวมสถานที่รับบริจาคอาหารสัตว์ทั่วประเทศ ค้นหาและส่งมอบอาหารให้น้องสัตว์ได้ง่ายๆ',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอก URL แล้ว! นำไปแชร์ให้เพื่อนได้เลย 🐾');
    }
  };

  return (
    <section
      className="py-20 px-4 text-center"
      style={{
        background: 'linear-gradient(135deg, #0388C4 0%, #026A9A 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
          ช่วยกันแชร์ให้เพื่อนๆ
        </h2>
        <p
          className="text-white/90 text-lg mb-10"
          style={{ fontFamily: 'Sarabun, sans-serif' }}
        >
          ยิ่งมีคนรู้มากเท่าไหร่ น้องสัตว์ก็จะได้รับความช่วยเหลือมากขึ้น
        </p>
        <Button
          size="lg"
          onPress={handleShare}
          className="font-bold px-12 h-14"
          style={{
            background: 'white',
            color: '#0388C4',
            fontFamily: 'Prompt, sans-serif',
            fontSize: '1.1rem',
            borderRadius: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          }}
        >
          📣 แชร์เลย
        </Button>
      </div>
    </section>
  );
}
