// src/app/guides/debt-payoff-vs-investing-calculator-guide/page.tsx
import { SeoHead } from '../../../components/SeoHead';

export default function DebtPayoffVsInvestingCalculatorGuide() {
  const pageTitle = "How to Use Our Debt vs. Investing Calculator";
  const pageDescription = "A step-by-step guide on how to use our calculator to get a precise, data-driven answer for your debt vs. investment questions.";
  const canonicalUrl = "https://investvsdebt.com/guides/debt-payoff-vs-investing-calculator-guide";

  const faqData = [
    {
      question: "What information do I need to use the calculator?",
      answer: "You will need to know the principal amount of your debt, the interest rate, the loan term, your estimated investment return rate, and the extra amount of cash you have to allocate each month."
    },
    {
      question: "How accurate is the calculator?",
      answer: "The calculator provides a precise mathematical comparison based on the numbers you provide. The accuracy of the long-term outcome depends on the accuracy of your estimated investment return rate."
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
            [Placeholder for tool-specific content]
          </p>
        </div>
      </main>
    </>
  );
}