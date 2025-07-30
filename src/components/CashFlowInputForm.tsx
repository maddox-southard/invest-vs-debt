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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface CashFlow {
  frequency: "lump-sum" | "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";
  amount: number;
}

interface CashFlowInputFormProps {
  value: CashFlow;
  onChange: (value: CashFlow) => void;
}

const FieldTooltip = ({ content }: { content: string }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help focus:outline-none focus:text-gray-600"
          aria-label="Help information"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function CashFlowInputForm({ value, onChange }: CashFlowInputFormProps) {
  const handleChange = (field: keyof CashFlow, fieldValue: any) => {
    if (field === "frequency") {
      onChange({ ...value, [field]: fieldValue });
    } else {
      onChange({ ...value, [field]: parseFloat(fieldValue) || 0 });
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Extra Payment Information</CardTitle>
        <CardDescription>Enter your additional extra payment details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 1. Extra Payment Frequency */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="cash-flow-frequency">Extra Payment Frequency</Label>
            <FieldTooltip content="How often you have extra money available to either pay down debt or invest. This is money beyond your regular expenses and minimum debt payments." />
          </div>
          <Select 
            value={value.frequency || "monthly"} 
            onValueChange={(val) => handleChange("frequency", val)}
          >
            <SelectTrigger id="cash-flow-frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lump-sum">Lump-Sum</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 2. Extra Payment Amount */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="cash-flow-amount">Extra Payment Amount</Label>
            <FieldTooltip content="The amount of extra money you have available each period. This is what you're trying to decide how to allocate - toward paying off debt or investing." />
          </div>
          <Input
            id="cash-flow-amount"
            type="number"
            placeholder="e.g., 250"
            value={value.amount?.toString() || "0"}
            onChange={(e) => handleChange("amount", e.target.value)}
            aria-label="Extra Payment Amount"
          />
        </div>
      </CardContent>
    </Card>
  );
} 