'use client';

// src/components/FeedbackButton.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

export const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg"
        aria-label="Provide feedback"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      <FeedbackModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};