'use client';

// src/components/FeedbackModal.tsx
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = "bug" | "feedback";

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${feedbackType === 'bug' ? 'Bug Report' : 'User Feedback'} - ${new Date().toISOString()}`,
          body: `${description}\n\n**Context:**\n- **Timestamp:** ${new Date().toISOString()}\n- **URL:** ${window.location.href}`,
          labels: [feedbackType],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setDescription("");
      setFeedbackType(null);
      onClose();
    }
  };

  const handleClose = () => {
    setDescription("");
    setFeedbackType(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="mx-4 max-w-md w-full sm:max-w-lg">
        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1.5 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {!feedbackType ? (
          <>
            <AlertDialogHeader className="pr-8 sm:pr-12">
              <AlertDialogTitle className="text-lg sm:text-xl">Get In Touch</AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base">
                We value your input! Please let us know how we can improve.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col sm:flex-row gap-3 justify-center my-6">
              <Button 
                onClick={() => setFeedbackType("bug")}
                variant="outline"
                className="flex items-center justify-center gap-2 px-4 py-3 border-gray-400 hover:border-gray-600 w-full sm:w-auto"
              >
                🐛 Report a Bug
              </Button>
              <Button 
                onClick={() => setFeedbackType("feedback")}
                variant="outline"
                className="flex items-center justify-center gap-2 px-4 py-3 border-gray-400 hover:border-gray-600 w-full sm:w-auto"
              >
                💬 Share Feedback
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-4 mb-4 space-y-4 px-1 pr-8 sm:pr-12">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-base sm:text-lg">
              {feedbackType === 'bug' ? '🐛 Report a Bug' : '💬 Share Your Feedback'}
            </h3>
            <Textarea
              placeholder={feedbackType === 'bug' ? "Describe the bug and steps to reproduce it..." : "Share your thoughts, suggestions, or ideas..."}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none text-sm"
            />
          </div>
        )}

        {feedbackType && (
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              onClick={() => setFeedbackType(null)}
              className="px-4 sm:px-6 w-full sm:w-auto"
            >
              ← Back
            </Button>
            <AlertDialogAction 
              onClick={handleSubmit} 
              disabled={isSubmitting || !description.trim()}
              className="px-4 sm:px-6 w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};