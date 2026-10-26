'use client';

import React, { useRef, useEffect } from 'react';

interface OtpInputGroupProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  onComplete?: (val: string) => void;
  autoFocus?: boolean;
}

export function OtpInputGroup({
  value,
  onChange,
  length = 6,
  onComplete,
  autoFocus = true
}: OtpInputGroupProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of length
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (!rawVal) {
      // Cleared
      const newDigits = [...digits];
      newDigits[index] = '';
      const newVal = newDigits.join('');
      onChange(newVal);
      return;
    }

    // If user pasted multiple characters into this input
    if (rawVal.length > 1) {
      const pasteDigits = rawVal.slice(0, length).split('');
      const newDigits = [...digits];
      pasteDigits.forEach((char, i) => {
        if (index + i < length) {
          newDigits[index + i] = char;
        }
      });
      const newVal = newDigits.join('');
      onChange(newVal);
      const nextIndex = Math.min(index + pasteDigits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      if (newVal.length === length && onComplete) {
        onComplete(newVal);
      }
      return;
    }

    // Single digit input
    const singleDigit = rawVal[rawVal.length - 1];
    const newDigits = [...digits];
    newDigits[index] = singleDigit;
    const newVal = newDigits.join('');
    onChange(newVal);

    // Auto-advance to next input
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newVal.length === length && onComplete) {
      onComplete(newVal);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and delete previous
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    if (pasted.length === length && onComplete) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 my-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl border transition-all duration-150 focus:outline-none tap-feedback active:scale-95 ${
            digits[i]
              ? 'border-[#0B2545] bg-white text-slate-900 shadow-xs ring-2 ring-[#0B2545]/15'
              : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-400 focus:bg-white focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/20'
          }`}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
