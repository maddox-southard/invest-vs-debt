"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

interface ResultsChartProps {
  data: {
    data: {
      month: number;
      debtBalance: number;
      investmentBalance: number;
    }[];
    crossoverPoint?: number;
    coveragePoint?: number;
    debtPayoffMonths: number;
  };
  cashFlowAmount?: number; // Add this to pass the actual cash flow amount
}

export function ResultsChart({ data, cashFlowAmount = 250 }: ResultsChartProps) {
  const chartData = data.data;
  const { crossoverPoint, coveragePoint, debtPayoffMonths } = data;

  // Hook to detect mobile screens
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Find the actual data points for markers
  const crossoverData = crossoverPoint ? chartData.find(d => d.month === crossoverPoint) : undefined;
  const coverageData = coveragePoint ? chartData.find(d => d.month === coveragePoint) : undefined;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === 'debtBalance') {
      return [formatCurrency(value), 'Debt Balance'];
    } else if (name === 'investmentBalance') {
      return [formatCurrency(value), 'Investment Balance'];
    }
    // Fallback
    return [formatCurrency(value), name];
  };

  // Custom x-axis formatter to show years instead of months for better readability
  const formatXAxis = (monthValue: number) => {
    if (monthValue % 12 === 0) {
      return `${monthValue / 12}y`;
    }
    return '';
  };

  // Custom tooltip label formatter
  const formatTooltipLabel = (month: number) => {
    const years = Math.floor(month / 12);
    const remainingMonths = month % 12;
    if (years === 0) {
      return `Month ${month}`;
    } else if (remainingMonths === 0) {
      return `Year ${years}`;
    } else {
      return `Year ${years}, Month ${remainingMonths}`;
    }
  };

  const formatTimeframe = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: isMobile ? 10 : 30,
            left: isMobile ? 20 : 60,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            strokeOpacity={0.7}
          />
          
          <XAxis 
            dataKey="month" 
            type="number"
            scale="linear"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
            tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={{ stroke: '#d1d5db' }}
          />
          
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={{ stroke: '#d1d5db' }}
            width={isMobile ? 50 : 80}
          />
          
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={formatTooltipLabel}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: isMobile ? '12px' : '14px'
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px', 
              fontSize: isMobile ? '12px' : '14px',
              textAlign: 'center'
            }}
            iconType="line"
          />

          {/* Main data lines */}
          <Line
            type="monotone"
            dataKey="debtBalance"
            stroke="#ef4444"
            strokeWidth={3}
            name="Debt Balance (Minimum Payments Only)"
            dot={false}
            activeDot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#ffffff' }}
            connectNulls={false}
          />
          
          <Line 
            type="monotone" 
            dataKey="investmentBalance" 
            stroke="#10b981"
            strokeWidth={3}
            name="Investment Balance (Extra Payments Invested)"
            dot={false}
            activeDot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
            connectNulls={false}
          />

          {/* Debt payoff reference line */}
          {debtPayoffMonths && (
            <ReferenceLine 
              x={debtPayoffMonths} 
              stroke="#eab308" 
              strokeDasharray="8 4" 
              strokeWidth={2}
            />
          )}

          {/* Crossover point marker */}
          {crossoverData && (
            <>
              <ReferenceLine 
                x={crossoverPoint} 
                stroke="#3b82f6" 
                strokeDasharray="5 5" 
                strokeWidth={2}
              />
              <ReferenceDot
                x={crossoverPoint}
                y={crossoverData.investmentBalance}
                r={6}
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth={3}
              />
            </>
          )}

          {/* Coverage point marker */}
          {coverageData && (
            <>
              <ReferenceLine 
                x={coveragePoint} 
                stroke="#a855f7" 
                strokeDasharray="5 5" 
                strokeWidth={2}
              />
              <ReferenceDot
                x={coveragePoint}
                y={coverageData.investmentBalance}
                r={6}
                fill="#a855f7"
                stroke="#ffffff"
                strokeWidth={3}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Enhanced Legend for special points */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h4 className="font-semibold text-slate-800 text-center mb-4">Key Milestones</h4>
        <div className={`grid gap-4 text-sm ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {(() => {
            // Create milestone objects with timing and details
            const milestones = [];
            
            // Debt payoff milestone (always exists)
            milestones.push({
              month: debtPayoffMonths,
              title: "Debt Paid Off (Extra Payment Toward Debt)",
              description: "This is when your debt would be completely paid off if you allocate your extra payment toward debt payments instead of investing.",
              timeframe: formatTimeframe(debtPayoffMonths),
              color: {
                bg: 'bg-yellow-500',
                border: 'border-yellow-200',
                text: 'text-yellow-700'
              }
            });
            
            // Investment breaks even milestone (optional)
            if (crossoverPoint) {
              milestones.push({
                month: crossoverPoint,
                title: "Investment Strategy Breaks Even",
                description: "This is when your investment portfolio value would equal your remaining debt balance, meaning you could pay off your debt in full using your investment balance.",
                timeframe: formatTimeframe(crossoverPoint),
                color: {
                  bg: 'bg-blue-500',
                  border: 'border-blue-200',
                  text: 'text-blue-700'
                }
              });
            }
            
            // Investment covers debt payment milestone (optional)
            if (coveragePoint) {
              milestones.push({
                month: coveragePoint,
                title: "Investment Returns Cover Debt Payment",
                description: "This is when the returns on your investment account would be sufficient to cover the minimum payment on your debt balance without reducing the principal in your investment account.",
                timeframe: formatTimeframe(coveragePoint),
                color: {
                  bg: 'bg-purple-500',
                  border: 'border-purple-200',
                  text: 'text-purple-700'
                }
              });
            }
            
            // Sort milestones chronologically
            milestones.sort((a, b) => a.month - b.month);
            
            return milestones.map((milestone, index) => (
              <div key={index} className={`flex items-start gap-3 p-4 bg-white rounded-lg border ${milestone.color.border}`}>
                <div className={`w-3 h-3 ${milestone.color.bg} rounded-full mt-0.5 flex-shrink-0`}></div>
                <div className="min-w-0 flex flex-col h-full">
                  <div className={`font-medium ${milestone.color.text} mb-1`}>{milestone.title}</div>
                  <div className="text-slate-600 text-xs mb-2 leading-relaxed flex-grow">{milestone.description}</div>
                  <div className="text-slate-800 font-semibold text-xs mt-auto">{milestone.timeframe}</div>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
} 