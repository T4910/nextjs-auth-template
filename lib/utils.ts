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

export function getDifferencesBetweenObjects(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  return Object.keys(obj1).reduce((acc: Record<string, any>, key) => {
      if (obj1[key] !== obj2[key]) {
          acc[key] = { obj1: obj1[key], obj2: obj2[key] };
      }
      return acc;
  }, {});
}

export function filterObjectByKeys(keysObject: Record<string, boolean>, sourceObject: Record<string, any>) {
  return Object.keys(keysObject).reduce((acc, key) => {
      if (keysObject[key] === true && sourceObject.hasOwnProperty(key)) {
          acc[key] = sourceObject[key];
      }
      return acc;
  }, {} as Record<string, any>);
}