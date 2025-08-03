// src/app/guides/high-interest-debt-vs-market-returns/page.tsx
import { SeoHead } from '../../../components/SeoHead';

export default function HighInterestDebtVsMarketReturns() {
  const pageTitle = "High-Interest Debt vs. Market Returns: A Comparison";
  const pageDescription = "Explore the scenarios where paying off high-interest debt is the clear winner against investing, and when the market's potential returns might be worth the risk.";
  const canonicalUrl = "https://investvsdebt.com/guides/high-interest-debt-vs-market-returns";

  const faqData = [
    {
      question: "What is considered high-interest debt?",
      answer: "Generally, any debt with an interest rate significantly higher than the historical average stock market return (around 10%) is considered high-interest. This often includes credit card debt and personal loans."
    },
    {
      question: "Why is paying off high-interest debt a 'guaranteed' return?",
      answer: "When you pay off a debt with a 20% interest rate, you are effectively earning a 20% return on your money, guaranteed and risk-free. This is a very powerful wealth-building tool."
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
            [Placeholder for common scenario analysis content]
          </p>
        </div>
      </main>
    </>
  );
}