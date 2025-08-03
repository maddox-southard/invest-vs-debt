'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export const SupportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sponsorsUrl = process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL || '';

  const handleClick = () => {
    if (sponsorsUrl) {
      window.open(sponsorsUrl, '_blank', 'noopener,noreferrer');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-red-500 transition-colors border border-gray-300 rounded-md hover:border-red-300"
        aria-label="Support this project"
      >
        <span className="mr-2">♥️</span>
        <span>Support this project</span>
      </button>

      <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
        <AlertDialogContent>
          <div className="absolute right-4 top-4">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Support Coming Soon</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your interest in supporting this project! We&apos;re currently setting up GitHub Sponsors to make it easy for you to contribute. Please check back soon for updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};