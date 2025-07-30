"use client";

import { TrendingUp } from "lucide-react";

interface OptimalDecisionDisplayProps {
  decision: string;
  confidence: string;
  debtInterestRate: number;
  investmentReturnRate: number;
  rateDifference: number;
  cashFlowAmount?: number;
}

export function OptimalDecisionDisplay({ 
  decision, 
  confidence,
  debtInterestRate,
  investmentReturnRate,
  rateDifference,
  cashFlowAmount = 250
}: OptimalDecisionDisplayProps) {
  const isInvest = decision.toLowerCase().includes('invest');
  
  // Improve the decision text to be more descriptive
  const improvedDecision = isInvest 
    ? 'Invest your extra payment!' 
    : 'Put your extra payment toward your debt!';
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Optimal Decision - Clean and Prominent */}
      <div className={`border-2 rounded-xl p-8 text-center ${
        isInvest 
          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <div className="flex items-center justify-center mb-4">
          <div className={`p-3 rounded-full ${
            isInvest ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
          }`}>
            <TrendingUp size={24} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Optimal Decision: <span className={`${isInvest ? 'text-emerald-700' : 'text-blue-700'}`}>
            {improvedDecision}
          </span>
        </h2>
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-base font-semibold shadow-sm ${
            confidence.toLowerCase() === 'high' 
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : confidence.toLowerCase() === 'medium'
              ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
              : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              confidence.toLowerCase() === 'high' 
                ? 'bg-green-500'
                : confidence.toLowerCase() === 'medium'
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}></div>
            Confidence Level: {confidence.charAt(0).toUpperCase() + confidence.slice(1).toLowerCase()}
          </div>
        </div>
      </div>

      {/* Strategy Rationale - Clean and Informative */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h4 className="font-semibold text-slate-800 mb-3">Why This Strategy?</h4>
        <p className="text-slate-600 leading-relaxed">
          {isInvest ? (
            <>
              Your expected investment return <span className="font-medium text-emerald-600">({investmentReturnRate}% annually)</span> exceeds 
              your debt interest rate <span className="font-medium text-red-600">({debtInterestRate}% annually)</span> by {rateDifference.toFixed(1)}%. 
              This means you can potentially build more wealth by investing your extra payment,
              while making minimum debt payments allows you to maintain good credit and payment flexibility.
            </>
          ) : (
            <>
              Your debt interest rate <span className="font-medium text-red-600">({debtInterestRate}% annually)</span> exceeds 
              your expected investment return <span className="font-medium text-emerald-600">({investmentReturnRate}% annually)</span> by {rateDifference.toFixed(1)}%. 
              This makes debt payoff the more financially beneficial choice. Eliminating debt provides guaranteed savings 
              equal to your interest rate and improves your overall financial security.
            </>
          )}
        </p>
      </div>

      {/* Other Considerations */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h4 className="font-semibold text-slate-800 mb-4">Other Considerations</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-slate-800">Liquidity & Financial Flexibility:</span>
              <span className="text-slate-600 ml-1">
                Extra debt payments lock your money away permanently, while investments provide access for emergencies, 
                home purchases, or business opportunities. This optionality has real value beyond the mathematical comparison.
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-slate-800">Psychological Factors:</span>
              <span className="text-slate-600 ml-1">
                Some people sleep better being debt-free, and that peace of mind has real value. Investment returns aren&apos;t 
                guaranteed while debt payoff provides certain savings. Consider your stress tolerance and financial anxiety.
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-slate-800">Inflation & Income Growth:</span>
              <span className="text-slate-600 ml-1">
                Fixed-rate debt becomes &ldquo;cheaper&rdquo; over time as inflation and wage growth make payments less burdensome relative to your income. 
                Meanwhile, investments may provide better inflation protection and grow alongside your increasing earning potential.
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-slate-800">Debt Type Matters:</span>
              <span className="text-slate-600 ml-1">
                Different debts have different strategic implications. Mortgages often provide tax benefits and build equity, 
                student loans may have forgiveness programs, while high-interest credit card debt should typically be prioritized for payoff.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Level Explanation */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 mb-3">Understanding Confidence Levels</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-green-800">High Confidence:</span>
              <span className="text-slate-600 ml-1">
                Large difference between investment return and debt interest rate (5%+ spread). The mathematical advantage is clear and significant.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-amber-800">Medium Confidence:</span>
              <span className="text-slate-600 ml-1">
                Moderate difference between rates (2-5% spread). Generally favorable but consider personal risk tolerance and financial situation.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <span className="font-medium text-red-800">Low Confidence:</span>
              <span className="text-slate-600 ml-1">
                Small difference between rates (less than 2% spread). The decision is marginal and personal factors may outweigh mathematical considerations.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer - Subtle but Important */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-medium">Important:</span> This analysis is for educational purposes only and does not constitute financial advice. 
          Results are based on your provided assumptions. Market conditions, tax implications, and personal circumstances 
          should be considered. Please consult with a qualified financial advisor for personalized guidance.
        </p>
      </div>
    </div>
  );
} 