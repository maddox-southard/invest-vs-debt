"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export interface Investment {
    returnRate: number;
    initialInvestment: number;
}

interface InvestmentInputFormProps {
    value: Investment;
    onChange: (value: Investment) => void;
}

const FieldTooltip = ({ content }: { content: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  const handleInteraction = () => {
    if (isMobile) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help focus:outline-none focus:text-gray-600"
        aria-label="Help information"
        onClick={handleInteraction}
        onMouseEnter={() => !isMobile && setIsVisible(true)}
        onMouseLeave={() => !isMobile && setIsVisible(false)}
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg max-w-xs whitespace-normal"
          style={{ minWidth: '200px' }}
        >
          <p>{content}</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export function InvestmentInputForm({ value, onChange }: InvestmentInputFormProps) {
  const handleChange = (field: keyof Investment, fieldValue: any) => {
    onChange({ ...value, [field]: parseFloat(fieldValue) || 0 });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Investment Information</CardTitle>
        <CardDescription>Enter your current investment details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 1. Current Investment Amount */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="investment-amount">Current Investment Amount</Label>
            <FieldTooltip content="The total value of your current investments that you could potentially add to with your extra payment. Enter $0 if you're starting fresh." />
          </div>
          <Input
            id="investment-amount"
            type="number"
            placeholder="e.g., 0"
            value={value.initialInvestment?.toString() || "0"}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
            aria-label="Current Investment Amount"
          />
        </div>

        {/* 2. Expected Rate of Return */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="return-rate">Expected Rate of Return (%)</Label>
            <FieldTooltip content="The annual return you expect from your investments. Historical stock market average is around 7-10%, but conservative estimates often use 6-8%." />
          </div>
          <Input
            id="return-rate"
            type="number"
            step="0.01"
            placeholder="e.g., 7.5"
            value={value.returnRate?.toString() || "0"}
            onChange={(e) => handleChange("returnRate", e.target.value)}
            aria-label="Expected Rate of Return"
          />
        </div>
      </CardContent>
    </Card>
  );
} 