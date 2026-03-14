import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBullaCurrency(amount: string, decimals: number = 18): string {
  if (!amount) return "0.00";
  
  try {
    const val = BigInt(amount);
    const divisor = BigInt(10 ** decimals);
    const integerPart = val / divisor;
    const fractionalPart = val % divisor;
    
    // Pad fractional part with leading zeros
    const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    
    // Keep only first 2 decimal places for display
    const displayFraction = fractionalStr.substring(0, 2);
    
    // Add commas for thousands
    const integerStr = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return `${integerStr}.${displayFraction}`;
  } catch (e) {
    console.error("Error formatting currency:", e);
    return "0.00";
  }
}
