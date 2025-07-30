"use client";

import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import { Debt } from "@/lib/calculations/debt";

interface DebtInputFormProps {
  value: Debt;
  onChange: (value: Debt) => void;
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

// Calculate monthly payment for 30-year amortization
const calculate30YearPayment = (principal: number, annualRate: number, frequency: string): number => {
  if (principal <= 0 || annualRate <= 0) return 0;
  
  // Convert to monthly values for calculation
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = 30 * 12; // 30 years
  
  // Standard loan payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Convert monthly payment to the specified frequency
  switch (frequency) {
    case "weekly":
      return monthlyPayment * 12 / 52;
    case "bi-weekly":
      return monthlyPayment * 12 / 26;
    case "monthly":
      return monthlyPayment;
    case "quarterly":
      return monthlyPayment * 3;
    case "annually":
      return monthlyPayment * 12;
    default:
      return monthlyPayment;
  }
};

export function DebtInputForm({ value, onChange }: DebtInputFormProps) {
  // Track whether the user has manually edited the payment field
  const userEditedPayment = useRef(false);

  const handleChange = (field: keyof Debt, fieldValue: any) => {
    let newValue = { ...value };
    
    if (field === "minimumPayment") {
      // User is manually editing the payment field
      userEditedPayment.current = true;
      newValue.minimumPayment = parseFloat(fieldValue) || 0;
    } else if (field === "paymentFrequency") {
      // Reset manual edit flag when frequency changes since we need to recalculate
      userEditedPayment.current = false;
      newValue.paymentFrequency = fieldValue;
      
      // Auto-calculate payment if we have balance and interest rate
      if (!userEditedPayment.current && newValue.balance > 0 && newValue.interestRate > 0) {
        const autoPayment = calculate30YearPayment(newValue.balance, newValue.interestRate, fieldValue);
        newValue.minimumPayment = Math.round(autoPayment * 100) / 100;
      }
    } else if (field === "balance") {
      // Reset manual edit flag when balance changes since we want to auto-calculate
      userEditedPayment.current = false;
      newValue.balance = parseFloat(fieldValue) || 0;
      
      // Auto-calculate payment if we have both balance and interest rate
      if (!userEditedPayment.current && newValue.balance > 0 && newValue.interestRate > 0) {
        const autoPayment = calculate30YearPayment(newValue.balance, newValue.interestRate, newValue.paymentFrequency);
        newValue.minimumPayment = Math.round(autoPayment * 100) / 100;
      }
    } else if (field === "interestRate") {
      // Reset manual edit flag when interest rate changes since we want to auto-calculate
      userEditedPayment.current = false;
      newValue.interestRate = parseFloat(fieldValue) || 0;
      
      // Auto-calculate payment if we have both balance and interest rate
      if (!userEditedPayment.current && newValue.balance > 0 && newValue.interestRate > 0) {
        const autoPayment = calculate30YearPayment(newValue.balance, newValue.interestRate, newValue.paymentFrequency);
        newValue.minimumPayment = Math.round(autoPayment * 100) / 100;
      }
    }
    
    onChange(newValue);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Debt Information</CardTitle>
        <CardDescription>Enter your current debt details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 1. Current Debt Amount */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="debt-balance">Current Debt Amount</Label>
            <FieldTooltip content="The total amount you currently owe on this debt, including principal and any accrued interest." />
          </div>
          <Input
            id="debt-balance"
            type="number"
            placeholder="e.g., 100000"
            value={value.balance?.toString() || "0"}
            onChange={(e) => handleChange("balance", e.target.value)}
            aria-label="Current Debt Amount"
          />
        </div>

        {/* 2. Current Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="interest-rate">Current Interest Rate (%)</Label>
            <FieldTooltip content="The annual percentage rate (APR) charged on your debt. This is usually found on your monthly statement." />
          </div>
          <Input
            id="interest-rate"
            type="number"
            step="0.01"
            placeholder="e.g., 5.0"
            value={value.interestRate?.toString() || "0"}
            onChange={(e) => handleChange("interestRate", e.target.value)}
            aria-label="Current Interest Rate"
          />
        </div>

        {/* 3. Minimum Payment Frequency */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="payment-frequency">Minimum Payment Frequency</Label>
            <FieldTooltip content="How often you're required to make payments on this debt (e.g., monthly for most credit cards and loans)." />
          </div>
          <Select 
            value={value.paymentFrequency || "monthly"} 
            onValueChange={(val) => handleChange("paymentFrequency", val)}
          >
            <SelectTrigger id="payment-frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 4. Minimum Payment Amount */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="min-payment">Minimum Payment Amount</Label>
            <FieldTooltip content="Auto-calculated based on 30-year amortization. You can override this by entering your own value. Enter $0 if there's no minimum payment requirement (e.g., some student loans during deferment)." />
          </div>
          <Input
            id="min-payment"
            type="number"
            placeholder="Auto-calculated or enter manually"
            value={value.minimumPayment?.toString() || "0"}
            onChange={(e) => handleChange("minimumPayment", e.target.value)}
            aria-label="Minimum Payment Amount"
          />
        </div>
      </CardContent>
    </Card>
  );
} 