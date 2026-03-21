import { useState, useCallback } from 'react';
import CinematicIntro from '@/components/CinematicIntro';
import GatewayScreen from '@/components/GatewayScreen';

export default function Index() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('radikae-intro-seen');
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('radikae-intro-seen', 'true');
    setShowIntro(false);
  }, []);

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return <GatewayScreen />;
}
