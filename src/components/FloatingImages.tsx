import { useEffect, useState } from 'react';

// Neue Komponente für die schwebenden Bilder
const floatingPositions = [
  { top: '10%', left: '15%', from: 'left', rotate: '-5deg' },
  { top: '15%', right: '10%', from: 'right', rotate: '5deg' },
  { top: '40%', left: '5%', from: 'left', rotate: '-8deg' },
  { top: '45%', right: '15%', from: 'right', rotate: '3deg' },
  { top: '25%', left: '20%', from: 'left', rotate: '-2deg' }
];

// Korrekte Bildpfade mit Error Handling
const websiteImages = [
  '/floating-image-1.jpg',
  '/floating-image-2.jpg',
  '/floating-image-3.jpg',
  '/floating-image-4.jpg',
  '/floating-image-5.jpg'
];

export const FloatingImages = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (index: number) => {
    setImageErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingPositions.map((position, i) => {
        const translateY = Math.min(scrollY * 0.4, 300);
        const opacity = !imageErrors[i] ? Math.max(0, 1 - (translateY / 300)) : 0;
        
        return (
          <div
            key={i}
            className={`absolute floating-image ${isVisible ? 'is-visible' : ''}`}
            style={{
              ...position,
              '--index': i,
              '--translate-y': `${translateY}px`,
              '--opacity': opacity,
              '--from-direction': position.from === 'left' ? '-100vw' : '100vw'
            } as React.CSSProperties}
          >
            <img
              src={websiteImages[i]}
              alt="Website Vorschau"
              className="w-auto h-auto max-w-[200px] rounded-lg shadow-lg"
              style={{
                objectFit: 'contain',
                objectPosition: 'center center'
              }}
              onError={() => handleImageError(i)}
            />
          </div>
        );
      })}
    </div>
  );
}; 