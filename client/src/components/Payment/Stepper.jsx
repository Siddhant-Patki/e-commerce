import React, { useState } from 'react';

function Stepper() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className={`flex items-center ${activeStep === 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${activeStep === 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
          1
        </span>
        Bag <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
        </svg>
      </li>
      <li className={`flex items-center ${activeStep === 2 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${activeStep === 2 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
          2
        </span>
        Address <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
        </svg>
      </li>
      <li className={`flex items-center ${activeStep === 3 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${activeStep === 3 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
          3
        </span>
        Payment
      </li>
    </ol>
  );
}

export default Stepper;
