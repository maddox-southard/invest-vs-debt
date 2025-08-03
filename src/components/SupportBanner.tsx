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

export const SupportBanner = () => {
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
      <div className="bg-gradient-to-r from-green-50 to-pink-50 border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <span className="font-medium">
                This project was developed and is maintained at our own expense! If you have gotten value out of it, please consider
              </span>
              <button
                onClick={handleClick}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 hover:text-rose-800 rounded-md transition-colors font-medium text-sm border border-rose-200 hover:border-rose-300"
                aria-label="Support this project"
              >
                <span>donating here!</span>
                <span className="text-rose-500">♥️</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
        <AlertDialogContent>
          <div className="absolute right-4 top-4">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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