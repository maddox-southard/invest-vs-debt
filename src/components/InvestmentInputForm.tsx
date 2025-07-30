"use client";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Investment {
    returnRate: number;
    initialInvestment: number;
}

interface InvestmentInputFormProps {
    value: Investment;
    onChange: (value: Investment) => void;
}

const FieldTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

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