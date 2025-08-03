// src/app/guides/debt-vs-investment-complete-guide/page.tsx
import { SeoHead } from '../../../components/SeoHead';

export default function DebtVsInvestmentCompleteGuide() {
  const pageTitle = "Debt vs Investment: The Complete Guide";
  const pageDescription = "Our comprehensive guide to making the optimal financial decision between paying off debt and investing. Understand the factors, scenarios, and strategies.";
  const canonicalUrl = "https://investvsdebt.com/guides/debt-vs-investment-complete-guide";

  const faqData = [
    {
      question: "What is the best way to decide between paying off debt and investing?",
      answer: "The best way is to compare the after-tax interest rate on your debt with the potential after-tax return on your investment. If the potential investment return is higher, investing is generally the better option. Our calculator helps you run these numbers precisely."
    },
    {
      question: "Should I pay off my mortgage early or invest?",
      answer: "This depends on your mortgage interest rate versus your expected investment returns. With historically low mortgage rates, it's often more advantageous to invest in the market, but our tool can help you make the right choice for your specific situation."
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
            [Placeholder for comprehensive guide content]
          </p>
        </div>
      </main>
    </>
  );
}