import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrlErrorDisplayMessage(error: string | null){
    // For nextauth errors
    switch (error) {
      case 'OAuthAccountNotLinked':
        return "Email already in use with different provider";
      
      case null:
        return null;
  
      default:
        return "Something went wrong!";
    }
}
