import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import otpGenerator from 'otp-generator';

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

export function generateOTP(){ 
  return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false}) 
}