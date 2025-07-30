import { Debt, calculateAmortization } from "./debt";
import { calculateInvestmentGrowth } from "./investment";
import { Investment } from "@/components/InvestmentInputForm";

export interface ComparisonPoint {
  month: number;
  debtBalance: number;
  investmentBalance: number;
}

export interface ComparisonResult {
  data: ComparisonPoint[];
  crossoverPoint?: number; // Month when investment surpasses remaining debt in investment scenario
  coveragePoint?: number; // Month when investment returns can cover debt payment
  totalMonths: number;
  debtPayoffMonths: number;
  debtOnlyPayoffMonths: number;
}

export const calculateComparison = (
  debt: Debt,
  investment: Investment,
  additionalPayment: number
): ComparisonResult => {
  // INVESTMENT STRATEGY SCENARIO:
  // User pays minimum toward debt + puts additionalPayment toward investments
  // We want to show BOTH sides of this single strategy:
  
  // 1. Debt side: How debt decreases with MINIMUM payments only
  const debtMinimumOnly = calculateAmortization(debt, 0);
  const debtOnlyPayoffMonths = debtMinimumOnly.months;
  
  // 2. Investment side: How investments grow with the additionalPayment
  const investmentGrowthYears = Math.max(Math.ceil(debtOnlyPayoffMonths / 12), 10);
  const investmentSchedule = calculateInvestmentGrowth(
    investment,
    additionalPayment,
    investmentGrowthYears
  ).schedule;

  // For comparison purposes, also calculate how fast debt would be paid with extra payments
  const debtWithExtra = calculateAmortization(debt, additionalPayment);
  const debtPayoffMonths = debtWithExtra.months;

  // Use the debt payoff timeline for comparison
  const comparisonMonths = Math.max(debtOnlyPayoffMonths, 120);
  
  const comparison: ComparisonPoint[] = [];
  let crossoverPoint: number | undefined;
  let coveragePoint: number | undefined;
  
  const monthlyDebtPayment = getMonthlyPayment(debt.minimumPayment, debt.paymentFrequency);
  
  for (let i = 0; i < comparisonMonths; i++) {
    // RED LINE: Debt balance when paying MINIMUM only (because extra goes to investments)
    const debtBalance = i < debtMinimumOnly.schedule.length 
      ? debtMinimumOnly.schedule[i].remainingBalance 
      : 0;
    
    // GREEN LINE: Investment growth when putting additionalPayment toward investments
    const investmentBalance = i < investmentSchedule.length 
      ? investmentSchedule[i].value 
      : investmentSchedule[investmentSchedule.length - 1]?.value || 0;
    
    comparison.push({
      month: i + 1,
      debtBalance, // Debt balance with minimum payments only
      investmentBalance, // Investment balance with extra payments
    });

    // Crossover point: When investment balance exceeds remaining debt balance
    // This shows when your investments are worth more than your remaining debt
    if (!crossoverPoint && investmentBalance > debtBalance && debtBalance > 0) {
      crossoverPoint = i + 1;
    }

    // Coverage point: When investment returns can cover minimum debt payments
    if (!coveragePoint && investmentBalance > 0) {
      const annualReturn = investmentBalance * (investment.returnRate / 100);
      const monthlyReturn = annualReturn / 12;
      if (monthlyReturn >= monthlyDebtPayment) {
        coveragePoint = i + 1;
      }
    }
  }

  return {
    data: comparison,
    crossoverPoint,
    coveragePoint,
    totalMonths: comparisonMonths,
    debtPayoffMonths, // How fast debt would be paid with extra payments (for reference)
    debtOnlyPayoffMonths // How long debt takes with minimum payments only
  };
};

// Helper function to convert payment frequency to monthly amount
function getMonthlyPayment(payment: number, frequency: string): number {
  switch (frequency) {
    case "weekly":
      return payment * 52 / 12;
    case "bi-weekly":
      return payment * 26 / 12;
    case "monthly":
      return payment;
    case "quarterly":
      return payment / 3;
    case "annually":
      return payment / 12;
    default:
      return payment; // Default to monthly
  }
} 