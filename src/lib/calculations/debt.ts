export interface Debt {
  balance: number;
  interestRate: number;
  minimumPayment: number;
  paymentFrequency: "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";
}

export const calculateAmortization = (
  debt: Debt,
  additionalPayment: number = 0
) => {
  const monthlyInterestRate = debt.interestRate / 100 / 12;
  const monthlyPayment = getMonthlyPayment(debt.minimumPayment, debt.paymentFrequency);
  const totalMonthlyPayment = monthlyPayment + additionalPayment;
  
  let remainingBalance = debt.balance;
  let months = 0;
  const schedule = [];

  // Safety check to prevent infinite loops with insufficient payments
  if (totalMonthlyPayment <= (remainingBalance * monthlyInterestRate)) {
    // Payment is less than or equal to monthly interest - debt will never be paid off
    // Return a truncated schedule showing this scenario
    for (let i = 0; i < 360; i++) { // Show 30 years max
      months++;
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = totalMonthlyPayment - interestPayment;
      
      if (principalPayment <= 0) {
        remainingBalance += Math.abs(principalPayment); // Balance grows
      } else {
        remainingBalance -= principalPayment;
        if (remainingBalance <= 0) {
          remainingBalance = 0;
          schedule.push({
            month: months,
            interestPayment,
            principalPayment,
            remainingBalance: 0,
          });
          break;
        }
      }
      
      schedule.push({
        month: months,
        interestPayment,
        principalPayment,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      });
    }
    return { schedule, months };
  }

  while (remainingBalance > 0.01) { // Use small threshold to avoid floating point issues
    months++;
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = totalMonthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    if (remainingBalance < 0) remainingBalance = 0;

    schedule.push({
      month: months,
      interestPayment,
      principalPayment,
      remainingBalance,
    });

    if (months > 600) { // Safety break for very long loans (50 years)
      break;
    }
  }

  return { schedule, months };
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