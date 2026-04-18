'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ onSearch, isLoading, value, onChange }: SearchBarProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group p-1 bg-white border border-[#E2D9CC] rounded-xl shadow-sm transition-all focus-within:border-[#D9CEBD] focus-within:shadow-md">
        <div className="flex items-center gap-2">
          <div className="pl-4 text-[#B8A898]">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            placeholder="Enter a GitHub username..."
            className="w-full py-4 bg-transparent border-none text-[#2A2116] placeholder-[#B8A898] focus:ring-0 text-lg font-medium outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="mr-1 px-8 py-3 bg-[#2A2116] text-[#F7F3ED] font-bold rounded-lg hover:bg-[#3D3020] transition-all dropdown-shadow active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
