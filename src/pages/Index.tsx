import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import GallerySection from '@/components/GallerySection';
import FamilyMessageSection from '@/components/FamilyMessageSection';
import GuestbookSection from '@/components/GuestbookSection';
import BlessingsWallSection from '@/components/BlessingsWallSection';
import Footer from '@/components/Footer';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  photo?: string;
  timestamp: Date;
}

const Index = () => {
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);

  const handleNewMessage = (message: GuestMessage) => {
    setGuestMessages((prev) => [message, ...prev]);
  };

  // Set page title and meta tags
  useEffect(() => {
    document.title = "Precious & Tony's Wedding | January 10, 2026";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <InvitationSection />
        <GallerySection />
        <FamilyMessageSection />
        <GuestbookSection onNewMessage={handleNewMessage} />
        <BlessingsWallSection messages={guestMessages} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
