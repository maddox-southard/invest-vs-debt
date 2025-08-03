'use client';

// src/components/AdvancedModeToggle.tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AdvancedFeaturesModal } from './AdvancedFeaturesModal';

export const AdvancedModeToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (checked: boolean) => {
    if (checked) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch id="advanced-mode" onCheckedChange={handleToggle} checked={isModalOpen} />
        <Label htmlFor="advanced-mode">Advanced Mode</Label>
      </div>
      <AdvancedFeaturesModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};