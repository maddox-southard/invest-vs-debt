import { Debt } from "./debt";
import { Investment } from "@/components/InvestmentInputForm";

export const calculateInvestmentGrowth = (
  investment: Investment,
  monthlyContribution: number,
  years: number
) => {
  const monthlyRate = investment.returnRate / 100 / 12;
  const totalMonths = years * 12;
  let futureValue = investment.initialInvestment;
  const schedule = [];

  for (let i = 0; i < totalMonths; i++) {
    // Add monthly contribution at the beginning of the period
    futureValue += monthlyContribution;
    
    // Then apply growth for the full month
    futureValue = futureValue * (1 + monthlyRate);
    
    schedule.push({
      month: i + 1,
      value: futureValue,
    });
  }

  return { schedule, futureValue };
}; 