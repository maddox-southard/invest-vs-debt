import { Debt } from "./calculations/debt";
import { Investment } from "@/components/InvestmentInputForm";

export const generateOptimalDecision = (
  debt: Debt,
  investment: Investment,
) => {
  const decision =
    investment.returnRate > debt.interestRate ? "invest" : "pay off debt";
  
  const difference = Math.abs(investment.returnRate - debt.interestRate);

  let confidence = "low";
  if (difference > 2) {
    confidence = "medium";
  }
  if (difference > 5) {
    confidence = "high";
  }

  return { 
    decision, 
    confidence,
    debtInterestRate: debt.interestRate,
    investmentReturnRate: investment.returnRate,
    rateDifference: difference
  };
}; 