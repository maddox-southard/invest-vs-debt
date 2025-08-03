// src/app/guides/when-to-pay-off-debt-vs-invest/page.tsx
import { SeoHead } from '../../../components/SeoHead';

export default function WhenToPayOffDebtVsInvest() {
  const pageTitle = "When to Pay Off Debt vs. Invest: A Decision Framework";
  const pageDescription = "Learn when to prioritize paying off debt and when to focus on investing. Our guide provides a clear framework for making the right financial decision.";
  const canonicalUrl = "https://investvsdebt.com/guides/when-to-pay-off-debt-vs-invest";

  const faqData = [
    {
      question: "Is there a simple rule of thumb for this decision?",
      answer: "A common rule of thumb is to pay off any high-interest debt (typically above 7-8%) before investing. For low-interest debt, investing often makes more sense. However, the best approach is to use a calculator to compare your specific numbers."
    },
    {
      question: "How does my risk tolerance affect this decision?",
      answer: "Your risk tolerance is a key factor. Paying off debt provides a guaranteed, risk-free return equal to your interest rate. Investing offers potentially higher returns but comes with risk. A lower risk tolerance may favor paying off debt."
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
            [Placeholder for decision framework content]
          </p>
        </div>
      </main>
    </>
  );
}