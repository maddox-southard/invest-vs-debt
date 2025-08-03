// src/app/guides/extra-money-debt-or-investment/page.tsx
import { SeoHead } from '../../../components/SeoHead';

export default function ExtraMoneyDebtOrInvestment() {
  const pageTitle = "Have Extra Money? Should You Pay Off Debt or Invest It?";
  const pageDescription = "You have extra cash. What's the smartest move? We break down how to decide between paying down debt or investing for the future.";
  const canonicalUrl = "https://investvsdebt.com/guides/extra-money-debt-or-investment";

  const faqData = [
    {
      question: "I just got a bonus. What should I do with it?",
      answer: "A lump sum like a bonus presents a great opportunity. The decision framework is the same: compare your debt's interest rate with your potential investment return. Our calculator can show you the long-term impact of both choices."
    },
    {
      question: "What if I have both high-interest and low-interest debt?",
      answer: "A common strategy is to pay the minimum on all debts and allocate any extra money to the debt with the highest interest rate first (the 'avalanche' method). Once that's paid off, you can re-evaluate whether to tackle the next debt or invest."
    }
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        faqData={faqData}
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">{pageTitle}</h1>
          <p>
            [Placeholder for direct question answering content]
          </p>
        </div>
      </main>
    </>
  );
}