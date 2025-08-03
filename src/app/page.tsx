"use client";

import { useState } from "react";
import { DebtInputForm } from "@/components/DebtInputForm";
import { InvestmentInputForm } from "@/components/InvestmentInputForm";
import { CashFlowInputForm } from "@/components/CashFlowInputForm";
import { Button } from "@/components/ui/button";
import { calculateComparison } from "@/lib/calculations/comparison";
import { generateOptimalDecision } from "@/lib/recommendation";
import { ResultsChart } from "@/components/ResultsChart";
import { OptimalDecisionDisplay } from "@/components/OptimalDecisionDisplay";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Debt } from "@/lib/calculations/debt";
import { Investment } from "@/components/InvestmentInputForm";
import { CashFlow } from "@/components/CashFlowInputForm";
import { AdvancedModeToggle } from "@/components/AdvancedModeToggle";
import { SupportBanner } from "@/components/SupportBanner";

// Calculate minimum payment for 30-year amortization
const calculate30YearPayment = (principal: number, annualRate: number): number => {
  if (principal <= 0 || annualRate <= 0) return 0;
  
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = 30 * 12; // 30 years
  
  // Standard loan payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  return Math.round(monthlyPayment * 100) / 100; // Round to 2 decimal places
};

export default function Home() {
  const [debt, setDebt] = useLocalStorage<Debt>("debt-v2", {
    balance: 100000,
    interestRate: 5.0,
    minimumPayment: calculate30YearPayment(100000, 5.0), // Auto-calculate based on 30-year amortization
    paymentFrequency: "monthly",
  });
  const [investment, setInvestment] = useLocalStorage<Investment>("investment-v2", {
    returnRate: 7.5,
    initialInvestment: 0,
  });
  const [cashFlow, setCashFlow] = useLocalStorage<CashFlow>("cashFlow-v2", {
    frequency: "monthly",
    amount: 250,
  });
  const [results, setResults] = useState<any>(null);
  const [optimalDecision, setOptimalDecision] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      const comparison = calculateComparison(
        debt,
        investment,
        cashFlow.amount
      );
      setResults(comparison);

          const decisionResult = generateOptimalDecision(debt, investment);
    setOptimalDecision(decisionResult);
      setIsCalculating(false);
    }, 500);
  };

  const hasValidInputs = debt.balance > 0 && debt.interestRate > 0 && debt.minimumPayment >= 0 && 
                         investment.returnRate > 0 && cashFlow.amount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SupportBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Invest vs. Debt Calculator
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Determine whether your additional extra payment should be allocated toward paying off debt or contributing toward investments.
          </p>
        </div>

        {/* Three sections displayed simultaneously */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Debt Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-slate-800">Debt Information</h2>
            <DebtInputForm value={debt} onChange={setDebt} />
          </div>

          {/* Investment Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-slate-800">Investment Information</h2>
            <InvestmentInputForm value={investment} onChange={setInvestment} />
          </div>

          {/* Extra Payment Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-slate-800">Extra Payment Information</h2>
            <CashFlowInputForm value={cashFlow} onChange={setCashFlow} />
          </div>
        </div>

        {/* Advanced Mode Toggle */}
        <div className="flex justify-center mb-6">
          <AdvancedModeToggle />
        </div>

        {/* Calculate Button */}
        <div className="text-center mb-12">
          <Button 
            onClick={handleCalculate} 
            size="lg" 
            className="px-12 py-4 text-lg font-semibold bg-slate-800 hover:bg-slate-700 text-white shadow-lg"
            disabled={!hasValidInputs || isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Optimal Decision"}
          </Button>
          {!hasValidInputs && (
            <p className="text-sm text-slate-500 mt-3">
              Please fill in all fields to calculate your optimal decision.
            </p>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-10">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Analysis Results</h2>
              <ResultsChart data={results} cashFlowAmount={cashFlow.amount} />
            </div>
            
                    {optimalDecision && (
              <OptimalDecisionDisplay
                decision={optimalDecision.decision}
                confidence={optimalDecision.confidence}
                debtInterestRate={optimalDecision.debtInterestRate}
                investmentReturnRate={optimalDecision.investmentReturnRate}
                rateDifference={optimalDecision.rateDifference}
                cashFlowAmount={cashFlow.amount}
              />
            )}
          </div>
        )}


      </div>
    </div>
  );
}
