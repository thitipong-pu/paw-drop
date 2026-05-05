import { Button } from '@heroui/react';

export function CTABanner() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'ศูนย์บริจาคอาหารสัตว์',
        text: 'รวมสถานที่รับบริจาคอาหารสัตว์ทั่วกรุงเทพฯ มาช่วยน้องๆ กันเถอะ!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอก URL แล้ว! นำไปแชร์ให้เพื่อนได้เลย 🐾');
    }
  };

  return (
    <section
      className="py-16 px-4 text-center"
      style={{
        background: 'linear-gradient(135deg, #E8621A 0%, #C0392B 100%)',
      }}
    >
      <div className="max-w-xl mx-auto">
        <div className="text-5xl mb-4">🐾</div>
        <h2
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
          ช่วยกันแชร์ให้เพื่อน
        </h2>
        <p
          className="text-white/80 text-lg mb-8"
          style={{ fontFamily: 'Sarabun, sans-serif' }}
        >
          ยิ่งมีคนรู้มากเท่าไหร่ น้องสัตว์ก็จะได้รับความช่วยเหลือมากขึ้น
        </p>
        <Button
          size="lg"
          onPress={handleShare}
          className="font-bold px-10"
          style={{
            background: 'white',
            color: '#E8621A',
            fontFamily: 'Prompt, sans-serif',
            fontSize: '1rem',
          }}
        >
          📣 แชร์ให้เพื่อน
        </Button>
      </div>
    </section>
  );
}
