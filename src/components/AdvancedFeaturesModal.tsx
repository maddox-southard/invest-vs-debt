'use client';

// src/components/AdvancedFeaturesModal.tsx
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdvancedFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedFeaturesModal = ({ isOpen, onClose }: AdvancedFeaturesModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features = [
    "Tax implications",
    "Multiple debts/investments",
    "Increasing extra payment assumptions over time",
  ];

  const handleInterest = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Advanced Mode Interest - ${new Date().toISOString()}`,
          body: `A user wants more features!\n\n**Timestamp:** ${new Date().toISOString()}`,
          labels: ['feedback', 'advanced-mode'],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit interest');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>Advanced Mode is coming soon!</AlertDialogTitle>
          <AlertDialogDescription>
            We&apos;re working on more powerful features. Let us know what you prefer!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-6">
          <h3 className="font-semibold mb-3 text-slate-800">Planned features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 ml-2">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800">
            Simple is better!
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleInterest} 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : "I want more features!"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};